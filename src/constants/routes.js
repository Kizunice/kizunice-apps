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

export const STATUS_OPTION = [
  {
    label: "Pengajuan",
    value: "Pengajuan",
  },
  {
    label: "Diterima",
    value: "Diterima",
  },
  {
    label: "Ditolak",
    value: "Ditolak",
  },
  {
    label: "Cadangan",
    value: "Cadangan",
  },
]

export const SCORE_ABC = [
  {
    label: "A",
    value: "A",
  },
  {
    label: "B",
    value: "B",
  },
  {
    label: "C",
    value: "C",
  },
  {
    label: "D",
    value: "D",
  },
  {
    label: "E",
    value: "E",
  },
]

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
    icon: <ImBook size={22} />,
    name: 'Laporan Belajar',
    key: '2',
    sub : [
      {
        path: '/learning',
        name: 'Data Belajar',
        key: '1',
      },
      {
        path: '/score',
        name: 'Data Nilai',
        key: '2',
      },
      
    ]
  },
  {
    icon: <FaSuitcase size={22} />,
    name: 'Program Kerja',
    key: '4',
    sub : [
      {
        path: '/jobs',
        name: 'Data Job',
        key: '1',
      },
      {
        path: '/jobs-application',
        name: 'Data Lamaran',
        key: '2',
      },
      
    ]
  },
  {
    path: '/document',
    icon: <IoDocumentText size={22} />,
    name: 'Dokumen CV',
    key: '6',
  },
  {
    icon: <HiUsers size={22} />,
    name: 'Data Pengguna',
    key: '7',
    sub : [
      {
        path: '/data-student',
        name: 'Data Siswa',
        key: '1',
      },
      {
        path: '/data-partner',
        name: 'Data Lembaga',
        key: '2',
      },
      {
        path: '/data-sensei',
        name: 'Data Sensei',
        key: '3',
      },
      {
        path: '/data-staff',
        name: 'Data Staff',
        key: '4',
      },
    ]
  },
  {
    path: '/finance',
    icon: <FaCoins size={22} />,
    name: 'Keuangan',
    key: '10',
  },
  {
    path: '/settings',
    icon: <IoMdSettings size={22} />,
    name: 'Pengaturan',
    key: '11',
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
