import { useCallback, useEffect, useRef } from "react";
import type { User } from "~/types/user";

type ModalProps = {
  heading: string;
  children: React.ReactNode;
  handleClick: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function Modal({ heading, children, handleClick }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClick(null);
      }
    },
    [handleClick],
  );
  useEffect(() => {
    closeButtonRef.current?.focus();

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [handleClick]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      className="fixed inset-0 bg-slate-800/60 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <h2 className="text-xl font-medium">{heading}</h2>

        <div className="px-6 py-4 space-y-2">{children}</div>

        <button
          ref={closeButtonRef}
          type="button"
          className="text-slate-200 bg-slate-500 rounded-lg px-4 py-2.5 text-center"
          onClick={() => handleClick(null)}
        >
          &times; Close
        </button>
      </div>
    </div>
  );
}
