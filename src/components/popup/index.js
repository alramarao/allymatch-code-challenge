import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import { addProduct, addSubCategory, addSubProduct } from "../../api";
/**
 * @function Popup is functional component
 * Popup for dislay the message [or] read the input from user [or] display the user selection
 * @param {object} prop Component props
 * @param {bool} prop.preview Shows if popup is to display the selection
 * @param {string} prop.message Dispay Message
 * @param {bool} prop.input Display Input field
 * @param {string} prop.cancelbtn if it's available ten display cancel button and it will bring button text as well
 * @param {string} prop.okbtn if it's available ten display cancel button and it will bring button text as well
 * @param {function} prop.handleCancel popup callback function on cancel
 * @param {function} prop.handleOK popup callback function on OK
 */
function Popup(prop) {
  const { productsList } = useProducts();
  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState(false);

  /**
   * @function displaySelection Function to Filter the items which are selected from productsList 
   * which is holding all the products, sub categories and sub products
   */
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

  /**
   * EventHandler for Submit button
   * It will filter all the items which are added by User
   * @function addProduct API method to submit the Product
   * @function addSubCategory API method to submit the SubCategory
   * @function addSubProduct API method to submit the SubProduct
   */
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
                      // event handler for on change of text box
                      setMessage(e.target.value);
                      setInputError(false);
                    }}
                  />
                ) : (
                    ""
                  )}
              </main>
              <div className="buttons">
                {/* Cancel button based on the props prop.cancelbtn */}
                {prop.cancelbtn ? (
                  <button className="cancel" onClick={(e) => prop.handleCancel()}>
                    {prop.cancelbtn.toUpperCase()}
                  </button>
                ) : (
                    ""
                  )}
                {/* OK button based on the props prop.okbtn */}
                {prop.okbtn ? (
                  <button
                    className="ok"
                    onClick={(e) => {
                      // event handler for onClick
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
