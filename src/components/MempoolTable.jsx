export default function MempoolTable() {
  const mempools = [
    { name: "Rebar Shield", feerate: 18, hashrate: 12 },
    { name: "Ocean", feerate: 20, hashrate: 15 },
    { name: "Eden", feerate: 22, hashrate: 10 },
    { name: "Submarine", feerate: 24, hashrate: 8 }
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Private Mempools</h2>
      <table className="w-full text-left border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Mempool</th>
            <th className="p-2">Feerate (sat/vB)</th>
            <th className="p-2">Hashrate (%)</th>
          </tr>
        </thead>
        <tbody>
          {mempools.map((m, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{m.name}</td>
              <td className="p-2">{m.feerate}</td>
              <td className="p-2">{m.hashrate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}