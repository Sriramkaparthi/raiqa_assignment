export type Meal = {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
};

export type SelectedMeal = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const meals: Meal[] = [
  { id: 1, name: "Full Meals Veg", price: 120, isAvailable: true },
  { id: 2, name: "Full Meals Non-Veg", price: 160, isAvailable: true },
  { id: 3, name: "Mushroom Biryani", price: 170, isAvailable: false },
  { id: 4, name: "Egg Biryani", price: 120, isAvailable: true },
  { id: 5, name: "Chicken Biryani", price: 150, isAvailable: true },
  { id: 6, name: "Mutton Biryani", price: 200, isAvailable: false },
  { id: 7, name: "Paneer Biryani", price: 170, isAvailable: true },
  { id: 8, name: "Lassi", price: 70, isAvailable: true },
  { id: 9, name: "Apricot Delight", price: 110, isAvailable: false },
  { id: 10, name: "Water Bottle", price: 20, isAvailable: true },
];

export default meals;
