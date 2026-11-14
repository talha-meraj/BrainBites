// Import the css module for this component
import styles from './Button.module.css';

/**
 * Reusable Brutalist Button Component
 * -----------------------------------
 * Primary interactive button,
 * Supports tactile press animations, multiple color variants, and sizes.
 *
 * @param {React.ReactNode} children - Button text or inner elements
 * @param {Function} onClick - Click event callback
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} variant - Color scheme
 * @param {'small' | 'medium' | 'large'} size - Sizing scale
 * @param {'button' | 'submit' | 'reset'} type - HTML button type attribute
 * @param {boolean} disabled - Whether the button is disabled
 * @param {React.ComponentType} icon - Optional Lucide icon component
 * @param {string} className - Optional additional CSS class
 * @param {string} title - Accessible tooltip text
 */
export default function Button({
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    type = 'button',
    disabled = false,
    icon: Icon,
    className = '',
    title
}) {
    return (
        // 1. Native button wrapper with combined variant, size, and custom classes
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
        >
            {/* 2. Optional leading icon rendered at standard 16px size */}
            {Icon && <Icon className={styles.icon} size={16} />}

            {/* 3. Button label text */}
            <span>{children}</span>
        </button>
    );
}