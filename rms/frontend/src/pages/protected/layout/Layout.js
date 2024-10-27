// import RightSidebar from './RightSidebar'
import 'react-notifications/lib/notifications.css';
import LeftSidebar from '../../../features/sidebar/LeftSidebar';
import PageContent from './PageContent';
import ModalLayout from './ModalLayout';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ParticipantInfo from '../leftsidebar/participant/ParticipantInfo';
// import ModalLayout from "./ModalLayout"

function Layout() {

  const {showLeftDrawer} =  useSelector((state)=>state.header);

  
  console.log("showLeftDrawer " +  showLeftDrawer)

  return ( 
      <>
      { /* Left drawer - containing page content and side bar (always open for large screens) */}
      {/* <div className={`drawer lg:drawer-${showLeftDrawer ? 'open ' : 'close '}` }>  */}
      <div className={`drawer ${showLeftDrawer ? 'lg:drawer-open' : ''}`}>
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <LeftSidebar />
        <PageContent />
      </div>

      { /* Right drawer - containing secondary content like notifications list etc.. */}
      {/* <RightSidebar /> */}


      {/* Modal layout container */}
      <ModalLayout />
      
      {/* <ParticipantInfo/> */}

    </>



  )
}

export default Layout