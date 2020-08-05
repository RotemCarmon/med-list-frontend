import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ProductFilter = (props) => {

  const [term, setTerm] = useState(props.filterBy.term);
  const [isFiltering, setIsfiltering] = useState(false);
  const { t } = useTranslation("translations");
  const { setFilterBy } = props

  useEffect(() => {
    setFilterBy({ term });
    setIsfiltering(false);
  }, [isFiltering]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setIsfiltering(true);
  };

  const handleFilterBy = (ev) => {
    ev.preventDefault();
    const term = ev.target.value;
    setTerm(term);
  };

  const cleanFilter = () => {
    setTerm("");
    setIsfiltering(true);
  };

  return (
    <div className="product-filter-container">
      <form onSubmit={onSubmit} className="flex align-center">
        <input
          type="text"
          value={term}
          onChange={handleFilterBy}
          placeholder={t("filter.placeholder")}
        />
        <button type="submit" className="filter-btn btn">
          {t("filter.search")}
        </button>
        <button onClick={cleanFilter} type="button" className="sec-btn">
          {t("filter.clear")}
        </button>
      </form>
    </div>
  );
};

export default ProductFilter;
