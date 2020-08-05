import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

let pageCount = 0;
let firstPage = true;
let lastPage = false;

const ProductPaging = (props) => {
  const { t, i18n } = useTranslation("translations");
  const isRtl = i18n.dir() === "rtl";
  const leftArrow = (
    <FontAwesomeIcon icon={isRtl ? faArrowCircleLeft : faArrowCircleRight} />
  );
  const rightArrow = (
    <FontAwesomeIcon icon={isRtl ? faArrowCircleRight : faArrowCircleLeft} />
  );

  pageCount = props.page;
  const rowCount = props.rowCount;
  const limit = props.limit;

  const pageDiff = rowCount / limit;
  let pagingEnd = Math.floor(pageDiff);
  if (pageDiff % pagingEnd === 0) pagingEnd--;

  firstPage = pageCount < 1;
  lastPage = pageCount >= pagingEnd;

  
  if(limit === 'all') return (<div></div>)
  

  const setPageDiff = (diff) => {
    pageCount += diff;
    if (pageCount < 1) pageCount = 0;
    firstPage = pageCount < 1;

    if (pageCount >= pagingEnd) pageCount = pagingEnd;
    lastPage = pageCount >= pagingEnd;

    props.setPage({ page: pageCount });
  };

  const setPage = (num) => {
    pageCount = num;
    props.setPage({ page: pageCount });
  };

  // get page number
  let currPage = pageCount + 1;
  let priorToPrevPage, prevPage, nextPage, afterNextPage;
  if (!firstPage) {
    prevPage = currPage - 1;
    if (prevPage > 1) {
      priorToPrevPage = prevPage - 1;
    }
  }
  if (!lastPage) {
    nextPage = currPage + 1;
    if (nextPage < pagingEnd) {
      afterNextPage = nextPage + 1;
    }
  }
  const paging = (
    <div className="paging-num flex align-center">
      {priorToPrevPage && (
        <span onClick={() => setPage(priorToPrevPage - 1)}>
          {priorToPrevPage}
        </span>
      )}
      {prevPage && (
        <span onClick={() => setPage(prevPage - 1)}>{prevPage}</span>
      )}
      <span className="curr-page">{currPage}</span>
      {nextPage && (
        <span onClick={() => setPage(nextPage - 1)}>{nextPage}</span>
      )}
      {afterNextPage && (
        <span onClick={() => setPage(afterNextPage - 1)}>{afterNextPage}</span>
      )}
    </div>
  );
  return (
    <div className="product-page-container flex justify-center">
      <button
        onClick={() => setPageDiff(-1)}
        className={`${
          firstPage ? "disable-btn" : "enable-btn"
        } paging-btn  prev-btn flex space-between align-center`}
      >
        {rightArrow}
        {t("paging.prev")}
      </button>

      {paging}

      <button
        onClick={() => setPageDiff(1)}
        className={`${
          lastPage ? "disable-btn" : "enable-btn"
        } paging-btn next-btn flex space-between align-center`}
      >
        {t("paging.next")}
        {leftArrow}
      </button>
    </div>
  );
};

export default ProductPaging;
