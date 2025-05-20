export default function HowTo() {
  return (
    <div className="bg-white p-4 rounded shadow text-sm leading-relaxed">
  <h2 className="text-lg font-semibold mb-2">📌 How to Submit via Rebar Shield</h2>
  <ul className="list-disc pl-5 space-y-1">
    <li>
      Your transaction must include an output that pays the Rebar Shield service fee to this address:
      <code className="ml-1 bg-gray-200 px-1 py-0.5 rounded text-xs">
        bc1qzxzt6cyu5lmfqq6p0kvdg0cayqg6wyvrx4pcwc
      </code>
    </li>
    <li>
      The fee must be in a <strong>single output</strong> — do not split it across multiple outputs.
    </li>
    <li>
      <strong>Do not rely on an implied miner fee</strong>. Only the Rebar fee output is counted.
    </li>
    <li>
      Calculate the fee as: <code>transaction size (vbytes) × feerate (sat/vB)</code>
    </li>
    <li>
      The current minimum fee rate is <strong>27 sat/vB</strong>
    </li>
  </ul>
</div>
  );
}