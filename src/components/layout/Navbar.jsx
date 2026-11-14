import { useEffect, useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import BrandMark from '../common/BrandMark';
import styles from './Navbar.module.css';

/**
 * Workspace Navigation Tabs Configuration per Role
 */
const WORKSPACE_NAV_LINKS = {
    Guest: [
        { id: 'home', label: 'Daily puzzle' },
        { id: 'puzzles', label: 'Puzzles', sectionId: 'puzzle-library' },
        { id: 'archive', label: 'Archive' },
        { id: 'leaderboard', label: 'Leaderboard' },
        { id: 'help', label: 'Help' }
    ],
    Player: [
        { id: 'home', label: 'Daily puzzle' },
        { id: 'puzzles', label: 'Puzzles', sectionId: 'puzzle-library' },
        { id: 'archive', label: 'Archive' },
        { id: 'leaderboard', label: 'Leaderboard' },
        { id: 'help', label: 'Help' }
    ],
    Creator: [
        { id: 'creator-overview', label: 'Overview' },
        { id: 'creator-puzzles', label: 'My puzzles' },
        { id: 'creator-editor', label: 'Create puzzle' },
        { id: 'creator-feedback', label: 'Feedback' }
    ],
    Administrator: [
        { id: 'admin-overview', label: 'Overview' },
        { id: 'admin-users', label: 'Users' },
        { id: 'admin-puzzles', label: 'Puzzles' },
        { id: 'admin-audit', label: 'Score audit' }
    ]
};

// Available roles to switch to
const AVAILABLE_ROLES = ['Guest', 'Player', 'Creator', 'Administrator'];

/**
 * BrainBites Topbar Navigation Component
 * --------------------------------------
 * @param {string} currentScreen - Active screen route key
 * @param {Function} setScreen - State dispatcher to switch routes
 * @param {Object} user - User session data
 * @param {string} role - Current simulation role ('Guest' | 'Player' | 'Creator' | 'Administrator')
 * @param {Function} setRole - State dispatcher to switch roles
 * @param {string} theme - Active theme ('light' | 'dark')
 * @param {Function} toggleTheme - Callback to toggle dark mode
 * @param {Function} onLogout - Callback to leave demo account
 */
export default function Navbar({
    currentScreen,
    setScreen,
    user,
    role = 'Guest',
    setRole,
    theme,
    toggleTheme,
    onLogout
}) {
    // Mobile drawer open state
    const [menuOpen, setMenuOpen] = useState(false);
    const [homeSection, setHomeSection] = useState('home');
    useEffect(() => {
        if (currentScreen !== 'home') { setHomeSection('home'); return; }
        const updateSection = () => {
            const library = document.getElementById('puzzle-library');
            if (!library) return;
            const threshold = document.querySelector('header')?.getBoundingClientRect().height || 140;
            setHomeSection(library.getBoundingClientRect().top <= threshold + 32 ? 'puzzles' : 'home');
        };
        updateSection();
        window.addEventListener('scroll', updateSection, { passive: true });
        window.addEventListener('resize', updateSection);
        return () => { window.removeEventListener('scroll', updateSection); window.removeEventListener('resize', updateSection); };
    }, [currentScreen]);

    // Retrieve active role links
    const workspaceLinks = WORKSPACE_NAV_LINKS[role] || WORKSPACE_NAV_LINKS.Guest;

    // Handle navigation click with smooth section scrolling on Home
    const handleNavClick = (link) => {
        setMenuOpen(false);

        if (link.sectionId) {
            if (currentScreen !== 'home') {
                setScreen('home');
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        document.getElementById(link.sectionId)?.scrollIntoView({ behavior: 'smooth' });
                    });
                });
            } else {
                document.getElementById(link.sectionId)?.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        if (link.id === 'home' && currentScreen === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        setScreen(link.id);
    };

    // Handle switching role in the evaluation picker
    const handleRoleSelect = (newRole) => {
        setRole(newRole);
        if (newRole === 'Administrator') {
            setScreen('admin-overview');
        } else if (newRole === 'Creator') {
            setScreen('creator-overview');
        } else {
            setScreen('home');
        }
        setMenuOpen(false);
    };

    // Avatar initial badge for user chip
    const roleBadge = role === 'Player' ? 'AP' : role === 'Creator' ? 'CP' : 'AD';

    return (
        <header className={styles.siteHeader}>
            {/* Tier 1: Brand Row */}
            <div className={styles.brandRow}>
                {/* Brand Logo & Title */}
                <button
                    type="button"
                    onClick={() => setScreen('home')}
                    className={styles.logo}
                    title="Return to BrainBites Home"
                >
                    <BrandMark size="large" />
                    <b>BrainBites</b>
                </button>

                {/* Mobile Navigation Drawer with Role Switcher */}
                <nav
                    id="main-navigation"
                    aria-label="Main navigation"
                    className={`${styles.mainNav} ${menuOpen ? styles.navOpen : ''}`}
                >
                    {/* Quick role Switcher for Evaluation */}
                    <div className={styles.navRoleSwitch}>
                        <span className={styles.roleSwitchLabel}>VIEW AS</span>
                        <div className={styles.previewRoleOptions} role="group" aria-label="Preview as role">
                            {AVAILABLE_ROLES.map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    className={role === r ? styles.roleBtnActive : ''}
                                    aria-pressed={role === r}
                                    onClick={() => handleRoleSelect(r)}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                        <small className={styles.previewRoleHint}>Demo only — choose a user role.</small>
                    </div>

                    {/* Navigation Links */}
                    {workspaceLinks.map((link) => (
                        <button
                            key={link.label}
                            type="button"
                            className={`${styles.mobileNavLink} ${(currentScreen === 'home' && (link.id === 'home' || link.id === 'puzzles') ? homeSection === link.id : currentScreen === link.id) ? styles.mobileNavActive : ''}`}
                            onClick={() => handleNavClick(link)}
                        >
                            {link.label}
                        </button>
                    ))}

                    {/* Mobile Account Actions */}
                    <div className={styles.mobileAccountActions}>
                        {role === 'Guest' ? (
                            <>
                                <button type="button" onClick={() => { setScreen('login'); setMenuOpen(false); }}>
                                    Log in
                                </button>
                                <button type="button" onClick={() => { setScreen('register'); setMenuOpen(false); }}>
                                    Register
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    if (onLogout) onLogout();
                                    setRole('Guest');
                                    setScreen('home');
                                    setMenuOpen(false);
                                }}
                            >
                                Leave demo account
                            </button>
                        )}
                    </div>
                </nav>

                {/* Top Actions Controls */}
                <div className={styles.topActions}>
                    {/* Dark Mode Pill Slider Switch */}
                    <button
                        type="button"
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        aria-label="Toggle dark mode"
                        aria-pressed={theme === 'dark'}
                    >
                        <span>Dark mode</span>
                        <i className={theme === 'dark' ? styles.toggleOn : ''} />
                    </button>

                    {/* User Status / Auth CTA Button matching Figma */}
                    {role === 'Guest' ? (
                        <button
                            type="button"
                            className={styles.authButton}
                            onClick={() => setScreen('login')}
                        >
                            Login / Sign up
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={styles.userChip}
                            onClick={() => {
                                if (role === 'Administrator') setScreen('admin-overview');
                                else if (role === 'Creator') setScreen('creator-overview');
                                else setScreen('player-dashboard');
                            }}
                        >
                            <span className={styles.chipInitial}>{roleBadge}</span>
                            {role}
                        </button>
                    )}

                    {/* Mobile Hamburger Menu Toggle Button */}
                    <button
                        type="button"
                        className={styles.menuButton}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-controls="main-navigation"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={19} /> : <Menu size={19} />}
                    </button>
                </div>
            </div>

            {/* Tier 2: Workspace Navigation Black Bar */}
            <div className={styles.workspaceNav}>
                <span className={styles.prototypeLabel}>
                    {role === 'Guest' ? 'Play' : role === 'Administrator' ? 'Admin' : role}
                </span>
                <nav className={styles.prototypeLinks} aria-label="Primary navigation">
                    {workspaceLinks.map((link) => {
                        const isActive = currentScreen === 'home' && (link.id === 'home' || link.id === 'puzzles') ? homeSection === link.id : currentScreen === link.id;
                        return (
                            <button
                                key={link.label}
                                type="button"
                                className={`${styles.workspaceLinkBtn} ${isActive ? styles.active : ''}`}
                                aria-current={isActive ? 'location' : undefined}
                                onClick={() => handleNavClick(link)}
                            >
                                {link.label}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}