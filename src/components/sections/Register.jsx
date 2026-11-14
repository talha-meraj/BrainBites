import { useState } from 'react';
import Field from '../common/Field';
import Button from '../common/Button';
import styles from './Register.module.css';

/**
 * BrainBites Player Registration View
 * --------------------------------------------
 * Player registration view with input validation:
 * - Centered card container
 * - Tab switcher between Sign in and Register
 * - 2-column responsive input fields
 * - Interactive validation
 *
 * @param {Function} setScreen - Router dispatcher to navigate to other views
 * @param {Function} setRole - Role dispatcher to update simulated persona
 */
export default function Register({ setScreen, setRole }) {
    // Input field state hooks
    const [errors, setErrors] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Form Submission & Validation Handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !email || !password || password !== confirmPassword) {
            setErrors(true);
            return;
        }
        setRole('Player');
        setScreen('dashboard');
    };

    return (
        <div className={styles.centerPage}>
            {/* Centered Registration Card Container */}
            <form className={styles.registerCard} onSubmit={handleSubmit}>
                <span className={styles.eyebrow}>CREATE YOUR PLAYER PROFILE</span>
                <h1>Join BrainBites</h1>

                {/* Tab Switcher: Sign in vs Register */}
                <div className={styles.authTabs}>
                    <button type="button" onClick={() => setScreen('login')}>
                        Sign in
                    </button>
                    <button type="button" className={styles.activeTab} aria-current="page">
                        Register
                    </button>
                </div>

                <p className={styles.formHint}>
                    Save progress, build a streak, and climb the leaderboard.
                </p>

                {/* Validation Alert Notification Banner */}
                {errors && (
                    <div className={styles.alertError}>
                        <b>3 fields need attention.</b>
                        <span>Review the messages below before registering.</span>
                    </div>
                )}

                {/* Responsive 2-Column Inputs: Username & Email */}
                <div className={styles.twoCol}>
                    <Field
                        label="Username"
                        placeholder="Choose a public username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors(false);
                        }}
                        error={errors && !username ? 'Username must be at least 3 characters.' : undefined}
                    />
                    <Field
                        label="Email address"
                        type="email"
                        placeholder="you@university.edu"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors(false);
                        }}
                        error={errors && !email ? 'Enter a valid email address.' : undefined}
                    />
                </div>

                {/* Responsive 2-Column Inputs: Password & Confirm Password */}
                <div className={styles.twoCol}>
                    <Field
                        label="Password"
                        type="password"
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors(false);
                        }}
                        error={errors && !password ? 'Password is required.' : undefined}
                    />
                    <Field
                        label="Confirm password"
                        type="password"
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setErrors(false);
                        }}
                        error={errors && password !== confirmPassword ? 'Passwords do not match.' : undefined}
                    />
                </div>

                {/* Puzzle Reminder Notification Checkbox */}
                <div className={styles.checkRow}>
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" defaultChecked /> Send me daily puzzle reminders
                    </label>
                </div>

                {/* Action Buttons Row */}
                <div className={styles.buttonRow}>
                    <Button type="submit">Complete registration</Button>
                    <Button variant="secondary" onClick={() => setScreen('login')}>
                        Already have an account
                    </Button>
                </div>
            </form>
        </div>
    );
}