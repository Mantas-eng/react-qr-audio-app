"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScanner({ onScanSuccess, onClose }) {
  const [scanning, setScanning] = useState(false);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    if (!scanning) return;

    // patikrinam, ar elementas yra DOM
    const qrRegionId = "qr-reader";
    if (!document.getElementById(qrRegionId)) return;

    html5QrCodeRef.current = new Html5Qrcode(qrRegionId);

    html5QrCodeRef.current
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          onScanSuccess(decodedText);
          html5QrCodeRef.current.stop();
          setScanning(false);
        },
        (errorMessage) => {
          // console.log("QR error:", errorMessage);
        }
      )
      .catch((err) => console.error("QR start failed:", err));

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [scanning]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Scan QR Code</h2>

        {!scanning ? (
          <button
            onClick={() => setScanning(true)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold mb-4 hover:bg-yellow-500 transition"
          >
            Tap to Scan
          </button>
        ) : (
          <div
            id="qr-reader"
            className="w-full h-64 mb-4"
            style={{ width: "100%" }}
          />
        )}

        <button
          onClick={() => {
            if (html5QrCodeRef.current) {
              html5QrCodeRef.current.stop().catch(() => {});
            }
            setScanning(false);
            onClose();
          }}
          className="text-gray-700 underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
