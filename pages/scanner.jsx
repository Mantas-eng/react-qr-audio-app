import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

export default function ScannerPage() {
  const router = useRouter();
  const [err, setErr] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mt-6">Scan QR Code</h1>
      <p className="text-gray-300">Nuskaitykite QR kodą, kad atidaryti įrašą</p>
      <div className="w-full max-w-md mt-6 bg-black rounded-lg overflow-hidden">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              const text = result?.text || result;
              // if text is a full URL pointing to your site, just go there
              if (text.startsWith('/') || text.includes(window.location.origin)) {
                // relative path
                const path = text.startsWith('/') ? text : new URL(text).pathname + new URL(text).search;
                router.push(path);
              } else {
                // if QR contains /record/ID or full link to /record/X
                try {
                  const url = new URL(text);
                  router.push(url.pathname + url.search);
                } catch (e) {
                  // fallback: if text is "player.html?id=1" or similar
                  const m = text.match(/id=(\d+)/);
                  if (m) router.push('/record/' + m[1]);
                }
              }
            }
            if (!!error) setErr(error?.message || String(error));
          }}
          constraints={{ facingMode: 'environment' }}
          style={{ width: '100%', height: 480 }}
        />
      </div>
      {err && <p className="text-red-400 mt-3">{String(err)}</p>}
      <div className="mt-6">
        <a className="text-yellow-400 underline" href="/">← Grįžti</a>
      </div>
    </div>
  );
}
