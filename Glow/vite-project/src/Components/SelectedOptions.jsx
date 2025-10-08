import React from 'react'

export default function SelectedOptions({ options, activeOption, setoption ,text }) {
  // remove "s" or "S" from each option string
  
  return (
    <>
      {options.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold capitalize mb-2">
           {text } {activeOption ? activeOption : "Select Option"}
          </h3>
          <div className="flex gap-2">
            {options.map(option => (
              <button
                key={option}
                className={`px-4 py-2 border rounded ${
                  activeOption === option
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
                onClick={() => setoption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
