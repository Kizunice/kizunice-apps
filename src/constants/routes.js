import { MdDashboard } from 'react-icons/md';
import { IoCalendar } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { FaSuitcase } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';
import { HiUsers } from 'react-icons/hi2';
import { FaCoins } from 'react-icons/fa';
import { BiSolidBookContent } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';

export const ADMIN_ROUTES = [
  {
    path: '/',
    icon: <MdDashboard size={22} />,
    name: 'Dashboard',
    key: '0',
  },
  {
    path: '/attendance',
    icon: <IoCalendar size={22} />,
    name: 'Attendance',
    key: '1',
  },
  {
    path: '/learning',
    icon: <ImBook size={22} />,
    name: 'Learning',
    key: '2',
  },
  {
    path: '/jobs',
    icon: <FaSuitcase size={22} />,
    name: 'Jobs',
    key: '3',
  },
  {
    path: '/document',
    icon: <IoDocumentText size={22} />,
    name: 'Document',
    key: '4',
  },
  {
    path: '/data-student',
    icon: <HiUsers size={22} />,
    name: 'Data Student',
    key: '5',
  },
  {
    path: '/data-partner',
    icon: <HiUsers size={22} />,
    name: 'Data Partner',
    key: '6',
  },
  {
    path: '/finance',
    icon: <FaCoins size={22} />,
    name: 'Finance',
    key: '7',
  },
  {
    path: '/content',
    icon: <BiSolidBookContent size={22} />,
    name: 'Content',
    key: '8',
  },
  {
    path: '/users',
    icon: <HiUsers size={22} />,
    name: 'Users',
    key: '9',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Settings',
    key: '10',
  },
];

export const ROUTES = [
  {
    path: '/',
    icon: <MdDashboard size={22} />,
    name: 'Dashboard',
    key: '0',
  },
  {
    path: '/attendance',
    icon: <IoCalendar size={22} />,
    name: 'Attendance',
    key: '1',
  },
  {
    path: '/learning',
    icon: <ImBook size={22} />,
    name: 'Learning',
    key: '2',
  },
  {
    path: '/jobs',
    icon: <FaSuitcase size={22} />,
    name: 'Jobs',
    key: '3',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Settings',
    key: '4',
  },
];
