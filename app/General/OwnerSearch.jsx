import { Button, Input } from "@nextui-org/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Cross, PanelTopCloseIcon, User2Icon } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { DATABASE } from "../../Firebase";
import { siteURL } from "../../app/META";

export default function OwnerSearch({toggleSearch}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async (term) => {
    if (!term) {
      setResults([]);
      return;
    }

    const userQuery = query(
      collection(DATABASE, "Owners"),
      where("userName", ">=", term),
      where("userName", "<=", term + "\uf8ff")
    );

    const querySnapshot = await getDocs(userQuery);
    const usernames = [];
    querySnapshot.forEach((doc) => {
      usernames.push({ id: doc.id, userName: doc.data().userName });
    });

    setResults(usernames);
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="absolute z-50 trans inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
       
        <div className="max-w-md mx-auto relative p-6 bg-white shadow-lg rounded-lg">
        <Button onPress={toggleSearch} className="absolute min-w-0  p-3 w-4 h-4 rounded-full top-2 right-2" onClick={toggleSearch}>
            X
        </Button>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Now With:</h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Input
                startContent={<User2Icon />}
                type="text"
                placeholder="Search usernames"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </motion.div>
            <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 space-y-2"
            >
                {results.map((user) => (
                <motion.li
                    key={user.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(`${siteURL}${user.userName}/Booking`)}
                    className="p-3 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200"
                >
                    {user.userName}
                </motion.li>
                ))}
            </motion.ul>
        </div>
    </div>
  );
}
