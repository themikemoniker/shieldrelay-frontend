from fastapi import FastAPI
from mempools import router as mempool_router
from fastapi.middleware.cors import CORSMiddleware
from decode import router as decode_router
from submit import router as submit_router


app = FastAPI(title="ShieldRelay API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
        "https://shieldrelay-frontend.onrender.com",
        "https://shield-transaction-checker.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Register router
app.include_router(mempool_router, prefix="/mempools")
app.include_router(decode_router)
app.include_router(submit_router)