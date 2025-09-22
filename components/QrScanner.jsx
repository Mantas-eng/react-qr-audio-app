"use client";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScanner({ onScanSuccess, onClose }) {
  const [scanning, setScanning] = useState(false);
  const qrContainerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  const startScanner = () => {
    if (!qrContainerRef.current) return;

    const cameraMode = /Mobi|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    )
      ? "environment"
      : "user";

    html5QrCodeRef.current = new Html5Qrcode(qrContainerRef.current);

    html5QrCodeRef.current
      .start(
        { facingMode: cameraMode },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          onScanSuccess(decodedText);
          stopScanner();
        },
        (errorMessage) => {}
      )
      .then(() => setScanning(true))
      .catch((err) => {
        alert(
          "Kamera nerasta arba neprieinama. Patikrinkite naršyklės leidimus: " +
            err.message
        );
      });
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Scan QR Code</h2>
        {!scanning ? (
          <button
            onClick={startScanner}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold mb-4 hover:bg-yellow-500 transition"
          >
            Tap to Scan
          </button>
        ) : (
          <div
            ref={qrContainerRef}
            className="w-full h-64 mb-4 bg-gray-200 rounded-md flex items-center justify-center"
          />
        )}
        <button onClick={stopScanner} className="text-gray-700 underline mt-2">
          Cancel
        </button>
      </div>
    </div>
  );
}
