import TitleCard from "../../../components/Cards/TitleCard"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { getAllCampaigns as getAllCampaignsApi } from "../../../services/api/campaign/CampaignApi"
import { ClipboardDocumentCheckIcon } from "@heroicons/react/16/solid"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPageTitle } from "../../../features/common/headerSlice"
import { formatDate } from "../../../utils/dateUtil"
import { openModal } from "../../../features/common/modalSlice"
import { MODAL_TYPES } from "../../../utils/globalConstantUtil"
import { JWT_ERRORS } from "../../../utils/globalConstantUtil"
import { GoLinkExternal, GoPencil, GoTrash } from "react-icons/go";
import { HiEllipsisVertical, HiOutlineEye } from "react-icons/hi2"
import { BsDownload } from "react-icons/bs";
import { Link } from "react-router-dom"
import { handleLogout } from "../../../utils/authUtil"
import { downloadParticipantsCsvByCampaignIdApi } from "../../../services/api/campaign/CampaignApi"


const TopSideButtons = () => {


  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    // dispatch(openModal({title : "Add New Lead", bodyType : MODAL_BODY_TYPES.LEAD_ADD_NEW}))
  }


  return (
    <div className="inline-block float-right">
      <button className="btn px-6 font-bold btn-sm normal-case bg-neutral text-white hover:bg-neutral-700 dark:bg-neutral-300 dark:text-black dark:hover:bg-neutral-400" onClick={() => openAddNewLeadModal()}>
        Add New
      </button>
    </div>
  )
}

//MasterData is participant
const Campaign = () => {

  const { role } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [campaign, setCampaign] = useState([]);


  const getAllCampaigns = async () => {
    const response = await getAllCampaignsApi();
    //console.log(response);

    if (response?.status == 200) {
      const respArr = response?.data?.data;
      setCampaign(respArr);
      //console.log(campaign);
    } else {
      if (response?.status == 400) {
        if (JWT_ERRORS.includes(response?.statusText)) {
          dispatch(openModal({ title: "Session Expired", bodyType: MODAL_TYPES.SESSION_EXPIRED }))
        }
      } else {
        console.log("Error occurred while fetching data: ", response?.status);
        dispatch(openModal({ title: response?.statusText, bodyType: MODAL_TYPES.ERROR }))
      }
    }
  }

  const downloadParticipantCsvByCampaignId = async (campaignId,campaignName) => {
    const response = await downloadParticipantsCsvByCampaignIdApi(campaignId,campaignName);
    console.log(response);
    if (response?.status == 200) {

    } else {
      if (response?.status == 400) {
        if (JWT_ERRORS.includes(response?.statusText)) {
          dispatch(openModal({ title: "Session Expired", bodyType: MODAL_TYPES.SESSION_EXPIRED }))
        }
      } else {
        console.log("Error occurred while fetching data: ", response?.status);
        dispatch(openModal({ title: response?.statusText, bodyType: MODAL_TYPES.ERROR }))
      }
    }
  }



  useEffect(() => {
    getAllCampaigns();
    dispatch(setPageTitle({ title: "Campaign" }));
  }, []);


  return (
    <>
      <TitleCard title="All Campaign" topMargin="mt-2" TopSideButtons={role?.includes("admin") ? <TopSideButtons /> : ""}>

        <div className="  overflow-x-auto w-full bg-base-100">
          <table className="table w-full ">
            <thead>
              <tr>
                <th>Name</th>
                {/* <th>Course</th>
                <th>Created At</th>
                <th>Document Link</th> */}
                <th>Sheet Link</th>
                {role?.includes("admin") ? <th>Action</th> : ""}
              </tr>
            </thead>
            <tbody>
              {
                campaign.map((c, i) => {
                  return (
                    <tr key={i} className="hover">
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">{c?.name}</div>
                          </div>
                        </div>
                      </td>

                      {/* <td>{c?.course}</td>
                      <td>{formatDate(c?.createDate)}</td>
                      <td>
                        <a className="link" href={c?.googleDocLink} target="_blank" rel="noopener noreferrer">
                          <GoLinkExternal className="w-5 h-5 hover:text-primary" />
                        </a>
                      </td> */}
                      <td>
                        <a className="link" href={c?.googleSheetLink} target="_blank" rel="noopener noreferrer">
                          <GoLinkExternal className="w-5 h-5 hover:text-primary" />
                        </a>
                      </td>

                      {
                        role?.includes("admin") ?
                          // <td>
                          //    <div className=" dropdown dropdown-left dropdown-end">                     
                          //     <label tabIndex={0} className="btn btn-ghost btn-sm normal-case btn-square "><HiEllipsisVertical className="w-5 h-5" /></label>
                          //     <ul tabIndex={0}
                          //       // className=" dropdown-content menu menu-compact  p-2 shadow bg-base-100 rounded-box w-30 border border-base-300 z-40" 
                          //       className=" absolute block dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                          //       <li><Link to={`/app/participant/${c}`} ><HiOutlineEye className="w-5 h-5 mr-2" />View </Link></li>
                          //       <li><Link><GoPencil className="w-5 h-5 mr-2" />Edit</Link></li>
                          //       <li ><Link><GoTrash className="w-5 h-5 mr-2" />Delete</Link></li>
                          //       <li><Link><BsDownload className="w-5 h-5 mr-2" />Download CSV</Link></li>
                          //     </ul>
                          //   </div>
                          // </td>

                          <td>
                            <div className="flex items-center space-x-4">
                              <Link to={``} className="flex items-center tooltip" data-tip="View">
                                <HiOutlineEye className="w-5 h-5" />
                              </Link>
                              <Link className="flex items-center tooltip" data-tip="Edit">
                                <GoPencil className="w-5 h-5 " />
                              </Link>
                              <Link className="flex items-center tooltip" data-tip="Delete">
                                <GoTrash className="w-5 h-5 " />
                              </Link>
                              <Link className="flex items-center tooltip" data-tip="Download"
                                onClick={() => downloadParticipantCsvByCampaignId(c?.campaignId,c?.name)}
                              >
                                <BsDownload className="w-5 h-5 "/>
                              </Link>
                            </div>
                          </td>

                          : ""
                      }

                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );

}

export default Campaign;
