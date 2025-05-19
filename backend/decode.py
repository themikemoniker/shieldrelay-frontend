from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx

router = APIRouter()

class RawTx(BaseModel):
    hex: str

@router.post("/decode_tx")
async def decode_transaction(raw_tx: RawTx):
    url = "https://api.blockcypher.com/v1/btc/main/txs/decode"
    try:
        async with httpx.AsyncClient() as client:
            res = await client.post(url, json={"tx": raw_tx.hex})
            if res.status_code != 200:
                raise HTTPException(status_code=500, detail="Decode failed")
            return res.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))