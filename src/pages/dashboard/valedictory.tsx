import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Toaster } from 'react-hot-toast';
import Spinner from '@/src/components/spinner';
import Dashboard from '@/src/components/layout/dashboard';
import ValedictoryTab from '@/src/components/pages/dashboard/valedictory/ValedictoryTab';

const Valedictory: NextPage = () => {
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
    if (user && user.role !== "JURY") router.push('/profile');
    
    return (
        <Dashboard>
            <Toaster />
                {/* Welcome Header */}
                <h1 className="text-4xl mb-3">
                Welcome <span className="font-semibold">{user?.name}</span>!
                </h1>
                <div className="mt-3">
                    <ValedictoryTab />
                </div>
        </Dashboard>
    );
};

export default Valedictory;