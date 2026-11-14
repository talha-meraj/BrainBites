import Button from '../common/Button';
import styles from './Help.module.css';

/**
 * BrainBites Player Manual & Rules View
 * -----------------------------------------------
 * Player manual, game rules documentation, and interactive FAQs:
 * - Getting Started: 4-step numbered walkthrough
 * - Rules by Category: Native expandable details/summary pages
 * - Common Questions: 3-column FAQ row covering hints, guest saves, and rankings
 *
 * @param {Function} setScreen - Router dispatcher to navigate between screens
 */
export default function Help({ setScreen }) {
    // Navigation helper
    const go = (target) => setScreen(target);

    return (
        <div className={styles.standardPage}>
            {/* Page Header */}
            <div className={styles.sectionTitle}>
                <div>
                    <span className={styles.eyebrow}>PLAYER GUIDE</span>
                    <h2>Help & puzzle rules</h2>
                </div>
            </div>

            {/* Two-Column Help Panels Grid */}
            <div className={styles.helpGrid}>
                {/* Panel: How BrainBites Works (4 Sequential Steps) */}
                <section className={styles.panel}>
                    <span className={styles.eyebrow}>GETTING STARTED</span>
                    <h2>How BrainBites works</h2>
                    <ol className={styles.rulesList}>
                        <li>
                            <b>Choose a puzzle.</b>
                            <span>Browse by type, difficulty, or release date.</span>
                        </li>
                        <li>
                            <b>Solve at your pace.</b>
                            <span>Your timer starts when gameplay opens.</span>
                        </li>
                        <li>
                            <b>Check and submit.</b>
                            <span>Review incorrect entries before submitting again.</span>
                        </li>
                        <li>
                            <b>Save your result.</b>
                            <span>
                                Registered players earn streaks and leaderboard scores.
                            </span>
                        </li>
                    </ol>
                </section>

                {/* Panel: Rules by Category (Expandable Accordions) */}
                <section className={styles.panel}>
                    <span className={styles.eyebrow}>PUZZLE RULES</span>
                    <h2>Rules by category</h2>
                    <div className={styles.faqList}>
                        <details open>
                            <summary>Word Games</summary>
                            <p>
                                Follow the instruction shown above the board. Letter ladders
                                change one letter per step while keeping every intermediate
                                entry a valid word.
                            </p>
                        </details>
                        <details>
                            <summary>Mini Crosswords</summary>
                            <p>
                                Fill every open square using the Across and Down clues. A letter
                                must satisfy both intersecting answers.
                            </p>
                        </details>
                        <details>
                            <summary>Heatword</summary>
                            <p>
                                Find a five-letter word in three guesses. Green and yellow use
                                familiar word-game rules; red-orange means one alphabet step
                                away, and orange means within five steps.
                            </p>
                        </details>
                    </div>
                </section>

                {/* Panel: Common Questions (Wide 3-Column FAQ) */}
                <section className={`${styles.panel} ${styles.helpWide}`}>
                    <div className={styles.sectionTitle}>
                        <div>
                            <span className={styles.eyebrow}>COMMON QUESTIONS</span>
                            <h2>Hints, scoring, and progress</h2>
                        </div>
                    </div>

                    <div className={styles.faqColumns}>
                        <div>
                            <h3>Do hints affect my score?</h3>
                            <p>
                                Yes. Each hint applies a small score deduction, but it never
                                breaks your completion streak.
                            </p>
                        </div>
                        <div>
                            <h3>Can guests save puzzles?</h3>
                            <p>
                                No. Create a free player account to save unfinished puzzles and
                                continue on another visit.
                            </p>
                        </div>
                        <div>
                            <h3>How are rankings calculated?</h3>
                            <p>
                                Score, completion time, hint usage, and puzzle difficulty
                                contribute to leaderboard position.
                            </p>
                        </div>
                    </div>

                    {/* Action Navigation Buttons */}
                    <div className={styles.buttonRow}>
                        <Button onClick={() => go('home')}>Choose a puzzle</Button>
                        <Button variant="secondary" onClick={() => go('register')}>
                            Create an account
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}