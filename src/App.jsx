import React, { useState } from 'react';
import Navbar from './components/layout/Navbar.jsx';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState('home');
    const [role, setRole] = useState('Guest');
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`app ${theme === 'dark' ? 'dark' : ''} min-h-screen flex flex-col justify-between bg-[var(--paper)] text-[var(--ink)]`}>
            {/* Navbar with matching prop names */}
            <Navbar
                currentScreen={currentScreen}
                setScreen={setCurrentScreen}
                role={role}
                setRole={setRole}
                theme={theme}
                toggleTheme={toggleTheme}
            />

            {/* Main Display to verify active route & role */}
            <main className="max-w-4xl mx-auto px-6 py-12 w-full flex-1 space-y-6">
                <div className="bg-[var(--surface)] border-2 border-[var(--ink)] p-8 shadow-[6px_6px_0_var(--ink)] space-y-4">
                    <span className="eyebrow">Active Navigation State</span>
                    <h1 className="text-3xl font-black font-['Archivo_Black',sans-serif] m-0">
                        Route: {currentScreen.toUpperCase()}
                    </h1>
                    <p className="text-base text-[var(--muted)]">
                        Viewing site as role: <strong className="text-[var(--ink)] font-mono">{role}</strong>
                    </p>
                    <p className="text-xs font-mono text-[var(--muted)]">
                        Click the hamburger menu button in the top right to open the "VIEW AS" role switcher!
                    </p>
                </div>
            </main>

            <footer className="border-t-2 border-[var(--ink)] bg-[var(--surface)] p-4 text-center text-xs font-mono text-[var(--muted)]">
                BrainBites • SWE-363
            </footer>
        </div>
    );
}