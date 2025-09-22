import Link from "next/link";
import QRCode from "react-qr-code";

export default function RecordCard({ rec, isMobile, onScanClick }) {
  const link = `/record/${rec.id}`;
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition">
      <div className="text-5xl mb-4">
        {rec.file.match(/\.(mp4|avi)$/) ? "🎬" : "🎵"}
      </div>
      <h2 className="text-lg font-semibold mb-4 text-center">{rec.title}</h2>

      {!isMobile && (
        <>
          <div className="mb-4">
            <QRCode value={origin + link} size={96} />{" "}
            {/* react-qr-code palaiko value */}
          </div>
          <Link
            href={link}
            className="mt-2 inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 text-center"
          >
            Atidaryti
          </Link>
        </>
      )}

      {isMobile && (
        <button
          onClick={() => onScanClick(rec)}
          className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 text-center"
        >
          Scan QR Code with Camera
        </button>
      )}
    </div>
  );
}
