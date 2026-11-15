import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import styles from './Heatword.module.css';

const WORDS = ['BRAIN', 'PLANT', 'CLOUD', 'STONE', 'LIGHT'];
const KEY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
      result[i] = temperature === 'cold' ? 'present' : `present-${temperature}`;
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
  const [hoverLetter, setHoverLetter] = useState(null);
  const [pinnedLetter, setPinnedLetter] = useState(null);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const [scrollMetrics, setScrollMetrics] = useState({ left: 0, width: 1, content: 1 });
  const alphabetScrollRef = useRef(null);
  const hideScrollbarTimer = useRef(null);
  const touchStart = useRef(null);
  const draggingScrollbar = useRef(false);
  const activeLetter = hoverLetter ?? pinnedLetter;
  const revealScrollbar = () => {
    setScrollbarVisible(true);
    window.clearTimeout(hideScrollbarTimer.current);
    if (!draggingScrollbar.current) hideScrollbarTimer.current = window.setTimeout(() => setScrollbarVisible(false), 2600);
  };
  const updateScrollMetrics = () => {
    const node = alphabetScrollRef.current;
    if (node) setScrollMetrics({ left: node.scrollLeft, width: node.clientWidth, content: node.scrollWidth });
  };
  useEffect(() => {
    updateScrollMetrics();
    window.addEventListener('resize', updateScrollMetrics);
    return () => { window.removeEventListener('resize', updateScrollMetrics); window.clearTimeout(hideScrollbarTimer.current); };
  }, []);
  const thumbFraction = Math.min(1, scrollMetrics.width / scrollMetrics.content);
  const thumbOffset = scrollMetrics.content > scrollMetrics.width ? (scrollMetrics.left / (scrollMetrics.content - scrollMetrics.width)) * (1 - thumbFraction) : 0;
  const moveScrollbarTo = (event) => {
    const scroll = alphabetScrollRef.current;
    const track = event.currentTarget;
    if (!scroll || scroll.scrollWidth <= scroll.clientWidth) return;
    const rect = track.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (event.clientX - rect.left - rect.width * thumbFraction / 2) / (rect.width * (1 - thumbFraction))));
    scroll.scrollLeft = fraction * (scroll.scrollWidth - scroll.clientWidth);
    updateScrollMetrics();
  };
  const startScrollbarDrag = (event) => {
    if (scrollMetrics.content <= scrollMetrics.width) return;
    draggingScrollbar.current = true;
    window.clearTimeout(hideScrollbarTimer.current);
    setScrollbarVisible(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    moveScrollbarTo(event);
  };
  const stopScrollbarDrag = (event) => {
    if (!draggingScrollbar.current) return;
    draggingScrollbar.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    revealScrollbar();
  };
  const alphabetColor = (letter) => {
    if (!activeLetter) return '';
    const distance = alphabetDistance(letter, activeLetter);
    return distance === 0 ? styles.alphabetSelected : distance === 1 ? styles.alphabetHot : distance <= 5 ? styles.alphabetWarm : '';
  };
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
  const priority = { cold: 0, present: 1, exact: 2 };
  guesses.forEach(({ word, colors }) => [...word].forEach((letter, index) => {
    const tileColor = colors[index];
    const color = tileColor === 'exact' ? 'exact' : tileColor.startsWith('present') ? 'present' : 'cold';
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
        <div className={styles.alphabetReference} aria-label="Interactive alphabet reference, A through Z">
          <span className={styles.alphabetLabel}>ALPHABET / LETTER NEIGHBORS</span>
          <div className={styles.alphabetArea} onPointerMove={(event) => { if (event.pointerType === 'mouse') revealScrollbar(); }} onPointerLeave={() => setHoverLetter(null)}>
            <div ref={alphabetScrollRef} className={styles.alphabetScroll} tabIndex={0} aria-label="Scroll horizontally to see all alphabet letters" onScroll={() => { updateScrollMetrics(); revealScrollbar(); }} onFocus={revealScrollbar} onTouchStart={revealScrollbar}>
              <div className={styles.alphabetGrid}>
                {[...ALPHABET].map((letter) => <button type="button" className={`${styles.alphabetLetter} ${alphabetColor(letter)}`} key={letter} aria-pressed={pinnedLetter === letter} aria-label={`${letter}: preview neighboring letters`} onPointerEnter={(event) => { if (event.pointerType === 'mouse') { setHoverLetter(letter); revealScrollbar(); } }} onPointerLeave={(event) => { if (event.pointerType === 'mouse') setHoverLetter(null); }} onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchMove={(event) => { if (touchStart.current && (Math.abs(event.touches[0].clientX - touchStart.current.x) > 8 || Math.abs(event.touches[0].clientY - touchStart.current.y) > 8)) touchStart.current.moved = true; }} onClick={(event) => { if (touchStart.current?.moved) { touchStart.current = null; return; } touchStart.current = null; setPinnedLetter((previous) => previous === letter ? null : letter); if (event.detail === 0) revealScrollbar(); }}>{letter}</button>)}
              </div>
            </div>
            <div className={`${styles.alphabetTrack} ${scrollbarVisible ? styles.alphabetTrackVisible : ''}`} role="scrollbar" aria-label="Alphabet horizontal scrollbar" aria-orientation="horizontal" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(scrollMetrics.content > scrollMetrics.width ? scrollMetrics.left / (scrollMetrics.content - scrollMetrics.width) * 100 : 0)} tabIndex={0} onFocus={revealScrollbar} onKeyDown={(event) => { const node = alphabetScrollRef.current; if (!node) return; if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); node.scrollLeft += event.key === 'ArrowRight' ? 40 : -40; revealScrollbar(); } }} onPointerDown={startScrollbarDrag} onPointerMove={(event) => { if (draggingScrollbar.current) moveScrollbarTo(event); }} onPointerUp={stopScrollbarDrag} onPointerCancel={stopScrollbarDrag}>
              <div className={styles.alphabetThumb} style={{ width: `${thumbFraction * 100}%`, left: `${thumbOffset * 100}%` }} />
            </div>
          </div>
          <small className={styles.alphabetHint}>Hover or tap a letter: green = selected · red = ±1 · purple = ±2–5. Tap again to clear.</small>
        </div>
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
      <aside className={styles.rulesPanel}><span className={styles.eyebrow}>HOW TO READ THE HEAT</span><h2>Every letter gives a clue</h2><p>Green means the letter is in the correct position. Red and purple indicate how close your guess is alphabetically to the answer letter at that position. Yellow means the letter appears elsewhere in the word. If a letter is both elsewhere and hot or warm, its tile shows both colors diagonally.</p>
        <div className={styles.legend}>{[
          ['exact', 'A', 'PRESENT', 'Right letter, right position'],
          ['hot', 'B', 'HOT', 'One alphabet step away'],
          ['warm', 'F', 'WARM', 'Two to five alphabet steps away'],
          ['present', 'A', 'ELSEWHERE', 'Letter appears elsewhere in the word'],
          ['cold', 'Z', 'COLD', 'More than five alphabet steps away'],
          ['present-hot', 'A', 'ELSEWHERE + HOT', 'Elsewhere in the word; one alphabet step from this position'],
          ['present-warm', 'A', 'ELSEWHERE + WARM', 'Elsewhere in the word; two to five steps from this position']
        ].map(([color, letter, label, detail]) => <div className={styles.legendItem} key={color}><span className={`${styles.legendTile} ${styles[color]}`}>{letter}</span><div><strong>{label}</strong><small>{detail}</small></div></div>)}</div>
        <p className={styles.tip}>Example: If the answer letter at this position is A, B is hot and F is warm. Yellow alone means the letter is elsewhere but not hot or warm at this position.</p>
        <p className={styles.disclaimer}>Frontend demo: the answer rotates through five example words. Guesses don't require a dictionary lookup.</p>
      </aside>
    </div>
  </section>;
}
