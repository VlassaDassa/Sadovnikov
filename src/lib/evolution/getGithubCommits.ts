export interface GithubCommitForEvolution {
    sha: string;
    message: string;
    date: string;
    url: string;
}

interface GithubCommitResponseItem {
    sha: string;
    html_url: string;

    commit: {
        message: string;

        author: {
            date: string;
        } | null;

        committer: {
            date: string;
        } | null;
    };

    parents: Array<{
        sha: string;
    }>;
}

interface GithubRepositoryReference {
    owner: string;
    repository: string;
}

export interface GithubCommitCollection {
    totalCommits: number;
    commits: GithubCommitForEvolution[];
}

const ignoredMessagePatterns = [
    /^merge pull request/i,
    /^merge branch/i,
    /^merge remote-tracking branch/i,
    /^wip$/i,
    /^fix typo$/i,
    /^fix formatting$/i,
    /^format code$/i,
    /^run formatter$/i,
    /^update lockfile$/i,
    /^update pnpm lockfile$/i,
    /^update package lockfile$/i,
    /^chore\(deps\)/i,
    /^dependabot/i,
    /^bump .+ from .+ to .+/i,
];

function parseRepositoryUrl(
    value: string,
): GithubRepositoryReference {
    let url: URL;

    try {
        url = new URL(value);
    } catch {
        throw new Error(
            'Invalid GitHub repository URL',
        );
    }

    if (
        url.protocol !== 'https:' ||
        url.hostname.toLowerCase() !==
            'github.com'
    ) {
        throw new Error(
            'Only HTTPS github.com repository URLs are supported',
        );
    }

    const segments = url.pathname
        .replace(/\/+$/, '')
        .split('/')
        .filter(Boolean);

    if (segments.length !== 2) {
        throw new Error(
            'Invalid GitHub repository URL',
        );
    }

    const owner = segments[0];

    const repository = segments[1]
        .replace(/\.git$/i, '');

    if (!owner || !repository) {
        throw new Error(
            'Invalid GitHub repository URL',
        );
    }

    return {
        owner,
        repository,
    };
}

function getMaximumCommitCount(): number {
    const value = Number(
        process.env
            .EVOLUTION_MAX_COMMITS ??
            300,
    );

    if (
        !Number.isInteger(value) ||
        value < 1 ||
        value > 1000
    ) {
        throw new Error(
            'EVOLUTION_MAX_COMMITS must be an integer from 1 to 1000',
        );
    }

    return value;
}

function getGithubHeaders():
    Record<string, string> {
    const headers:
        Record<string, string> = {
            Accept:
                'application/vnd.github+json',
            'X-GitHub-Api-Version':
                '2022-11-28',
            'User-Agent':
                'sadovnikov-evolution-generator',
        };

    const token =
        process.env.GITHUB_TOKEN;

    if (token) {
        headers.Authorization =
            `Bearer ${token}`;
    }

    return headers;
}

function getCommitDate(
    commit: GithubCommitResponseItem,
): string {
    const date =
        commit.commit.committer?.date ??
        commit.commit.author?.date;

    if (!date) {
        throw new Error(
            `Commit ${commit.sha} does not contain a date`,
        );
    }

    return date;
}

function isCandidate(
    commit: GithubCommitResponseItem,
): boolean {
    if (commit.parents.length > 1) {
        return false;
    }

    const title =
        commit.commit.message
            .split('\n')[0]
            ?.trim() ?? '';

    if (!title) {
        return false;
    }

    return !ignoredMessagePatterns.some(
        (pattern) => {
            return pattern.test(title);
        },
    );
}

export async function getGithubCommits(
    githubLink: string,
): Promise<GithubCommitCollection> {
    const { owner, repository } =
        parseRepositoryUrl(githubLink);

    const maximumCommitCount =
        getMaximumCommitCount();

    const rawCommits:
        GithubCommitResponseItem[] = [];

    let page = 1;

    while (true) {
        const url = new URL(
            [
                'https://api.github.com/repos',
                encodeURIComponent(owner),
                encodeURIComponent(repository),
                'commits',
            ].join('/'),
        );

        url.searchParams.set(
            'per_page',
            '100',
        );

        url.searchParams.set(
            'page',
            page.toString(),
        );

        const response = await fetch(
            url,
            {
                headers:
                    getGithubHeaders(),
                cache: 'no-store',
                signal:
                    AbortSignal.timeout(
                        20_000,
                    ),
            },
        );

        if (!response.ok) {
            const responseText =
                await response.text();

            if (response.status === 404) {
                throw new Error(
                    'GitHub repository was not found or is not accessible',
                );
            }

            if (response.status === 409) {
                throw new Error(
                    'GitHub repository contains no commits',
                );
            }

            throw new Error(
                [
                    `GitHub request failed: ${response.status}`,
                    responseText.slice(
                        0,
                        300,
                    ),
                ].join(' '),
            );
        }

        const batch =
            (await response.json()) as
                GithubCommitResponseItem[];

        if (
            rawCommits.length +
                batch.length >
            maximumCommitCount
        ) {
            throw new Error(
                `Repository contains more than ${maximumCommitCount} commits. Increase EVOLUTION_MAX_COMMITS before generating Evolution.`,
            );
        }

        rawCommits.push(...batch);

        if (batch.length < 100) {
            break;
        }

        page += 1;
    }

    const commits = rawCommits
        .filter(isCandidate)
        .map((commit) => {
            return {
                sha: commit.sha,

                message:
                    commit.commit.message
                        .trim()
                        .slice(0, 600),

                date:
                    getCommitDate(
                        commit,
                    ),

                url:
                    commit.html_url,
            };
        })
        .reverse();

    if (commits.length === 0) {
        throw new Error(
            'No meaningful commit candidates were found',
        );
    }

    return {
        totalCommits:
            rawCommits.length,
        commits,
    };
}