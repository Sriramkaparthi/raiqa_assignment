"use client";

import { Trash2 } from "lucide-react";
import { SelectedMeal } from "@/data/meals";

type Props = {
  selectedMeals: SelectedMeal[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveMeal: (id: number) => void;
  onReset: () => void;
};

export default function SelectedMeals({ selectedMeals, onUpdateQuantity, onRemoveMeal, onReset }: Props) {
  const total = selectedMeals.reduce((sum, m) => sum + m.price * m.quantity, 0);

  const cheapestId =
    selectedMeals.length > 1
      ? selectedMeals.reduce((min, m) => (m.price < min.price ? m : min)).id
      : null;

  const priciestId =
    selectedMeals.length > 1
      ? selectedMeals.reduce((max, m) => (m.price > max.price ? m : max)).id
      : null;

  const totalItems = selectedMeals.reduce((sum, m) => sum + m.quantity, 0);

  return (
    <section className="selected-section">
      <div className="section-header">
        <div className="section-title-row">
          <h2 className="section-title">Cart</h2>
          {selectedMeals.length > 0 && (
            <span className="section-count">{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
          )}
        </div>
        {selectedMeals.length > 0 && (
          <button className="btn-secondary" onClick={onReset}>
            Empty Cart
          </button>
        )}
      </div>

      {selectedMeals.length === 0 ? (
        <div className="card-empty">No items selected yet.</div>
      ) : (
        <>
          <div className="selected-list">
            {selectedMeals.map((meal) => {
              const isCheapest = meal.id === cheapestId;
              const isPriciest = meal.id === priciestId;
              const lineTotal = meal.price * meal.quantity;

              return (
                <div key={meal.id} className="selected-row">
                  <div className="selected-row-info">
                    <span className="selected-name">{meal.name}</span>
                    {isCheapest && <span className="badge badge-cheapest">Cheapest</span>}
                    {isPriciest && <span className="badge badge-priciest">Priciest</span>}
                  </div>

                  <div className="row-actions">
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => onUpdateQuantity(meal.id, -1)}>
                        −
                      </button>
                      <span className="qty-value">{meal.quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQuantity(meal.id, 1)}>
                        +
                      </button>
                    </div>
                    <span className="line-price">₹ {lineTotal.toFixed(2)}</span>
                    <button
                      className="remove-btn"
                      onClick={() => onRemoveMeal(meal.id)}
                      aria-label={`Remove ${meal.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="selected-footer">
            <span className="total-label">Total:</span>
            <span className="total-amount">₹ {total.toFixed(2)}</span>
          </div>
        </>
      )}
    </section>
  );
}
