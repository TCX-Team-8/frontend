import { IoIosPerson } from "react-icons/io";
import { useState, useEffect } from "react";
import Loading from "../Pages/loading";

interface UserProps {
    userId: string;  // Assume you are passing the userId to fetch user data
}

export default function User({ userId }: UserProps) {
    const [Fname, setFname] = useState<string>('');
    const [Lname, setLname] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // Fetch user data from the backend
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://your-backend-api.com/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setFname(data.nom);  // Assuming the API response has 'firstName'
                setLname(data.prenom);    // Assuming the API response has 'lastName'
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (isLoading) {
        return <Loading/>;  
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4 w-full flex gap-4 place-content-start place-items-center">
            <div className="w-10 h-10 rounded-full">
                <IoIosPerson className="w-full h-full" />
            </div>
            <div>
                <p className="text-md">{Fname}</p>
                <p className="text-md">{Lname}</p>
            </div>
        </div>
    );
}
