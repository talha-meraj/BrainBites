import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/sections/Home';
import Login from './components/sections/Login';
import Register from './components/sections/Register';
import Help from './components/sections/Help';
import Archive from './components/sections/Archive';
import Leaderboard from './components/sections/Leaderboard';
import ArchiveGame from './components/sections/ArchiveGame';
import Heatword from './components/sections/Heatword';
import WorkspaceDemo from './components/sections/WorkspaceDemo';

/**
 * BrainBites Root Application Component
 * -------------------------------------
 */
export default function App() {
    // Theme state persisted in localStorage
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('bb_theme') || 'light';
    });

    // Current active screen route
    const [screen, setScreen] = useState('home');
    const [selectedPuzzle, setSelectedPuzzle] = useState(null);

    const playArchivedPuzzle = (puzzleId) => {
        setSelectedPuzzle(puzzleId);
        setScreen('archive-game');
    };

    // Current simulation persona
    const [role, setRole] = useState('Guest');

    // Synchronize HTML root data-theme attribute whenever theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('bb_theme', theme);
    }, [theme]);

    // Toggle between light and dark modes
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // Role switching handler
    const handleRoleChange = (newRole) => {
        setRole(newRole);
    };

    return (
        <div className={`app ${theme === 'dark' ? 'dark' : ''}`}>
            {/* Skip to Content Link for Keyboard and Screen-Reader Accessibility */}
            <a
                className="skip-link"
                href="#main-content"
                style={{
                    position: 'fixed',
                    top: '-80px',
                    left: '16px'
                }}
            >
                Skip to content
            </a>

            {/* Two-Tier Sticky Navigation Header */}
            <Navbar
                currentScreen={screen}
                setScreen={setScreen}
                role={role}
                setRole={handleRoleChange}
                theme={theme}
                toggleTheme={toggleTheme}
                onLogout={() => {
                    setRole('Guest');
                    setScreen('home');
                }}
            />

            {/* Main Content View Switcher */}
            <main id="main-content" tabIndex={-1}>
                {screen === 'home' && <Home setScreen={setScreen} />}
                {screen === 'login' && <Login setScreen={setScreen} setRole={handleRoleChange} />}
                {screen === 'register' && <Register setScreen={setScreen} setRole={handleRoleChange} />}
                {screen === 'help' && <Help setScreen={setScreen} />}
                {screen === 'archive' && <Archive onPlay={playArchivedPuzzle} />}
                {screen === 'archive-game' && <ArchiveGame key={selectedPuzzle} puzzleId={selectedPuzzle} setScreen={setScreen} />}
                {screen === 'leaderboard' && <Leaderboard setScreen={setScreen} />}
                {screen === 'heatword' && <Heatword setScreen={setScreen} />}
                {(['creator-overview','creator-puzzles','creator-editor','creator-feedback','admin-overview','admin-users','admin-puzzles','admin-audit','player-dashboard'].includes(screen)) && <WorkspaceDemo key={role} screen={screen} setScreen={setScreen} />}
            </main>

            {/* Academic Footer */}
            <Footer setScreen={setScreen} />
        </div>
    );
}