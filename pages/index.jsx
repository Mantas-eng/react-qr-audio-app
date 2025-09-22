import { useState } from "react";
import RecordCard from "../components/RecordCard";
import QrScanner from "../components/QrScanner";
import records from "../data/records";

export default function HomePage() {
  const [selectedRec, setSelectedRec] = useState(null);
  const [scanResult, setScanResult] = useState("");

  const handleCardClick = (rec) => {
    setSelectedRec(rec);
    setScanResult(""); // išvalome ankstesnį rezultatą
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Mokomosios knygos įrašai
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {records.map((rec) => (
          <RecordCard key={rec.id} rec={rec} onScanClick={handleCardClick} />
        ))}
      </div>

      {/* Modalas */}
      {selectedRec && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{selectedRec.title}</h2>

            <p className="mb-4 text-gray-600">Nuskenuokite QR kodą su kamera</p>

            {!scanResult ? (
              <QrScanner onScanSuccess={(text) => setScanResult(text)} />
            ) : (
              <div>
                <p className="mb-4">Scanned QR code:</p>
                <a
                  href={scanResult}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {scanResult}
                </a>
                <button
                  onClick={() => setSelectedRec(null)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
