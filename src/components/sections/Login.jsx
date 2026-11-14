import { useState } from 'react';
import Tag from '../common/Tag';
import Field from '../common/Field';
import Button from '../common/Button';
import styles from './Login.module.css';

/**
 * BrainBites Login View
 * --------------------------------------------
 * Split-screen authentication view with demo accounts:
 * - Left side: branding with large headline
 * - Right Card: Credentials form
 *
 * @param {Function} setScreen - Router dispatcher to switch screens
 * @param {Function} setRole - Role dispatcher to update current simulation
 */
export default function Login({ setScreen, setRole }) {
    // Input fields and error banner state
    const [error, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Manual Form Submission Handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError(true);
            return;
        }
        setRole('Player');
        setScreen('dashboard');
    };

    // 1-Click Fast Evaluation Switcher Handler
    const handleDemoLogin = (roleName, targetScreen) => {
        setRole(roleName);
        setScreen(targetScreen);
    };

    return (
        <div className={styles.authLayout}>
            {/* Left Column: Editorial Branding Aside */}
            <div className={styles.authAside}>
                <Tag tone="accent">WELCOME BACK</Tag>
                <h1 className={styles.asideTitle}>Your next puzzle is waiting.</h1>
                <p className={styles.asideDesc}>
                    Sign in to continue saved puzzles, protect your streak, and see how you rank.
                </p>

                {/* Tilted Brutalist Box Stamp */}
                <div className={styles.asideSketch}>
                    BRAIN<br />BITES
                    <span>+ + +</span>
                </div>
            </div>

            {/* Right Column: Authentication Form Card */}
            <form className={styles.authCard} onSubmit={handleSubmit}>
                <span className={styles.eyebrow}>PLAYER LOGIN</span>
                <h2>Sign in to BrainBites</h2>

                {/* Tab Switcher: Sign In vs Register */}
                <div className={styles.authTabs}>
                    <button type="button" className={styles.activeTab} aria-current="page">
                        Sign in
                    </button>
                    <button type="button" onClick={() => setScreen('register')}>
                        Register
                    </button>
                </div>

                <p className={styles.formHint}>
                    Use the demo accounts below or enter your credentials.
                </p>

                {/* Inline Error Notification Banner */}
                {error && (
                    <div className={styles.alertError}>
                        <b>We couldn't sign you in.</b>
                        <span>Check your username and password, then try again.</span>
                    </div>
                )}

                {/* Username or Email Input */}
                <Field
                    label="Username or email"
                    placeholder="e.g. alex.p"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setError(false);
                    }}
                />

                {/* Password Input */}
                <Field
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(false);
                    }}
                />

                {/* Form Utilities: Remember Me & Forgot Password */}
                <div className={styles.formBetween}>
                    <label className={styles.rememberMe}>
                        <input type="checkbox" defaultChecked /> Remember me
                    </label>
                    <button type="button" className={styles.textLink}>
                        Forgot password?
                    </button>
                </div>

                {/* Primary Submit Button */}
                <Button type="submit">Log in</Button>

                {/* 1-Click Fast Evaluation Switcher Row */}
                <div className={styles.demoLogins}>
                    <span>QUICK DEMO LOGIN</span>
                    <div className={styles.demoButtonsRow}>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('Player', 'dashboard')}
                        >
                            Player
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('Creator', 'creator')}
                        >
                            Creator
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDemoLogin('Administrator', 'admin')}
                        >
                            Admin
                        </button>
                    </div>
                </div>

                {/* Link to Registration View */}
                <p className={styles.authSwitch}>
                    New here?{' '}
                    <button type="button" onClick={() => setScreen('register')}>
                        Create an account →
                    </button>
                </p>
            </form>
        </div>
    );
}