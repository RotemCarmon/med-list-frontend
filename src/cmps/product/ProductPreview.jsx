import React from 'react'

const ProductPreview = (props) => {
  const product = props.product;
  return (
   <tr className="product-preview-container">
     <td>{product.Code}</td>
     <td>{product.Name}</td>
     <td>{product.CostPrice}</td>
     <td>{product.RetailPrice}</td>
     <td>{product.Qty}</td>
     <td>{product.ManufacturerCode}</td>
   </tr>
  )
}

export default ProductPreview
