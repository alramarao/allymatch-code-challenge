import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import SubCategories from "../subcategories";
import { CSSTransition } from "react-transition-group";

export default function Product(prop) {
  const { updateProduct } = useProducts();
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  return (
    <div>
      <div
        className={prop.product.isSelected ? "title selected" : "title"}
        onClick={() => {
          updateProduct(prop.product.id, !prop.product.isSelected);
        }}
      >
        {prop.product.text}
      </div>
      {prop.product.isSelected ? (
        <CSSTransition
          in={prop.product.isSelected}
          appear
          timeout={300}
          classNames="transitionitems"
          unmountOnExit
        >
          <div className="select-sub-category">
            <div onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}>
              Select Sub-Categories
              <span
                className={isCategoryExpanded ? "arrow down" : "arrow up"}
              ></span>
            </div>
            {isCategoryExpanded ? (
              <CSSTransition
                in={isCategoryExpanded}
                appear
                timeout={200}
                classNames="transitionitems"
                unmountOnExit
              >
                <SubCategories
                  key={prop.product.id}
                  productid={prop.product.id}
                  subcategories={prop.product.subCategory}
                />
              </CSSTransition>
            ) : (
              ""
            )}
          </div>
        </CSSTransition>
      ) : (
        ""
      )}
    </div>
  );
}
