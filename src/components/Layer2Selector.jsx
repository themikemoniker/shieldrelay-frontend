export default function Layer2Selector() {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Layer 2 Integration</h2>
      <div className="flex flex-wrap gap-3">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Alkanes</button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded">LayerTwo Labs</button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Stacks / sBTC</button>
        <button className="bg-yellow-500 text-black px-4 py-2 rounded">exSat</button>
      </div>
    </div>
  );
}