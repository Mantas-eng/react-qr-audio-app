import { useRouter } from "next/router";
import Link from "next/link";
import records from "../../data/records";
import Player from "../../components/Player";

export default function PlayerPage() {
  const router = useRouter();
  const { id } = router.query;
  const rec = records.find((r) => String(r.id) === String(id));

  if (!rec) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Įrašas nerastas</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
      <div className="w-full max-w-3xl">
        <Player rec={rec} />
        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-700 underline">
            ← Grįžti
          </Link>
        </div>
      </div>
    </div>
  );
}
