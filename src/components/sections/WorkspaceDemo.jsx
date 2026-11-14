import { useState } from 'react';
import styles from './WorkspaceDemo.module.css';

const starterPuzzles = [
  { id: 1, title: 'Letter Ladder', status: 'Published', plays: 84 },
  { id: 2, title: 'Weekend Logic', status: 'Draft', plays: 0 },
  { id: 3, title: 'Heatword Practice', status: 'Published', plays: 126 },
];
const starterUsers = [
  { id: 1, name: 'Ada', role: 'Player', active: true },
  { id: 2, name: 'Lin', role: 'Creator', active: true },
  { id: 3, name: 'Sam', role: 'Player', active: false },
];
const LABELS = {
  'creator-overview': ['CREATOR SPACE', 'Creator overview'],
  'creator-puzzles': ['CONTENT LIBRARY', 'My puzzles'],
  'creator-editor': ['PUZZLE STUDIO', 'Create puzzle'],
  'creator-feedback': ['PLAYER INSIGHTS', 'Feedback'],
  'admin-overview': ['ADMINISTRATION', 'Overview'],
  'admin-users': ['ACCOUNT MANAGEMENT', 'Users'],
  'admin-puzzles': ['CONTENT MODERATION', 'Puzzles'],
  'admin-audit': ['SCORING', 'Score audit'],
  'player-dashboard': ['PLAYER SPACE', 'My progress'],
};
export default function WorkspaceDemo({ screen, setScreen }) {
  const [puzzles, setPuzzles] = useState(starterPuzzles);
  const [users, setUsers] = useState(starterUsers);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notice, setNotice] = useState('');
  const [filter, setFilter] = useState('All');
  const [feedback, setFeedback] = useState([{ id: 1, text: 'More word games, please!', done: false }, { id: 2, text: 'The hints were helpful.', done: false }]);
  const [audit, setAudit] = useState([{ id: 1, name: 'Ada', score: 920, flagged: false }, { id: 2, name: 'Lin', score: 810, flagged: true }, { id: 3, name: 'Sam', score: 650, flagged: false }]);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All');
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState(false);
  const [eyebrow, heading] = LABELS[screen] || LABELS['creator-overview'];
  const isCreator = screen.startsWith('creator');
  const isAdmin = screen.startsWith('admin');
  const addPuzzle = () => {
    if (!title.trim()) { setNotice('Give your puzzle a title first.'); return; }
    setPuzzles((previous) => [...previous, { id: Date.now(), title: title.trim(), status: 'Draft', plays: 0 }]);
    setNotice(`Saved “${title.trim()}” as a local draft.`); setSaved(true); setTitle(''); setDescription('');
  };
  const visiblePuzzles = puzzles.filter((p) => (filter === 'All' || p.status === filter) && p.title.toLowerCase().includes(query.toLowerCase()));
  return <section className={styles.standardPage}>
    <header className={styles.sectionTitle}><div><span className={styles.eyebrow}>{eyebrow}</span><h1>{heading}</h1><p>Interactive demo workspace. Changes stay in this page until you leave or reload.</p></div></header>
    {(screen.endsWith('overview') || screen === 'player-dashboard') && <><div className={styles.stats}>{[
      ['Puzzles', puzzles.length], ['Published', puzzles.filter(p => p.status === 'Published').length], ['Players', users.length]
    ].map(([label, value]) => <div className={styles.panel} key={label}><span className={styles.eyebrow}>{label}</span><strong className={styles.bigNumber}>{value}</strong></div>)}</div><div className={styles.panel}><h2>Quick actions</h2><div className={styles.actions}>{(isAdmin ? [['Manage users','admin-users'], ['Review puzzles','admin-puzzles'], ['Audit scores','admin-audit']] : isCreator ? [['My puzzles','creator-puzzles'], ['Create a puzzle','creator-editor'], ['Read feedback','creator-feedback']] : [['Play Heatword','heatword'], ['View leaderboard','leaderboard']]).map(([label, target]) => <button key={target} onClick={() => setScreen(target)}>{label} →</button>)}</div></div></>}
    {(screen === 'creator-puzzles' || screen === 'admin-puzzles') && <div className={styles.panel}><div className={styles.toolbar}><input aria-label="Search puzzles" placeholder="Search puzzles" value={query} onChange={e => setQuery(e.target.value)}/><select aria-label="Filter status" value={filter} onChange={e => setFilter(e.target.value)}>{['All','Published','Draft'].map(x => <option key={x}>{x}</option>)}</select>{isCreator && <button onClick={() => setScreen('creator-editor')}>New puzzle +</button>}</div><div className={styles.tableScroll}><table><thead><tr><th>Puzzle</th><th>Status</th><th>Plays</th><th>Action</th></tr></thead><tbody>{visiblePuzzles.map(p => <tr key={p.id}><td>{p.title}</td><td>{p.status}</td><td>{p.plays}</td><td><button onClick={() => setPuzzles(prev => prev.map(item => item.id === p.id ? {...item, status: item.status === 'Draft' ? 'Published' : 'Draft'} : item))}>{p.status === 'Draft' ? 'Publish' : 'Unpublish'}</button></td></tr>)}</tbody></table></div>{!visiblePuzzles.length && <p>No puzzles match your search.</p>}</div>}
    {screen === 'creator-editor' && <div className={styles.panel}><h2>New puzzle draft</h2><label>Title<input value={title} onChange={e => {setTitle(e.target.value);setSaved(false);}} placeholder="Enter puzzle title"/></label><label>Instructions<textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Write the rules or prompt"/></label><div className={styles.actions}><button onClick={addPuzzle}>Save draft</button><button onClick={() => setPreview(!preview)}>{preview ? 'Hide preview' : 'Preview'}</button><button onClick={() => setScreen('creator-puzzles')}>View puzzles</button></div>{preview && <div className={styles.preview}><strong>{title || 'Untitled puzzle'}</strong><p>{description || 'Instructions will appear here.'}</p></div>}{notice && <p role="status">{notice}</p>}{saved && <p>Draft saved locally for this session.</p>}</div>}
    {screen === 'creator-feedback' && <div className={styles.panel}><h2>Recent feedback</h2>{feedback.map(item => <div className={styles.listRow} key={item.id}><span className={item.done ? styles.muted : ''}>{item.text}</span><button onClick={() => setFeedback(prev => prev.map(f => f.id === item.id ? {...f, done: !f.done} : f))}>{item.done ? 'Reopen' : 'Mark reviewed'}</button></div>)}</div>}
    {screen === 'admin-users' && <div className={styles.panel}><div className={styles.toolbar}><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search users" aria-label="Search users"/><select value={tab} onChange={e => setTab(e.target.value)} aria-label="Filter users">{['All','Active','Suspended'].map(x => <option key={x}>{x}</option>)}</select></div>{users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) && (tab === 'All' || (tab === 'Active' ? u.active : !u.active))).map(u => <div className={styles.listRow} key={u.id}><span><b>{u.name}</b> · {u.role} · {u.active ? 'Active' : 'Suspended'}</span><button onClick={() => setUsers(prev => prev.map(x => x.id === u.id ? {...x, active: !x.active} : x))}>{u.active ? 'Suspend' : 'Restore'}</button></div>)}</div>}
    {screen === 'admin-audit' && <div className={styles.panel}><h2>Recent scores</h2>{audit.map(a => <div className={styles.listRow} key={a.id}><span><b>{a.name}</b> · {a.score} points {a.flagged && '· Flagged'}</span><button onClick={() => setAudit(prev => prev.map(x => x.id === a.id ? {...x, flagged: !x.flagged} : x))}>{a.flagged ? 'Clear flag' : 'Flag score'}</button></div>)}</div>}
  </section>;
}
