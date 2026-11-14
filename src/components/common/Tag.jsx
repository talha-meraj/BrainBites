import styles from './Tag.module.css';

/**
 * Categorical Tag / Status Badge Component
 * ----------------------------------------
 * Compact chip used across puzzle cards, tables, and headers
 * to indicate categories, difficulty levels, and system statuses.
 *
 * @param {React.ReactNode} children - Badge content (text, icons, counts)
 * @param {'plain' | 'accent' | 'medium' | 'success' | 'danger' | 'blue'} tone - Color tone
 * @param {string} className - Optional additional CSS class
 */
export default function Tag({ children, tone = 'plain', className = '' }) {
    return (
        // Base monospace tag style combined with the selected semantic tone class
        <span className={`${styles.tag} ${styles[tone]} ${className}`}>
            {children}
        </span>
    );
}