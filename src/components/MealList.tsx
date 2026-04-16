"use client";

import { Meal, SelectedMeal } from "@/data/meals";
import MealItem from "./MealItem";
import FilterToggle from "./FilterToggle";
import SortToggle from "./SortToggle";

type Props = {
  meals: Meal[];
  selectedMeals: SelectedMeal[];
  showAll: boolean;
  isSortedAsc: boolean;
  onToggleFilter: () => void;
  onToggleSort: () => void;
  onAddOrIncrement: (meal: Meal) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
};

export default function MealList({
  meals,
  selectedMeals,
  showAll,
  isSortedAsc,
  onToggleFilter,
  onToggleSort,
  onAddOrIncrement,
  onUpdateQuantity,
}: Props) {
  const selectedMap = new Map(selectedMeals.map((m) => [m.id, m]));

  let displayList = showAll ? meals : meals.filter((m) => m.isAvailable);

  displayList = [...displayList].sort((a, b) =>
    isSortedAsc ? a.price - b.price : b.price - a.price
  );

  return (
    <section className="meal-section">
      <div className="meal-section-header">
        <div className="section-title-row">
          <h2 className="section-title">Meals</h2>
          <span className="section-count">{displayList.length} items</span>
        </div>
        <div className="meal-section-controls">
          <FilterToggle showAll={showAll} onToggle={onToggleFilter} />
          <SortToggle isSortedAsc={isSortedAsc} onToggle={onToggleSort} />
        </div>
      </div>

      {displayList.length === 0 ? (
        <div className="card-empty">No items to display.</div>
      ) : (
        <div className="card-list">
          {displayList.map((meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
              selectedQty={selectedMap.get(meal.id)?.quantity ?? 0}
              onAddOrIncrement={onAddOrIncrement}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      )}
    </section>
  );
}
