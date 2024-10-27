// All components mapping with path for internal routes

import { lazy } from 'react'

 const Dashboard = lazy(() => import('../leftsidebar/dashboard/Dashboard'))
 const Participant = lazy(() => import('../leftsidebar/participant/Participant'))
 const ParticipantInfo = lazy(()=>import ('../leftsidebar/participant/ParticipantInfo'))
 const Campaign = lazy(() => import('../leftsidebar/Campaign'))
 const Batch = lazy(() => import('../leftsidebar/Batch'))
 const NotFoundPage = lazy(() => import('../../../components/shared/NotFoundPage'))

 const ProfileSettings = lazy(() => import('../leftsidebar/profile-settings/ProfileSettings'))


const compRoutes = [
  {
    path: '/dashboard', //  url
    component: Dashboard, // view rendered
  },
  {
    path: '/participant', // the url
    component: Participant, // view rendered
  },
  { 
    path : '/participant/:emailId',
    component : ParticipantInfo

  },
  {
    path: '/campaign',
    component: Campaign,
  },
  {
    path: '/batch',
    component: Batch,
  },
  {
    path: '/*',
    component: NotFoundPage,
  },

    {
    path: '/profile-settings',
    component: ProfileSettings,
  },
  // {
  //   path: '/transactions',
  //   component: Transactions,
  // },

  // {
  //   path: '/settings-billing',
  //   component: Bills,
  // },
  // {
  //   path: '/getting-started',
  //   component: GettingStarted,
  // },
  // {
  //   path: '/features',
  //   component: DocFeatures,
  // },
  // {
  //   path: '/components',
  //   component: DocComponents,
  // },
  // {
  //   path: '/integration',
  //   component: Integration,
  // },
  // {
  //   path: '/charts',
  //   component: Charts,
  // },
  // {
  //   path: '/404',
  //   component: Page404,
  // },
  // {
  //   path: '/blank',
  //   component: Blank,
  // },
]

export default compRoutes;
