import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import FinderStack from './FinderStack';
import DonorStack from './DonorStack';
import AuthStack from './AuthStack';
import LoadingIndicator from './LoadingIndicator';

const firestore = getFirestore();
export default function RootNavigation() {
    const { user } = useAuth();
    const [isFinder, setIsFinder] = useState(false);
    const [isDonor, setIsDonor] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchUserType = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setIsFinder(userData.isFinder);
                        setIsDonor(userData.isDonor);
                    } else {
                        console.log('User document does not exist');
                    }
                } catch (error) {
                    console.error('Error fetching user document:', error);
                } finally {
                    setLoading(false); // Set loading to false when fetch is completed
                }
            }
        };

        fetchUserType();
    }, [user]);

    // Render loading indicator if still loading
    if (loading) {
        return <LoadingIndicator />;
    }

    // Render appropriate stack based on user data
    if (user) {
        if (isFinder) {
            return <FinderStack />;
        } else if (isDonor) {
            return <DonorStack />;
        }
    } else {
        return <AuthStack />;
    }

    return <></>;
}