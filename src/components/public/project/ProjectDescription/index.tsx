'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import type { IProjectDescription } from '@/interfaces/general';
import Icon from '@/components/shared/icons/Icon';
import { cssVars } from '@/styles/cssVariables';
import { parseProjectDescription, sanitizeProjectCss, sanitizeProjectHtml } from '@/lib/projectDescriptionEditor';

import styles from './index.module.scss';

interface ProjectDescriptionProps {
    data: IProjectDescription[];
}

const chapterNumber = (index: number) => String(index + 1).padStart(2, '0');

const renderContent = (value: string, emptyLabel: string) => {
    const document = parseProjectDescription(value);

    if (document) {
        return (
            <div className={styles.richContent}>
                {document.css && (
                    <style dangerouslySetInnerHTML={{ __html: sanitizeProjectCss(document.css) }} />
                )}
                <div dangerouslySetInnerHTML={{ __html: sanitizeProjectHtml(document.html || `<p>${emptyLabel}</p>`) }} />
            </div>
        );
    }

    return value?.trim() ? (
        value.split(/\r?\n\s*\r?\n/).map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
        ))
    ) : (
        <p>{emptyLabel}</p>
    );
};

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ data }) => {
    const t = useTranslations('ProjectDescription');
    const id = useId();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const tabList = useRef<HTMLDivElement>(null);
    const activePanelRef = useRef<HTMLDivElement>(null);
    const [panelHeight, setPanelHeight] = useState<number | null>(null);
    const selectedIndex = Math.max(0, data.findIndex(item => item.id === selectedId));

    useEffect(() => {
        const panel = activePanelRef.current;
        if (!panel) return;

        const syncHeight = () => setPanelHeight(panel.getBoundingClientRect().height);
        syncHeight();

        if (typeof ResizeObserver === 'undefined') return;
        const observer = new ResizeObserver(syncHeight);
        observer.observe(panel);
        return () => observer.disconnect();
    }, [selectedIndex, data]);

    const selectTab = (index: number, moveFocus = false) => {
        setSelectedId(data[index].id);

        const tab = tabs.current[index];
        const list = tabList.current;

        if (moveFocus) tab?.focus({ preventScroll: true });

        // Reveal a selected mobile tab without moving the page vertically.
        if (tab && list) {
            const tabBounds = tab.getBoundingClientRect();
            const listBounds = list.getBoundingClientRect();

            if (tabBounds.left < listBounds.left) {
                list.scrollLeft += tabBounds.left - listBounds.left;
            } else if (tabBounds.right > listBounds.right) {
                list.scrollLeft += tabBounds.right - listBounds.right;
            }
        }
    };

    const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        let nextIndex: number;

        switch (event.key) {
            case 'ArrowRight':
                nextIndex = (index + 1) % data.length;
                break;
            case 'ArrowLeft':
                nextIndex = (index - 1 + data.length) % data.length;
                break;
            case 'Home':
                nextIndex = 0;
                break;
            case 'End':
                nextIndex = data.length - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        selectTab(nextIndex, true);
    };

    return (
        <section className={`${styles.description} container`} aria-labelledby={`${id}-heading`}>
            <h2 id={`${id}-heading`} className={`${styles.title} sectionTitle`}>{t('Title')}</h2>

            <div className={styles.reader}>
                {data.length > 0 ? (
                    <>
                        <div className={styles.navigation}>
                            <button
                                type="button"
                                className={`${styles.navigationButton} ${styles.navigationButtonPrevious}`}
                                onClick={() => selectTab(selectedIndex - 1)}
                                disabled={selectedIndex === 0}
                                tabIndex={-1}
                                aria-label={t('Previous')}
                            >
                                <Icon name="arrow" size={18} strokeColor={cssVars.white} />
                            </button>
                            <div
                                ref={tabList}
                                className={styles.tabs}
                                role="tablist"
                                aria-labelledby={`${id}-heading`}
                            >
                                {data.map((item, index) => (
                                    <button
                                        key={item.id}
                                        ref={element => { tabs.current[index] = element; }}
                                        id={`${id}-tab-${item.id}`}
                                        className={styles.tab}
                                        type="button"
                                        role="tab"
                                        aria-selected={selectedIndex === index}
                                        aria-controls={`${id}-panel-${item.id}`}
                                        tabIndex={selectedIndex === index ? 0 : -1}
                                        onClick={() => selectTab(index)}
                                        onKeyDown={event => handleTabKeyDown(event, index)}
                                    >
                                        <span className={styles.tabNumber} aria-hidden="true">{chapterNumber(index)}</span>
                                        <span className={styles.tabTitle}>{item.title || chapterNumber(index)}</span>
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                className={`${styles.navigationButton} ${styles.navigationButtonNext}`}
                                onClick={() => selectTab(selectedIndex + 1)}
                                disabled={selectedIndex === data.length - 1}
                                tabIndex={-1}
                                aria-label={t('Next')}
                            >
                                <Icon name="arrow" size={18} strokeColor={cssVars.white} />
                            </button>
                        </div>

                        <div
                            className={styles.panelViewport}
                            style={panelHeight !== null ? { height: `${panelHeight}px` } : undefined}
                        >
                            {data.map((item, index) => (
                                <div
                                    key={`${item.id}-${selectedIndex === index ? 'active' : 'hidden'}`}
                                    ref={selectedIndex === index ? activePanelRef : undefined}
                                    id={`${id}-panel-${item.id}`}
                                    className={styles.panel}
                                    role="tabpanel"
                                    aria-labelledby={`${id}-tab-${item.id}`}
                                    hidden={selectedIndex !== index}
                                    tabIndex={0}
                                >
                                    <div className={styles.chapterHeading}>
                                        <h3 className={styles.chapterTitle}>{item.title || chapterNumber(index)}</h3>
                                    </div>

                                    <div className={styles.prose}>
                                        {renderContent(item.content, t('NoContent'))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className={styles.empty}>{t('NoContent')}</p>
                )}
            </div>
        </section>
    );
};

export default ProjectDescription;
