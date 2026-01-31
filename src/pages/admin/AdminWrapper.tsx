import { AdminProvider } from '@/contexts/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';

interface AdminWrapperProps {
  children: React.ReactNode;
}

export default function AdminWrapper({ children }: AdminWrapperProps) {
  return (
    <AdminProvider>
      <AdminLayout>
        {children}
      </AdminLayout>
    </AdminProvider>
  );
}
