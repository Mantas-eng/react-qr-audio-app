"use client";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScanner({ onScanSuccess, onClose }) {
  const qrRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!scanning) return;
    if (!qrRef.current) return;

    html5QrCodeRef.current = new Html5Qrcode(qrRef.current.id);

    // Pabandome gauti desktop kamerą, jei yra
    const config = {
      fps: 10,
      qrbox: 250,
      experimentalFeatures: { useBarCodeDetectorIfSupported: true },
    };

    html5QrCodeRef.current
      .start(
        { facingMode: "environment" }, // mobilui
        config,
        (decodedText) => {
          onScanSuccess(decodedText);
          html5QrCodeRef.current.stop();
          setScanning(false);
        },
        (err) => {
          // console.log(err);
        }
      )
      .catch(async (err) => {
        // Jei nepavyksta su 'environment', bandome default kamerą (desktop)
        await html5QrCodeRef.current
          .start(
            { facingMode: "user" },
            config,
            (decodedText) => {
              onScanSuccess(decodedText);
              html5QrCodeRef.current.stop();
              setScanning(false);
            },
            (err) => {}
          )
          .catch((e) => {
            alert("Kamera nepasiekiama. Patikrinkite prieigą prie kameros.");
            setScanning(false);
          });
      });

    return () => {
      html5QrCodeRef.current?.stop().catch(() => {});
    };
  }, [scanning]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
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
