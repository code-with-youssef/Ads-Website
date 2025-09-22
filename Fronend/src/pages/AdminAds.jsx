import AdTableRow from "../components/adTableRow";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import api from "../api/axios";
import axios from "axios";
export default function () {
  const [ads, setAds] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsempty] = useState(true);

  // Fetch ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        });

        const res = await api.get("adminAds");
        setAds(res.data.ads);
        setUser(res.data.user);

        setIsempty(res.data.ads.length === 0);
        console.log("Admin Ads Response:", res.data.ads);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAds();
  }, []);

  // ✅ Actions
  const handleApprove = async (id) => {
    try {
      await api.patch(`adminAds/${id}/${"Approved"}`);
      setAds((prev) =>
        prev.map((ad) => (ad.id === id ? { ...ad, status: "Approved" } : ad))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecline = async (id) => {
    try {
      await api.patch(`adminAds/${id}/${"Declined"}`);
      setAds((prev) =>
        prev.map((ad) => (ad.id === id ? { ...ad, status: "Declined" } : ad))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-row min-h-screen">
          {/* Navbar - Left Side */}
          <Navbar user={user} />

          <div className="flex-1 p-8">
            {/* Header Section */}
            <div className="flex mb-8 items-center justify-start">
              <h1 className="text-4xl font-bold text-white mb-2">
                Requested Ads
              </h1>
            </div>

            {/* Ads Grid Container */}
            <div className="overflow-x-auto">
              {!isEmpty && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                        Cost
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                        Seller Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ads.map((ad) => (
                      <AdTableRow
                        key={ad.id}
                        ad={ad}
                        role={"admin"}
                        onApprove={handleApprove}
                        onDecline={handleDecline}
                      />
                    ))}
                  </tbody>
                </table>
              )}
              {isEmpty && (<p className="text-2xl text-white justify-center text-center items-center">There are no requested ads</p>)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
