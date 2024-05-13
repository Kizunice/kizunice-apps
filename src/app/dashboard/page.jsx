import Image from 'next/image';
import DefaultLayout from '@/components/layout/DefaultLayout';
import DashboardPage from '@/components/dashboard/DashboardPage';

export default function Dashboard() {
  return (
    <DefaultLayout>
      <DashboardPage />
    </DefaultLayout>
  );
}
