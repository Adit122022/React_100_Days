
---

# 🎥 YouTube Thumbnail Downloader

A modern **React-based web app** to fetch and download YouTube video thumbnails in multiple resolutions.
This project features a **beautiful UI, hover animations, responsive design, and toast notifications** for errors.

---

## 🚀 Features

* 🎨 **Beautiful UI** with Tailwind CSS + Animate.css + Remix Icons
* 📱 **Responsive design** (mobile → desktop grid)
* 🖼️ Fetches **all available thumbnail resolutions** automatically:

  * 120x90 (default)
  * 320x180 (medium quality)
  * 480x360 (high quality)
  * 640x480 (standard)
  * 1280x720 (max resolution)
* ✨ **Hover effect** → download button & resolution show only on hover
* 🔔 Error handling with **react-toastify**
* ⚡ Fast & lightweight (no backend required)

---

## 🛠️ Tech Stack

* **React 18** (Frontend Framework)
* **Tailwind CSS** (Styling)
* **Animate.css** (Animations)
* **Remix Icons** (Icons)
* **React Toastify** (Toast notifications)
* **get-youtube-id** (Extracts video ID from YouTube URLs)

---

## 📂 Project Structure

```
youtube-thumbnail-downloader/
│── public/
│── src/
│   │── App.jsx          # Main app file
│   │── components/      # Separated UI components (optional)
│   │── index.css        # Tailwind + global styles
│── package.json
│── tailwind.config.js
│── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/youtube-thumbnail-downloader.git
cd youtube-thumbnail-downloader
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Project

```bash
npm run dev
```

Open 👉 [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧩 How It Works

1. **User enters a YouTube video URL**.
   Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

2. **Extract video ID** using [`get-youtube-id`](https://www.npmjs.com/package/get-youtube-id).

   * For `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, it extracts: `dQw4w9WgXcQ`.

3. **Generate thumbnail URLs**:

   ```
   https://img.youtube.com/vi/<VIDEO_ID>/default.jpg
   https://img.youtube.com/vi/<VIDEO_ID>/mqdefault.jpg
   https://img.youtube.com/vi/<VIDEO_ID>/hqdefault.jpg
   https://img.youtube.com/vi/<VIDEO_ID>/sddefault.jpg
   https://img.youtube.com/vi/<VIDEO_ID>/maxresdefault.jpg
   ```

4. **Render thumbnails in cards** → show resolution & a download button on hover.

5. **Download button** opens the image in a new tab (right-click → Save As).

---

## 📸 Screenshots (Add Your Own)

### 🔹 Homepage (Before Search)

> ![screenshot](./screenshots/homepage.png)

### 🔹 Thumbnails Fetched

> ![screenshot](./screenshots/thumbnails.png)

---

## 🎨 UI/UX Highlights

* **Card Hover Effect** → smooth zoom & overlay transition.
* **Glassmorphism Search Bar** → modern blurred input field.
* **Gradient Header Text** → eye-catching title.
* **Toast Alerts** → error message if invalid URL.

---

## 🛠️ Customization

* 🎨 Change colors in `tailwind.config.js`.
* ✨ Modify card styles inside `ThumbnailCard`.
* 🔔 Adjust toast style in `ToastContainer`.
* 📱 Change grid responsiveness in:

  ```html
  grid-cols-1 sm:grid-cols-2 md:grid-cols-3
  ```

---

## 📦 Build for Production

```bash
npm run build
```

Output files will be inside `/dist`.

---

## 🧑‍💻 Author

Made with ❤️ by **\[Your Name]**
🔗 Portfolio: \[your-portfolio-link]
🐙 GitHub: \[your-github-link]

---


