"use client";
import { useState, useEffect } from "react";
import RecordCard from "../components/RecordCard";
import QrScanner from "../components/QrScanner";
import records from "../data/records";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedRec, setSelectedRec] = useState(null);
  const [scannerOpen, setScannerOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = (rec) => {
    if (isMobile) {
      setSelectedRec(rec);
    }
  };

  const closeQR = () => setSelectedRec(null);

  const handleScanSuccess = (decodedText) => {
    alert("QR kodas nuskaitytas: " + decodedText);
    setScannerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-6 shadow">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Mokomosios knygos įrašai</h1>
          <p className="text-sm mt-1">
            Pasirinkite įrašą arba nuskenuokite QR kodą
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedRec && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
              <h2 className="text-xl font-semibold mb-4">
                {selectedRec.title}
              </h2>
              <p className="mb-4 text-gray-600">Tap to Scan QR code 👇</p>
              <RecordCard rec={selectedRec} showButton={false} />
              <button
                onClick={() => setScannerOpen(true)}
                className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500"
              >
                Tap to Scan
              </button>
              <button
                onClick={closeQR}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
              >
                Uždaryti
              </button>
            </div>
          </div>
        )}

        {scannerOpen && (
          <QrScanner
            onScanSuccess={handleScanSuccess}
            onClose={() => setScannerOpen(false)}
          />
        )}

        <div
          className={`grid gap-6 ${
            isMobile
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {records.map((rec) => (
            <div key={rec.id} onClick={() => handleCardClick(rec)}>
              <RecordCard rec={rec} showButton={!isMobile} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
