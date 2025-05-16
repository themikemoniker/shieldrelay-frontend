import MempoolTable from './components/MempoolTable'
import TxDecoder from './components/TxDecoder'
import TxSubmitForm from './components/TxSubmitForm'
import Layer2Selector from './components/Layer2Selector'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">⚡ ShieldRelay Dashboard</h1>
        <p className="text-sm text-gray-600">
          View private mempool stats, decode Bitcoin transactions, and submit via Rebar Shield.
        </p>
      </header>

      <MempoolTable />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TxDecoder />
        <TxSubmitForm />
      </div>

      <Layer2Selector />
    </div>
  )
}