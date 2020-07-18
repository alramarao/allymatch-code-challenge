import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import { addProduct, addSubCategory, addSubProduct } from "../../api";

function Popup(prop) {
  const { productsList } = useProducts();
  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState(false);

  const displaySelection = () => {
    let result = {
      products: [],
      subcategories: [],
      subproducts: [],
    };
    const selection = productsList.filter((p) => {
      return p.isSelected === true;
    });
    selection.forEach((product) => {
      result.products.push(product.text);
      if (product.subCategory)
        product.subCategory.forEach((subcategory) => {
          if (subcategory.isSelected === true)
            result.subcategories.push(subcategory.text);
          if (subcategory.subProduct)
            subcategory.subProduct.forEach((subproduct) => {
              if (subproduct.isSelected === true)
                result.subproducts.push(subproduct.text);
            });
        });
    });
    console.log(result);
    let content = [];
    if (result.products.length > 0) {
      content.push(<h4>Products</h4>);
      content.push(<p>{result.products.join(", ")}</p>);
    }
    if (result.subcategories.length > 0) {
      content.push(<h4>Sub Categories</h4>);
      content.push(<p>{result.subcategories.join(", ")}</p>);
    }
    if (result.subproducts.length > 0) {
      content.push(<h4>Sub Products</h4>);
      content.push(<p>{result.subproducts.join(", ")}</p>);
    }
    return content;
  };
  const submitSelection = () => {
    const selection = productsList.filter((p) => {
      return p.isSelected === true;
    });
    selection.forEach((product) => {
      if (product.isNew === true)
        addProduct({ _id: product.id, text: product.text });
      if (product.subCategory)
        product.subCategory.forEach((subcategory) => {
          if (subcategory.isNew === true)
            addSubCategory({
              _id: subcategory.id,
              text: subcategory.text,
              p_id: product.id,
            });
          if (subcategory.subProduct)
            subcategory.subProduct.forEach((subproduct) => {
              if (subproduct.isNew === true)
                addSubProduct({
                  _id: subproduct.id,
                  c_id: subcategory.id,
                  text: subproduct.text,
                });
            });
        });
    });
    prop.handleCancel();
  };
  return (
    <div className={prop.preview ? "popup preview" : "popup message"}>
      <div className="popup_inner">
        {prop.preview ? (
          <React.Fragment>
            <div className="content">{displaySelection()}</div>
            <button onClick={(e) => submitSelection()}>Submit</button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <main>
              <div>{prop.message}</div>
              {prop.input ? (
                <input
                  type="text"
                  className={inputError ? "error" : ""}
                  placeholder={prop.input}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setInputError(false);
                  }}
                />
              ) : (
                ""
              )}
            </main>
            <div className="buttons">
              {prop.cancelbtn ? (
                <button className="cancel" onClick={(e) => prop.handleCancel}>
                  {prop.cancelbtn.toUpperCase()}
                </button>
              ) : (
                ""
              )}
              {prop.okbtn ? (
                <button
                  className="ok"
                  onClick={(e) => {
                    message.length > 0
                      ? prop.handleOK(message)
                      : setInputError(true);
                  }}
                >
                  {prop.okbtn.toUpperCase()}
                </button>
              ) : (
                ""
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
export default Popup;
