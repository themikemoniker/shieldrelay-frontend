
# ⚡ ShieldRelay

A web app for inspecting, decoding, and submitting Bitcoin transactions through **private mempool relays** like **Rebar Shield** — built with **React + Tailwind + FastAPI**.

---

## ✨ Features

- 🔍 View private mempool fee rates (Rebar, Ocean, Mempool.space)
- 🧠 Decode raw Bitcoin transactions with input/output analysis
- ✅ Check if a transaction meets Rebar Shield fee requirements
- 📬 Submit transactions directly to Rebar Shield
- 📡 Check if your transaction is present in the Rebar mempool
- 📦 Modular: Supports integration with other private relays like Ocean, Slipstream, etc.

---

## 📂 Project Structure

```
shieldrelay-frontend/
├── backend/               # FastAPI backend
│   ├── main.py
│   ├── decode.py
│   ├── submit.py
│   └── txstatus.py
├── src/                   # React frontend
│   ├── App.jsx
│   └── components/
│       ├── MempoolTable.jsx
│       ├── TxDecoder.jsx
│       ├── TxSubmitForm.jsx
│       └── Layer2Selector.jsx
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourname/shieldrelay.git
cd shieldrelay
```

### 2. Frontend Setup (React + Tailwind)

```bash
npm install
npm run dev
```

Access: [http://localhost:5173](http://localhost:5173)

### 3. Backend Setup (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn httpx
uvicorn main:app --reload
```

Access: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🔗 API Endpoints

| Endpoint              | Method | Description                                      |
|-----------------------|--------|--------------------------------------------------|
| `/mempools`           | GET    | Aggregates mempool data (Rebar, Ocean, others)   |
| `/decode_tx`          | POST   | Decodes raw Bitcoin transaction via BlockCypher |
| `/submit_tx`          | POST   | Submits TX to Rebar Shield                      |
| `/tx_status?txid=...` | GET    | Checks if TX is in Rebar’s private mempool      |

---

## 📌 Rebar Shield TX Requirements

- Include a **single output** to Rebar’s fee address:
  - Get it via: `GET https://shield.rebarlabs.io/v1/info`
- Fee output must be calculated as:
  ```
  fee = transaction size (vbytes) × selected feerate
  ```
- Fee **must not** be split across multiple outputs
- Must meet or exceed selected feerate tier
- TX must be Bitcoin-consensus-valid

---

## 🧱 Built With

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [BlockCypher API](https://www.blockcypher.com/dev/bitcoin/)
- [Rebar Labs Shield](https://rebarlabs.io)

---

## 🤝 Contributing

PRs are welcome! Just make sure to:

- Use clear commit messages
- Test your API endpoints via `/docs`
- Keep UI lightweight and mobile-friendly

---

## 📜 License

MIT License. Use freely with credit.

---

## 📫 Contact

Twitter: [@themikemoniker](https://twitter.com/themikemoniker)  
Project powered by [Rebar Labs](https://rebarlabs.io)
