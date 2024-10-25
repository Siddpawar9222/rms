import { useDispatch, useSelector } from "react-redux";
import { setPageTitle, showNotification } from "../../../../features/common/headerSlice";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { handleLogin } from "../../../../utils/authUtil";

const Dashboard = () => {

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      const params = new URLSearchParams(location.search);
      const jwtToken = params.get('jwtToken');
      const name =  params.get("name");
      const roles =  params.get("roles");

      if (jwtToken) {
        handleLogin({ name: name, role: roles, isAuthenticated: true, jwtToken : jwtToken });
        localStorage.setItem('jwtToken', jwtToken);
        dispatch(showNotification({ message: `Login Successful`, status: 1 }));
      }else{
            console.log("No jwtToken Found while Oauth2")
      }

    }
  }, [location.search]);




  useEffect(() => {
    dispatch(setPageTitle({ title: "Dashboard" }));
  }, []);

  return (
    <div>

    </div>
  )
}

export default Dashboard;
