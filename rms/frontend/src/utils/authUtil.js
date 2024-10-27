// src/redux/authActions.js
import { loginSuccess, logout } from '../features/common/authSlice'; // Import your actions
import { store, persistor } from '../redux/store'

export function handleLogin(userData) {
    localStorage.setItem("jwtToken", userData?.jwtToken);
    store.dispatch(loginSuccess(userData));
} 


export function handleLogout() {
    // Dispatch the logout action to clear auth state in Redux
    store.dispatch(logout());

    // Purge the persisted state from Redux Persist
    persistor.purge();

    localStorage.removeItem('jwtToken');

    // Redirect to the login page after logging out
    window.location.replace('/auth/login');
}
