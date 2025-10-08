import { useState } from "react";

export default function DropDownMenu({ setSortOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 w-41 me-2 text-left bg-[#F5F5F5] border rounded-sm"
      >
        Sort Options
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute mt-[.5px] w-40 border bg-white shadow-lg z-10 rounded">
          <button
            onClick={() => {
              setSortOrder("asc");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            A → Z
          </button>
          <button
            onClick={() => {
              setSortOrder("desc");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Z → A
          </button>
        </div>
      )}
    </div>
  );
}
