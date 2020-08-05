import React from 'react'
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);


const UserPreview = (props) => {
  let history = useHistory();
  const {_id, fullName, company, email, phone, streetAddress, city, permission, createdAt } = props.user
  
  const editUser = () => {
    history.push(`/admin/userEdit/${_id}`);
  };
  
  const removeUser = async () => {
    var isConfirmed = await sendConfirmMsg()
    if(isConfirmed.value){
      sendDeleteMsg()
      props.removeUser(_id)
    }
  }

  const sendConfirmMsg = () => {
    return MySwal.fire({
      title: '?למחוק את המשתשמש',
      text: "אי אפשר לבטל פעולה זאת לאחר מכן",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!כן, מחק',
      cancelButtonText: 'בטל'
    })
  }

  const sendDeleteMsg = () => {
    MySwal.fire(
      '!נמחק',
      'המשתמש נמחק בהצלחה',
      'success'
    )
  }

  const changePassword = () => {
    history.push(`/admin/change-password/${_id}`)
  }

  const address = city ? streetAddress + ", " + city : streetAddress
  return (
    <tr className="user-preview-container">
      <td>{ _id }</td>
      <td>{ fullName }</td>
      <td>{ company }</td>
      <td>{ email }</td>
      <td>{ phone }</td>
      <td>{ address }</td>
      <td>{ permission }</td>
      <td>{ moment(+createdAt).format("L") }</td>
      <td className="action-btn" ><button onClick={editUser} className="sec-btn">ערוך</button></td>
      <td className="action-btn" ><button onClick={removeUser} className="sec-btn">מחק</button></td>
      <td className="action-btn" ><button onClick={changePassword} className="sec-btn">שנה סיסמה</button></td>
    </tr>
  )
}

export default UserPreview
