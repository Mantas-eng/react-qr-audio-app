export default function Player({ rec }) {
  if (!rec) return <div>Įrašas nerastas</div>;
  const isVideo = !!rec.file.match(/\.(mp4|avi)$/);
  return (
    <div className="w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 text-center">{rec.title}</h1>
      <div className="bg-white rounded-xl p-4 shadow">
        {isVideo ? (
          <video controls className="w-full rounded">
            <source src={rec.file} />
            Jūsų naršyklė nepalaiko vaizdo žymos.
          </video>
        ) : (
          <audio controls className="w-full">
            <source src={rec.file} />
            Jūsų naršyklė nepalaiko garso elemento.
          </audio>
        )}
      </div>
    </div>
  );
}
