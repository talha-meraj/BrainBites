import styles from './Field.module.css';

/**
 * Accessible Form Field Component
 * --------------------------------
 * A unified wrapper that handles labels, required indicators, inputs, textareas,
 * select dropdowns, validation error banners, and supplementary help hints.
 *
 * @param {string} label - Human-readable text displayed above the input
 * @param {string} id - Explicit DOM ID (auto-generated from label if omitted)
 * @param {string} type - Input type: 'text', 'password', 'email', etc.
 * @param {string} placeholder - Hint text shown when input is empty
 * @param {string} value - Current value controlled by React state
 * @param {function} onChange - Change handler callback passed from parent
 * @param {string} error - Validation error message (renders red border & text)
 * @param {string} helpText - Informational hint displayed beneath field
 * @param {boolean} required - Displays a bold red asterisk if true
 * @param {number} rows - Number of text rows when rendered as a textarea
 * @param {string} as - Element type: 'input' (default), 'textarea', or 'select'
 * @param {ReactNode} children - Option elements when used as a select dropdown
 * @param {string} name - Form input name attribute for form serialization
 */
export default function Field({
    label,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    helpText,
    required = false,
    rows = 4,
    as = 'input',
    children,
    name
}) {
    // Generate an accessible ID if none provided, e.g. "Full Name" -> "full-name"
    const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        // Outer flex wrapper keeping vertical spacing consistent (16px bottom margin)
        <div className={styles.fieldWrapper}>
            {/* 1. Label Tag: Linked to input via htmlFor attribute for accessibility */}
            {label && (
                <label htmlFor={fieldId} className={styles.label}>
                    {label} {required && <span className={styles.required}>*</span>}
                </label>
            )}

            {/* 2. Multi-line Text Area Element */}
            {as === 'textarea' ? (
                <textarea
                    id={fieldId}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    // Dynamically toggle .hasError class to highlight border in red
                    className={`${styles.input} ${styles.textarea} ${error ? styles.hasError : ''}`}
                />
            ) : as === 'select' ? (
                /* 3. Dropdown Select Element */
                <select
                    id={fieldId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${styles.input} ${styles.select} ${error ? styles.hasError : ''}`}
                >
                    {children}
                </select>
            ) : (
                /* 4. Single-line Input Element (text, password, email) */
                <input
                    id={fieldId}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`${styles.input} ${error ? styles.hasError : ''}`}
                />
            )}

            {/* 5. Error Message Display: Rendered conditionally when validation fails */}
            {error && <span className={styles.errorMessage}>{error}</span>}

            {/* 6. Help Hint: Shown when no error is present */}
            {helpText && !error && <span className={styles.helpText}>{helpText}</span>}
        </div>
    );
}