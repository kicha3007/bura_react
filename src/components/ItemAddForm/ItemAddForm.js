import React, {Component} from "react";

const ItemAddForm = (props) => {

    return(
        <button
        className="btn btn-outline-secondary mt-3 float-right"
        onClick={() => props.onItemAdded("Hello world")}
        >
            Add Item
        </button>
    )


}

export default ItemAddForm;



