import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";

const Batch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle({ title: "Batch" }));
  }, []);
  return (
    <div>
        {/* <h1 className="text-3xl font-bold underline">Batch</h1> */}
    </div>
  )
}

export default Batch
