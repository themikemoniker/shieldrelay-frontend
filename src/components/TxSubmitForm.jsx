import { useState } from 'react';
import { API_URL } from '../config';

export default function TxSubmitForm() {
  const [rawTx, setRawTx] = useState("");
  const [mempool, setMempool] = useState("Rebar Shield");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/submit_tx`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hex: rawTx }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Error submitting transaction");
      } else {
        setResult({ txid: data.txid, sent_to: mempool });
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {result && (
        <pre className="bg-gray-100 mt-4 p-2 rounded text-sm">
{`✅ Submitted to ${result.sent_to}
TXID: ${result.txid}`}
        </pre>
      )}

      {error && (
        <div className="text-red-600 mt-3">{error}</div>
      )}
    </div>
  );
}