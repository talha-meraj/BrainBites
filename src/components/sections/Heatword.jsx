import { useEffect, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import styles from './Heatword.module.css';

const WORDS = ['BRAIN', 'PLANT', 'CLOUD', 'STONE', 'LIGHT'];
const KEY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const MAX_GUESSES = 3;
const alphabetDistance = (a, b) => Math.abs(a.charCodeAt(0) - b.charCodeAt(0));

// Wordle duplicate-letter accounting is applied before the extra heat hints.
export function gradeGuess(guess, answer) {
  const result = Array(5).fill(null);
  const remaining = {};
  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) result[i] = 'exact';
    else remaining[answer[i]] = (remaining[answer[i]] || 0) + 1;
  }
  for (let i = 0; i < 5; i++) {
    if (result[i]) continue;
    if (remaining[guess[i]] > 0) {
      const distance = alphabetDistance(guess[i], answer[i]);
      const temperature = distance === 1 ? 'hot' : distance <= 5 ? 'warm' : 'cold';
      result[i] = `present-${temperature}`;
      remaining[guess[i]]--;
    } else {
      const distance = alphabetDistance(guess[i], answer[i]);
      result[i] = distance === 1 ? 'hot' : distance <= 5 ? 'warm' : 'cold';
    }
  }
  return result;
}

export default function Heatword({ setScreen }) {
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState('');
  const answer = WORDS[round % WORDS.length];
  const won = guesses.some((entry) => entry.word === answer);
  const finished = won || guesses.length >= MAX_GUESSES;

  const submit = () => {
    if (finished) return;
    if (guess.length !== 5) { setMessage('Enter five letters to submit your guess.'); return; }
    setGuesses((previous) => [...previous, { word: guess, colors: gradeGuess(guess, answer) }]);
    setGuess('');
    setMessage('');
  };
  const input = (letter) => { if (!finished) { setGuess((previous) => (previous + letter).slice(0, 5)); setMessage(''); } };
  const erase = () => { if (!finished) setGuess((previous) => previous.slice(0, -1)); };
  const restart = (next = false) => {
    if (next) setRound((previous) => previous + 1);
    setGuess(''); setGuesses([]); setMessage('');
  };
  useEffect(() => {
    const handler = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || ['INPUT', 'TEXTAREA'].includes(event.target?.tagName)) return;
      if (/^[a-z]$/i.test(event.key)) { event.preventDefault(); input(event.key.toUpperCase()); }
      else if (event.key === 'Backspace') { event.preventDefault(); erase(); }
      else if (event.key === 'Enter') { event.preventDefault(); submit(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });
  const keyboardColors = {};
  const priority = { cold: 0, warm: 1, hot: 2, 'present-cold': 3, 'present-warm': 4, 'present-hot': 5, exact: 6 };
  guesses.forEach(({ word, colors }) => [...word].forEach((letter, index) => {
    const color = colors[index];
    if (!keyboardColors[letter] || priority[color] > priority[keyboardColors[letter]]) keyboardColors[letter] = color;
  }));
  const rows = [...guesses.map((entry) => [...entry.word].map((letter, i) => ({ letter, color: entry.colors[i] })))];
  if (!finished && rows.length < MAX_GUESSES) rows.push(Array.from({ length: 5 }, (_, i) => ({ letter: guess[i] || '', color: 'empty' })));
  while (rows.length < MAX_GUESSES) rows.push(Array.from({ length: 5 }, () => ({ letter: '', color: 'empty' })));

  return <section className={styles.standardPage}>
    <header className={styles.sectionTitle}>
      <div><span className={styles.eyebrow}>DAILY CHALLENGE / WORD GAME</span><h1>Heatword</h1><p>Three guesses. Five letters. Follow the heat.</p></div>
      <button className={styles.textButton} onClick={() => setScreen('home')}><ArrowLeft size={16} /> Back to home</button>
    </header>
    <div className={styles.gameLayout}>
      <section className={styles.boardPanel} aria-label="Heatword game">
        <div className={styles.board} role="grid" aria-label="Three five-letter guesses">
          {rows.map((row, rowIndex) => <div className={styles.boardRow} role="row" key={rowIndex}>
            {row.map(({ letter, color }, colIndex) => <div role="gridcell" key={colIndex} aria-label={`Row ${rowIndex + 1}, letter ${colIndex + 1}: ${letter || 'empty'}${color !== 'empty' ? `, ${color}` : ''}`} className={`${styles.tile} ${styles[color]}`}>{letter}</div>)}
          </div>)}
        </div>
        <div className={styles.status} role="status">{finished ? won ? `Solved in ${guesses.length} ${guesses.length === 1 ? 'guess' : 'guesses'}!` : `Out of guesses. The word was ${answer}.` : message || `Guess ${guesses.length + 1} of ${MAX_GUESSES}`}</div>
        <div className={styles.keyboard} aria-label="On-screen keyboard">
          {KEY_ROWS.map((row) => <div className={styles.keyboardRow} key={row}>
            {[...row].map((letter) => <button key={letter} disabled={finished} type="button" onClick={() => input(letter)} className={`${styles.key} ${keyboardColors[letter] ? styles[keyboardColors[letter]] : ''}`}>{letter}</button>)}
          </div>)}
          <div className={styles.keyboardRow}><button className={styles.wideKey} onClick={submit} disabled={finished}>ENTER</button><button className={styles.wideKey} onClick={erase} disabled={finished}>DELETE</button></div>
        </div>
        <div className={styles.actions}>{finished ? <button className={styles.primaryButton} onClick={() => restart(true)}>Next puzzle →</button> : <button className={styles.primaryButton} onClick={submit}>Submit guess →</button>}<button className={styles.textButton} onClick={() => restart(false)}><RotateCcw size={15}/> Restart</button></div>
      </section>
      <aside className={styles.rulesPanel}><span className={styles.eyebrow}>HOW TO READ THE HEAT</span><h2>Every letter gives a clue</h2><p>Green means an exact match. A diagonal yellow tile means the letter is elsewhere in the word; its other half shows the alphabetical temperature relative to the answer letter at this position. Solid red, purple, or gray tiles show temperature when the letter isn't matched elsewhere.</p>
        <div className={styles.legend}>{[
          ['exact', 'A', 'EXACT', 'Right letter, right position'],
          ['present-hot', 'A', 'PRESENT + HOT', 'Elsewhere in the word; one alphabet step from this position'],
          ['present-warm', 'A', 'PRESENT + WARM', 'Elsewhere in the word; two to five steps from this position'],
          ['present-cold', 'A', 'PRESENT + COLD', 'Elsewhere in the word; more than five steps from this position'],
          ['hot', 'B', 'HOT', 'One alphabet step away'],
          ['warm', 'F', 'WARM', 'Two to five alphabet steps away'],
          ['cold', 'Z', 'COLD', 'More than five steps away']
        ].map(([color, letter, label, detail]) => <div className={styles.legendItem} key={color}><span className={`${styles.legendTile} ${styles[color]}`}>{letter}</span><div><strong>{label}</strong><small>{detail}</small></div></div>)}</div>
        <p className={styles.tip}>Example: If the answer letter at this position is A, B is hot and F is warm. The diagonal's yellow half independently indicates that the guessed letter also appears elsewhere in the word.</p>
        <p className={styles.disclaimer}>Frontend demo: the answer rotates through five example words. Guesses don't require a dictionary lookup.</p>
      </aside>
    </div>
  </section>;
}
