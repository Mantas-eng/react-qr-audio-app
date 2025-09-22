import Link from "next/link";
import QRCode from "qrcode.react";

export default function RecordCard({ rec, showButton = true }) {
  const link = `/record/${rec.id}`;
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition">
      <div className="text-5xl mb-4">
        {rec.file.match(/\.(mp4|avi)$/) ? "🎬" : "🎵"}
      </div>
      <h2 className="text-lg font-semibold mb-4 text-center">{rec.title}</h2>
      <div className="mb-4">
        <QRCode value={origin + link} size={96} />
      </div>
      {showButton && (
        <Link
          href={link}
          className="mt-2 inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 text-center"
        >
          Atidaryti
        </Link>
      )}
    </div>
  );
}
