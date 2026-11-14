import { Star, Trophy, ArrowRight, Grid2X2 } from 'lucide-react';
import Button from '../common/Button';
import Tag from '../common/Tag';
import { puzzles, leaderboard, pastArchives } from '../../data/initialPuzzles';
import styles from './Home.module.css';

/**
 * BrainBites Home Page and puzzle discovery
 * -----------------------------------------------
 * Main application and puzzle discovery page:
 * - Daily Featured puzzle: Heatword with a different word each day
 * - Global Leaderboard: Top scored people ranking
 * - Puzzle Library: categorised puzzles to play
 * - Past Archives: old puzzles that the user can visit and solve
 *
 * @param {Function} setScreen - Router dispatcher to navigate to other screens
 */
export default function Home({ setScreen }) {
    // Navigation helper
    const go = (target) => setScreen(target);

    return (
        <div className={styles.homeContainer}>
            {/* Prime Daily Feature Section */}
            <section className={styles.dailyFeature}>
                {/* Left Column: Today's Featured Challenge */}
                <div className={styles.dailyChallenge}>
                    {/* Challenge Topline with Square Marker and Date */}
                    <div className={styles.challengeTopline}>
                        <span>
                            <i /> Today's challenge
                        </span>
                        <hr />
                        <time>JUN 15, 2025</time>
                    </div>

                    {/* Hero Content Area */}
                    <div className={styles.heroCopy}>
                        <span className={styles.eyebrow}>PUZZLE NO. 042</span>
                        <h1 className={styles.challengeTitle}>
                            Heat<br />Word
                        </h1>

                        {/* Difficulty Star Rating Row */}
                        <div className={styles.challengeDifficulty}>
                            <span className={styles.starRow} aria-label="3 out of 5 difficulty">
                                <Star size={16} fill="currentColor" strokeWidth={0} />
                                <Star size={16} fill="currentColor" strokeWidth={0} />
                                <Star size={16} fill="currentColor" strokeWidth={0} />
                                <Star size={16} className={styles.unfilledStar} strokeWidth={1} />
                                <Star size={16} className={styles.unfilledStar} strokeWidth={1} />
                            </span>
                            <b>Medium difficulty</b>
                        </div>

                        {/* Daily Teaser Description */}
                        <p className={styles.challengeDesc}>
                            Three guesses. Five letters. Every miss brings you closer.
                            <br />
                            Read the color heat to find today's word.
                        </p>

                        {/* Interactive Heatword Color Heat Preview Strip */}
                        <div className={styles.heroHeatPreview} aria-label="Heatword color preview">
                            {[
                                ['S', 'near-five'],
                                ['R', 'exact'],
                                ['E', 'near-one'],
                                ['A', 'present'],
                                ['M', 'far']
                            ].map(([letter, heat]) => (
                                <span key={letter} className={styles[`heat-${heat}`]}>
                                    {letter}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons Row */}
                        <div className={styles.buttonRow}>
                            <Button onClick={() => go('game')}>
                                Play today's puzzle <ArrowRight size={17} />
                            </Button>
                            <button
                                type="button"
                                className={styles.quietLink}
                                onClick={() => go('archive')}
                            >
                                Explore puzzles <ArrowRight size={15} />
                            </button>
                        </div>

                        {/* Community Metrics Strip */}
                        <div className={styles.heroMeta}>
                            <span>
                                <b>327</b> solved today
                            </span>
                            <span>
                                <b>4.8</b> player rating
                            </span>
                            <span>
                                <b>~8 min</b> to complete
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Global Fastest Solvers Leaderboard Aside */}
                <aside className={styles.dailyRankings}>
                    <span className={styles.eyebrow}>FASTEST TODAY</span>
                    <h2>Global leaderboard</h2>
                    <ol className={styles.rankingsList}>
                        {leaderboard.slice(0, 3).map(([rank, player, , time], i) => (
                            <li key={rank} className={styles.rankingItem}>
                                <span className={styles.rankNumber}>0{rank}</span>
                                <span className={`${styles.rankAvatar} ${i === 0 ? styles.first : ''}`}>
                                    {player.slice(0, 2).toUpperCase()}
                                </span>
                                <b className={styles.rankPlayerName}>{player}</b>
                                <time className={styles.rankTime}>{time}</time>
                            </li>
                        ))}
                    </ol>
                    <button
                        type="button"
                        className={`${styles.quietLink} ${styles.rankingsQuietLink}`}
                        onClick={() => go('leaderboard')}
                    >
                        View full list <ArrowRight size={17} />
                    </button>
                    <div className={styles.leaderboardNote}>
                        <Trophy size={15} />
                        <span>Your next personal best starts here.</span>
                    </div>
                </aside>
            </section>

            {/* Puzzle Library Catalog Section */}
            <section id="puzzle-library" className={styles.contentSection}>
                <div className={styles.sectionTitle}>
                    <div>
                        <span className={styles.eyebrow}>PUZZLE LIBRARY</span>
                        <h2>Choose your challenge</h2>
                    </div>
                    <button
                        type="button"
                        className={styles.textLink}
                        onClick={() => go('archive')}
                    >
                        View all 124 puzzles →
                    </button>
                </div>

                {/* Puzzle Cards Grid */}
                <div className={styles.cardGrid}>
                    {puzzles.map((puzzle) => (
                        <article className={styles.puzzleCard} key={puzzle.title}>
                            {/* Card Glyph Badge */}
                            <div
                                className={`${styles.puzzleGlyph} ${puzzle.type === 'Word Games' ? styles.glyph0 : styles.glyph1
                                    }`}
                            >
                                {puzzle.type === 'Word Games' ? (
                                    <div className={styles.letterTiles}>
                                        <span>A</span>
                                        <span>B</span>
                                        <span>C</span>
                                    </div>
                                ) : (
                                    <Grid2X2 size={56} strokeWidth={1.5} />
                                )}
                            </div>

                            {/* Card Body & Details */}
                            <div className={styles.cardBody}>
                                <div className={styles.cardTop}>
                                    <Tag>{puzzle.type}</Tag>
                                    <Tag tone="accent">{puzzle.status}</Tag>
                                </div>
                                <h3>{puzzle.title}</h3>
                                <p>{puzzle.description}</p>
                                <div className={styles.cardFoot}>
                                    <span
                                        className={`${styles.difficulty} ${styles[`difficulty-${puzzle.level.toLowerCase()}`]
                                            }`}
                                    >
                                        {puzzle.level}
                                    </span>
                                    <span>{puzzle.meta}</span>
                                    <button
                                        type="button"
                                        onClick={() => go('game')}
                                        aria-label={`Play ${puzzle.title}`}
                                    >
                                        Play →
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Past Archives Calendar Date Strip */}
            <section className={styles.pastArchives}>
                <div className={styles.sectionTitle}>
                    <div>
                        <span className={styles.eyebrow}>MISSED A DAY?</span>
                        <h2>Past archives</h2>
                    </div>
                    <button
                        type="button"
                        className={styles.quietLink}
                        onClick={() => go('archive')}
                    >
                        All archives <ArrowRight size={15} />
                    </button>
                </div>

                {/* Date Tiles Grid */}
                <div className={styles.archiveTiles}>
                    {pastArchives.map(([day, name]) => (
                        <button
                            key={day}
                            type="button"
                            className={styles.archiveTileBtn}
                            onClick={() => go('archive')}
                        >
                            <span>
                                <strong>{day}</strong>
                                <small>JUN</small>
                            </span>
                            <b>{name}</b>
                            <ArrowRight size={16} />
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}