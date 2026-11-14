import { useState } from 'react';
import { Trophy, ArrowRight } from 'lucide-react';
import styles from './Leaderboard.module.css';

// Demonstration records only. Replace with scores from your backend later.
const players = [
    { id: 1, name: 'PuzzlePilot', completed: 142, streak: 28, scores: { overall: 9850, word: 3400, crossword: 3150, heatword: 3300 } },
    { id: 2, name: 'LexiLogic', completed: 135, streak: 21, scores: { overall: 9470, word: 3550, crossword: 3020, heatword: 2900 } },
    { id: 3, name: 'BrainWave', completed: 129, streak: 17, scores: { overall: 9120, word: 2950, crossword: 3270, heatword: 2900 } },
    { id: 4, name: 'GridMaster', completed: 121, streak: 15, scores: { overall: 8840, word: 2670, crossword: 3450, heatword: 2720 } },
    { id: 5, name: 'WordWizard', completed: 117, streak: 12, scores: { overall: 8510, word: 3620, crossword: 2430, heatword: 2460 } },
    { id: 6, name: 'MindSprint', completed: 112, streak: 19, scores: { overall: 8230, word: 2810, crossword: 2690, heatword: 2730 } },
    { id: 7, name: 'ClueHunter', completed: 108, streak: 9, scores: { overall: 7940, word: 2500, crossword: 3100, heatword: 2340 } },
    { id: 8, name: 'QuickThinker', completed: 103, streak: 8, scores: { overall: 7650, word: 2740, crossword: 2300, heatword: 2610 } },
    { id: 9, name: 'DailySolver', completed: 98, streak: 11, scores: { overall: 7310, word: 2490, crossword: 2420, heatword: 2400 } },
    { id: 10, name: 'LetterLover', completed: 94, streak: 7, scores: { overall: 6990, word: 3020, crossword: 1970, heatword: 2000 } },
];

const categories = [
    { id: 'overall', label: 'Overall' },
    { id: 'word', label: 'Word Games' },
    { id: 'crossword', label: 'Mini Crosswords' },
    { id: 'heatword', label: 'Heatword' },
];

const formatScore = (score) => score.toLocaleString('en-US');

/** BrainBites leaderboard screen; navigates using the same dispatcher as Help and Archive. */
export default function Leaderboard({ setScreen }) {
    const [category, setCategory] = useState('overall');
    const rankedPlayers = [...players].sort((a, b) => b.scores[category] - a.scores[category] || a.name.localeCompare(b.name));

    return (
        <section className={styles.standardPage}>
            <header className={styles.sectionTitle}>
                <div>
                    <span className={styles.eyebrow}>COMMUNITY RANKINGS</span>
                    <h1>Leaderboard</h1>
                    <p className={styles.sectionDescription}>Meet the sharpest minds in BrainBites. Climb the rankings one puzzle at a time.</p>
                </div>
            </header>

            <div className={styles.categoryTabs} role="group" aria-label="Leaderboard category">
                {categories.map((item) => (
                    <button key={item.id} type="button" className={`${styles.categoryButton} ${category === item.id ? styles.categoryActive : ''}`}
                        aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>
                        {item.label}
                    </button>
                ))}
            </div>

            <div className={styles.podiumGrid} aria-label="Top three players">
                {rankedPlayers.slice(0, 3).map((player, index) => (
                    <article className={`${styles.panel} ${styles.podiumCard}`} key={player.id}>
                        <span className={styles.eyebrow}>RANK {String(index + 1).padStart(2, '0')}</span>
                        <div className={styles.podiumIcon} aria-hidden="true"><Trophy size={24} /></div>
                        <h2>{player.name}</h2>
                        <strong className={styles.podiumScore}>{formatScore(player.scores[category])}</strong>
                        <span className={styles.scoreLabel}>POINTS</span>
                    </article>
                ))}
            </div>

            <section className={`${styles.panel} ${styles.rankingPanel}`} aria-labelledby="rankings-heading">
                <div className={styles.rankingHeader}>
                    <div>
                        <span className={styles.eyebrow}>ALL PLAYERS</span>
                        <h2 id="rankings-heading">Full rankings</h2>
                    </div>
                    <span className={styles.demoLabel}>Sample data</span>
                </div>
                <div className={styles.tableScroll}>
                    <table className={styles.rankingsTable}>
                        <thead><tr><th scope="col">Rank</th><th scope="col">Player</th><th scope="col">Score</th><th scope="col">Completed</th><th scope="col">Streak</th></tr></thead>
                        <tbody>
                            {rankedPlayers.map((player, index) => (
                                <tr key={player.id}>
                                    <td className={styles.rankNumber}>{String(index + 1).padStart(2, '0')}</td>
                                    <td><span className={styles.playerCell}><span className={styles.avatar} aria-hidden="true">{player.name.slice(0, 2).toUpperCase()}</span><strong>{player.name}</strong></span></td>
                                    <td className={styles.scoreCell}>{formatScore(player.scores[category])}</td>
                                    <td>{player.completed}</td>
                                    <td>{player.streak} days</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.buttonRow}>
                    <button className={styles.actionButton} type="button" onClick={() => setScreen('home')}>
                        Choose a puzzle <ArrowRight size={16} aria-hidden="true" />
                    </button>
                </div>
            </section>
        </section>
    );
}
