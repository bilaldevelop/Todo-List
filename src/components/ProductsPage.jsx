import React, {useContext} from "react";
import Product from "./Product";
import {Products} from "../Data/Products";

import { CartContext } from "../App";


const ProductsPage = () => {

  const stateProvider = useContext(CartContext);
  
  const addItemToCart = () => {
    stateProvider.setCart(stateProvider.cart + 1);
  }

  return (
    <section class="text-gray-400 bg-gray-900 body-font">
      <div class="container px-5 py-24 mx-auto">
        <h1 className="text-white mb-10 font-medium title-font text-2xl text-center">
          View similar products
        </h1>

        <div class="flex flex-wrap -m-4">
          {Products.map(product => (
            <Product
              image={product.image}
              key={product.id}
              category={product.category}
              name={product.name}
              price={product.price}
              handleClick={addItemToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
