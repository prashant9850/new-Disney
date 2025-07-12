import { useState } from "react";

function Testing() {
  const [isBlue, setIsBlue] = useState(true);

  const handleClick = () => {
    setIsBlue((prev) => !prev);
  };

  // Define color class based on state
  const buttonColorClass = isBlue
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-red-600 hover:bg-red-700";

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-white rounded transition-all duration-300 ${buttonColorClass}`}
    >
      Click me
    </button>
  );
}

export default Testing;
