"use client";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

export default function RecordCard({ rec }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // pažymim, kad renderinam client-side
  }, []);

  if (!isClient) return null; // serverio pusėje nerodyti

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition">
      <div className="text-5xl mb-4">
        {rec.file.match(/\.(mp4|avi)$/) ? "🎬" : "🎵"}
      </div>
      <h2 className="text-lg font-semibold mb-4 text-center">{rec.title}</h2>
      <div className="mb-4">
        <QRCode value={rec.file} style={{ width: 120, height: 120 }} />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Nuskenuokite QR kodą savo įrenginyje
      </p>
    </div>
  );
}
