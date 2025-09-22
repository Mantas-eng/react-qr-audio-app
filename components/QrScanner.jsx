"use client";
import { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScanner({ onScanSuccess }) {
  const [scanning, setScanning] = useState(false);

  const startScanner = () => {
    const elementId = "qr-reader";

    const cameraMode = /Mobi|Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    )
      ? "environment"
      : "user";

    const html5QrCode = new Html5Qrcode(elementId);

    html5QrCode
      .start(
        { facingMode: cameraMode },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          onScanSuccess(decodedText);
          html5QrCode.stop().then(() => html5QrCode.clear());
          setScanning(false);
        },
        (err) => console.log("QR scan error:", err)
      )
      .then(() => setScanning(true))
      .catch((err) => alert("Kamera neprieinama: " + err.message));
  };

  useEffect(() => {
    return () => {
      // cleanup: stop scanner on unmount
      if (scanning) {
        const html5QrCode = new Html5Qrcode("qr-reader");
        html5QrCode
          .stop()
          .then(() => html5QrCode.clear())
          .catch(() => {});
      }
    };
  }, [scanning]);

  return (
    <div className="flex flex-col items-center w-full">
      {!scanning && (
        <button
          onClick={startScanner}
          className="bg-yellow-400 text-white px-4 py-2 rounded-lg mb-4 hover:bg-yellow-500"
        >
          Bakstelėkite, kad nuskanuotumėte
        </button>
      )}
      <div
        id="qr-reader"
        className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center"
      >
        {scanning && <p className="text-gray-600">Skenuojama...</p>}
      </div>
    </div>
  );
}
