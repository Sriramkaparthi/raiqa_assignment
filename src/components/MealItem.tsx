"use client";

import { Meal } from "@/data/meals";

type Props = {
  meal: Meal;
  selectedQty: number;
  onAddOrIncrement: (meal: Meal) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
};

export default function MealItem({ meal, selectedQty, onAddOrIncrement, onUpdateQuantity }: Props) {
  const isSelected = selectedQty > 0;

  return (
    <div className={`meal-item${!meal.isAvailable ? " unavailable" : ""}`}>
      <div className="meal-item-info">
        <span className="meal-item-name">{meal.name}</span>
        <span className="meal-item-price">₹ {meal.price.toFixed(2)}</span>
      </div>

      {!meal.isAvailable ? (
        <button className="btn-primary" disabled>
          Unavailable
        </button>
      ) : isSelected ? (
        <div className="qty-control">
          <button className="qty-btn" onClick={() => onUpdateQuantity(meal.id, -1)}>
            −
          </button>
          <span className="qty-value">{selectedQty}</span>
          <button className="qty-btn" onClick={() => onAddOrIncrement(meal)}>
            +
          </button>
        </div>
      ) : (
        <button className="btn-primary" onClick={() => onAddOrIncrement(meal)}>
          Add
        </button>
      )}
    </div>
  );
}
