import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Toaster } from 'react-hot-toast';
import Spinner from '@/src/components/spinner';
import Dashboard from '@/src/components/layout/dashboard';
import AdminTab from '@/src/components/pages/dashboard/admin/AdminTab';

const Admin: NextPage = () => {
    const router = useRouter();
    const { user, loading } = useAuth();
    
    if (loading)
    return (
      <div className="h-screen w-screen flex justify-center">
        <Spinner />
      </div>
    );
    
    // 1. Redirect to login if user is not logged in
    if (!user) {
        router.push('/login');
        return <div>Redirecting...</div>;
    }
    
    // 2. Redirect to profile if user is not a admin
    if (user && user.role !== 'ADMIN') router.push('/profile');
    
    return (
        <Dashboard>
        <Toaster />
        {/* Welcome Header */}
            <h1 className="text-4xl mb-3">
            Welcome <span className="font-semibold">{user?.name}</span>!
            </h1>
        <div className="mt-3">
            <AdminTab AdminId={user?.id}/>
        </div>
        </Dashboard>
    );
};

export default Admin;
