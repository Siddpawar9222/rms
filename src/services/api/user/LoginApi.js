//import axios from "axios";
import customAxiosConfig from "../CustomAxiosConfig";

// const BASEURL = process.env.REACT_APP_SPRING_URL;
// console.log(BASEURL);


 const loginApi = async ({emailId,password}) => {
    try {
      const { status, data } = await customAxiosConfig().post(`/api/auth/login`, {
            email: emailId,
            password
      });
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


export default loginApi ;