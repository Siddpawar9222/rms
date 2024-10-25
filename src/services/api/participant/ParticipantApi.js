import { axiosDownloadFileConfig } from "../axiosconfig/axiosDownloadFileConfig";
import customAxiosConfig from "../CustomAxiosConfig";

export const getAllParticipantsApi = async (pageNumber, pageSize, queryParam) => {
  try {
    //console.log(pageNumber,pageSize)
    const { status, data } = await customAxiosConfig()?.get(`/participants?pageNumber=${pageNumber}&pageSize=${pageSize}${!queryParam ? "" : queryParam}`);

    return { status, data };
  } catch (error) {
    console.log(`Error in getAllParticipantsApi: ${error}`);
    if (error.response) {
      const { status, data } = error.response;
      console.log(`Error Status: ${status}, Message: ${data.message}`);
      return { status, statusText: data.message };
    } else if (error.request) {
      console.log("Request was made but no response received", error.request);
      return {
        status: 0,
        statusText: "Request was made but no response received",
      };
    } else {
      console.log(
        "Error occurred while setting up the request:",
        error.message
      );
      return {
        status: 0,
        statusText: "Error occurred while setting up the request:",
      };
    }
  }
};


// ================================================// 

export const getAllParticipantInfoApi = async (participantEmail) => {
  try {

    const { status, data } = await customAxiosConfig()?.get(`/participants/${participantEmail}`);

    return { status, data };
  } catch (error) {
    console.log(`Error in getAllParticipantsApi: ${error}`);
    if (error.response) {
      const { status, data } = error.response;
      console.log(`Error Status: ${status}, Message: ${data.message}`);
      return { status, statusText: data.message };
    } else if (error.request) {
      console.log("Request was made but no response received", error.request);
      return {
        status: 0,
        statusText: "Request was made but no response received",
      };
    } else {
      console.log(
        "Error occurred while setting up the request:",
        error.message
      );
      return {
        status: 0,
        statusText: "Error occurred while setting up the request:",
      };
    }
  }
};


// ==================================================//



export const downloadAllParticipants = async () => {
  return axiosDownloadFileConfig(
    { 
      methodName: "downloadParticipantsCsvByCampaignIdApi", 
      URL: `/participants/download`, 
      fileType: "text/csv", 
      fileName: `master-data.csv`}
  );
};