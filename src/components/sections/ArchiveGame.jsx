import { useEffect, useState } from 'react';
import { ArrowLeft, RotateCcw, Check } from 'lucide-react';
import styles from './ArchiveGame.module.css';

const questions = {
    teaser: [
        { question: 'What comes next: 2, 4, 8, 16, ...?', options: ['18', '24', '32', '36'], answer: 2, explanation: 'Each number doubles.' },
        { question: 'Which item does not belong?', options: ['Triangle', 'Square', 'Circle', 'Cube'], answer: 3, explanation: 'A cube is three-dimensional.' },
        { question: 'If yesterday was Monday, what day is tomorrow?', options: ['Tuesday', 'Wednesday', 'Thursday', 'Sunday'], answer: 1, explanation: 'Today is Tuesday, so tomorrow is Wednesday.' },
    ],
    logic: [
        { question: 'All squares are rectangles. Therefore, every square has four sides.', answer: true, explanation: 'Yes. A square is a four-sided rectangle.' },
        { question: 'Some birds cannot fly. Therefore, no birds can fly.', answer: false, explanation: 'No. “Some” does not mean “all”.' },
        { question: 'If it rains, the ground gets wet. The ground is wet, so it must have rained.', answer: false, explanation: 'No. Other things, such as sprinklers, can wet the ground.' },
        { question: 'Every red tile is round. This tile is red. Therefore it is round.', answer: true, explanation: 'Yes. The conclusion follows from the given rule.' },
    ],
};
const scrambleWords = [
    { word: 'BRAIN', clue: 'The organ used for thinking', shuffled: 'NIRAB' },
    { word: 'LOGIC', clue: 'Reasoning according to rules', shuffled: 'CIGOL' },
    { word: 'PUZZLE', clue: 'A challenge to solve', shuffled: 'ZLPEUZ' },
];
const memorySymbols = ['◆', '●', '▲', '■', '★', '✦'];
const gameNames = { teaser: 'Daily Brain Teaser', logic: 'Logic Puzzles', memory: 'Memory Match', scramble: 'Word Scramble' };

function QuestionGame({ type }) {
    const items = questions[type];
    const [index, setIndex] = useState(0);
    const [choice, setChoice] = useState(null);
    const [score, setScore] = useState(0);
    const finished = index === items.length;
    const question = items[index];
    const submit = (value) => {
        if (choice !== null) return;
        setChoice(value);
        if (value === question.answer) setScore((previous) => previous + 1);
    };
    const next = () => { setIndex((previous) => previous + 1); setChoice(null); };
    const reset = () => { setIndex(0); setChoice(null); setScore(0); };
    return <div className={styles.gamePanel}>
        {finished ? <div className={styles.result}><h2>Round complete!</h2><p>You answered {score} of {items.length} correctly.</p><button className={styles.primaryButton} onClick={reset}><RotateCcw size={16} /> Play again</button></div> : <>
            <div className={styles.meta}>QUESTION {index + 1} OF {items.length} <span>Score: {score}</span></div>
            <h2>{question.question}</h2>
            <div className={styles.choiceGrid}>
                {(type === 'logic' ? [{ label: 'Yes', value: true }, { label: 'No', value: false }] : question.options.map((label, value) => ({ label, value }))).map(({ label, value }) => <button key={label} disabled={choice !== null} className={`${styles.choiceButton} ${choice !== null && value === question.answer ? styles.correct : ''} ${choice === value && value !== question.answer ? styles.incorrect : ''}`} onClick={() => submit(value)}>{label}</button>)}
            </div>
            {choice !== null && <div className={styles.feedback} role="status"><strong>{choice === question.answer ? 'Correct!' : 'Not quite.'}</strong> {question.explanation}</div>}
            {choice !== null && <button className={styles.primaryButton} onClick={next}>{index === items.length - 1 ? 'See results' : 'Next question'} →</button>}
        </>}
    </div>;
}

function ScrambleGame() {
    const [index, setIndex] = useState(0);
    const [tiles, setTiles] = useState(() => scrambleWords[0].shuffled.split(''));
    const [selected, setSelected] = useState(null);
    const [checked, setChecked] = useState(false);
    const [solved, setSolved] = useState(0);
    const current = scrambleWords[index];
    const finished = index >= scrambleWords.length;
    const correct = !finished && tiles.join('') === current.word;
    const swap = (position) => {
        if (checked && correct) return;
        if (selected === null) { setSelected(position); return; }
        if (selected !== position) setTiles((previous) => { const next = [...previous]; [next[selected], next[position]] = [next[position], next[selected]]; return next; });
        setSelected(null); setChecked(false);
    };
    const move = (from, to) => {
        if (checked && correct || from === to || from < 0 || to < 0 || from >= tiles.length || to >= tiles.length) return;
        setTiles((previous) => { const next = [...previous]; [next[from], next[to]] = [next[to], next[from]]; return next; });
        setSelected(null); setChecked(false);
    };
    const next = () => { const nextIndex = index + 1; setIndex(nextIndex); if (nextIndex < scrambleWords.length) setTiles(scrambleWords[nextIndex].shuffled.split('')); setChecked(false); setSelected(null); };
    const reset = () => { setIndex(0); setTiles(scrambleWords[0].shuffled.split('')); setSelected(null); setChecked(false); setSolved(0); };
    return <div className={styles.gamePanel}>
        {finished ? <div className={styles.result}><h2>All words solved!</h2><p>You completed {solved} of {scrambleWords.length} words.</p><button className={styles.primaryButton} onClick={reset}><RotateCcw size={16} /> Play again</button></div> : <>
            <div className={styles.meta}>WORD {index + 1} OF {scrambleWords.length}</div>
            <h2>Arrange the letters</h2><p className={styles.hint}>Clue: {current.clue}</p>
            <div className={styles.tiles} aria-label="Letter tiles">
                {tiles.map((letter, position) => <button key={position} type="button" draggable={!checked || !correct} onDragStart={(event) => event.dataTransfer.setData('text/plain', String(position))} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); move(Number(event.dataTransfer.getData('text/plain')), position); }} aria-label={`Letter ${letter}, position ${position + 1}${selected === position ? ', selected' : ''}`} aria-pressed={selected === position} className={`${styles.tile} ${selected === position ? styles.selectedTile : ''}`} onClick={() => swap(position)}>{letter}</button>)}
            </div>
            <p className={styles.hint}>Click two letters to swap them, or drag one onto another.</p>
            {checked && <div className={styles.feedback} role="status">{correct ? 'Correct! Great work.' : 'Not quite. Rearrange the tiles and try again.'}</div>}
            {checked && correct ? <button className={styles.primaryButton} onClick={next}>Next word →</button> : <button className={styles.primaryButton} onClick={() => { setChecked(true); if (correct && !checked) setSolved((previous) => previous + 1); }}>Check answer</button>}
            <button className={styles.secondaryButton} onClick={() => { setTiles(current.shuffled.split('')); setSelected(null); setChecked(false); }}>Reset letters</button>
        </>}
    </div>;
}

function buildDeck() {
    return [...memorySymbols, ...memorySymbols].map((symbol, index) => ({ id: index, symbol })).sort(() => Math.random() - 0.5);
}
function MemoryGame() {
    const [deck, setDeck] = useState(buildDeck);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const locked = flipped.length === 2;
    useEffect(() => {
        if (!locked) return undefined;
        const [a, b] = flipped;
        if (deck[a].symbol === deck[b].symbol) { setMatched((previous) => [...previous, a, b]); setFlipped([]); return undefined; }
        const timer = window.setTimeout(() => setFlipped([]), 850);
        return () => window.clearTimeout(timer);
    }, [flipped, deck, locked]);
    const flip = (position) => {
        if (locked || flipped.includes(position) || matched.includes(position)) return;
        setFlipped((previous) => [...previous, position]);
        if (flipped.length === 1) setMoves((previous) => previous + 1);
    };
    const reset = () => { setDeck(buildDeck()); setFlipped([]); setMatched([]); setMoves(0); };
    return <div className={styles.gamePanel}>
        <div className={styles.meta}>PAIRS {matched.length / 2} / {memorySymbols.length}<span>Moves: {moves}</span></div>
        <h2>Find the matching pairs</h2><p className={styles.hint}>Flip two cards at a time and remember their positions.</p>
        <div className={styles.memoryGrid}>{deck.map((card, position) => { const visible = flipped.includes(position) || matched.includes(position); return <button key={card.id} type="button" className={`${styles.memoryCard} ${visible ? styles.memoryRevealed : ''} ${matched.includes(position) ? styles.memoryMatched : ''}`} onClick={() => flip(position)} aria-label={visible ? `Card ${position + 1}: ${card.symbol}` : `Hidden card ${position + 1}`} aria-pressed={visible} disabled={matched.includes(position)}>{visible ? card.symbol : '?'}</button>; })}</div>
        {matched.length === deck.length && <div className={styles.feedback} role="status"><Check size={18} /> All pairs found in {moves} moves!</div>}
        <button className={styles.secondaryButton} onClick={reset}><RotateCcw size={16} /> New game</button>
    </div>;
}

export default function ArchiveGame({ puzzleId, setScreen }) {
    const type = gameNames[puzzleId] ? puzzleId : 'teaser';
    return <section className={styles.standardPage}>
        <button type="button" className={styles.backButton} onClick={() => setScreen('archive')}><ArrowLeft size={17} /> Back to archive</button>
        <header className={styles.sectionTitle}><span className={styles.eyebrow}>ARCHIVE / INTERACTIVE DEMO</span><h1>{gameNames[type]}</h1><p>Practice puzzle · Frontend demo · No account required</p></header>
        {type === 'scramble' ? <ScrambleGame /> : type === 'memory' ? <MemoryGame /> : <QuestionGame type={type} />}
    </section>;
}
