import create from "zustand";
import { getStoreProducts } from "./api/custStoreAPI";

let useFrontStore = (set, get) => ({
  isMoreLoading: false,
  setIsMoreLoading: (val) => set((state) => ({ isMoreLoading: val })),

  isLastPage: false,

  isLoading: false,
  setIsLoading: (val) => set({ isLoading: val }),

  storeProducts: [],
  setStoreProducts: (productsArr) => {
    set({ storeProducts: productsArr });
  },

  fetchProducts: async (storeId) => {
    const resp = await getStoreProducts(
      storeId,
      get().catSelected,
      get().pageNo
    );
    set({ isLastPage: resp.data.isLastPage });
    set((state) => ({
      storeProducts: [...state.storeProducts, ...resp.data.data],
    }));
  },
  catSelected: "all",
  setCatSelected: async (cat, storeId) => {
    set({ pageNo: 1 });
    set({ isLoading: true });
    set({ storeProducts: [] });
    set({ catSelected: cat });
    await get().fetchProducts(storeId);
    set({ isLoading: false });
  },
  pageNo: 1,
  incrementPageNo: async (storeId) => {
    set((state) => ({
      pageNo: state.pageNo + 1,
    }));
    set({ isMoreLoading: true });
    await get().fetchProducts(storeId);
    set({ isMoreLoading: false });
  },
});

useFrontStore = create(useFrontStore);

export default useFrontStore;
