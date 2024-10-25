import { useDispatch } from 'react-redux';
import { ExclamationTriangleIcon } from '@heroicons/react/16/solid';
import { closeModal } from '../modalSlice';
import { handleLogout } from '../../../utils/authUtil';

function SessionExpiredModal({ isOpen }) {
  const dispatch = useDispatch();

  const handleLoginRedirect = (e) => {
    dispatch(closeModal(e));
     handleLogout();
    window.location.href = '/auth/login';
  };

  return (
    <>
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box bg-base-100">
          {/* Icon with bounce animation */}
          <div className="icon-container flex justify-center mb-4">
            <ExclamationTriangleIcon className="h-14 w-14 text-yellow-500 dark:text-yellow-300 animate-bounce" />
          </div>

          <h3 className="font-semibold text-2xl pb-6 text-center">
            Session has expired
          </h3>

          {/* Message */}
          <p className="text-center text-xl mb-8 text-gray-700 dark:text-gray-200">
            Please Log in again to continue using the app.
          </p>

          {/* Buttons */}
          <div className="modal-action mt-6 flex justify-center space-x-4">
            <button
              className="btn mt-2 w-30 bg-neutral text-white hover:bg-neutral-700 dark:bg-neutral-300 dark:text-black dark:hover:bg-neutral-400"
              onClick={(e) => handleLoginRedirect(e)}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SessionExpiredModal;
