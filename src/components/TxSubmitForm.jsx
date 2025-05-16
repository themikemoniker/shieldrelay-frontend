import { useState } from 'react';

export default function TxSubmitForm() {
  const [rawTx, setRawTx] = useState("");
  const [mempool, setMempool] = useState("Rebar Shield");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    // TODO: Hook to FastAPI backend
    setResult({ txid: "submitted123", status: "ok", sent_to: mempool });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Submit Transaction</h2>
      <select
        className="w-full p-2 border mb-2 rounded"
        value={mempool}
        onChange={(e) => setMempool(e.target.value)}
      >
        <option value="Rebar Shield">Rebar Shield</option>
        <option value="Ocean">Ocean</option>
        <option value="Eden">Eden</option>
      </select>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={6}
        placeholder="Paste signed transaction hex"
        value={rawTx}
        onChange={(e) => setRawTx(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {result && (
        <pre className="bg-gray-100 mt-4 p-2 rounded text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}