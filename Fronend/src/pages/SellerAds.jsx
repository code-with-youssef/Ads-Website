import AdTableRow from "../components/adTableRow";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import api from "../api/axios";
import axios from "axios";
import ActionButton from "../components/actionButton";
import AdCreationForm from "../components/adCreationForm";

export default function SellerAds() {
  const [ads, setAds] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);


  useEffect(() => {
    const fetchAds = async () => {
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        });

        const res = await api.get("sellerAds");
        setAds(res.data.ads || []);
        console.log(res.data.ads);
        setUser(res.data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAds();
  }, []);

  const handlePublish = async (id, cost) => {
    console.log(cost);
    console.log(user.points);
    if (Number(cost) > Number(user.points)) {
      alert("You don't have enough points to publish this ad");
      return;
    }

    try {
      const res = await api.patch(`sellerAds/${id}`);
      const updatedAd = res.data.ad;

      setAds((prev) => prev.map((ad) => (ad.id === id ? updatedAd : ad)));

      setUser((prev) => ({ ...prev, points: prev.points - cost }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`sellerAds/${id}`);
      setAds((prev) => prev.filter((ad) => ad.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (data) => {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });
    const response = await api.post("sellerAds", data);
    setAds((prev) => [...prev, response.data.ad]);
    setIsAdding(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-row min-h-screen">
          <Navbar user={user} />

          <div className="flex-1 p-8">
            <div className="flex mb-8 items-center justify-start">
              <h1 className="text-4xl font-bold text-white mb-2">My Ads</h1>
            </div>

            <ActionButton
              text={"Create New Ad"}
              onClick={() => setIsAdding(true)}
              style={`flex gap-1 text-white px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600`}
            />

            {isAdding && (
              <AdCreationForm
                onSubmit={handleCreate}
                onCancel={() => setIsAdding(false)}
              />
            )}

            <div className="overflow-x-auto">
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ads?.map((ad) => (
                    <AdTableRow
                      key={ad.id}
                      ad={ad}
                      role={"seller"}
                      onPublish={handlePublish}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
