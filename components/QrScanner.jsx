"use client";
import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScanner({ onScanSuccess }) {
  const qrContainerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  const startScanner = () => {
    if (!qrContainerRef.current) return;

    const cameraMode = /Mobi|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    )
      ? "environment"
      : "user";

    html5QrCodeRef.current = new Html5Qrcode("qr-reader");

    html5QrCodeRef.current
      .start(
        { facingMode: cameraMode },
        {
          fps: 15,
          qrbox: (vw, vh) => {
            const minEdge = Math.min(vw, vh);
            if (vw < 600) {
              // 📱 Mobile → 70% ekrano
              return { width: minEdge * 0.7, height: minEdge * 0.7 };
            } else {
              // 💻 Desktop → fiksuotas ~300px
              return { width: 200, height: 200 };
            }
          },
        },
        (decodedText) => {
          onScanSuccess(decodedText);
          stopScanner();
        },
        (err) => {
          console.log("QR scan error:", err);
        }
      )
      .then(() => setScanning(true))
      .catch((err) => alert("Kamera neprieinama: " + err.message));
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
      } catch (err) {}
      html5QrCodeRef.current.clear();
      html5QrCodeRef.current = null;
    }
    setScanning(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {!scanning && (
        <button
          onClick={startScanner}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold mb-4 hover:bg-yellow-500 transition"
        >
          Bakstelėkite, kad nuskenuotumėte
        </button>
      )}
      <div
        id="qr-reader"
        ref={qrContainerRef}
        className="relative w-full max-w-lg aspect-square bg-gray-200 rounded-md flex items-center justify-center"
      >
        {scanning && (
          <>
            <p className="absolute bottom-2 text-gray-600 bg-white px-2 py-1 rounded">
              Skenuojama...
            </p>
            <div className="absolute border-4 border-white rounded-md w-2/3 h-2/3" />
          </>
        )}
      </div>
    </div>
  );
}
