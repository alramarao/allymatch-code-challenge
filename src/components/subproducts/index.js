import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import SubProduct from "./subproduct";
import { CSSTransition } from "react-transition-group";
import Popup from "../popup/index";

function SubProducts(prop) {
  const { addNewSubProduct } = useProducts();
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <div className="subProductsList">
      <div className="searchText">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value.toUpperCase())}
        />
      </div>
      {typeof prop.subproducts != "undefined" &&
      typeof prop.subproducts != "undefined"
        ? prop.subproducts.map((subproduct) => {
            if (subproduct.text.toUpperCase().includes(searchText))
              return (
                <CSSTransition
                  key={subproduct.id}
                  in={true}
                  appear
                  timeout={200}
                  classNames="transitionitems"
                  unmountOnExit
                >
                  <SubProduct
                    key={subproduct.id}
                    productid={prop.productid}
                    subcategoryid={prop.subcategoryid}
                    subproduct={subproduct}
                  ></SubProduct>
                </CSSTransition>
              );
            else return "";
          })
        : ""}
      <div className="newItem">
        <input
          type="button"
          value="+ Add Sub-Product"
          onClick={() => {
            setIsShowPopup(true);
          }}
        ></input>
      </div>
      {isShowPopup ? (
        <Popup
          preview={false}
          message="Couldn't find the right sub-product? Please request an additional sub-product below."
          input="Enter Value"
          okbtn="send"
          cancelbtn="cancel"
          handleOK={(message) => {
            setIsShowPopup(false);
            addNewSubProduct(prop.productid, prop.subcategoryid, message);
          }}
          handleCancel={() => setIsShowPopup(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default SubProducts;
