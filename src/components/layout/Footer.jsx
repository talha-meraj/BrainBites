import BrandMark from '../common/BrandMark';
import styles from './Footer.module.css';

/**
 * BrainBites Footer with Help Launcher
 * ----------------------------------------------------
 * Academic and diagnostic application footer:
 * - Mini logo with 28px BrandMark and bold title
 * - Project tagline
 * - Direct button trigger to edge cases view (testing)
 * - Fixed floating help bubble button '?'
 *
 * @param {Function} setScreen - State dispatcher to switch between routes
 */
export default function Footer({ setScreen }) {
    return (
        <>
            {/* Primary Footer Container */}
            <footer className={styles.footer}>
                {/* Brand Mini Logo & Title */}
                <button
                    type="button"
                    onClick={() => setScreen('home')}
                    className={styles.miniLogo}
                    title="Return to BrainBites Home"
                >
                    <BrandMark size="small" />
                    <b>BrainBites</b>
                </button>

                {/* Academic Project Tagline */}
                <p className={styles.tagline}>
                    A little challenge. A sharper mind.
                    <br />
                    <small>Interactive prototype · Explore every role above.</small>
                </p>

            </footer>

            {/* Fixed Floating Help Launcher Button */}
            <button
                type="button"
                className={styles.floatingHelp}
                aria-label="Open help and rules"
                onClick={() => setScreen('help')}
                title="Help & Rules"
            >
                ?
            </button>
        </>
    );
}