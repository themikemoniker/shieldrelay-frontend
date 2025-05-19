import { useState, useEffect } from 'react';

export default function TxDecoder() {
  const [rawTx, setRawTx] = useState('');
  const [decoded, setDecoded] = useState(null);
  const [rebarInfo, setRebarInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch Rebar Shield info
  useEffect(() => {
    fetch('https://shield.rebarlabs.io/v1/info')
      .then(res => res.json())
      .then(setRebarInfo)
      .catch(console.error);
  }, []);

  const decodeTx = async () => {
    setLoading(true);
    setDecoded(null);
    setError('');

    try {
      const res = await fetch('http://localhost:8000/decode_tx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hex: rawTx })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || 'Decode failed');
      } else {
        setDecoded(data);
      }
    } catch (err) {
      setError('Could not connect to decoding service');
    } finally {
      setLoading(false);
    }
  };

  const renderCheck = (passed) =>
    passed ? (
      <span className="text-green-700">✅</span>
    ) : (
      <span className="text-red-600">❌</span>
    );

  const analyze = () => {
    if (!decoded || !rebarInfo) return null;

    const vsize = decoded.vsize || 0;
    const fee = decoded.fees || 0;
    const feerate = vsize ? (fee / vsize).toFixed(2) : 0;
    const minRequired = rebarInfo.fees?.[0]?.feerate || 0;

    const paysRebar = decoded.outputs?.some((o) =>
      o.addresses?.includes(rebarInfo.payment.p2wpkh)
    );

    const meetsFeerate = parseFloat(feerate) >= minRequired;

    return (
      <div className="mt-4 p-3 bg-gray-100 rounded text-sm space-y-2">
        <div>
          Transaction size: <strong>{vsize} vbytes</strong>
        </div>
        <div>
          Implied feerate: <strong>{feerate} sat/vB</strong>{' '}
          {renderCheck(meetsFeerate)}{' '}
          <span className={meetsFeerate ? 'text-green-700' : 'text-red-600'}>
            {meetsFeerate ? 'sufficient fee' : `below required ${minRequired}`}
          </span>
        </div>
        <div>
          Rebar fee output present: {renderCheck(paysRebar)}{' '}
          <span className={paysRebar ? 'text-green-700' : 'text-red-600'}>
            {paysRebar ? '✓ Fee detected' : '✗ Missing Rebar fee output'}
          </span>
        </div>
      </div>
    );
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
        disabled={loading}
      >
        {loading ? 'Decoding...' : 'Decode'}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}

      {decoded && (
        <div className="mt-4 space-y-3">
          <div>
            <span className="font-semibold">TXID:</span> {decoded.hash}
          </div>
          <div>
            <span className="font-semibold">Fee:</span> {decoded.fees} sats
          </div>
          <div>
            <span className="font-semibold">Inputs:</span>
            <ul className="list-disc pl-6 text-sm">
              {decoded.inputs.map((input, i) => (
                <li key={i}>
                  From: {input.addresses?.[0] || 'Unknown'} | Value:{' '}
                  {input.output_value} sats
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold">Outputs:</span>
            <ul className="list-disc pl-6 text-sm">
              {decoded.outputs.map((output, i) => (
                <li key={i}>
                  To: {output.addresses?.[0] || 'Unknown'} | Value:{' '}
                  {output.value} sats
                </li>
              ))}
            </ul>
          </div>

          {/* Analysis */}
          {analyze()}
        </div>
      )}
    </div>
  );
}