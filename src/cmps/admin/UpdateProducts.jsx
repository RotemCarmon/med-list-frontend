import React from "react";
import ProductService from "../../services/ProductService";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UpdateProducts = () => {
  let history = useHistory();
  const uplaodProducts = async (ev) => {
    // get the file from the HTML input element
    const file = await ev.target.files[0];

    // return if no file was selected
    if (!file) return;

    const updatedProducts = ProductService.updateProducts(file);
    if (updatedProducts) sendUserMsg();
  };

  const sendUserMsg = () => {
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "מחירון התרופות עודכן בהצלחה",
      showConfirmButton: true,
      timer: 3500,
    }).then(() => {
      history.replace("/admin");
    });
  };

  return (
    <div className="update-products-container text-center pad-start-mid">
      <h1>עדכן טבלת תרופות</h1>
      <div className="upload-file">
        <button className="btn upload-btn">העלאת קובץ</button>
        <input type="file" onChange={uplaodProducts} />
      </div>
    </div>
  );
};

export default UpdateProducts;
