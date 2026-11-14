import styles from './BrandMark.module.css';

/**
 * BrandMark Component
 * -------------------
 * Renders the geometric brainbites logo
 *
 * @param {string} size - Optional size preset: 'small' (28px), 'medium' (34px), 'large' (44px)
 */
export default function BrandMark({ size = 'medium' }) {
    return (
        <span
            className={`${styles.brandMark} ${styles[size] || ''}`}
            aria-hidden="true"
        >
            <i />
            <i />
            <i />
            <i />
        </span>
    );
}