import React, { useEffect, useRef } from "react";

interface Modal {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export function StartModal({ isModalOpen, setIsModalOpen }: Modal) {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modal.current) {
      modal.current.classList.add("active");
    }
  }, []);

  function handleClickOutside(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  }

  function handleOkButtonClick() {
    setIsModalOpen(false);
  }

  return (
    <div
      className={isModalOpen ? "modal" : "hidden"}
      onClick={handleClickOutside}
      ref={modal}
    >
      <h2>Do what Simon says!</h2>
      <p>Match the sequence of lights and sounds for as long as possible.</p>
      <button className="close-modal-btn" onClick={handleOkButtonClick}>
        OK
      </button>
    </div>
  );
}
