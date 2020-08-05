import React from "react";

import ProductPreview from "./ProductPreview";
const ProductList = (props) => {
  const products = props.products;
  const productList = products.map((product) => {
    return <ProductPreview product={product} key={product._id} />;
  });
  if (!props.products || !products.length) return <h1>Loading...</h1>;
  return (
    <div className="product-list-container">
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Cost Price</th>
            <th>Retail Price</th>
            <th>Qty</th>
            <th>Manufacturer Code</th>
          </tr>
        </thead>
        <tbody>{productList}</tbody>
      </table>
    </div>
  );
};

export default ProductList;
