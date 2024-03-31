import { MdDashboard } from 'react-icons/md';
import { IoCalendar } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { FaSuitcase } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';
import { HiUsers } from 'react-icons/hi2';
import { FaCoins } from 'react-icons/fa';
import { BiSolidBookContent } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';

const iconClasses = `h-8 w-8`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: '/',
    icon: <MdDashboard size={22} />,
    name: 'Dashboard',
  },
  {
    path: '/attendance',
    icon: <IoCalendar size={22} />,
    name: 'Attendance',
  },
  {
    path: '/learning',
    icon: <ImBook size={22} />,
    name: 'Learning',
  },
  {
    path: '/jobs',
    icon: <FaSuitcase size={22} />,
    name: 'Jobs',
  },
  {
    path: '/document',
    icon: <IoDocumentText size={22} />,
    name: 'Document',
  },
  {
    path: '/student-data',
    icon: <HiUsers size={22} />,
    name: 'Data Student',
  },
  {
    path: '/partner-data',
    icon: <HiUsers size={22} />,
    name: 'Data Partner',
  },
  {
    path: '/finance',
    icon: <FaCoins size={22} />,
    name: 'Finance',
  },
  {
    path: '/content',
    icon: <BiSolidBookContent size={22} />,
    name: 'Content',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Settings',
  },
];

export default routes;
