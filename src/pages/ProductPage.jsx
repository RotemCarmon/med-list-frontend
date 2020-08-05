import React, { Component } from "react";
import ProductService from "../services/ProductService.js";
import { Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";

import ProductList from "../cmps/product/ProductList";
import ProductFilter from "../cmps/product/ProductFilter";
import ProductLimit from "../cmps/product/ProductLimit.jsx";
import ProductExport from "../cmps/product/ProductExport.jsx";
import ProductPaging from "../cmps/product/ProductPaging.jsx";

class ProductPage extends Component {
  state = {
    redirect: false,
    products: [],
    filterBy: {
      term: "",
      limit: 50,
      page: 0,
    },
    rowCount: null,
    fullData: null,
  };
  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const results = await ProductService.loadProducts(this.state.filterBy);
    
    // if no user login redirect to login page
    if (results === undefined) {
      this.setState({ redirect: true });
    }
    
    if (results) {
      const { products, rowCount } = results;
      this.setState({ ...this.state, products, rowCount });
    }
  };
  
  setFilterBy = (filterBy) => {
    
      this.setState((prevState) => {
        if (filterBy.term || filterBy.limit) {
          filterBy.page = 0;
        }
        return {
          products: null,
          filterBy: {
            ...prevState.filterBy,
            ...filterBy,
          },
        };
      }, this.loadProducts);
   
  };

  getFullData = async () => {
    const filterBy = this.state.filterBy;
    filterBy.limit = "all";
    const { products } = await ProductService.loadProducts(filterBy);

    return products;
  };

  render() {
    const products = this.state.products;
    const { redirect } = this.state;
    const { t } = this.props;

    if (redirect) return <Redirect to="/login" />;

    const listDisplay = !products ? (
      <h1 className="loading">{t("display.loading")}</h1>
    ) : !products.length ? (
      <h1 className="loading">{t("display.nothing")}</h1>
    ) : (
      <ProductList products={products} />
    );

    const pagingDisplay =
      !products || !products.length ? (
        <div></div>
      ) : (
        <ProductPaging
          setPage={this.setFilterBy}
          rowCount={this.state.rowCount}
          limit={this.state.filterBy.limit}
          page={this.state.filterBy.page}
        />
      );

    return (
      <div className="product-page-container main-layout-container">
        <div className="product-top-bar flex align-center space-between">
          <div className="filtering-product flex align-center">
            <ProductLimit setFilterBy={this.setFilterBy} />
            <ProductFilter
              filterBy={this.state.filterBy}
              setFilterBy={this.setFilterBy}
            />
          </div>
          <ProductExport
            data={products}
            fullData={this.state.fullData}
            getFullData={this.getFullData}
          />
        </div>
        {listDisplay}
        {pagingDisplay}
      </div>
    );
  }
}

export default withTranslation("translations")(ProductPage);
