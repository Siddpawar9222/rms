import { useDispatch, useSelector } from "react-redux";
import SessionExpiredModal from "../../../features/common/components/SessionExpiredModalBody";
import { closeModal } from "../../../features/common/modalSlice";
import { MODAL_TYPES } from "../../../utils/globalConstantUtil";
import ErrorModalBody from "../../../features/common/components/ErrorModalBody";

const ModalLayout = () => {

    const { isOpen, bodyType, size, title } = useSelector(state => state.modal);
    const dispatch = useDispatch();
    
    return (
        <>
            {
                {
                    [MODAL_TYPES.SESSION_EXPIRED]: <SessionExpiredModal isOpen={isOpen} />,
                    [MODAL_TYPES.ERROR]: <ErrorModalBody isOpen={isOpen} message={title}/>,
                    [MODAL_TYPES.DEFAULT]: <div></div>
                }[bodyType]
            } 
            
             {/* <ErrorModalBody/> */}
        </>);
}

export default ModalLayout;