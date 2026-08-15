import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Shared behaviour every dialog on the page needs: close on Escape, lock the
 * background scroll, move focus inside on open, keep Tab within the dialog, and
 * hand focus back to whatever opened it on close.
 *
 * Returns a ref to attach to the dialog container element.
 */
export function useModalChrome(isOpen: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep the latest onClose without re-running the effect on every parent
  // render (App passes an inline arrow function).
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Compensate for the disappearing scrollbar so the layout doesn't jump.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusable: HTMLElement[] = [];
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE).forEach((el) => {
        // offsetParent is null for elements hidden via display:none — skip those
        // so Tab doesn't land on a control from the inactive form step.
        if (el.offsetParent !== null) focusable.push(el);
      });

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Focus the dialog itself so screen readers announce it, without stealing
    // focus into a random control.
    const focusTimer = window.setTimeout(
      () => containerRef.current?.focus({ preventScroll: true }),
      0
    );

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      // overflow:hidden preserves the scroll offset, so there is nothing to
      // restore here — only the styles and the focus.
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      // preventScroll stops the browser jumping to the trigger element, which
      // may now be far off screen.
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  return containerRef;
}
