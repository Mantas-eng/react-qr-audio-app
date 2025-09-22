"use client";

import QrScanner from "../components/QrScanner";
import { useState } from "react";

export default function ScannerPage() {
  const [result, setResult] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">QR Scanner</h1>

      {result ? (
        <div className="mb-4 text-center">
          <p className="mb-2">Scanned QR code:</p>
          <code className="bg-gray-200 p-2 rounded">{result}</code>
        </div>
      ) : null}

      <QrScanner
        onScanSuccess={(text) => setResult(text)}
        onClose={() => console.log("Scanner closed")}
      />
    </div>
  );
}
