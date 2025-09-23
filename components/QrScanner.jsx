"use client";
import { useRef, useState, useEffect } from "react";
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
          qrbox: { width: 250, height: 250 },
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

  // padaryti esamus HTML5-Qrcode kampus draggable
  useEffect(() => {
    if (!scanning) return;

    const corners = qrContainerRef.current.querySelectorAll(
      ".html5-qrcode-corner"
    );

    corners.forEach((el) => {
      let isDragging = false;
      let startX, startY, origX, origY;

      const onMouseDown = (e) => {
        isDragging = true;
        startX = e.clientX || e.touches?.[0].clientX;
        startY = e.clientY || e.touches?.[0].clientY;
        const rect = el.getBoundingClientRect();
        origX = rect.left;
        origY = rect.top;
        el.style.position = "absolute";
        e.preventDefault();
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const clientX = e.clientX || e.touches?.[0].clientX;
        const clientY = e.clientY || e.touches?.[0].clientY;
        const dx = clientX - startX;
        const dy = clientY - startY;
        el.style.left = origX + dx + "px";
        el.style.top = origY + dy + "px";
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      el.addEventListener("mousedown", onMouseDown);
      el.addEventListener("touchstart", onMouseDown);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchend", onMouseUp);
    });
  }, [scanning]);

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
          <p className="absolute bottom-2 text-gray-600 bg-white px-2 py-1 rounded">
            Skenuojama...
          </p>
        )}
      </div>
    </div>
  );
}
