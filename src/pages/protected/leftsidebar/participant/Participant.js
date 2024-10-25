import { useEffect, useState } from "react"
import TitleCard from "../../../../components/Cards/TitleCard"
import { getAllParticipantsApi } from "../../../../services/api/participant/ParticipantApi"
import { useDispatch, useSelector } from "react-redux"
import { setPageTitle } from "../../../../features/common/headerSlice"
import Pagination from "./Pagination"
import TopSideButtons from "./TopSideButtons"
import { Link } from "react-router-dom"
import { JWT_ERRORS, MODAL_TYPES } from "../../../../utils/globalConstantUtil"
import { openModal } from "../../../../features/common/modalSlice"

import { HiEllipsisVertical } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi";
import { GoPencil } from "react-icons/go";
import { GoTrash } from "react-icons/go";


// const dummyP = [
//   {
//     "participantEmail": "chandan@email.com",
//     "name": "Chandan Pandey",
//     "mobile": "762005545",
//     "linkdlnUrl": "https://linkedin.com/in/chandan-pandey",
//     "gitHubUrl": "https://github.com/chandan-pandey",
//     "resume": "noresume",
//     "careerStage": "More than 1 year",
//     "attendMode": "offline",
//     "collegeName": "IIT",
//     "createDate": "2024-09-27 13:32:30",
//     "updateDate": "2024-09-27 13:32:30",
//     "referral": "Whatsapp",
//     "campaignId": 2,
//     "isProjectAvailable": true,
//     "yearOfPassing": 2022
//   },
//   {
//     "participantEmail": "pavan@email.com",
//     "name": "Pavan R",
//     "mobile": "9623930834",
//     "linkdlnUrl": "https://linkedin.com/in/pavan-r",
//     "gitHubUrl": "https://github.com/pavan-r",
//     "resume": "No resume",
//     "careerStage": "Did Internship",
//     "attendMode": "offline",
//     "collegeName": "MMIIT",
//     "createDate": "2024-09-27 13:32:30",
//     "updateDate": "2024-09-27 13:32:30",
//     "referral": "LinkedIn",
//     "campaignId": 2,
//     "isProjectAvailable": false,
//     "yearOfPassing": 2021
//   },
//   {
//     "participantEmail": "siddpawar583@gmail.com",
//     "name": "Siddhesh Pawar",
//     "mobile": "9623930834",
//     "linkdlnUrl": "https://linkedin.com/in/siddhesh-pawar",
//     "gitHubUrl": "https://github.com/siddhesh-pawar",
//     "resume": "https://example.com/resume",
//     "careerStage": "Fresher",
//     "attendMode": "online",
//     "collegeName": "",
//     "createDate": "2024-09-27 13:32:27",
//     "updateDate": "2024-09-27 13:32:27",
//     "referral": "Whatsapp",
//     "campaignId": 1,
//     "isProjectAvailable": true,
//     "yearOfPassing": 2024
//   },
//   {
//     "participantEmail": "rohit@email.com",
//     "name": "Rohit Kumar",
//     "mobile": "9823948201",
//     "linkdlnUrl": "https://linkedin.com/in/rohit-kumar",
//     "gitHubUrl": "https://github.com/rohit-kumar",
//     "resume": "https://example.com/resume-rohit",
//     "careerStage": "Less than 1 year",
//     "attendMode": "offline",
//     "collegeName": "BMS College of Engineering",
//     "createDate": "2024-09-26 09:10:15",
//     "updateDate": "2024-09-26 09:10:15",
//     "referral": "Campus",
//     "campaignId": 3,
//     "isProjectAvailable": true,
//     "yearOfPassing": 2023
//   },
//   {
//     "participantEmail": "ananya@email.com",
//     "name": "Ananya Sharma",
//     "mobile": "9812345678",
//     "linkdlnUrl": "https://linkedin.com/in/ananya-sharma",
//     "gitHubUrl": "https://github.com/ananya-sharma",
//     "resume": "https://example.com/resume-ananya",
//     "careerStage": "More than 1 year",
//     "attendMode": "online",
//     "collegeName": "BITS Pilani",
//     "createDate": "2024-09-25 10:05:45",
//     "updateDate": "2024-09-25 10:05:45",
//     "referral": "Referral",
//     "campaignId": 2,
//     "isProjectAvailable": false,
//     "yearOfPassing": 2021
//   },
//   {
//     "participantEmail": "ananya@email.com",
//     "name": "Ananya Sharma",
//     "mobile": "9812345678",
//     "linkdlnUrl": "https://linkedin.com/in/ananya-sharma",
//     "gitHubUrl": "https://github.com/ananya-sharma",
//     "resume": "https://example.com/resume-ananya",
//     "careerStage": "More than 1 year",
//     "attendMode": "online",
//     "collegeName": "BITS Pilani",
//     "createDate": "2024-09-25 10:05:45",
//     "updateDate": "2024-09-25 10:05:45",
//     "referral": "Referral",
//     "campaignId": 2,
//     "isProjectAvailable": false,
//     "yearOfPassing": 2021
//   },
//   {
//     "participantEmail": "ananya@email.com",
//     "name": "Ananya Sharma",
//     "mobile": "9812345678",
//     "linkdlnUrl": "https://linkedin.com/in/ananya-sharma",
//     "gitHubUrl": "https://github.com/ananya-sharma",
//     "resume": "https://example.com/resume-ananya",
//     "careerStage": "More than 1 year",
//     "attendMode": "online",
//     "collegeName": "BITS Pilani",
//     "createDate": "2024-09-25 10:05:45",
//     "updateDate": "2024-09-25 10:05:45",
//     "referral": "Referral",
//     "campaignId": 2,
//     "isProjectAvailable": false,
//     "yearOfPassing": 2021
//   },

//   {
//     "participantEmail": "ananya@email.com",
//     "name": "Ananya Sharma",
//     "mobile": "9812345678",
//     "linkdlnUrl": "https://linkedin.com/in/ananya-sharma",
//     "gitHubUrl": "https://github.com/ananya-sharma",
//     "resume": "https://example.com/resume-ananya",
//     "careerStage": "More than 1 year",
//     "attendMode": "online",
//     "collegeName": "BITS Pilani",
//     "createDate": "2024-09-25 10:05:45",
//     "updateDate": "2024-09-25 10:05:45",
//     "referral": "Referral",
//     "campaignId": 2,
//     "isProjectAvailable": false,
//     "yearOfPassing": 2021
//   },

//   {
//     "participantEmail": "ananya@email.com",
//     "name": "Ananya Sharma",
//     "mobile": "9812345678",
//     "linkdlnUrl": "https://linkedin.com/in/ananya-sharma",
//     "gitHubUrl": "https://github.com/ananya-sharma",
//     "resume": "https://example.com/resume-ananya",
//     "careerStage": "More than 1 year",
//     "attendMode": "online",
//     "collegeName": "BITS Pilani",
//     "createDate": "2024-09-25 10:05:45",
//     "updateDate": "2024-09-25 10:05:45",
//     "referral": "Referral",
//     "campaignId": 2,
//     "isProjectAvailable": false,
//     "yearOfPassing": 2021
//   }
// ]

const INTIAL_PAGINATION_DATA = {
  "pageSize": 3,
  "pageNumber": 0,
  "totalElements": 0,
  "totalPages": 1,
  "lastPage": true,
  "firstPage": true,
}

//MasterData is participant
const Participant = () => {

  const dispatch = useDispatch();
  const { role } = useSelector(state => state.auth);
  const [participant, setparticipant] = useState([]);  //participants info
  const [paginationData, setPaginationData] = useState(INTIAL_PAGINATION_DATA); // pagination info
  const [queryParam, setQueryParam] = useState(""); // filter query

  //const [participant, setparticipant] = useState(dummyP);

  const getParticipants = async (pageNumber, pageSize, queryParam) => {
    //console.log(queryParam);
    const response = await getAllParticipantsApi(pageNumber, pageSize, queryParam);

    console.log("queryParam " + queryParam);

    if (response?.status == 200) {
      const participants = response?.data?.data;
      setparticipant(participants?.content);
      setPaginationData(
        {
          "pageSize": participants?.pageSize,
          "pageNumber": participants?.pageNumber,
          "totalElements": participants?.totalElements,
          "totalPages": participants?.totalPages,
          "firstPage": participants?.firstPage,
          "lastPage": participants?.lastPage
        });
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



  const handleQueryParam = (query) => {
    setQueryParam(query);
  };

  const removeFilter = () => {
    //setTrans(RECENT_TRANSACTIONS)
  }

  const applyFilter = (params) => {
    // let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {return t.location == params})
    // setTrans(filteredTransactions)
  }

  // Search according to name
  const applySearch = (value) => {
    // let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {return t.email.toLowerCase().includes(value.toLowerCase()) ||  t.email.toLowerCase().includes(value.toLowerCase())})
    // setTrans(filteredTransactions)
  }

  const handlePageChange = (obj) => {
    console.log("handlePageChange ", obj);
    setPaginationData({ ...paginationData, ...obj });
  };

  // useEffect(() => {
  //   getParticipants();
  //   dispatch(setPageTitle({ title: "Participant" }));
  // }, [])

  useEffect(() => {
    getParticipants(paginationData.pageNumber, paginationData.pageSize, queryParam);
    dispatch(setPageTitle({ title: "Participant" }));
  }, [paginationData.pageNumber, paginationData.pageSize, queryParam])

  return (
    <>
      <TitleCard title="All Participants" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter} handleQueryParam={handleQueryParam} />}>

        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full " >
          <table className="table  w-full" >
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th >Name</th>
                <th >Email-Id</th>
                {/* <th >Passing Year</th> */}
                {/* <th >Experience Level</th> */}
                {/* <th >Project Available</th> */}
                <th >Contact No</th>
                {role?.includes("admin") ? <th>Action</th> : ""}
              </tr>
            </thead>
            <tbody>
              {
                participant?.map((obj, i) => {
                  return (
                    <tr key={i} className="hover">
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {obj?.name}</th>
                      <td >{obj?.participantEmail}</td>
                      {/* <td >{obj?.passingYear}</td> */}
                      {/* <td >{obj?.careerStage}</td> */}
                      {/* <td >{obj?.isProjectAvailable ? <div className="badge badge-success">Yes</div> : <div className="badge badge-error">No</div>}</td> */}
                      <td >{obj?.mobile}</td>
                      {
                        role?.includes("admin") ?

                          /* <td>
                      <div className="dropdown dropdown-left dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-sm normal-case btn-square "><HiEllipsisVertical className="w-5 h-5" /></label>
                        <ul tabIndex={0} className="dropdown-content menu menu-compact  p-2 shadow bg-base-100 rounded-box w-30 border border-base-300 z-40">
                          <li><Link to={`/app/participant/${obj.participantEmail}`} ><HiOutlineEye className="w-5 h-5 mr-2" />View </Link></li>
                          <li><Link><GoPencil className="w-5 h-5 mr-2" />Edit</Link></li>
                          <li><Link><GoTrash className="w-5 h-5 mr-2" />Delete</Link></li>
                        </ul>
                      </div>
                    </td> */
                          <td>
                            <div className="flex items-center space-x-4">
                              <Link to={`/app/participant/${obj?.participantEmail}`} className="flex items-center tooltip" data-tip="View">
                                <HiOutlineEye className="w-5 h-5" />
                              </Link>
                              <Link className="flex items-center tooltip" data-tip="Edit">
                                <GoPencil className="w-5 h-5 " />
                              </Link>
                              <Link className="flex items-center tooltip" data-tip="Delete">
                                <GoTrash className="w-5 h-5 " />
                              </Link>
                            </div>
                          </td>
                          :

                          ""
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>


        </div>
        <div className="divider mt-2"></div>
        {/* Pagination component */}
        <Pagination paginationData={paginationData} handlePageChange={handlePageChange} />
      </TitleCard>
    </>




  );
}

export default Participant;

