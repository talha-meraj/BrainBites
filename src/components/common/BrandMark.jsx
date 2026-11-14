// Import the scoped CSS module stylesheet for BrandMark
import styles from './BrandMark.module.css';

/**
 * BrandMark Component
 * -------------------
 * Renders the geometric logo mark for BrainBites.
 * @param {string} size - Controls icon dimensions: 'small' (22px), 'medium' (32px), 'large' (44px)
 */
export default function BrandMark({ size = 'medium' }) {
    return (
        // aria-hidden="true" hides this purely decorative icon from screen readers
        <span className={`${styles.brandMark} ${styles[size]}`} aria-hidden="true">
            {/* Quadrant 1 (Top-Left): Yellow accent square */}
            <i className={styles.q1} />

            {/* Quadrant 2 (Top-Right): Paper background square */}
            <i className={styles.q2} />

            {/* Quadrant 3 (Bottom-Left): Paper background square */}
            <i className={styles.q3} />

            {/* Quadrant 4 (Bottom-Right): Deep green square */}
            <i className={styles.q4} />
        </span>
    );
}