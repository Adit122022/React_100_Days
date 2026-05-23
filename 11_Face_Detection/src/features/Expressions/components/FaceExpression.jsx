import { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export default function FaceExpression() {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const requestRef = useRef(null);

    const [isModelLoading, setIsModelLoading] = useState(true);
    const [expressions, setExpressions] = useState([]);
    const [cameraError, setCameraError] = useState("");

    // Map MediaPipe blendshape names to human-readable labels
    const EXPRESSION_MAP = {
        browDownLeft: "Angry/Frowning",
        browDownRight: "Angry/Frowning",
        jawOpen: "Surprised / Open Mouth",
        mouthSmileLeft: "Smiling",
        mouthSmileRight: "Smiling",
        mouthPucker: "Pouting / Pucker",
        eyeBlinkLeft: "Blinking Left Eye",
        eyeBlinkRight: "Blinking Right Eye",
    };

    useEffect(() => {
        async function initializeMediaPipe() {
            try {
                // Load WASM files from CDN
                const filesetResolver = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
                );

                // Create the FaceLandmarker instance with blendshapes enabled
                landmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                        delegate: "GPU",
                    },
                    outputFaceBlendshapes: true, // Critical for expression mapping
                    runningMode: "VIDEO",
                    numFaces: 1,
                });

                setIsModelLoading(false);
                startCamera();
            } catch (err) {
                console.error("Failed to load MediaPipe FaceLandmarker:", err);
                setCameraError("Failed to initialize face detection models.");
            }
        }

        initializeMediaPipe();

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480, facingMode: "user" },
                audio: false,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.addEventListener("loadeddata", predictLoop);
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            setCameraError("Camera access denied. Please grant permissions.");
        }
    };

    let lastVideoTime = -1;
    const predictLoop = () => {
        if (!videoRef.current || !landmarkerRef.current) return;

        const now = performance.now();
        if (videoRef.current.currentTime !== lastVideoTime) {
            lastVideoTime = videoRef.current.currentTime;

            // Run inference on the current frame
            const result = landmarkerRef.current.detectForVideo(videoRef.current, now);

            // Process blendshapes if a face is detected
            if (result && result.faceBlendshapes && result.faceBlendshapes.length > 0) {
                const blendshapes = result.faceBlendshapes[0].categories;
                // console.log("Blendshapes - ", blendshapes)
                // Filter and map out the relevant expressions meeting a detection threshold
                const detected = blendshapes
                    .filter((item) => EXPRESSION_MAP[item.categoryName] && item.score > 0.3)
                    .map((item) => ({
                        label: EXPRESSION_MAP[item.categoryName],
                        confidence: Math.round(item.score * 100),
                    }));

                setExpressions(detected);
            } else {
                setExpressions([]); // No face in frame
            }
        }

        requestRef.current = requestAnimationFrame(predictLoop);
    };
    // console.log("Expressions - ", expressions)

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Real-Time Face Expression Detector</h2>

            {isModelLoading && <p style={styles.loading}>Loading AI Models (WASM)...</p>}
            {cameraError && <p style={styles.error}>{cameraError}</p>}

            <div style={styles.viewports}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={styles.webcam}
                />

                <div style={styles.dashboard}>
                    <h3>Detected Expressions</h3>
                    {expressions.length === 0 ? (
                        <p style={styles.neutralText}>Neutral face or no face detected.</p>
                    ) : (
                        expressions.map((exp, index) => (
                            <div key={index} style={styles.barContainer}>
                                <div style={styles.barLabel}>
                                    <span>{exp.label}</span>
                                    <span>{exp.confidence}%</span>
                                </div>
                                <div style={styles.barOuter}>
                                    <div style={{ ...styles.barInner, width: `${exp.confidence}%` }} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "900px", margin: "0 auto" },
    header: { textAlign: "center", color: "#333" },
    loading: { textAlign: "center", color: "#666", fontSize: "1.1rem" },
    error: { color: "#d9534f", textAlign: "center", fontWeight: "bold" },
    viewports: { display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" },
    webcam: { width: "100%", maxWidth: "480px", borderRadius: "8px", transform: "scaleX(-1)", background: "#222" },
    dashboard: { flex: "1", minWidth: "280px", background: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
    neutralText: { color: "#888", fontStyle: "italic" },
    barContainer: { marginBottom: "15px" },
    barLabel: { display: "flex", justifyContent: "space-between", marginBottom: "5px", fontWeight: "600", color: "#444" },
    barOuter: { width: "100%", backgroundColor: "#e0e0e0", borderRadius: "4px", overflow: "hidden" },
    barInner: { height: "10px", backgroundColor: "#4caf50", transition: "width 0.1s ease-out" }
};