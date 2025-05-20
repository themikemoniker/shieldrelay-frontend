import { useEffect, useState } from 'react';
import MempoolTable from './components/MempoolTable';
import TxDecoder from './components/TxDecoder';
import TxSubmitForm from './components/TxSubmitForm';
import Layer2Selector from './components/Layer2Selector';

export default function App() {
  const [rebarInfo, setRebarInfo] = useState(null);

  useEffect(() => {
    fetch('https://shield.rebarlabs.io/v1/info')
      .then((res) => res.json())
      .then(setRebarInfo)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">⚡ ShieldRelay Dashboard</h1>
        <p className="text-sm text-gray-600">
          View private mempool stats, decode Bitcoin transactions, and submit via Rebar Shield.
        </p>
      </header>

      {/* Rebar Instructions Panel */}
      {rebarInfo && (
        <div className="bg-yellow-50 border border-yellow-300 rounded p-4 text-sm">
          <h3 className="font-semibold text-yellow-800 mb-2">📌 How to Submit via Rebar Shield</h3>
          <ul className="list-disc pl-5 space-y-1 text-yellow-900">
            <li>
              Your transaction must include an output that pays the Rebar Shield service fee to this address:
              <div className="mt-1 pl-3 break-all font-mono text-xs bg-white text-gray-900 border px-2 py-1 rounded inline-block">
                {rebarInfo.payment.p2wpkh}
              </div>
            </li>
            <li>
              The fee must be in a <strong>single output</strong> — do not split it across multiple outputs.
            </li>
            <li>
              <strong>Do not rely on an implied miner fee.</strong> Only the output to the Rebar fee address is required and counted.
            </li>
            <li>
              Calculate the fee as:{' '}
              <code className="font-mono bg-white px-1">
                transaction size × fee rate
              </code>
            </li>
            <li>
              Minimum fee rate: <strong>{rebarInfo.fees?.[0]?.feerate} sat/vB</strong>
            </li>
          </ul>
        </div>
      )}

      <MempoolTable />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TxDecoder />
        <TxSubmitForm />
      </div>

      {/* <Layer2Selector /> */}
    </div>
  );
}