import create from "zustand";
import { persist } from "zustand/middleware";
import _ from "lodash";

let useStore = (set, get) => ({
  products: [],
  addProduct: (product) => {
    //check if product already exists
    let isProductContains = get().products.some(
      (productInState) =>
        productInState.product_id_gen == product.product_id_gen
    );
    if (!isProductContains)
      set((state) => ({ products: [...state.products, product] }));
    else {
      //increment quanitity of product
      const productsOther = get().products.filter(
        (productInState) =>
          productInState.product_id_gen != parseInt(product.product_id_gen)
      );
      let productAdded = get().products.filter(
        (productInState) =>
          productInState.product_id_gen == product.product_id_gen
      );
      productAdded[0].product_quantity = ++productAdded[0].product_quantity;
      set((state) => ({ products: [...productsOther, ...productAdded] }));
    }
  },
  deleteProduct: (product) => {
    let newProducts = get().products.filter(
      (prd) => prd.product_id_gen != product.product_id_gen
    );
    set((state) => ({ products: [...newProducts] }));
  },
  addQuantity: (product) => {
    const productsOther = get().products.filter(
      (productInState) =>
        productInState.product_id_gen != parseInt(product.product_id_gen)
    );
    let productAdded = get().products.filter(
      (productInState) =>
        productInState.product_id_gen == product.product_id_gen
    );
    console.log(productAdded);
    productAdded[0].product_quantity = ++productAdded[0].product_quantity;
    set((state) => ({ products: [...productsOther, ...productAdded] }));
  },
  removeQuantity: (product) => {
    const productsOther = get().products.filter(
      (productInState) =>
        productInState.product_id_gen != parseInt(product.product_id_gen)
    );
    let productAdded = get().products.filter(
      (productInState) =>
        productInState.product_id_gen == product.product_id_gen
    );
    if (productAdded[0].product_quantity !== 1)
      productAdded[0].product_quantity = --productAdded[0].product_quantity;
    set((state) => ({ products: [...productsOther, ...productAdded] }));
  },
});

useStore = create(persist(useStore));

export default useStore;
