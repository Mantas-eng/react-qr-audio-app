import QRCode from "react-qr-code";

export default function RecordCard({ rec, onScanClick }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition cursor-pointer"
      onClick={() => onScanClick(rec)}
    >
      <div className="text-5xl mb-4">
        {rec.file.match(/\.(mp4|avi)$/) ? "🎬" : "🎵"}
      </div>
      <h2 className="text-lg font-semibold mb-4 text-center">{rec.title}</h2>
      <p className="text-sm text-gray-600 text-center">
        Tap to open modal and scan QR code
      </p>

      {/* QR vizualizacija */}
      <div className="mt-4 bg-gray-100 p-2 rounded">
        <QRCode value={rec.file} size={120} />
      </div>
    </div>
  );
}
