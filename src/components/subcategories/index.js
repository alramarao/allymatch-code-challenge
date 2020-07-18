import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import SubCategory from "./subcategory";
import { CSSTransition } from "react-transition-group";
import Popup from "../popup/index";

function SubCategories(prop) {
  const { addNewSubCategory } = useProducts();
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <div className="subcategoriesList">
      <div className="searchText">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value.toUpperCase())}
        />
      </div>
      {typeof prop.subcategories != "undefined" &&
      typeof prop.subcategories != "undefined"
        ? prop.subcategories.map((subcategory) => {
            if (subcategory.text.toUpperCase().includes(searchText))
              return (
                <CSSTransition
                  key={subcategory.id}
                  in={true}
                  appear
                  timeout={200}
                  classNames="transitionitems"
                  unmountOnExit
                >
                  <SubCategory
                    key={subcategory.id}
                    productid={prop.productid}
                    subcategory={subcategory}
                  ></SubCategory>
                </CSSTransition>
              );
            else return "";
          })
        : ""}
      <div className="newItem">
        <input
          type="button"
          value="+ Add Sub-Category"
          onClick={() => {
            setIsShowPopup(true);
          }}
        ></input>
      </div>
      {isShowPopup ? (
        <Popup
          preview={false}
          message="Couldn't find the right sub-category? Please request an additional sub-category below."
          input="Enter Value"
          okbtn="send"
          cancelbtn="cancel"
          handleOK={(message) => {
            setIsShowPopup(false);
            addNewSubCategory(prop.productid, message);
          }}
          handleCancel={() => setIsShowPopup(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default SubCategories;
