import { ReactNode } from "react";
import { X } from "lucide-react";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export default function Popup({
  isOpen,
  onClose,
  children,
  title,
}: PopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-green-50 border border-green-400 rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-green-600 hover:text-green-800"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>
        {title && (
          <h2 className="text-green-800 text-lg font-semibold mb-4">{title}</h2>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
