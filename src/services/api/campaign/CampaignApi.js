// import axiosInstance from "../CustomAxiosConfig";
// import axios from "axios";

import { axiosDownloadFileConfig } from "../axiosconfig/axiosDownloadFileConfig";
import customAxiosConfig from "../CustomAxiosConfig";


 export const getAllCampaigns = async () => {
    try {
      //const { status, data } = await axios.get(`${BASEURL}/campaigns`);
      const { status, data } = await customAxiosConfig().get(`/campaigns`);

      return { status, data };
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        console.log(`Error Status: ${status}, Message: ${data.message}`);
        return { status, statusText:data.message };
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

export const downloadParticipantsCsvByCampaignIdApi = async (campaignId, campaignName) => {
  return axiosDownloadFileConfig(
    { 
      methodName: "downloadParticipantsCsvByCampaignIdApi", 
      URL: `/participants/download/${campaignId}`, 
      fileType: "text/csv", 
      fileName: `${campaignName}-data.csv`}
  );
};