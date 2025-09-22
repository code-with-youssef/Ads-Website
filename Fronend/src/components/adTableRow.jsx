import React, { useState } from "react";
import ActionButton from "./actionButton";
import api from "../api/axios";
import axios from "axios";

export default function AdTableRow({
  ad,
  role,
  onPublish,
  onApprove,
  onDecline,
  onDelete,
}) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: "bg-yellow-500 text-yellow-100",
      Approved: "bg-violet-500 text-green-100",
      Published: "bg-green-500 text-green-100",
      Declined: "bg-red-500 text-red-100",
    };

    return statusConfig[status] || "bg-gray-500 text-gray-100";
  };


  return (
    <tr className="border-b border-gray-200  transition-colors duration-200">
      {/* Name */}
      <td className="px-6 py-4">
        <h3 className="text-lg font-semibold text-red-200">{ad.name}</h3>
      </td>

      {/* Description */}
      <td className="px-6 py-4">
        <p className="text-orange-100 max-w-xs truncate">{ad.description}</p>
      </td>

      <td className="px-6 py-4">
        <p className="text-orange-100 max-w-xs truncate">{ad.ad_plan.price}</p>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
            ad.status
          )}`}
        >
          {ad.status}
        </span>
      </td>

      {role === "admin" && (
        <td className="px-6 py-4">
          <p className="text-orange-100 max-w-xs truncate">{ad.user.name}</p>
        </td>
      )}

      {/* Actions */}

      <td className="px-6 py-4">
        <div className="flex gap-2">
          {role === "seller" &&
            [
              {
                text: "Publish",
                onClick: () => onPublish(ad.id, ad.ad_plan.price),
                bg: "bg-green-500 hover:bg-green-600",
                disabled: ad.status !== "Approved",
              },
              {
                text: "Delete",
                onClick: () => onDelete(ad.id),
                bg: "bg-red-500 hover:bg-red-600",
                disabled: ad.status !== "Approved",
              },
            ].map((btn, idx) => (
              <ActionButton
                key={idx}
                text={btn.text}
                onClick={btn.onClick}
                style={`flex items-center justify-center gap-1 ${btn.bg} 
            text-white px-3 py-2 rounded-lg transition duration-200 text-sm font-medium
            ${btn.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            ))}

          {role === "admin" &&
            [
              {
                text: "Approve",
                onClick: () => onApprove(ad.id),
                bg: "bg-blue-500 hover:bg-blue-600",
                disabled: ad.status === "Approved",
              },
              {
                text: "Decline",
                onClick: () => onDecline(ad.id),
                bg: "bg-gray-500 hover:bg-gray-600",
                disabled: ad.status === "Declined",
              },
            ].map((btn, idx) => (
              <ActionButton
                key={idx}
                text={btn.text}
                onClick={btn.onClick}
                style={`flex items-center justify-center gap-1 ${btn.bg} 
            text-white px-3 py-2 rounded-lg transition duration-200 text-sm font-medium
            ${btn.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            ))}
        </div>
      </td>
    </tr>
  );
}
