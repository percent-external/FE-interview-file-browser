import React, { useRef } from "react";

function PopUp({ setPopUp }) {
  const modalRef = useRef();
  const handleExit = (e) => {
    if (modalRef.current === e.target) {
      setPopUp(false);
    }
  };
  return (
    <div>
      <div className="popUp" ref={modalRef} onClick={handleExit}>
        <div className="popUpInner">
          <div className="displayFile">Display File Information Here </div>
          <button className="exit" onClick={() => setPopUp(false)}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
