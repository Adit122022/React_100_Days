# 11 - Live Face Expression Detector & Wireframe Mesh

A high-fidelity, real-time facial analytics application built with **React**, **Vite**, **Tailwind CSS v4**, and powered by **Google MediaPipe Vision Tasks API**. This application tracks 478 3D face landmarks and analyzes 52 distinct muscle contractions (blendshapes) directly in the browser to identify emotional expressions and eye movement at 60 FPS.

---

## 🔗 Official Documentation & API Reference

- 📖 **Google MediaPipe Face Landmarker Solution Guide:** [ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker)
- 📦 **NPM Registry Reference:** [@mediapipe/tasks-vision](https://www.npmjs.com/package/@mediapipe/tasks-vision)
- 🚀 **Wasm Assets CDN:** [jsdelivr.com/package/npm/@mediapipe/tasks-vision](https://www.jsdelivr.com/package/npm/@mediapipe/tasks-vision)

---

## ⚡ Technical Core: Google MediaPipe & Blendshapes

### What is the Face Landmarker Task?
Google MediaPipe Face Landmarker takes an image or video stream and outputs facial landmarks, which represent locations of facial features. The model tracks **478 3D facial landmarks** in real-time, which are crucial for:
1. **Facial Geometry Tracking:** Accurate positioning of eyes, brows, nose, and lips.
2. **Face Mesh Overlay:** Creating digital wireframes that bend and match user expressions.
3. **Face Blendshapes:** Estimating 52 unique facial shape coefficients.

### What are Blendshapes?
Face Blendshapes are mathematical coefficients ranging from `0.0` (no contraction) to `1.0` (maximum contraction) representing muscle groups corresponding to expressions.
For instance:
- `mouthSmileLeft` & `mouthSmileRight`: Track the corners of the mouth pulling up.
- `jawOpen`: Tracks mouth opening.
- `browDownLeft` & `browDownRight`: Track the brows furrowing (associated with anger/concentration).
- `eyeBlinkLeft` & `eyeBlinkRight`: Track separate eyelid closures.

---

## 🛠️ Step-by-Step Implementation Guide

Follow these steps to implement a face expression scanner from scratch in a React & Vite project:

### Step 1: Install Dependencies
Install the official MediaPipe vision tasks library:
```bash
npm install @mediapipe/tasks-vision
```

### Step 2: Initialize the Vision Task Engine
Load the required WebAssembly (WASM) compiler files and instantiate the detector. It's recommended to do this within a `useEffect` hook:
```javascript
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

// 1. Locate WASM assets from CDN or local public assets
const filesetResolver = await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);

// 2. Initialize the FaceLandmarker
const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
  baseOptions: {
    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    delegate: "GPU", // Enable hardware acceleration
  },
  outputFaceBlendshapes: true, // Required for expression mapping
  outputFacialTransformationMatrixes: false,
  runningMode: "VIDEO", // Optimized for live streams
  numFaces: 1, // Single face tracking for optimal performance
});
```

### Step 3: Stream Webcam Video to HTML5
Use the browser's `navigator.mediaDevices` API to request camera permission and pipe the media stream into a `<video>` tag:
```javascript
const stream = await navigator.mediaDevices.getUserMedia({
  video: { width: 640, height: 480, facingMode: "user" },
  audio: false,
});

if (videoRef.current) {
  videoRef.current.srcObject = stream;
  videoRef.current.onloadedmetadata = () => {
    videoRef.current.play();
  };
}
```

### Step 4: Run the Real-Time Inference Loop
Using `requestAnimationFrame`, continuously capture frames from the video element and feed them into the MediaPipe detector:
```javascript
const predictLoop = () => {
  if (videoRef.current && landmarkerRef.current && isCameraActive) {
    const now = performance.now();
    
    // Check if a new frame is ready
    if (videoRef.current.currentTime !== lastVideoTime) {
      lastVideoTime = videoRef.current.currentTime;
      
      // Execute MediaPipe detection
      const result = landmarkerRef.current.detectForVideo(videoRef.current, now);
      
      // Process landmarker results
      handleResults(result);
    }
  }
  requestRef.current = requestAnimationFrame(predictLoop);
};
```

### Step 5: Render Face Landmarks (Wireframe Mesh) on Canvas
Draw the facial wireframe coordinates by mapping normalized coordinates `(0.0 - 1.0)` into canvas pixels:
```javascript
if (result.faceLandmarks && result.faceLandmarks.length > 0) {
  const landmarks = result.faceLandmarks[0];
  const ctx = canvasRef.current.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "rgba(34, 211, 238, 0.85)"; // Cyan cyber glow
  landmarks.forEach((point) => {
    const x = point.x * canvas.width;
    const y = point.y * canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, 1.2, 0, 2 * Math.PI);
    ctx.fill();
  });
}
```
*Note: To align the video mirror effect, apply the `scale-x-[-1]` transformation class to both the `<video>` and `<canvas>` elements.*

### Step 6: Map Blendshape Categories to Expressions
Retrieve specific muscle values from `result.faceBlendshapes[0].categories` and convert them into percentage scores:
```javascript
const categories = result.faceBlendshapes[0].categories;
const shapes = {};
categories.forEach(item => {
  shapes[item.categoryName] = item.score;
});

// Example Expression Blending
const smilingPercentage = Math.round(((shapes["mouthSmileLeft"] || 0) + (shapes["mouthSmileRight"] || 0)) / 2 * 100);
const surprisePercentage = Math.round((shapes["jawOpen"] || 0) * 100);
```

### Step 7: Memory & Resource Cleanup
Properly stop loops, media tracks, and close MediaPipe instance on component unmount:
```javascript
// 1. Cancel requestAnimationFrame
if (requestRef.current) cancelAnimationFrame(requestRef.current);

// 2. Stop camera tracks
if (streamRef.current) {
  streamRef.current.getTracks().forEach(track => track.stop());
}

// 3. Terminate MediaPipe task listener
if (landmarkerRef.current) landmarkerRef.current.close();
```

---

## 🎨 Tailwind CSS v4 Configuration

This application has been upgraded to **Tailwind CSS v4** for high performance and zero configuration files.

### Vite Setup
Tailwind CSS v4 uses a fast, built-in compiler that integrates via the Vite plugin. No `tailwind.config.js` or `postcss.config.js` is required.

In `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ]
})
```

In `src/index.css`:
```css
@import "tailwindcss";
```

---

## 🚀 Running the App Locally

Ensure you have [Node.js](https://nodejs.org/) installed, then execute:

```bash
# 1. Install dependencies (Vite + Tailwind CSS v4 + MediaPipe)
npm install

# 2. Run the development server
npm run dev
```

Visit the output local address (typically `http://localhost:5173`) in your web browser. 

> **Important:** Keep in mind that a webcam device is required to interact with the face detector. Make sure to allow camera permissions when prompted by your browser!
