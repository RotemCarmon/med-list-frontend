import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import UserPreview from "./UserPreview";

const AdminUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [change, setChange] = useState("");
  useEffect(() => {
    const getUsers = async () => {
      const usersToShow = await UserService.getUsers();
      if (!usersToShow) {
        props.history.push("/login");
      } else {
        setUsers(usersToShow);
      }
    };
    getUsers();
  }, [change]);

  const removeUser = (userId) => {
    UserService.removeUser(userId);
    setChange(userId);
  };

  return (
    <div className="admin-users-container flex grow-1">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>שם</th>
            <th>חברה</th>
            <th>דואר אלקטרוני</th>
            <th>טלפון</th>
            <th>כתובת</th>
            <th>רמת הרשאה</th>
            <th>תאריך יצירה</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <UserPreview
                  user={user}
                  removeUser={removeUser}
                  key={user._id}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
