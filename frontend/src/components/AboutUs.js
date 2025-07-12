"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function AboutUs() {
  const [joke, setJoke] = useState({
    setup: "",
    punchline: "",
  });
  const [loading, setLoading] = useState(false); // 👈 Add loading state

  const getJoke = () => {
    setLoading(true); // Start spinning
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((res) => res.json())
      .then((data) => {
        setJoke({
          setup: data.setup,
          punchline: data.punchline,
        });
        console.log(data.setup, data.punchline);
      })
      .catch((err) => console.error("Failed to fetch joke:", err))
      .finally(() => {
        setTimeout(() => setLoading(false), 1000); // Stop spin smoothly
      });
  };

  useEffect(() => {
    getJoke();
  }, []);

  return (
    <div id="AboutUs" className="container mx-auto px-4 py-12">
      {/* App Logo */}
      <div className="flex justify-center mb-10">
        <Image
          src="/logo.png" // Replace with your logo path
          alt="App Logo"
          width={100}
          height={100}
          className="rounded-full shadow-md"
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About Me */}
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">About Me</h2>
          <p className="text-gray-600 mb-4">
            Hi 👋 I’m a passionate software developer who loves building clean,
            scalable, and user-friendly apps. I enjoy turning complex problems
            into simple, beautiful solutions.
          </p>
          <p className="italic text-gray-500">
            "I don’t always test my code, but when I do, I do it in production." 😅
          </p>
        </div>

        {/* About This Project */}
        <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            About This Project
          </h2>
          <p className="text-gray-600 mb-4">
            This project is a{" "}
            <span className="font-medium">YouTube Video & Audio Downloader</span> built with{" "}
            <span className="font-medium">Next.js</span> and{" "}
            <span className="font-medium">Tailwind CSS</span>. It allows users to
            download YouTube videos or extract audio in high quality with a clean,
            responsive UI.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Download YouTube videos in MP4 & MP3 formats.</li>
            <li>Simple and intuitive interface.</li>
            <li>Responsive design for all devices.</li>
          </ul>
          <p className="italic text-gray-500 mt-2">
            "Because sometimes you just need that one song offline... legally of course. 😉"
          </p>
        </div>
      </div>

      {/* Developer Joke at the bottom */}
      <div className="mt-8 p-4 bg-gray-200 rounded-lg shadow text-gray-700 max-w-xl mx-auto text-center">
        <p className="font-medium text-lg">{joke.setup}</p>
        <p className="mt-2 text-gray-800">{joke.punchline}</p>

        {/* Refresh Button (Centered) */}
        <div className="flex justify-center mt-4">
          <button
            onClick={getJoke} // 👈 fetches a new joke
            disabled={loading} // disable button during loading
            className={`flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300`}
          >
            <RefreshIcon
              className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} // 👈 Add spin animation
            />
            {loading ? "" : ""}
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Click to fetch a new joke without refreshing the page.
        </p>
      </div>
    </div>
  );
}
