"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import EvolutionReviewModal from "./EvolutionReviewModal";
import SectionBackground from "@/components/admin/general/sectionBackground";
import SectionTitle from "@/components/admin/general/sectionTitle";
import Button from "@/components/shared/button/Button";

import { generateEvolutionDraft } from "@/app/actions/evolution";
import type { IEvolutionDraftItem } from "@/interfaces/evolution";

import { cssVars } from "@/styles/cssVariables";
import styles from "./index.module.scss";





interface EvolutionProps {
    projectId: number;
    githubLink: string | null | undefined;
    initialDraft: IEvolutionDraftItem[];
    initialGeneratedAt: string | null;
    initialPublishedCount: number;
}

interface GenerationInfo {
    totalCommits: number;
    analyzedCommits: number;
}

function getErrorMessage(error: unknown): string {
    return error instanceof Error
        ? error.message
        : "Failed to generate Evolution";
}

const Evolution: React.FC<EvolutionProps> = ({
    projectId,
    githubLink,
    initialDraft,
    initialGeneratedAt,
    initialPublishedCount,
}) => {
    const router = useRouter();

    const [draft, setDraft] = useState<IEvolutionDraftItem[]>(initialDraft);

    const [generatedAt, setGeneratedAt] = useState<string | null>(
        initialGeneratedAt,
    );

    const [publishedCount, setPublishedCount] = useState(initialPublishedCount);

    const [generationInfo, setGenerationInfo] = useState<GenerationInfo | null>(
        null,
    );

    const [isGenerating, setIsGenerating] = useState(false);

    const [isReviewOpen, setIsReviewOpen] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const normalizedGithubLink = useMemo(() => {
        return (
            githubLink
                ?.trim()
                .replace(/\.git$/i, "")
                .replace(/\/+$/, "") ?? ""
        );
    }, [githubLink]);

    const hasGithubLink = normalizedGithubLink.length > 0;

    const hasDraft = draft.length > 0;

    const currentState = useMemo(() => {
        if (publishedCount > 0 && hasDraft) {
            return `Published, ${publishedCount} milestones. New draft contains ${draft.length} milestones`;
        }

        if (publishedCount > 0) {
            return `Published, ${publishedCount} milestones`;
        }

        if (hasDraft) {
            return `Draft ready, ${draft.length} milestones`;
        }

        return "Not published";
    }, [draft.length, hasDraft, publishedCount]);

    async function handleGenerate(): Promise<void> {
        if (!hasGithubLink) {
            setError("GitHub repository link is missing");

            return;
        }

        setError(null);
        setIsGenerating(true);

        try {
            const response = await generateEvolutionDraft(
                projectId,
                normalizedGithubLink,
            );

            if (!response.success) {
                setError(response.error);

                return;
            }

            setDraft(response.data.draft);

            setGeneratedAt(response.data.generatedAt);

            setGenerationInfo({
                totalCommits: response.data.totalCommits,
                analyzedCommits: response.data.analyzedCommits,
            });

            setIsReviewOpen(true);
        } catch (generationError) {
            setError(getErrorMessage(generationError));
        } finally {
            setIsGenerating(false);
        }
    }

    function handlePublished(count: number): void {
        setPublishedCount(count);
        setDraft([]);
        setGenerationInfo(null);
        setIsReviewOpen(false);

        router.refresh();
    }

    const statusClass = hasDraft
    ? styles.statusDraft
    : publishedCount > 0
        ? styles.statusPublished
        : styles.statusEmpty;

    return (
        <>
            <section className={styles.section}>
                <SectionTitle
                    title='EVOLUTION'
                    text='Generate or manual add milestones'
                />  

                <SectionBackground className={styles.evolutionWrapper}>
                    <span className={`${styles.statusBadge} ${statusClass}`}>
                        {hasDraft
                            ? "Draft available"
                            : publishedCount > 0
                            ? "Published"
                            : "Empty"}
                    </span>

                    <div className={styles.content}>
                        <div className={styles.field}>
                            <span className={styles.label}>GitHub repository</span>

                            {hasGithubLink ? (
                                <a
                                    href={normalizedGithubLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={styles.repositoryLink}
                                >
                                    {normalizedGithubLink}
                                </a>
                            ) : (
                                <span className={styles.emptyValue}>
                                    Repository link is not specified
                                </span>
                            )}
                        </div>

                        <div className={styles.field}>
                            <span className={styles.label}>Current state</span>

                            <strong className={styles.currentState}>
                                {currentState}
                            </strong>
                        </div>

                        {generatedAt && (
                            <div className={styles.meta}>
                                Draft generated{" "}
                                {new Date(generatedAt).toLocaleString("en-US")}
                            </div>
                        )}

                        {generationInfo && (
                            <div className={styles.meta}>
                                Loaded {generationInfo.totalCommits} commits.
                                Analyzed {generationInfo.analyzedCommits}.
                            </div>
                        )}

                        {error && (
                            <p className={styles.error} role="alert">
                                {error}
                            </p>
                        )}
                    </div>

                    <div className={styles.actions}>
                        <Button 
                            iconPosition='noIcon'
                            behavior={
                                isGenerating ? 'loading' : !hasGithubLink ? 'disabled' : 'default'
                            }
                            variant='black'
                            additionalClass={styles.generateButton}
                            text={
                                isGenerating
                                ? "Generating Evolution..."
                                : publishedCount > 0
                                ? "Generate new Evolution"
                                : "Generate Evolution"
                            }
                            onClick={() => {
                                void handleGenerate();
                            }}
                            noize={true}
                        />
                      
                        <Button 
                            iconPosition='noIcon'
                            behavior={
                                !hasDraft || isGenerating ? 'disabled' : 'default'
                            }
                            variant='secondary'
                            additionalClass={styles.reviewButton}
                            text='Review draft'
                            onClick={() => {
                                setIsReviewOpen(true);
                            }}
                            noize={true}
                        />
                    </div>
                </SectionBackground>
            </section>


            <EvolutionReviewModal
                projectId={projectId}
                githubLink={normalizedGithubLink}
                initialItems={draft}
                onDraftSaved={(savedDraft) => {
                    setDraft(savedDraft);
                }}
                onPublished={handlePublished}
            />
        </>
    );
};

export default Evolution;
