import React, { useEffect, useState } from 'react';
import { FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getAllParticipantInfoApi } from "../../../../services/api/participant/ParticipantApi"
import { formatDate } from '../../../../utils/dateUtil';

const ParticipantInfo = ({ participant }) => {
  const { emailId } = useParams();

  console.log(emailId);

  const [userInfo, setUserInfo] = useState({});

  const getParticipantInfoFromApi = async (participantEmail) => {
    const response = await getAllParticipantInfoApi(participantEmail);

    if (response?.status == 200) {
      const participant = response?.data?.data;
      setUserInfo(participant);
    } else {
      console.log(response?.statusText);
    }
  }


  useEffect(() => {
    getParticipantInfoFromApi(emailId);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
        {/* <div className="relative bg-gray-300 dark:bg-gray-700 h-40 flex items-center justify-center">
          {userInfo.photo ? (
            <div className="relative group">
              <img
                src={`data:image/jpeg;base64,${userInfo.photo}`}
                alt={userInfo.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <a
                href={`data:image/jpeg;base64,${userInfo.photo}`}
                download={`${userInfo.name || 'profile-photo'}.jpg`}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
              >
                <FaDownload className="text-white text-2xl" />
              </a>
            </div>
          ) : (
            <div className="w-32 h-32 bg-gray-500 dark:bg-gray-600 text-white flex items-center justify-center rounded-full">
              {userInfo.name ? userInfo.name.charAt(0) : "N"}
            </div>
          )}
        </div> */}


        {/* User Details Section */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6">{userInfo?.name}</h1>
          <div className="divider mt-1"></div>
          <div className="mt-10 text-center">
           <h2 className="text-xl font-semibold mb-6">About</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <InfoItem label="Email" text={userInfo?.participantEmail} />
            <InfoItem label="Phone" text={userInfo?.mobile} />
            <InfoItem label="College" text={userInfo?.collegeName} />
            <InfoItem label="Passing Year" text={userInfo?.passingYear} />
            <InfoItem label="Career Stage" text={userInfo?.careerStage} />
            <InfoItem label="Attendance Mode" text={userInfo?.attendMode} />
            <InfoItem label="Interested In" text={userInfo?.campaignName} />
            <InfoItem label="Is any project available on Github" text={userInfo?.isProjectAvailable ? "Yes" : "No"} />
            <InfoItem label="Created Date" text={ formatDate(userInfo?.createDate)} />
            <InfoItem label="Updated Date" text={formatDate(userInfo?.updateDate)} />
            <InfoItem label="Referred Through" text={userInfo?.referral} />
          </div>

          {/* Resume Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Resume</h2>
            {/* <button className="btn btn-sm btn-outline mr-2">View</button> */}
            <button className="btn btn-sm btn-outline mr-2">Download</button>
            {/* <p className="text-gray-600">{userInfo.resume}</p> */}
          </div>
          
          <div className="divider mt-8"></div>

          <div className="mt-10 text-center">
            <h2 className="text-xl font-semibold mb-4">Social Accounts</h2>
            <div className="flex justify-center space-x-8">
              <a href={userInfo.linkdlnUrl} target="_blank" rel="noopener noreferrer" className=" hover:underline flex items-center">
                <FaLinkedin className=" h-6 w-6" />
              </a>

              <a href={userInfo.gitHubUrl} target="_blank" rel="noopener noreferrer" className=" hover:underline flex items-center">
                <FaGithub className=" h-6 w-6" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>



  );
};


const InfoItem = ({ label, text, isLink }) => (
  <div className="p-2 bg-base-100 rounded-md">
    <p className="font-semibold text-gray-700 dark:text-gray-300 ">{label}</p>
    {isLink ? (
      <a
        href={text}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 dark:text-blue-400 hover:underline break-words"
      >
        {text}
      </a>
    ) : (
      <p className="text-gray-600 dark:text-gray-400 break-words">{text}</p>
    )}
  </div>
);



export default ParticipantInfo;