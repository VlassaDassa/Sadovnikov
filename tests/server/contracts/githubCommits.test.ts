import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getGithubCommits } from "@/lib/evolution/getGithubCommits";

function commit(sha: string, message: string, date: string, parents = 1) {
    return {
        sha,
        html_url: `https://github.com/example/project/commit/${sha}`,
        commit: {
            message,
            author: {
                date,
            },
            committer: {
                date,
            },
        },
        parents: Array.from(
            {
                length: parents,
            },
            (_, index) => ({
                sha: `parent-${index}`,
            }),
        ),
    };
}

describe("getGithubCommits", () => {
    const originalToken = process.env.GITHUB_TOKEN;
    const originalMaximum = process.env.EVOLUTION_MAX_COMMITS;

    beforeEach(() => {
        process.env.GITHUB_TOKEN = "test-token";
        process.env.EVOLUTION_MAX_COMMITS = "300";
    });

    afterEach(() => {
        if (originalToken === undefined) {
            delete process.env.GITHUB_TOKEN;
        } else {
            process.env.GITHUB_TOKEN = originalToken;
        }

        if (originalMaximum === undefined) {
            delete process.env.EVOLUTION_MAX_COMMITS;
        } else {
            process.env.EVOLUTION_MAX_COMMITS = originalMaximum;
        }

        vi.unstubAllGlobals();
    });

    it.each([
        "not-a-url",
        "http://github.com/example/project",
        "https://gitlab.com/example/project",
        "https://github.com/example",
        "https://github.com/example/project/extra",
    ])("rejects invalid repository URL %s", async (value) => {
        const fetchMock = vi.fn();

        vi.stubGlobal("fetch", fetchMock);

        await expect(getGithubCommits(value)).rejects.toBeDefined();

        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("requests commits with GitHub headers", async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            new Response(
                JSON.stringify([
                    commit(
                        "abcdef1",
                        "Add feature",
                        "2026-01-01T00:00:00.000Z",
                    ),
                ]),
                {
                    status: 200,
                    headers: {
                        "content-type": "application/json",
                    },
                },
            ),
        );

        vi.stubGlobal("fetch", fetchMock);

        await getGithubCommits("https://github.com/example/project.git");

        const [url, options] = fetchMock.mock.calls[0];

        expect(url.toString()).toContain("/repos/example/project/commits");
        expect(url.toString()).toContain("per_page=100");
        expect(url.toString()).toContain("page=1");
        expect(options.headers).toMatchObject({
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "sadovnikov-evolution-generator",
            Authorization: "Bearer test-token",
        });
        expect(options.cache).toBe("no-store");
    });

    it("filters noise and returns chronological candidates", async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            new Response(
                JSON.stringify([
                    commit(
                        "newest01",
                        "Add dashboard",
                        "2026-03-01T00:00:00.000Z",
                    ),
                    commit(
                        "merge001",
                        "Merge pull request #1",
                        "2026-02-01T00:00:00.000Z",
                        2,
                    ),
                    commit("wip0001", "WIP", "2026-01-15T00:00:00.000Z"),
                    commit(
                        "oldest01",
                        "Create project",
                        "2026-01-01T00:00:00.000Z",
                    ),
                ]),
                {
                    status: 200,
                },
            ),
        );

        vi.stubGlobal("fetch", fetchMock);

        const result = await getGithubCommits(
            "https://github.com/example/project",
        );

        expect(result.totalCommits).toBe(4);
        expect(result.commits.map((item) => item.sha)).toEqual([
            "oldest01",
            "newest01",
        ]);
    });

    it.each([
        [404, "GitHub repository was not found or is not accessible"],
        [409, "GitHub repository contains no commits"],
    ])("maps status %s", async (status, message) => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue(
                new Response("failure", {
                    status,
                }),
            ),
        );

        await expect(
            getGithubCommits("https://github.com/example/project"),
        ).rejects.toThrow(message);
    });

    it("rejects a repository above the configured limit", async () => {
        process.env.EVOLUTION_MAX_COMMITS = "1";

        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue(
                new Response(
                    JSON.stringify([
                        commit("abcdef1", "First", "2026-01-01T00:00:00.000Z"),
                        commit("abcdef2", "Second", "2026-01-02T00:00:00.000Z"),
                    ]),
                    {
                        status: 200,
                    },
                ),
            ),
        );

        await expect(
            getGithubCommits("https://github.com/example/project"),
        ).rejects.toThrow("Repository contains more than 1 commits");
    });

    it("rejects an invalid configured limit", async () => {
        process.env.EVOLUTION_MAX_COMMITS = "0";

        const fetchMock = vi.fn();

        vi.stubGlobal("fetch", fetchMock);

        await expect(
            getGithubCommits("https://github.com/example/project"),
        ).rejects.toThrow("EVOLUTION_MAX_COMMITS");

        expect(fetchMock).not.toHaveBeenCalled();
    });
});
