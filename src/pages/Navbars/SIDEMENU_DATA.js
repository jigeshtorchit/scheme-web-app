// import { FaUserLock, FaUsersGear} from 'react-icons/fa6';
// import { BiCalendarEdit, BiNotepad, BiSolidPieChartAlt2, BiSolidUser, BiSolidUserDetail } from 'react-icons/bi';
// import { SiGooglesheets } from 'react-icons/si';
import { MdOutlineAdminPanelSettings, MdOutlineSchema } from 'react-icons/md';
// import { AiOutlineProject } from 'react-icons/ai';
// import { GiShakingHands } from 'react-icons/gi';
// import { IoSettingsOutline} from 'react-icons/io5';
// import { TbClockDollar, TbReportAnalytics, TbSpeakerphone } from 'react-icons/tb';
// import { PiStudentDuotone, PiUserSwitch } from 'react-icons/pi';
// import { BsBuildingGear, BsTicketPerforated } from 'react-icons/bs';
// import { LiaMoneyCheckAltSolid } from 'react-icons/lia';
// import { SlCalender} from 'react-icons/sl';
// import { RiChatSettingsLine, RiFileUserLine} from 'react-icons/ri';
// import { VscSettings} from 'react-icons/vsc';

export const sidebarItems = [
    {
      "id": 1,
      "label": "Dashboard",
      "parent_id": null,
      "icon": <MdOutlineAdminPanelSettings  size={20} />,
      "order_index": 1,
      "url": "/admindashboard"
    },
    {
      "id": 2,
      "label": "Schemes",
      "parent_id": null,
      "icon": <MdOutlineSchema size={20}/>,
      "order_index": 2,
      "url": "/scheme",
    },
    // {
    //   "id": 3,
    //   "label": "All Employees",
    //   "parent_id": null,
    //   "icon": <BiSolidUser size={20}/>,
    //   "order_index": 3,
    //   "url": "/employee",
    // },
    // {
    //   "id": 4,
    //   "label": "Attendance",
    //   "parent_id": null,
    //   "icon": <BiNotepad  size={20}/>,
    //   "order_index": 4,
    //   "url": "/attendance",
    // },
    // {
    //   "id": 6,
    //   "label": "Time Sheet",
    //   "parent_id": null,
    //   "icon": <SiGooglesheets  size={20}/>,
    //   "order_index": 6,
    //   "url": "/timeSheet",
    // },
    // {
    //   "id": 7,
    //   "label": "Leave",
    //   "parent_id": null,
    //   "icon": <SlCalender size={20}/>,
    //   "order_index": 7,
    //   "url": "/leave",
    // },
    // {
    //   "id": 8,
    //   "label": "Designation",
    //   "parent_id": null,
    //   "icon": <FaUsersGear  size={20}/>,
    //   "order_index": 8,
    //   "url": "/designation",
    // },
    // {
    //   "id": 9,
    //   "label": "Training",
    //   "parent_id": null,
    //   "icon": <PiStudentDuotone   size={20}/>,
    //   "order_index": 9,
    //   "url": "/training",
    // },
    // {
    //   "id": 10,
    //   "label": "Report",
    //   "parent_id": null,
    //   "icon": <BiSolidPieChartAlt2 size={20}/>,
    //   "order_index": 10,
    //   "url": "/products ",
    //   "children": [
    //     {
    //       "id": 11,
    //       "label": "User (Report)",
    //       "parent_id": 10,
    //       "icon": <RiFileUserLine size={20}/>,
    //       "order_index":1,
    //       "url": "/userReport"
    //     },
    //     {
    //       "id": 12,
    //       "label": "Attendance (Report)",
    //       "parent_id": 10,
    //       "icon":<TbReportAnalytics size={20}/>,
    //       "order_index": 2,
    //       "url": "/attendanceReport"
    //     }
    //     ,
    //     {
    //       "id": 13,
    //       "label": "Leave (Report)",
    //       "parent_id": 10,
    //       "icon":<BiCalendarEdit size={20}/>,
    //       "order_index": 3,
    //       "url": "/leaveReport"
    //     }
    //   ]
    // },
    // {
    //   "id": 14,
    //   "label": "Project",
    //   "parent_id": null,
    //   "icon": <AiOutlineProject size={20}/>,
    //   "order_index": 14,
    //   "url": "/project"
    // },
    // {
    //   "id": 15,
    //   "label": "PaySlip",
    //   "parent_id": null,
    //   "icon": <LiaMoneyCheckAltSolid size={20}/>,
    //   "order_index": 15,
    //   "url": "/payslip"
    // },
    // {
    //   "id": 16,
    //   "label": "Tickets",
    //   "parent_id": null,
    //   "icon": <BsTicketPerforated size={20}/>,
    //   "order_index": 16,
    //   "url": "/ticket"
    // },
    // {
    //   "id": 17,
    //   "label": "Clients",
    //   "parent_id": null,
    //   "icon": <GiShakingHands size={20}/>,
    //   "order_index": 17,
    //   "url": "/client"
    // },
    // {
    //   "id": 18,
    //   "label": "Settings",
    //   "parent_id": null,
    //   "icon": <IoSettingsOutline size={20}/>,
    //   "order_index": 18,
    //   "url": "/products ",
    //   "children": [
    //     {
    //       "id": 19,
    //       "label": "Company Settings",
    //       "parent_id": 18,
    //       "icon": <BsBuildingGear size={20}/>,
    //       "order_index":1,
    //       "url": "/companySetting"
    //     },
    //     {
    //       "id": 20,
    //       "label": "Notification settings",
    //       "parent_id": 18,
    //       "icon":<RiChatSettingsLine size={20}/>,
    //       "order_index": 2,
    //       "url": "/notificationSettings"
    //     },
    //     {
    //       "id": 21,
    //       "label": "Roles And Permissions",
    //       "parent_id": 18,
    //       "icon":<FaUserLock size={20}/>,
    //       "order_index": 3,
    //       "url": "/rolesAndPermissions"
    //     }
    //     ,
    //     {
    //       "id": 22,
    //       "label": "Status",
    //       "parent_id": 18,
    //       "icon":<VscSettings size={20}/>,
    //       "order_index": 4,
    //       "url": "/status"
    //     }
    //   ]
    // },
    // {
    //   "id": 23,
    //   "label": "Promotion",
    //   "parent_id": null,
    //   "icon": <TbSpeakerphone size={20}/>,
    //   "order_index": 23,
    //   "url": "/promotion"
    // },
    // {
    //   "id": 24,
    //   "label": "Shift",
    //   "parent_id": null,
    //   "icon": <PiUserSwitch size={20}/>,
    //   "order_index": 24,
    //   "url": "/shift"
    // },
    // {
    //   "id": 25,
    //   "label": "Overtime",
    //   "parent_id": null,
    //   "icon": <TbClockDollar size={20}/>,
    //   "order_index": 25,
    //   "url": "/overtime"
    // },
    
]
