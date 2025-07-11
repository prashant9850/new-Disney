import { useState } from "react";

function Testing() {
  const [text, setText] = useState("click below button to change the text");

  const handleClick = () => {
    setText((prevText) =>
      prevText === "click below button to change the text"
        ? "the text is successfully changed"
        : "click below button to change the text"
    );
  };

  return (
    <>
      <p className="mb-2">{text}</p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Click me
      </button>
    </>
  );
}

export default Testing;
