import create from "zustand";
import { persist } from "zustand/middleware";
import _ from "lodash";
import { prettyDOM } from "@testing-library/dom";

let useStore = (set, get) => ({
  products: [],
  addProduct: (product) => {
    //check if product already exists
    let isProductContains = get().products.some(
      (productInState) => productInState.product_id === product.product_id
    );
    if (!isProductContains)
      set((state) => ({ products: [...state.products, product] }));
    else {
      //increment quanitity of product
      const productsOther = get().products.filter(
        (productInState) =>
          productInState.product_id !== parseInt(product.product_id)
      );
      let productAdded = get().products.filter(
        (productInState) =>
          productInState.product_id === parseInt(product.product_id)
      );
      productAdded[0].product_quantity = ++productAdded[0].product_quantity;
      set((state) => ({ products: [...productsOther, ...productAdded] }));
    }
  },
  deleteProduct: (product) => {
    let newProducts = get().products.filter(
      (prd) => prd.product_id !== product.product_id
    );
    set((state) => ({ products: [...newProducts] }));
  },
});

useStore = create(persist(useStore));

export default useStore;
