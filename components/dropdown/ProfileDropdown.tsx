"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type DropdownLink = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: string;
  onClick?: () => void;
};

type ProfileDropdownProps = {
  name: string;
  role: string;
  avatarText: string;
  links: DropdownLink[];
};

export default function ProfileDropdown({
  name,
  role,
  avatarText,
  links,
}: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-gray-100 text-sm font-medium hover:border-green-500 transition-colors"
      >
        {avatarText}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 font-semibold">
              {avatarText}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{name}</p>
              <p className="text-xs text-gray-500">{role}</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            {links.map((link, idx) => {
              const Icon = link.icon; // ✅ Create a component variable for Lucide
              return link.href ? (
                <Link
                  key={idx}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Icon className="w-4 h-4" /> {link.label}
                </Link>
              ) : (
                <button
                  key={idx}
                  onClick={link.onClick}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left w-full"
                >
                  <Icon className="w-4 h-4" /> {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}