import { Puzzle, Search, Brain, CaseUpper } from 'lucide-react';
import styles from './Archive.module.css';

const archivedPuzzles = [
    {
        id: 'teaser',
        title: 'Daily Brain Teaser',
        description: 'A fresh challenge to get your mind moving.',
        icon: Puzzle,
    },
    {
        id: 'logic',
        title: 'Logic Puzzles',
        description: 'Follow the clues and find the answer.',
        icon: Search,
    },
    {
        id: 'memory',
        title: 'Memory Match',
        description: 'See what you can remember in a quick round.',
        icon: Brain,
    },
    {
        id: 'scramble',
        title: 'Word Scramble',
        description: 'Untangle the letters and discover the words.',
        icon: CaseUpper,
    },
];

/**
 * Puzzle archive screen.
 * @param {Function} setScreen - Same screen dispatcher used by Help.
 */
export default function Archive({ onPlay }) {

    return (
        <section className={styles.standardPage}>
            <header className={styles.sectionTitle}>
                <div>
                    <span className={styles.eyebrow}>PUZZLE ARCHIVE</span>
                    <h1>Play a past favorite</h1>
                    <p className={styles.sectionDescription}>
                        Revisit older puzzles and give them another try.
                    </p>
                </div>
            </header>

            <div className={styles.archiveGrid}>
                {archivedPuzzles.map((puzzle) => {
                    const Icon = puzzle.icon;
                    return (
                    <article className={styles.panel} key={puzzle.title}>
                        <span className={styles.puzzleIcon} aria-hidden="true">
                            <Icon size={28} strokeWidth={1.7} />
                        </span>
                        <h2>{puzzle.title}</h2>
                        <p className={styles.puzzleDescription}>{puzzle.description}</p>
                        <div className={styles.buttonRow}>
                            <button
                                className={styles.actionButton}
                                type="button"
                                onClick={() => onPlay(puzzle.id)}
                                aria-label={`Play ${puzzle.title}`}
                            >
                                Play puzzle <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </article>
                    );
                })}
            </div>
        </section>
    );
}
