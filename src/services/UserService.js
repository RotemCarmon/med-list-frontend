import httpService from './httpService';
import storageService from '../services/StorageService';


// GET USER FROM STORAGE
function getLoggedInUser() {
  return storageService.getStorage('user')
}

// GET USERS FROM DB
async function getUsers() {
  return await httpService.get('user')
}

// GET USER BY ID
async function getUsersById(userId) {
  return await httpService.get(`user/${userId}`)
}

// ADD USER
async function addUser(user){
  return await httpService.post('user', {user})
}

// EDIT USER
async function editUser(user) {
  return await httpService.put(`user/${user._id}`, user)
}

// DELETE USER
async function removeUser(userId) {
  return await httpService.delete(`user/${userId}`)
}

// CHANGE USER PASSWORD
async function changeUserPassword(userData) {
  return await httpService.put(`user/change-password`, userData)
}

// PASSWORD RESET REQUEST
async function forgotPassword(email) {
  const res = await httpService.post('mail/forgot', {email} );
  return res;
}

async function verifyEmail(email) {
  const res = await httpService.post('user/verify-email', {email})
  return !!res
  
}

function getEmptyUser() {
  return {
    fullName: "",
    company: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    password: "",
    permission: ""
  }
}


export default {

  getLoggedInUser,
  getUsers,
  getUsersById,
  getEmptyUser,
  editUser,
  removeUser,
  changeUserPassword,
  forgotPassword,
  verifyEmail,
  addUser

}