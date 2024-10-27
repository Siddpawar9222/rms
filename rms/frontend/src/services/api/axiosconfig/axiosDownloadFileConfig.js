import customAxiosConfig from "../CustomAxiosConfig";

export const axiosDownloadFileConfig = async ({ methodName, URL, fileType, fileName }) => {
  try {
    // Make the request using Axios with the response type set to 'blob' for file downloads
    const { status, data } = await customAxiosConfig()?.get(URL, {
      responseType: 'blob',        // 'blob' type is required for downloading files
    });

    // Create a URL from the blob and trigger the download
    const blob = new Blob([data], { type: `${fileType}` }); // Specify file type, change if needed
    const url = window.URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}`); // File name for download
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);

    return { status, statusText: "File downloaded successfully" };
  } catch (error) {
    console.log(`Error in ${methodName}: ${error}`);

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
        statusText: "Error occurred while setting up the request",
      };
    }
  }
};