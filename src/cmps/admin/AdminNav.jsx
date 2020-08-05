import React from 'react'
import { NavLink } from 'react-router-dom'




const AdminNav = () => {
  return (
    <div className="admin-nav-container flex column">
      <NavLink exact to="/admin/">משתמשים</NavLink>
      <NavLink exact to="/admin/userEdit">הוספת משתמש</NavLink>
      <NavLink exact to="/admin/updateProducts">עדכון מחירון</NavLink>
    </div>
  )
}

export default AdminNav
