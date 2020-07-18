import React from "react";
import ProductsProvider from "./providers/ProductsProvider";
import Products from "./components/products";

function App() {
  return (
    <ProductsProvider>
      <Products />
    </ProductsProvider>
  );
}

export default App;
