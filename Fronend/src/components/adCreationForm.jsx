import { useState, useEffect } from "react";
import { Upload, Image, CheckCircle } from "lucide-react";
import api from "../api/axios";
import axios from "axios";

export default function AdCreationForm({ onSubmit, onCancel }) {
  const [plans, setPlans] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ad_plan_id: "",
    price:"",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        });
        const res = await api.get("adsPlans");
        setPlans(res.data.plans || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) return;
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("ad_plan_id", formData.ad_plan_id);
    data.append("price", formData.price);
    data.append("image", selectedFile);

    setIsFormLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
      }
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <h1 className="text-orange-400 text-3xl font-bold mb-12">
        Create New Ad
      </h1>

      <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`border ${
              errors.name ? "border-red-500" : "border-orange-500"
            } bg-transparent p-3 rounded w-full caret-orange-500 text-white placeholder-gray-300`}
            placeholder="name"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

        <div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`border ${
              errors.description ? "border-red-500" : "border-orange-500"
            } bg-transparent p-3 rounded w-full caret-orange-500 text-white placeholder-gray-300`}
            placeholder="description"
            required
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`border ${
              errors.price ? "border-red-500" : "border-orange-500"
            } bg-transparent p-3 rounded w-full caret-orange-500 text-white placeholder-gray-300`}
            placeholder="Price"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>
          )}
        </div>

        <div className="max-w-md mx-auto p-6">
          <div className="relative">
            <input
              type="file"
              name="image_path"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className={`
            group relative flex flex-col items-center justify-center
            w-full min-h-[200px] px-6 py-8 
            border-2 border-dashed rounded-xl
            cursor-pointer transition-all duration-300 ease-in-out
            ${
              selectedFile
                ? "border-green-400 bg-green-50 hover:bg-green-100"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400"
            }
          `}
            >
              {/* Upload Icon */}
              <div
                className={`
              mb-4 p-4 rounded-full transition-all duration-300
              ${
                selectedFile
                  ? "bg-green-100 text-green-600"
                  : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
              }
            `}
              >
                {selectedFile ? (
                  <CheckCircle className="w-8 h-8" />
                ) : (
                  <Upload className="w-8 h-8" />
                )}
              </div>

              {/* Text Content */}
              <div className="text-center">
                <p
                  className={`
                text-lg font-semibold mb-2
                ${selectedFile ? "text-green-700" : "text-gray-700"}
              `}
                >
                  {selectedFile ? "An image was selected" : "Choose an image"}
                </p>

                {selectedFile && (
                  <div className="space-y-2">
                    <p className="text-sm text-green-600 font-medium">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-green-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </label>

            {/* Success Indicator */}
            {selectedFile && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Additional Action Buttons */}
          {selectedFile && (
            <div className="mt-4 flex gap-2 justify-center">
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setImagePreview(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Remove
              </button>
            </div>
          )}
          {imagePreview && (
            <div className="image-preview" style={{ marginTop: "10px" }}>
              <img
                src={imagePreview}
                alt="معاينة الصورة"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
          )}
        </div>

        <div>
          <select
            name="ad_plan_id"
            value={formData.ad_plan_id}
            onChange={handleChange}
            className={`border ${
              errors.ad_plan_id ? "border-red-500" : "border-orange-500"
            } bg-[#272525] p-3 rounded w-full text-gray-300`}
            required
          >
            <option value="">Select a plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.type} - {plan.price} points
              </option>
            ))}
          </select>
          {errors.ad_plan_id && (
            <p className="text-red-500 text-sm mt-1">{errors.ad_plan_id[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded transition"
            disabled={isFormLoading}
          >
            {isFormLoading ? "Creating..." : "Create"}
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
