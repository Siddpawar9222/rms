import { createSlice } from '@reduxjs/toolkit'

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        pageTitle: "Home",  // current page title 
        noOfNotifications : 15,  // no of unread notifications(not need right now) 
        newNotificationMessage : "",  // message of notification to be shown
        newNotificationStatus : 1,   // to check the notification type -  success/ error/ info
        showLeftDrawer : true    // to show/hide left sidebar
    },
    reducers: {

        setPageTitle: (state, action) => {
            state.pageTitle = action.payload.title
        },


        removeNotificationMessage: (state, action) => {
            state.newNotificationMessage = ""
        },

        showNotification: (state, action) => {
            state.newNotificationMessage = action.payload.message
            state.newNotificationStatus = action.payload.status
        },

        toggleLeftDrawer : (state,action) => {
              state.showLeftDrawer = !state.showLeftDrawer
        }
    }
})

export const { setPageTitle, removeNotificationMessage, showNotification,toggleLeftDrawer } = headerSlice.actions

export default headerSlice.reducer