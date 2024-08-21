import { MdDashboard } from 'react-icons/md';
import { IoCalendar } from 'react-icons/io5';
import { ImBook } from 'react-icons/im';
import { FaSuitcase } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';
import { HiUsers } from 'react-icons/hi2';
import { FaCoins } from 'react-icons/fa';
import { BiSolidBookContent } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';
import { FaRankingStar } from "react-icons/fa6";
import { BsInboxesFill } from "react-icons/bs";

export const ADMIN_ROUTES = [
  {
    path: '/dashboard',
    icon: <MdDashboard size={22} />,
    name: 'Beranda',
    key: '0',
  },
  {
    path: '/attendance',
    icon: <IoCalendar size={22} />,
    name: 'Kehadiran',
    key: '1',
  },
  {
    path: '/learning',
    icon: <ImBook size={22} />,
    name: 'Belajar',
    key: '2',
  },
  {
    path: '/jobs',
    icon: <FaSuitcase size={22} />,
    name: 'Pekerjaan',
    key: '3',
  },
  {
    path: '/jobs-application',
    icon: <BsInboxesFill size={22} />,
    name: 'Lamaran',
    key: '4',
  },
  {
    path: '/document',
    icon: <IoDocumentText size={22} />,
    name: 'Dokumen CV',
    key: '5',
  },
  {
    path: '/data-student',
    icon: <HiUsers size={22} />,
    name: 'Data Siswa',
    key: '6',
  },
  {
    path: '/data-partner',
    icon: <HiUsers size={22} />,
    name: 'Data Lembaga',
    key: '7',
  },
  {
    path: '/data-sensei',
    icon: <HiUsers size={22} />,
    name: 'Data Sensei',
    key: '8',
  },
  {
    path: '/finance',
    icon: <FaCoins size={22} />,
    name: 'Keuangan',
    key: '9',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Pengaturan',
    key: '10',
  },
];

export const SENSEI_ROUTES = [
  {
    path: '/dashboard',
    icon: <MdDashboard size={22} />,
    name: 'Beranda',
    key: '0',
  },
  {
    path: '/attendance',
    icon: <IoCalendar size={22} />,
    name: 'Kehadiran',
    key: '1',
  },
  {
    path: '/learning',
    icon: <ImBook size={22} />,
    name: 'Belajar',
    key: '2',
  },
  {
    path: '/score',
    icon: <FaRankingStar size={22} />,
    name: 'Nilai',
    key: '3',
  },
  {
    path: '/jobs',
    icon: <FaSuitcase size={22} />,
    name: 'Pekerjaan',
    key: '4',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Pengaturan',
    key: '5',
  },
];


export const FINANCE_ROUTES = [
  {
    path: '/dashboard',
    icon: <MdDashboard size={22} />,
    name: 'Beranda',
    key: '0',
  },
  {
    path: '/finance',
    icon: <FaCoins size={22} />,
    name: 'Keuangan',
    key: '1',
  },
  {
    path: '/data-student',
    icon: <HiUsers size={22} />,
    name: 'Data Siswa',
    key: '3',
  },
  {
    path: '/data-partner',
    icon: <HiUsers size={22} />,
    name: 'Data Rekanan',
    key: '4',
  },
  {
    path: '/data-sensei',
    icon: <HiUsers size={22} />,
    name: 'Data Sensei',
    key: '5',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Pengaturan',
    key: '6',
  },
];


export const ROUTES = [
  {
    path: '/dashboard',
    icon: <MdDashboard size={22} />,
    name: 'Beranda',
    key: '0',
  },
  {
    path: '/attendance',
    icon: <IoCalendar size={22} />,
    name: 'Kehadiran',
    key: '1',
  },
  {
    path: '/learning',
    icon: <ImBook size={22} />,
    name: 'Belajar',
    key: '2',
  },
  {
    path: '/jobs',
    icon: <FaSuitcase size={22} />,
    name: 'Pekerjaan',
    key: '3',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Pengaturan',
    key: '4',
  },
];
