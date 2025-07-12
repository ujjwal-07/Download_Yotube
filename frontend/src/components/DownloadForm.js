"use client";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DownloadForm() {
  console.log(API_URL)
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Preparing download...");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    setLoading(true);
    setLoadingMessage("Preparing download...");

    // Timer to update message if it takes too long
    const longVideoTimeout = setTimeout(() => {
      setLoadingMessage("⏳ Hang tight! This is a large video, it’ll start downloading soon...");
    }, 8000); // 8 seconds

    try {
      // Make an API call to prepare the file
      await axios.get(`${API_URL}/api/download`, {
        params: {
          url: url,
          format: format,
        },
      });

      // Show success toast only if API call was successful
      toast.success("Your media will start downloading shortly");

      // Trigger browser download
      window.location.href = `http://localhost:5000/api/download?url=${encodeURIComponent(
        url
      )}&format=${encodeURIComponent(format)}`;
    } catch (error) {
      console.error("Error preparing download:", error);
      toast.error("Failed to prepare download. Please try again.");
    } finally {
      clearTimeout(longVideoTimeout); // Clear timeout if API finishes
      setLoading(false);
      setLoadingMessage("Preparing download..."); // Reset message
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-transparent rounded-lg p-6 space-y-4"
    >
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-3">
          <input
            type="url"
            placeholder="Enter YouTube URL..."
            value={url}
            onChange={(e) => {
              const rawUrl = e.target.value;
              const cleanedUrl = rawUrl.split("?")[0]; // remove ? and after
              setUrl(cleanedUrl);
            }}
            className="bg bg-white w-full border rounded px-3 text-gray-600 py-2 focus:outline-none focus:ring focus:border-blue-500 placeholder:text-gray-600"
          />
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
          >
            <DownloadIcon />
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-3 gap-4 space-y-2">
        <button
          type="button"
          onClick={() => setFormat("mp3")}
          className={`px-4 py-2 rounded ${
            format === "mp3" ? "bg-green-500 text-white" : "bg-gray-400"
          }`}
        >
          MP3
        </button>
        <button
          type="button"
          onClick={() => setFormat("mp4")}
          className={`px-4 py-2 rounded ${
            format === "mp4" ? "bg-green-500 text-white" : "bg-gray-400"
          }`}
        >
          MP4
        </button>
      </div>

      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col justify-center items-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
          <p className="text-white mt-4 text-lg">{loadingMessage}</p>
        </div>
      )}
    </form>
  );
}
