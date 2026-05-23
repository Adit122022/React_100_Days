import { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export default function FaceExpression() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const landmarkerRef = useRef(null);
    const requestRef = useRef(null);
    const streamRef = useRef(null);

    const [isModelLoading, setIsModelLoading] = useState(true);
    const [cameraError, setCameraError] = useState("");
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [showMesh, setShowMesh] = useState(true);
    const showMeshRef = useRef(true);
    const lastVideoTimeRef = useRef(-1);

    // Performance stats
    const [fps, setFps] = useState(0);
    const [latency, setLatency] = useState(0);
    const [detectedFaces, setDetectedFaces] = useState(0);

    // Expressions state
    const [expressions, setExpressions] = useState({
        smiling: 0,
        surprised: 0,
        angry: 0,
        blinkingLeft: 0,
        blinkingRight: 0,
        pouting: 0
    });

    const frameCountRef = useRef(0);
    const fpsIntervalRef = useRef(performance.now());

    // Initialize MediaPipe Face Landmarker
    useEffect(() => {
        async function initializeMediaPipe() {
            try {
                setIsModelLoading(true);
                const filesetResolver = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
                );

                landmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                        delegate: "GPU",
                    },
                    outputFaceBlendshapes: true,
                    outputFacialTransformationMatrixes: true,
                    runningMode: "VIDEO",
                    numFaces: 1,
                });

                setIsModelLoading(false);
                await startCamera();
            } catch (err) {
                console.error("Failed to load MediaPipe FaceLandmarker:", err);
                setCameraError("Failed to initialize facial models. Please verify internet access.");
                setIsModelLoading(false);
            }
        }

        initializeMediaPipe();

        return () => {
            stopCamera();
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }
        };
    }, []);

    // Start Webcam Stream
    const startCamera = async () => {
        try {
            setCameraError("");
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: "user"
                },
                audio: false,
            });

            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // Wait for video load to start processing loop
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                    setIsCameraActive(true);
                    // Start detection loop
                    requestRef.current = requestAnimationFrame(predictLoop);
                };
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            setCameraError("Webcam access denied. Please grant permissions and reload the page.");
            setIsCameraActive(false);
        }
    };

    // Stop Webcam Stream
    const stopCamera = () => {
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            requestRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setIsCameraActive(false);
        setDetectedFaces(0);
        clearCanvas();
        resetExpressions();
    };

    // Toggle Camera State
    const toggleCamera = () => {
        if (isCameraActive) {
            stopCamera();
        } else {
            startCamera();
        }
    };

    const toggleMesh = () => {
        setShowMeshRef(!showMesh);
    };

    const setShowMeshRef = (val) => {
        setShowMesh(val);
        showMeshRef.current = val;
    };

    // Clear Canvas Drawing
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    // Reset Expressions values
    const resetExpressions = () => {
        setExpressions({
            smiling: 0,
            surprised: 0,
            angry: 0,
            sad: 0,
            blinkingLeft: 0,
            blinkingRight: 0,
            pouting: 0
        });
    };

    // Detection & Rendering Loop
    const predictLoop = () => {
        if (!videoRef.current || !landmarkerRef.current) {
            requestRef.current = requestAnimationFrame(predictLoop);
            return;
        }

        const now = performance.now();
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Ensure canvas bounds match video stream bounds
        if (canvas && video.videoWidth && canvas.width !== video.videoWidth) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        }

        if (video.readyState >= 2 && video.currentTime !== lastVideoTimeRef.current) {
            lastVideoTimeRef.current = video.currentTime;

            const startTime = performance.now();
            const result = landmarkerRef.current.detectForVideo(video, now);
            const endTime = performance.now();

            // Latency measurement
            setLatency(Math.round(endTime - startTime));

            // FPS computation
            const nowTime = performance.now();
            frameCountRef.current++;
            if (nowTime - fpsIntervalRef.current >= 1000) {
                setFps(Math.round((frameCountRef.current * 1000) / (nowTime - fpsIntervalRef.current)));
                frameCountRef.current = 0;
                fpsIntervalRef.current = nowTime;
            }

            // Draw Face Mesh
            if (canvas) {
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (result && result.faceLandmarks && result.faceLandmarks.length > 0) {
                    setDetectedFaces(result.faceLandmarks.length);

                    if (showMeshRef.current) {
                        const landmarks = result.faceLandmarks[0];

                        // Cybernetic digital glow style
                        ctx.fillStyle = "rgba(34, 211, 238, 0.85)"; // cyan-400
                        ctx.shadowColor = "rgba(6, 182, 212, 0.6)";  // cyan-500
                        ctx.shadowBlur = 3;

                        landmarks.forEach((landmark) => {
                            const x = landmark.x * canvas.width;
                            const y = landmark.y * canvas.height;
                            ctx.beginPath();
                            ctx.arc(x, y, 1.2, 0, 2 * Math.PI);
                            ctx.fill();
                        });

                        // Reset shadow to prevent drawing overhead
                        ctx.shadowBlur = 0;
                    }
                } else {
                    setDetectedFaces(0);
                }
            }

            // Map Blendshapes to UI Expressions
            if (result && result.faceBlendshapes && result.faceBlendshapes.length > 0) {
                const categories = result.faceBlendshapes[0].categories;

                // Temporary map object
                const values = {};
                categories.forEach(item => {
                    values[item.categoryName] = item.score;
                });

                // Blend/calculate final visual weights (clamped 0 to 100)
                setExpressions({
                    smiling: Math.round(((values["mouthSmileLeft"] || 0) + (values["mouthSmileRight"] || 0)) / 2 * 100),
                    surprised: Math.round((values["jawOpen"] || 0) * 100),
                    angry: Math.round(((values["browDownLeft"] || 0) + (values["browDownRight"] || 0)) / 2 * 100),
                    sad: Math.round(((values["mouthFrownLeft"] || 0) + (values["mouthFrownRight"] || 0)) / 2 * 100),
                    blinkingLeft: Math.round((values["eyeBlinkLeft"] || 0) * 100),
                    blinkingRight: Math.round((values["eyeBlinkRight"] || 0) * 100),
                    pouting: Math.round((values["mouthPucker"] || 0) * 100)
                });
            } else {
                resetExpressions();
            }
        }

        requestRef.current = requestAnimationFrame(predictLoop);
    };

    // --- Meme Feature Logic ---
    const getDominantExpression = () => {
        const threshold = 55; // Expression must be over 55% to trigger a meme
        if (expressions.smiling > threshold) return "happy";
        if (expressions.sad > threshold) return "sad";
        if (expressions.surprised > threshold) return "surprised";
        if (expressions.angry > threshold) return "angry";
        return null;
    };

    const dominantMeme = getDominantExpression();

    const memes = {
        happy: "https://media.tenor.com/ERa47gPVan8AAAAM/happy-cat-jumping-cat.gif",
        sad: "https://media.tenor.com/o_XmJb1a62sAAAAM/crying-cat.gif",
        surprised: "https://media.tenor.com/b95WwW6-JkIAAAAM/cat-huh.gif",
        angry: "https://media.tenor.com/gKkCgR6jPCEAAAAM/angry-cat.gif"
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <span className="font-black text-white text-lg tracking-wider">AI</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                                FaceSense SDK
                            </h1>
                            <p className="text-xs text-cyan-400/80 font-mono tracking-wider">GOOGLE MEDIAPIPE CORE</p>
                        </div>
                    </div>

                    {/* Live Tech HUD status */}
                    <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                            <span>MODEL: FLOAT16</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">ENGINE:</span>
                            <span className="text-purple-400">WASM + WEBGL</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 p-6 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

                {/* Left Column: Camera Viewport */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-4 shadow-2xl transition-all duration-300 hover:border-slate-700/50">
                        {/* Status bar */}
                        <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400 px-1">
                            <span className="flex items-center gap-2">
                                <span className={`h-2 w-2 rounded-full ${isCameraActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                {isCameraActive ? 'LIVE WEBCAM STREAM' : 'WEBCAM DISCONNECTED'}
                            </span>
                            <span>{detectedFaces > 0 ? `FACE SCANNED: ${detectedFaces}` : 'NO TARGET DETECTED'}</span>
                        </div>

                        {/* Viewport Frame */}
                        <div className="relative aspect-video rounded-xl bg-slate-950 overflow-hidden border border-slate-900 group shadow-inner">
                            {/* Webcam Video */}
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="absolute inset-0 w-full h-full object-cover scale-x-[-1] transition-transform duration-500"
                            />

                            {/* Landmarks Overlay Canvas */}
                            <canvas
                                ref={canvasRef}
                                className="absolute inset-0 w-full h-full object-cover scale-x-[-1] pointer-events-none z-10"
                            />

                            {/* Tech Frame Guides */}
                            <div className="absolute inset-0 border-[16px] border-transparent group-hover:border-slate-900/20 pointer-events-none transition-all duration-300" />
                            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50 pointer-events-none" />
                            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50 pointer-events-none" />
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50 pointer-events-none" />
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50 pointer-events-none" />

                            {/* Meme Feature Overlay */}
                            {dominantMeme && isCameraActive && (
                                <div className="absolute bottom-6 right-6 z-40 animate-bounce transition-all">
                                    <div className="relative border-2 border-white/50 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                                        <img src={memes[dominantMeme]} alt={dominantMeme} className="w-32 h-32 object-cover" />
                                        <div className="absolute inset-x-0 bottom-0 bg-black/60 text-center text-[10px] font-bold text-white uppercase py-1 backdrop-blur-sm">
                                            {dominantMeme} VIBE
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Loading & Offline Overlays */}
                            {isModelLoading && (
                                <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center gap-4 z-20">
                                    <div className="relative flex items-center justify-center">
                                        <div className="h-16 w-16 rounded-full border-4 border-slate-800 border-t-cyan-400 animate-spin" />
                                        <span className="absolute text-cyan-400 font-mono text-[10px] animate-pulse">WASM</span>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold text-sm text-slate-200">Initializing MediaPipe</h3>
                                        <p className="text-xs text-slate-500 font-mono mt-1">Downloading network weights (float16.task)...</p>
                                    </div>
                                </div>
                            )}

                            {!isCameraActive && !isModelLoading && (
                                <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center gap-4 z-20 border border-slate-900/60">
                                    <div className="h-14 w-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                        </svg>
                                    </div>
                                    <div className="text-center px-4">
                                        <h3 className="font-bold text-sm text-slate-200">Camera Feed Paused</h3>
                                        <p className="text-xs text-slate-500 mt-1 max-w-xs">Activate the sensor stream using the button below to start expression scanning.</p>
                                    </div>
                                </div>
                            )}

                            {cameraError && (
                                <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center z-30">
                                    <div className="h-12 w-12 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-rose-400 text-sm">System Error</h3>
                                    <p className="text-xs text-slate-400 mt-2 max-w-sm font-mono leading-relaxed">{cameraError}</p>
                                </div>
                            )}
                        </div>

                        {/* Interactive Controls Panel */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-900 pt-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={toggleCamera}
                                    disabled={isModelLoading}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-2 border shadow-lg ${isCameraActive
                                            ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                                            : "bg-cyan-500 border-cyan-400 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20"
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {isCameraActive ? (
                                        <>
                                            <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
                                            STOP SCANNER
                                        </>
                                    ) : (
                                        <>
                                            <span className="h-2 w-2 rounded-full bg-slate-950" />
                                            INITIALIZE SCANNER
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => setShowMeshRef(!showMesh)}
                                    disabled={!isCameraActive}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 border flex items-center gap-2 ${showMesh && isCameraActive
                                            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                                            : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700"
                                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                                >
                                    {showMesh ? "HIDE WIREFRAME" : "SHOW WIREFRAME"}
                                </button>
                            </div>

                            {/* Micro Indicator stats */}
                            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-xl shadow-inner">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-slate-500">FPS:</span>
                                    <span className={fps > 24 ? "text-emerald-400" : fps > 10 ? "text-amber-400" : "text-slate-400"}>
                                        {isCameraActive ? fps : "--"}
                                    </span>
                                </div>
                                <div className="h-3 w-px bg-slate-800" />
                                <div className="flex items-center gap-1.5">
                                    <span className="text-slate-500">DELAY:</span>
                                    <span className="text-purple-400">{isCameraActive ? `${latency}ms` : "--"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Expression Metrics Dashboard */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                    {/* Metrics container */}
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md p-6 shadow-2xl hover:border-slate-700/50 transition-all duration-300">
                        <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
                            <div>
                                <h3 className="font-bold text-lg text-slate-100">Live Expressions</h3>
                                <p className="text-xs text-slate-500 font-mono mt-0.5">BLENDSHAPE COEFFICIENTS</p>
                            </div>
                            <span className="text-xs px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg font-mono border border-cyan-500/20">
                                ACTIVE
                            </span>
                        </div>

                        {/* Metrics Progress bars */}
                        <div className="flex flex-col gap-5">

                            {/* Smiling Meter */}
                            <div className="group">
                                <div className="flex items-center justify-between text-sm font-semibold mb-1.5">
                                    <span className="text-slate-300 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                                        <span className="text-base">😊</span> Smiling
                                    </span>
                                    <span className="text-xs text-slate-500 font-mono">{expressions.smiling}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 p-[1px]">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                                        style={{ width: `${expressions.smiling}%` }}
                                    />
                                </div>
                            </div>

                            {/* Surprised Meter */}
                            <div className="group">
                                <div className="flex items-center justify-between text-sm font-semibold mb-1.5">
                                    <span className="text-slate-300 flex items-center gap-2 group-hover:text-purple-400 transition-colors">
                                        <span className="text-base">😲</span> Surprise
                                    </span>
                                    <span className="text-xs text-slate-500 font-mono">{expressions.surprised}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 p-[1px]">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                                        style={{ width: `${expressions.surprised}%` }}
                                    />
                                </div>
                            </div>

                            {/* Sad Meter */}
                            <div className="group">
                                <div className="flex items-center justify-between text-sm font-semibold mb-1.5">
                                    <span className="text-slate-300 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                                        <span className="text-base">😢</span> Sadness / Frown
                                    </span>
                                    <span className="text-xs text-slate-500 font-mono">{expressions.sad}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 p-[1px]">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                                        style={{ width: `${expressions.sad}%` }}
                                    />
                                </div>
                            </div>

                            {/* Angry Meter */}
                            <div className="group">
                                <div className="flex items-center justify-between text-sm font-semibold mb-1.5">
                                    <span className="text-slate-300 flex items-center gap-2 group-hover:text-rose-400 transition-colors">
                                        <span className="text-base">😠</span> Furrowed Brow
                                    </span>
                                    <span className="text-xs text-slate-500 font-mono">{expressions.angry}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 p-[1px]">
                                    <div
                                        className="h-full bg-gradient-to-r from-rose-500 to-orange-400 rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(244,63,94,0.3)]"
                                        style={{ width: `${expressions.angry}%` }}
                                    />
                                </div>
                            </div>

                            {/* Pouting Meter */}
                            <div className="group">
                                <div className="flex items-center justify-between text-sm font-semibold mb-1.5">
                                    <span className="text-slate-300 flex items-center gap-2 group-hover:text-amber-400 transition-colors">
                                        <span className="text-base">😚</span> Pouting / Pucker
                                    </span>
                                    <span className="text-xs text-slate-500 font-mono">{expressions.pouting}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 p-[1px]">
                                    <div
                                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                                        style={{ width: `${expressions.pouting}%` }}
                                    />
                                </div>
                            </div>

                            {/* Split Eye Blink Meters */}
                            <div className="grid grid-cols-2 gap-4 mt-1">
                                <div className="group">
                                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                                        <span className="text-slate-400 flex items-center gap-1.5 group-hover:text-cyan-400 transition-colors">
                                            👁️ Left Eye Blink
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-mono">{expressions.blinkingLeft}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 p-[1px]">
                                        <div
                                            className="h-full bg-cyan-500 rounded-full transition-all duration-100"
                                            style={{ width: `${expressions.blinkingLeft}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="group">
                                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                                        <span className="text-slate-400 flex items-center gap-1.5 group-hover:text-cyan-400 transition-colors">
                                            👁️ Right Eye Blink
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-mono">{expressions.blinkingRight}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 p-[1px]">
                                        <div
                                            className="h-full bg-cyan-500 rounded-full transition-all duration-100"
                                            style={{ width: `${expressions.blinkingRight}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Neutral indicator */}
                        {isCameraActive && Object.values(expressions).every(val => val < 15) && (
                            <div className="mt-6 flex items-center gap-3 bg-slate-950/50 border border-slate-800/60 p-3.5 rounded-xl text-xs text-slate-400 font-mono">
                                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                                <span>No major expressions registered. Neutral state active.</span>
                            </div>
                        )}
                    </div>

                    {/* How It Works Technical Mini-Card */}
                    <div className="rounded-2xl border border-slate-850 bg-slate-950/40 p-5 shadow-lg">
                        <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider mb-2">SDK SIGNAL INSIGHT</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                            MediaPipe computes coordinates for <strong className="text-cyan-400 font-medium">478 3D landmarks</strong> and estimates <strong className="text-purple-400 font-medium">52 blendshape coefficients</strong> directly inside the browser using WebAssembly. This delivers instantaneous facial tracking with virtually zero latency.
                        </p>
                    </div>

                </div>

            </main>
        </div>
    );
}