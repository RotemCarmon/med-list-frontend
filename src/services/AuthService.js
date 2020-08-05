import httpService from './httpService';
import { BehaviorSubject } from 'rxjs';
import storageService from '../services/StorageService';


// SET THE USER OBSERVABLE
const currentUserSubject = new BehaviorSubject(storageService.getStorage('user'));

// LOGIN
async function login(userCred) {
  const { remember } = userCred;
  
  const payload = await httpService.post('auth/login', userCred);
  if (payload) {
    const { accessToken, refreshToken } = payload
    const {user} = await httpService.post('auth/decode', {accessToken})
      // send the user to the observable
      if(user) {
        currentUserSubject.next(user);
      }
      // save access token & user in local storage returns the user
      return _handleLoginStorage(accessToken, refreshToken, user, remember)
      } else {
    console.log('Email or password are incorrect');
    return
  }
}

// ADMIN SIGNUP THE USER
async function signup(userInfo) {
  userInfo.createdAt = Date.now();
  const user = await httpService.post('auth/signup', userInfo);
  if (user) {
    console.log('User has been registered', user);
  }
  return
}

// LOGOUT
async function logout() {
  // get refresh token from the local sorage 
  const refreshToken = storageService.getStorage('refresh token')
  await httpService.delete('auth/logout', { refreshToken });
  _clearStorage()
  currentUserSubject.next(null);
}

// EXPORT THE USER'S OBSERVABLE
export const currentObservedUser = currentUserSubject.asObservable()

// EXPORT USER PREMISSIONS
export const permissions = {
  Guest: 'Guest',
  User: 'User',
  Moderator: 'Moderator',
  Admin: 'Admin'
}

export default {
  login,
  signup,
  logout
}

// SAVE TO STORAGE
async function _handleLoginStorage(accessToken, refreshToken, user, remember) {
  storageService.setStorage('access token', accessToken)
  storageService.setStorage('refresh token', refreshToken)
  storageService.setStorage('user', user)
  storageService.setStorage('remember me', remember)
  return user;
}

function _clearStorage(){
  storageService.removeStorage('user')
  storageService.removeStorage('access token')
  storageService.removeStorage('refresh token')
  storageService.removeStorage('remember me')
}