"use client";

type Props = {
  showAll: boolean;
  onToggle: () => void;
};

export default function FilterToggle({ showAll, onToggle }: Props) {
  return (
    <div className="toggle-wrapper">
      <span className="toggle-label">Filter:</span>
      <button
        className={`toggle-btn${showAll ? "" : " toggle-btn-active"}`}
        onClick={() => showAll && onToggle()}
      >
        Available
      </button>
      <button
        className={`toggle-btn${showAll ? " toggle-btn-active" : ""}`}
        onClick={() => !showAll && onToggle()}
      >
        Show All
      </button>
    </div>
  );
}
