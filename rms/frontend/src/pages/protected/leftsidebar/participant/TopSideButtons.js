import { useEffect, useState } from "react"
import SearchBar from '../../../../components/Input/SearchBar'
import { downloadAllParticipants } from "../../../../services/api/participant/ParticipantApi";
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import { ArrowPathIcon, } from "@heroicons/react/16/solid"
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { HiEllipsisVertical } from "react-icons/hi2";
import { BsDownload } from "react-icons/bs";
import { Link } from "react-router-dom";
import { JWT_ERRORS, MODAL_TYPES } from "../../../../utils/globalConstantUtil";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../features/common/modalSlice";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch, handleQueryParam }) => {
  
  const dispatch = useDispatch();

  // Filter data
  const experienceLevels = ["Fresher", "Did Internsip", "Less than 1 year", "More than 1 year"];
  const yearOfPassing = ["Before 2021", "2021", "2022", "2023", "2024"];

  // Filter state(open or closed)
  //const [filterParam, setFilterParam] = useState("")
  const [searchText, setSearchText] = useState("")
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [passingYearOpen, setPassingYearOpen] = useState(false);

  // ================================================== //
  // experience level
  const [checkedExpLevelState, setCheckedExpLevelState] = useState(
    new Array(experienceLevels.length).fill(false)
  );

  const [selectedExpLevel, setSelectedExpLevel] = useState([]);


  // passing year 
  const [checkedPassingYearState, setCheckedPassingYearState] = useState(
    new Array(yearOfPassing.length).fill(false)
  );


  const [selectedPassingYear, setSelectedPassingYear] = useState([]);

  // is project available

  const [isProjectAvailable, setIsProjectAvailable] = useState(false);



  const handleOnChangeForExpLevel = (position) => {
    const updatedCheckedState = checkedExpLevelState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedExpLevelState(updatedCheckedState);

    const updatedExpLevel = updatedCheckedState.reduce(
      (selected, currentState, index) => {
        if (currentState === true) {
          return [...selected, experienceLevels[index]];
        }
        return selected.filter(expLevel => expLevel !== experienceLevels[index]);
      },
      []
    );
    setSelectedExpLevel(updatedExpLevel);
  };



  const handleOnChangeForPassingYear = (position) => {
    const updatedCheckedState = checkedPassingYearState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedPassingYearState(updatedCheckedState);

    const updatedPassingYear = updatedCheckedState.reduce(
      (selected, currentState, index) => {
        if (currentState === true) {
          return [...selected, yearOfPassing[index]];
        }
        return selected.filter(py => py !== yearOfPassing[index]);
      },
      []
    );
    setSelectedPassingYear(updatedPassingYear);
  };



  const buildQueryParam = () => {
    let queryParams = "";
    if (selectedExpLevel.length > 0) {
      const expLevels = selectedExpLevel.join(",");
      queryParams += `&expLevels=${expLevels}`;
    }
    if (selectedPassingYear.length > 0) {
      const passingYears = selectedPassingYear.join(",");
      queryParams += `&passingYears=${passingYears}`;
    }
    if (isProjectAvailable) {
      queryParams += `&isProjectAvailable=${isProjectAvailable}`;
    }
    //console.log(queryParams);
    return queryParams;  // No query if the array is empty
  };  


  const downloadExcel = async() =>{
       const response =   await downloadAllParticipants();

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


  // const showFiltersAndApply = (params) => {
  //   applyFilter(params)
  //   setFilterParam(params)
  // }

  // const removeAppliedFilter = () => {
  //   removeFilter()
  //   setFilterParam("")
  //   setSearchText("")
  // } 


  useEffect(() => {
    const queryParam = buildQueryParam();
    handleQueryParam(queryParam);
  }, [selectedExpLevel, selectedPassingYear, isProjectAvailable]);





  // useEffect(() => {
  //   if (searchText == "") {
  //     removeAppliedFilter()
  //   } else {
  //     applySearch(searchText)
  //   }
  // }, [searchText])

  // console.log(selectedPassingYear)
  // console.log(selectedExpLevel)


  return (

    <div>
      {/* Refresh Button */}
      <button className="btn btn-ghost btn-sm normal-case mr-4">
        <ArrowPathIcon className="w-4 mr-2" />
        Refresh Data
      </button>

      {/* Applied Filter Display
      {filterParam !== "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )} */}

      {/* Filter Dropdown */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </div>
        <ul tabIndex={0}
          className="relative dropdown-content menu text-sm shadow-lg bg-base-100 rounded-box w-80 p-5 border border-base-300 space-y-6 mt-5 z-40 "
        //For small device
        // className="fixed inset-x-0 top-auto bottom-0 sm:absolute sm:inset-auto sm:right-0 sm:top-full mt-2 w-full sm:w-60 bg-base-100 rounded-box shadow-lg border border-base-300 p-5 space-y-6 z-40"


        >

          <SearchBar searchText={searchText} setSearchText={setSearchText} />

          {/* Experience Filter */}
          <div>
            <button
              className="flex justify-between items-center w-full py-2"
              onClick={() => setExperienceOpen(!experienceOpen)}
            >
              <span className="font-semibold">Experience Level</span>
              {experienceOpen ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
            {experienceOpen && (
              <div className="mt-2 space-y-2">
                {experienceLevels.map((exp, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={checkedExpLevelState[i]}
                      onChange={() => handleOnChangeForExpLevel(i)}
                    />
                    <span>{exp}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Passing Year Filter */}
          <div>
            <button
              className="flex justify-between items-center w-full py-2"
              onClick={() => setPassingYearOpen(!passingYearOpen)}
            >
              <span className="font-semibold">Passing Year</span>
              {passingYearOpen ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
            {passingYearOpen && (
              <div className="mt-2 space-y-2">
                {yearOfPassing.map((py, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={py}
                      checked={checkedPassingYearState[i]} 
                      onChange={() => handleOnChangeForPassingYear(i)}
                    />
                    <span>{py}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Project Availability Toggle (No dropdown) */}
          <div>
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold">Project Availability</span>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="toggle" checked={isProjectAvailable}
                  onChange={(e) => setIsProjectAvailable(e.target.checked)} />
              </label>
            </div>
          </div>

        </ul>
      </div>

      <div className="dropdown dropdown-bottom dropdown-end  ml-2">
                    <label tabIndex={0} className="btn btn-ghost btn-sm normal-case btn-square "><HiEllipsisVertical className="w-5 h-5"/></label>
                    <ul tabIndex={0} className="dropdown-content menu menu-compact  p-2 shadow bg-base-100 rounded-box border border-base-300">
                        <li><Link
                           onClick  = {() => downloadExcel()}
                        ><BsDownload className="w-4 h-5 mr-2"/>Download</Link></li>
                    </ul>
                </div>

    </div>


  )
}


export default TopSideButtons;