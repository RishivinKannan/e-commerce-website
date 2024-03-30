
export function removeDuplicates(arr) {
  return [...new Set(arr.toReversed())].toReversed();
}

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
