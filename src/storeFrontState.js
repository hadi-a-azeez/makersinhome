import create from "zustand";
import { getStoreProducts, updateCatClickAPI } from "./api/custStoreAPI";

let useFrontStore = (set, get) => ({
  sortName: ["product_clicks", "desc", "Popular"],
  setSortName: async (val, storeId) => {
    set({ sortName: val });
    set({ isLoading: true });
    set({ storeProducts: [] });
    await get().fetchProducts(storeId);
    set({ isLoading: false });
  },

  isMoreLoading: false,
  setIsMoreLoading: (val) => set({ isMoreLoading: val }),
  isLastPage: false,
  isLoading: true,
  setIsLoading: (val) => set({ isLoading: val }),
  storeProducts: [],
  setStoreProducts: (productsArr) => {
    set({ storeProducts: productsArr });
  },
  storeIdCurrent: 0,
  setStoreIdCurrent: (value) => set({ storeIdCurrent: value }),

  fetchProducts: async (storeId) => {
    const resp = await getStoreProducts(
      storeId,
      get().catSelected,
      get().pageNo,
      get().sortName[0],
      get().sortName[1]
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
    await updateCatClickAPI(cat);
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
