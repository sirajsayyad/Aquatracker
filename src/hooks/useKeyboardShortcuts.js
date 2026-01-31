import { useEffect, useCallback } from "react";

// Global keyboard shortcuts hook
export const useKeyboardShortcuts = (shortcuts) => {
  const handleKeyDown = useCallback(
    (event) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.isContentEditable
      ) {
        return;
      }

      for (const shortcut of shortcuts) {
        const { key, ctrl, alt, shift, action } = shortcut;

        const ctrlMatch = ctrl ? event.ctrlKey || event.metaKey : true;
        const altMatch = alt ? event.altKey : !event.altKey;
        const shiftMatch = shift ? event.shiftKey : !event.shiftKey;
        const keyMatch = event.key.toLowerCase() === key.toLowerCase();

        if (ctrlMatch && altMatch && shiftMatch && keyMatch) {
          event.preventDefault();
          action();
          break;
        }
      }
    },
    [shortcuts],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};

// Fullscreen hook
export const useFullscreen = () => {
  const enterFullscreen = useCallback(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [enterFullscreen, exitFullscreen]);

  const isFullscreen = !!document.fullscreenElement;

  return { enterFullscreen, exitFullscreen, toggleFullscreen, isFullscreen };
};

export default useKeyboardShortcuts;
