import React from "react";
import XLSX from "xlsx";
import { useTranslation } from 'react-i18next';

const ProductExport = (props) => {
  const { t } = useTranslation('translations');
  const exportFullData = async () => {
    const fullData = await props.getFullData();
    _exportToXlsx(fullData);
  };

  return (
    <div className="product-export-container flex column">
      <button
        onClick={() => _exportToXlsx(props.data)}
        className="sec-btn export-btn"
      >
        {t('export.page')}
      </button>
      <button onClick={() => exportFullData()} className="sec-btn export-btn">
      {t('export.full')}
      </button>
    </div>
  );
};
export default ProductExport;

function _exportToXlsx(data) {
  // remove _id property from obj
  data = data.map((row) => {
    delete row._id;
    return row;
  });

  const wb = XLSX.utils.book_new(); // create a new empty workbook
  const ws = XLSX.utils.json_to_sheet(data); // create a sheet from json
  XLSX.utils.book_append_sheet(wb, ws, "price26"); // appends sheet to workbook
  XLSX.writeFile(wb, "Product_Price.xlsx"); // download file
}
