"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScanner({ onScanSuccess, onClose, recTitle }) {
  const qrRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!scanning) return;
    if (!qrRef.current) return;

    html5QrCodeRef.current = new Html5Qrcode(qrRef.current.id);

    const config = { fps: 10, qrbox: 250 };

    html5QrCodeRef.current
      .start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          onScanSuccess(decodedText);
          html5QrCodeRef.current.stop().catch(() => {});
          setScanning(false);
        },
        (err) => {}
      )
      .catch(async () => {
        alert("Kamera nepasiekiama. Patikrinkite prieigą prie kameros.");
        setScanning(false);
      });

    return () => {
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, [scanning, onScanSuccess]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">{recTitle}</h2>
        {!scanning ? (
          <button
            onClick={() => setScanning(true)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold mb-4 hover:bg-yellow-500 transition"
          >
            Scan QR Code with Camera
          </button>
        ) : (
          <div id="qr-reader" className="w-full h-64 mb-4" ref={qrRef}></div>
        )}

        <button
          onClick={() => {
            html5QrCodeRef.current?.stop().catch(() => {});
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
