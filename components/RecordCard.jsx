export default function RecordCard({ rec, onScanClick }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition">
      <div className="text-5xl mb-4">
        {rec.file.match(/\.(mp4|avi)$/) ? "🎬" : "🎵"}
      </div>
      <h2 className="text-lg font-semibold mb-4 text-center">{rec.title}</h2>

      <button
        onClick={() => onScanClick(rec)}
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
      >
        Scan with Camera
      </button>
    </div>
  );
}
