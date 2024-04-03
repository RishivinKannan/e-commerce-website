export function removeDuplicates(arr) {
  return [...new Set(arr.toReversed())].toReversed();
}
export const BACKEND_URL = "http://localhost:8000";

export const categories = [
  {
    name: "Top Wear",
  },
  {
    name: "Bottom Wear",
  },
  {
    name: "Foot Wear",
  },
  {
    name: "MobileAccessories",
  },
  {
    name: "ComputersAccessories",
  },
  {
    name: "Headphones",
  },
  {
    name: "TVAccessories",
  },
  {
    name: "SmartWatches",
  },
  {
    name: "HomeAudio",
  },
  {
    name: "HomeAppliances",
  },
];

export const optionsList = {
  "Top-Wear": {
    Gender: ["Boys", "Girls"],
    Brand: ["Gini and Jony", "Disney", "Doodle", "Madagascar3"],
  },
  "Bottom-Wear": {
    Gender: ["Boys", "Girls"],
    Brand: ["Gini and Jony", "United", "Allen Solly"],
  },
  "Foot-Wear": {
    Brand: ["PUMA", "ADIDAS", "NIKE", "Reebok"],
  },
  ComputersAccessories: {
    Brand: ["boAt", "pTron", "MI", "Portronics"],
  },
  MobileAccessories: {
    Brand: ["Redmi", "OnePlus", "Samsung", "iQOO"],
  },
  Headphones: {
    Brand: ["JBL", "pTron", "boAt", "realme"],
  },
  TVAccessories: {
    Brand: ["MI", "LG", "Samsung", "OnePlus"],
  },
  SmartWatches: {
    Brand: ["Fire-Boltt", "boAt", "Noise"],
  },
  HomeAudio: {
    Brand: ["JBL", "pTron", "boAt", "realme"],
  },
  HomeAppliances: {
    Brand: ["camel", "Amazon", "Pigeon"],
  },
};
