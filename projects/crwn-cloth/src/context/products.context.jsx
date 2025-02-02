import { createContext, useEffect, useState } from "react";
import SHOP_DATA from "../shop-data.js";
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const value = { products };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
