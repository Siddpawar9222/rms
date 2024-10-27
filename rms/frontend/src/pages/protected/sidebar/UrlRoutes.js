/** Icons are imported separatly to reduce build time */

import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import { MegaphoneIcon ,UserGroupIcon, CircleStackIcon,PowerIcon } from '@heroicons/react/16/solid'


const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const urlRoutes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '/app/participant', // url
    icon: <CircleStackIcon className={iconClasses}/>, // icon component
    name: 'Participant', // name that appear in Sidebar
  },
  {
    path: '/app/campaign', // url
    icon: <MegaphoneIcon className={iconClasses}/>, // icon component
    name: 'Campaign', // name that appear in Sidebar
  },
  {
    path: '/app/batch', // url
    icon: <UserGroupIcon className={iconClasses}/>, // icon component
    name: 'Batch', // name that appear in Sidebar
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Settings', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/profile-settings', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Profile', // name that appear in Sidebar
      },
      {
        path: '/app/logout', // url
        icon: <PowerIcon className={submenuIconClasses}/>, // icon component
        name: 'Logout', // name that appear in Sidebar
      },
    ]
  },

  
]

export default urlRoutes ;


