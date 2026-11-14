import { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

/**
 * Accessible Modal Dialog Component
 * ---------------------------------
 * Full-screen overlay dialog featuring:
 * - Keyboard 'Escape' key dismissal listener
 * - Body scroll lock while modal is open
 * - Click-outside backdrop dismissal
 * - Accessible ARIA attributes for assistive technologies
 *
 * @param {boolean} isOpen - Controls visibility of the dialog
 * @param {Function} onClose - Callback invoked when user requests closing
 * @param {string} title - Header text displayed at the top of the modal
 * @param {React.ReactNode} children - Inner content rendered in the modal body
 * @param {string} maxWidth - Maximum card width (defaults to '500px')
 */
export default function Modal({ isOpen, onClose, title, children, maxWidth = '500px' }) {
    // --- 1. Keyboard & Body Scroll Lock Lifecycle Effect ---
    useEffect(() => {
        // Dismiss modal when pressing the physical Escape key
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            // Prevent background page from scrolling while modal is visible
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup: restore page scrolling and remove key listener on unmount
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // --- 2. Short-Circuit: Do not render DOM nodes if closed ---
    if (!isOpen) return null;

    return (
        // --- 3. Backdrop Container: Clicking here closes the modal ---
        <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
            {/* --- 4. Modal Window: stopPropagation prevents backdrop clicks from closing inside --- */}
            <div
                className={styles.modalCard}
                style={{ maxWidth }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header: Title and Close button */}
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>{title}</h3>
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body: Scrollable container for dialog content */}
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>
    );
}