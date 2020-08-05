import React from 'react'

const ProductLimit = (props) => {
  const handleLimitChange = (ev) => {
    props.setFilterBy({limit: ev.target.value});
  }

  return (
    <div className="product-limit-container">
      <select onChange={handleLimitChange}>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
        <option value="2000">2000</option>
        <option value="all">All</option>
      </select>
    </div>
  )
}

export default ProductLimit
