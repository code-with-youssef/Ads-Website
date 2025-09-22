import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";
import Navbar from "../components/navbar";
import AdCard from "../components/adCard";

// CSRF token cache
let csrfTokenCache = null;
let csrfPromise = null;

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingAds, setLoadingAds] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);

  const navigate = useNavigate();
  const pollIntervalRef = useRef(null);

  // CSRF token management
  const getCSRFToken = useCallback(async () => {
    if (csrfTokenCache) return csrfTokenCache;
    if (csrfPromise) return csrfPromise;

    csrfPromise = axios
      .get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
        timeout: 5000,
      })
      .then(() => {
        csrfTokenCache = true;
        return csrfTokenCache;
      })
      .catch((error) => {
        console.error("CSRF token fetch failed:", error);
        csrfPromise = null;
        throw error;
      });

    return csrfPromise;
  }, []);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getCSRFToken();
        const res = await api.get("user");
        const userData = res.data;
        const isValid = userData && Object.keys(userData).length > 0;
        setUser(userData);
        setIsUserValid(isValid);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
        setIsUserValid(false);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [getCSRFToken]);

  // Fetch ads
  const fetchAds = useCallback(async (pageNum) => {
    try {
      setLoadingAds(true);
      const res = await api.get(`ads?page=${pageNum}`);
      setAds(res.data.ads.data || []);
      setPagination(res.data.ads);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
      setAds([]);
    } finally {
      setLoadingAds(false);
    }
  }, []);

  useEffect(() => {
    fetchAds(page);
  }, [page, fetchAds]);

  // Ensure pollIntervalRef is defined outside the component if needed
  const pollPrices = useCallback(async () => {
    setAds((prevAds) => {
      if (prevAds.length === 0) return prevAds;

      const ids = prevAds.map((ad) => ad.id).join(",");

      fetch(`http://localhost:8000/api/ads/prices/${ids}`, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json", "Cache-Control": "no-cache" },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success && Array.isArray(result.data.prices)) {
            const pricesMap = {};
            result.data.prices.forEach((p) => {
              pricesMap[p.id] = p.price;
            });

            setAds((currentAds) =>
              currentAds.map((ad) => {
                const newPrice = pricesMap[ad.id];
                return newPrice !== undefined && newPrice !== ad.price
                  ? { ...ad, price: newPrice }
                  : ad;
              })
            );
          }
        })
        .catch((err) => console.error("Price polling error:", err));

      return prevAds; // return prevAds immediately
    });
  }, []); // empty dependency

  // useEffect to start polling only once
  useEffect(() => {
    pollPrices(); // initial call
    pollIntervalRef.current = setInterval(pollPrices, 15000);

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [pollPrices]);

  // Payment handler
  const handlePayment = useCallback(
    async (id) => {
      if (!user || user.points < 5) {
        alert("You don't have enough points to publish this ad");
        return;
      }

      try {
        await api.patch(`adsBuyer/update/${id}`);
        setUser((prev) => ({ ...prev, points: prev.points - 5 }));
        setIsPaid(false);
        alert("Contact accessed");
      } catch (err) {
        console.error("Payment error:", err);
        alert("Payment failed. Please try again.");
      }
    },
    [user]
  );

  // Logout handler
  const handleLogout = useCallback(async () => {
    try {
      await api.post("logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  }, [navigate]);

  // Pagination handlers
  const handlePrevPage = useCallback(() => {
    if (pagination?.prev_page_url) setPage((prev) => prev - 1);
  }, [pagination?.prev_page_url]);

  const handleNextPage = useCallback(() => {
    if (pagination?.next_page_url) setPage((prev) => prev + 1);
  }, [pagination?.next_page_url]);

  const isLoading = loadingUser || loadingAds;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-row min-h-screen">
          <Navbar user={user} onLogout={handleLogout} />

          <div className="flex-1 p-8">
            <div className="flex mb-8 items-center justify-between">
              <h1 className="text-4xl font-bold text-white mb-2">Recent Ads</h1>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {ads?.length === 0 ? (
                <div className="col-span-full flex justify-center items-center min-h-[60vh]">
                  <div className="text-center">
                    <p className="text-white text-2xl mb-2">No ads to show</p>
                    <p className="text-gray-400 text-lg">
                      Check back later for new listings
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {!isUserValid && (
                    <div className="col-span-full mt-3 pt-2 border-gray-600">
                      <p className="text-center text-white font-medium">
                        <span className="text-orange-500">Warning: </span>You
                        must sign in to access contact options
                        <Link
                          to="/login"
                          className="ml-2 text-orange-400 hover:text-orange-300"
                        >
                          Login now
                        </Link>
                      </p>
                    </div>
                  )}

                  {ads.map((ad) => (
                    <AdCard
                      key={ad.id}
                      ad={ad}
                      setIsPaid={setIsPaid}
                      isPaid={isPaid}
                      user={user}
                      isUserValid={isUserValid}
                      handlePayment={handlePayment}
                    />
                  ))}

                  {pagination && (
                    <div className="flex justify-center items-center gap-4 mt-6">
                      <button
                        disabled={!pagination.prev_page_url}
                        onClick={handlePrevPage}
                        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                      >
                        Previous
                      </button>

                      <span className="text-white">
                        Page {pagination.current_page} of {pagination.last_page}
                      </span>

                      <button
                        disabled={!pagination.next_page_url}
                        onClick={handleNextPage}
                        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
