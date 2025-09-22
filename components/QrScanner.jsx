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
        { fps: 20, qrbox: 250 },
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
        className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center"
      >
        {scanning && <p className="text-gray-600">Skenuojama...</p>}
      </div>
    </div>
  );
}
