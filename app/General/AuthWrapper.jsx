import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { AUTH } from '@/Firebase';

const AuthWrapper = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, (user) => {
      if (!user) {
        router.push('/'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
};

export default AuthWrapper;
