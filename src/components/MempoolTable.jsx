import { useEffect, useState } from 'react';

export default function MempoolTable() {
  const [mempools, setMempools] = useState([]);

  useEffect(() => {
    const fetchMempools = async () => {
      try {
        const res = await fetch("http://localhost:8000/mempools/");
        const data = await res.json();
        setMempools(data.mempools || []);
      } catch (err) {
        console.error("Error fetching mempool data:", err);
      }
    };

    fetchMempools();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Private Mempools</h2>
      <table className="w-full text-left border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Mempool</th>
            <th className="p-2">Fee Tier</th>
            <th className="p-2">Feerate (sat/vB)</th>
            <th className="p-2">Hashrate (%)</th>
          </tr>
        </thead>
        <tbody>
          {mempools.map((pool, i) => (
            pool.fees?.map((fee, j) => (
              <tr key={`${i}-${j}`} className="border-t">
                <td className="p-2">{pool.name}</td>
                <td className="p-2">{fee.label || "-"}</td>
                <td className="p-2">{fee.feerate}</td>
                <td className="p-2">{fee.estimated_hashrate ?? pool.hashrate ?? "-"}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}