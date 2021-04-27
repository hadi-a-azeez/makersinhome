import create from "zustand";

let useFrontStore = (set, get) => ({
  storeProducts: [],
  setStoreProducts: (productsArr) => {
    set((state) => ({ storeProducts: productsArr }));
  },
});

useFrontStore = create(useFrontStore);

export default useFrontStore;
