"use client";

import { useState, useEffect } from "react";
import meals, { Meal, SelectedMeal } from "@/data/meals";
import MealList from "@/components/MealList";
import SelectedMeals from "@/components/SelectedMeals";

const LS_KEY = "selectedMeals";

export default function HomePage() {
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeal[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) setSelectedMeals(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to load selected meals from localStorage", e);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(LS_KEY, JSON.stringify(selectedMeals));
  }, [selectedMeals, hydrated]);

  function handleAddOrIncrement(meal: Meal) {
    setSelectedMeals((prev) => {
      const existing = prev.find((m) => m.id === meal.id);
      if (existing) {
        return prev.map((m) =>
          m.id === meal.id ? { ...m, quantity: m.quantity + 1 } : m
        );
      }
      return [...prev, { id: meal.id, name: meal.name, price: meal.price, quantity: 1 }];
    });
  }

  function handleUpdateQuantity(id: number, delta: number) {
    setSelectedMeals((prev) =>
      prev
        .map((m) => (m.id === id ? { ...m, quantity: m.quantity + delta } : m))
        .filter((m) => m.quantity > 0)
    );
  }

  function handleRemoveMeal(id: number) {
    setSelectedMeals((prev) => prev.filter((m) => m.id !== id));
  }

  function handleReset() {
    setSelectedMeals([]);
  }

  return (
    <main className="page-container">
      <h1 className="page-title">Menu</h1>
      <p className="page-subtitle">Fill your cart with delicious meals from our menu.</p>

      <MealList
        meals={meals}
        selectedMeals={selectedMeals}
        showAll={showAll}
        isSortedAsc={isSortedAsc}
        onToggleFilter={() => setShowAll((prev) => !prev)}
        onToggleSort={() => setIsSortedAsc((prev) => !prev)}
        onAddOrIncrement={handleAddOrIncrement}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <SelectedMeals
        selectedMeals={selectedMeals}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveMeal={handleRemoveMeal}
        onReset={handleReset}
      />
    </main>
  );
}
