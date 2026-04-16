"use client";

type Props = {
  isSortedAsc: boolean;
  onToggle: () => void;
};

export default function SortToggle({ isSortedAsc, onToggle }: Props) {
  return (
    <div className="toggle-wrapper">
      <span className="toggle-label">Sort:</span>
      <button className="toggle-btn" onClick={onToggle}>
        Price: {isSortedAsc ? "Low → High" : "High → Low"}
      </button>
    </div>
  );
}
