import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landingPage/LandingPage';
import Layout from './pages/protected/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { removeNotificationMessage } from './features/common/headerSlice';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import NotFoundPage from './components/shared/NotFoundPage';
function App() {

  const dispatch = useDispatch();
  const { newNotificationMessage, newNotificationStatus } = useSelector(state => state.header)

  // For showing notification(toast)
  useEffect(() => {
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 1) NotificationManager.success(newNotificationMessage, 'Success')
      if (newNotificationStatus === 0) NotificationManager.error(newNotificationMessage, 'Error')
      dispatch(removeNotificationMessage())
    }
  }, [newNotificationMessage])

  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<LandingPage />} />
        <Route path="/app/*" element={<Layout />} />
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>

      {/** For showing notification */}
      <NotificationContainer />
    </> 
  );
}

export default App;
