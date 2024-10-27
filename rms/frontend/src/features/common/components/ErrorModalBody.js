import { useDispatch } from "react-redux";
import { closeModal } from "../modalSlice";
import { XCircleIcon } from "@heroicons/react/16/solid";

const ErrorModalBody = ({ isOpen, message }) => {
    const dispatch = useDispatch();

    const handleErrorModal = (e) => {
        dispatch(closeModal(e));
    };

    return (
        <>
            <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
                <div className="modal-box bg-base-100 animate-fade-in relative">
                    {/* Close button */}
                    <button className="btn btn-sm btn-circle absolute right-2 top-2 text-red-500 dark:text-red-400" onClick={(e) => handleErrorModal(e)}>
                        <XCircleIcon />
                    </button>

                    {/* Icon with red color and bounce animation */}
                    <div className="icon-container flex justify-center mb-4">
                        <XCircleIcon className="h-14 w-14 text-red-500 dark:text-red-400 animate-bounce" />
                    </div>

                    <h3 className="font-semibold text-2xl pb-6 text-center text-gray-800 dark:text-gray-100">
                        Error
                    </h3>

                    {/* Message */}
                    <p className="text-center text-xl mb-8 text-gray-700 dark:text-gray-300">
                        {message}
                    </p>

                    {/* Button */}
                    <div className="modal-action mt-6 flex justify-center space-x-4">
                        <button
                            className="btn mt-2 w-30 bg-red-500 text-white hover:bg-red-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
                            onClick={(e) => handleErrorModal(e)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorModalBody;
