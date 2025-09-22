import { useState } from "react";
import { Link } from "react-router-dom";
import MessageDialog from "./messageDialog";

export default function AdCard({
  ad,
  user,
  handlePayment,
  isPaid,
  setIsPaid,
  isUserValid,
}) {
  const [userAds, setUserAds] = useState(user.user_ads || []);

  const isMyAd = ad.user?.id === user?.id;
  console.log(isMyAd);

  const handleAccess = (type) => {
    const isAddExists = userAds.some((ua) => ua.ad_id === ad.id);
    if (type != "normal" && !isAddExists) {
      setUserAds((prev) => [...prev, { user_id: user.id, ad_id: ad.id }]);
      setIsPaid(true);
    } else {
      alert("contact accessed");
    }
  };

  return (
    <>
      {isPaid && (
        <MessageDialog
          message={"You have to pay 5 points to access this contact"}
          onCancel={() => setIsPaid(false)}
          onOk={() => handlePayment(ad.id)}
        />
      )}
      <div className="rounded-lg shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Header with ad type badge */}
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              {ad.ad_plan.type === "normal" ? (
                <span className="inline-block bg-gray-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Normal Ad
                </span>
              ) : (
                <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-sm font-semibold px-3 py-1 rounded-full">
                  Premium Ad ⭐
                </span>
              )}
            </div>
            {isMyAd && (
              <span className="bg-green-500/20 text-green-400 text-sm font-medium px-2 py-1 rounded-full border border-green-500/30">
                My Ad
              </span>
            )}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex p-4">
          {/* Image section */}
          <div className="flex-shrink-0 w-48 h-32 mr-6">
            <img
              src={`http://localhost:8000/storage/${ad.image_path}`}
              alt={ad.name}
              className="w-full h-full object-fit rounded-lg border border-gray-600"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik04NCA2NEw5NiA3Nkw4NCA4OEw3MiA3Nkw4NCA2NFoiIGZpbGw9IiM2QjcyODAiLz4KPHN2ZyB4PSI3MCIgeT0iNTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDYwIDI4IiBmaWxsPSJub25lIj4KPHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCA2MCAyOCIgZmlsbD0ibm9uZSI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSIyOCIgcng9IjQiIGZpbGw9IiM0QjU1NjMiLz4KPHBhdGggZD0iTTMwIDE0TDM2IDE5TDMwIDI0TDI0IDE5TDMwIDE0WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4KPC9zdmc+Cjwvc3ZnPgo=";
              }}
            />
          </div>

          {/* Content section */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Title and description */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
                {ad.name}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                {ad.description}
              </p>
            </div>

            {/* Price and buttons */}
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-2xl font-bold text-green-400">${ad.price}</p>
              </div>

              <div className="flex gap-2 ml-4">
                {/* WhatsApp Button */}
                <button
                  disabled={!isUserValid || isMyAd}
                  onClick={() => handleAccess(ad.ad_plan.type)}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition duration-200 ${
                    !isUserValid || isMyAd
                      ? "bg-gray-600 cursor-not-allowed opacity-50"
                      : "bg-green-500 hover:bg-green-600 hover:scale-105"
                  } text-white`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.516" />
                  </svg>
                  WhatsApp
                </button>

                {/* Call Button */}
                <button
                  disabled={!isUserValid || isMyAd}
                  onClick={() => handleAccess(ad.ad_plan.type)}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition duration-200 ${
                    !isUserValid || isMyAd
                      ? "bg-gray-600 cursor-not-allowed opacity-50"
                      : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
                  } text-white`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
