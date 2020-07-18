import React, { useState, useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import Product from "./product";
import { getProducts } from "../../api";
import { CSSTransition } from "react-transition-group";
import Popup from "../popup/index";

function Products() {
  const {
    isModified,
    productsList,
    updateProductsList,
    addNewProduct,
  } = useProducts();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isShowPopup, setIsShowPopup] = useState({
    visible: false,
    isPreview: false,
  });
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      updateProductsList(data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchProducts();
    setIsFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstRender]);
  const displayPoup = (isPreview) => {
    if (isPreview) {
      return (
        <Popup
          preview={true}
          message="Couldn't find the right product? Please request an additional product below."
          input="Enter Value"
          okbtn="send"
          cancelbtn="cancel"
          handleOK={(message) => {
            console.log(message);
            setIsShowPopup({ visible: false, isPreview: false });
          }}
          handleCancel={() =>
            setIsShowPopup({ visible: false, isPreview: false })
          }
        />
      );
    } else {
      return (
        <Popup
          preview={false}
          message="Couldn't find the right product? Please request an additional product below."
          input="Enter Value"
          okbtn="send"
          cancelbtn="cancel"
          handleOK={(message) => {
            setIsShowPopup({ visible: false, isPreview: false });
            addNewProduct(message);
          }}
          handleCancel={() =>
            setIsShowPopup({ visible: false, isPreview: false })
          }
        />
      );
    }
  };
  return (
    <React.Fragment>
      <div className="productsList">
        <header>
          <span>Products</span>
          {isModified ? (
            <input
              type="button"
              value="Done"
              onClick={() => {
                setIsShowPopup({ visible: true, isPreview: true });
              }}
            ></input>
          ) : (
            ""
          )}
        </header>
        <div>
          {typeof productsList != "undefined" && productsList != null
            ? productsList.map((product) => (
                <CSSTransition
                  key={product.id}
                  in={true}
                  appear
                  timeout={200}
                  classNames="transitionitems"
                  unmountOnExit
                >
                  <Product key={product.id} product={product}></Product>
                </CSSTransition>
              ))
            : ""}
          <div className="newItem">
            <input
              type="button"
              value="+ Add Product"
              onClick={() => {
                setIsShowPopup({ visible: true, isPreview: false });
              }}
            ></input>
          </div>
        </div>
        {isShowPopup.visible ? displayPoup(isShowPopup.isPreview) : ""}
      </div>
    </React.Fragment>
  );
}
export default Products;
