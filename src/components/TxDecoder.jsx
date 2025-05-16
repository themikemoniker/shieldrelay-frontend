import { useState } from 'react';

export default function TxDecoder() {
  const [rawTx, setRawTx] = useState("");
  const [decoded, setDecoded] = useState(null);

  const decodeTx = async () => {
    // TODO: Replace with call to FastAPI
    setDecoded({ txid: "123abc", inputs: [], outputs: [] });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Transaction Decoder</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={6}
        placeholder="Paste raw transaction hex"
        value={rawTx}
        onChange={(e) => setRawTx(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={decodeTx}
      >
        Decode
      </button>
      {decoded && (
        <pre className="bg-gray-100 mt-4 p-2 rounded text-sm overflow-auto max-h-64">
          {JSON.stringify(decoded, null, 2)}
        </pre>
      )}
    </div>
  );
}