"use client";
import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Rnd } from "react-rnd";

export default function QrScanner({ onScanSuccess }) {
  const qrContainerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [boxSize, setBoxSize] = useState({ width: 250, height: 250 });
  const [boxPos, setBoxPos] = useState({ x: 50, y: 50 });

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
          qrbox: () => {
            return {
              width: boxSize.width,
              height: boxSize.height,
            };
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
        className="relative w-full max-w-lg aspect-square bg-gray-200 rounded-md overflow-hidden"
      >
        {scanning && (
          <>
            <p className="absolute bottom-2 text-gray-600 bg-white px-2 py-1 rounded">
              Skenuojama...
            </p>

            {/* 🔲 Draggable + Resizable overlay */}
            <Rnd
              size={{ width: boxSize.width, height: boxSize.height }}
              position={{ x: boxPos.x, y: boxPos.y }}
              onDragStop={(e, d) => {
                setBoxPos({ x: d.x, y: d.y });
              }}
              onResizeStop={(e, dir, ref, delta, pos) => {
                setBoxSize({
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                });
                setBoxPos(pos);
              }}
              bounds="parent"
              lockAspectRatio
              className="border-4 border-white rounded-md"
            />
          </>
        )}
      </div>
    </div>
  );
}
