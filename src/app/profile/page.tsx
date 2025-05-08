'use client';
import { useRouter } from "next/navigation";
import axios from "axios";
export default function profile() {
    const router = useRouter();
    const handleLogout = async () => {
        const result = await axios.get('/api/users/logout');
        if (result.data.success) {
            alert("log out successfull");
            router.push("/login");
        }
        else {
            console.log("log out unsuccessfull");
        }
        console.log(result);
    }
    return (
        <div className="flex flex-col h-[80vh] justify-center items-center">
            <h2>This is profile</h2>
            <button className="p-2 w-30 border-1 rounded-2xl bg-transparent cursor-pointer" onClick={handleLogout}>Logout</button>
        </div>
    )
} 