 ---
# ⚠️ Disclaimer
This project is for educational purposes only. Downloading YouTube videos may violate YouTube’s Terms of Service.

✅ Note: The live version may not support actual downloads due to API restrictions.  
💻 However, you can clone this project and run it locally on your own system to explore how it works and learn.  

---

# 🎥 LDU Downloader

A full-stack YouTube video and audio downloader with a sleek user interface.

✅ Built with **Next.js** (frontend), **Node.js/Express** (backend), and **MongoDB Atlas**  for persistent data storage.  
✅ Supports downloading YouTube content in **MP3** and **MP4** formats.  
✅ Scalable deployment ready for high traffic.

---

## 🌟 Features

* 🎨 Responsive UI with **Next.js** and **Tailwind CSS**
* 🚀 Fast API using **Express.js**
* 🎵 Download YouTube videos as **MP3** or **MP4**
* ☁ Hosted on Vercel (frontend) and Render (backend)
* 🛡 Environment-secured **MongoDB Atlas** database
* 🔥 Built to scale for high traffic loads
* 😂 Bonus: Developer jokes with a refresh button for endless fun while you wait for downloads


---

## 🖥 Tech Stack

* **Frontend:** Next.js, TailwindCSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ujjwal-07/Download_Yotube.git
   cd Download_Yotube
   ```

2. **Install dependencies for frontend and backend:**

   ```bash
   # For backend
   cd server
   npm install

   # For frontend
   cd ../client
   npm install
   ```

3. **Setup environment variables:**
   Create a `.env` file in the **server** directory:

   ```
   PORT=5000
   MONGODB_URI=your-mongodb-atlas-connection-string
   ```

   Create a `.env.local` file in the **client** directory and add your server URL:

   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
   ```

4. **Run the application locally:**

   ```bash
   # Start backend
   cd backend
   npm start

   # Start frontend
   cd ../frontend
   npm run dev
   ```

---

## 🚀 Live Demo

🌐 **Frontend:** [LDU Downloader App](https://download-yotube.vercel.app/)

---

## 👨‍💻 Author

* [Ujjwal Pandey](https://github.com/ujjwal-07)

---

