"use client";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import QRCode from "react-qr-code";

export default function QrScanner({ qrValue, onScanSuccess, onClose }) {
  const [scanning, setScanning] = useState(false);
  const html5QrCodeRef = useRef(null);
  const qrRegionId = "qr-reader"; // pridėtas id

  const startScanner = () => {
    const qrContainer = document.getElementById(qrRegionId);
    if (!qrContainer) {
      alert("QR skaitytuvo elementas nerastas!");
      return;
    }

    const cameraMode = /Mobi|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    )
      ? "environment"
      : "user";

    html5QrCodeRef.current = new Html5Qrcode(qrRegionId);

    html5QrCodeRef.current
      .start(
        { facingMode: cameraMode },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          onScanSuccess(decodedText);
          stopScanner();
        },
        (err) => {
          console.log("QR scan error:", err);
        }
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
      } catch (err) {
        console.warn("Scanner stop error (ignored):", err.message);
      }
      html5QrCodeRef.current.clear();
      html5QrCodeRef.current = null;
    }
    setScanning(false);
    onClose();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <p className="mb-2">Scan this QR code with your camera:</p>
        <QRCode value={qrValue} size={150} />
      </div>

      {!scanning ? (
        <button
          onClick={startScanner}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold mb-4 hover:bg-yellow-500 transition"
        >
          Tap to Scan
        </button>
      ) : (
        <div
          id={qrRegionId} // pridėtas id
          className="w-full h-64 mb-4 bg-gray-200 rounded-md flex items-center justify-center"
        >
          {/* Scanner canvas will appear here */}
        </div>
      )}

      <button onClick={stopScanner} className="text-gray-700 underline mt-2">
        Cancel
      </button>
    </div>
  );
}
