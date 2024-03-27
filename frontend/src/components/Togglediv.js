import React, { useState } from "react";

const ToggleDiv = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(prevState => !prevState);
  };

  return (
    <div>
      {isClicked && (
        <div>
          {/* Content to be displayed when the button is clicked */}
        </div>
      )}
      <button onClick={handleClick}>Comment</button>
    </div>
  );
};

export default ToggleDiv;
