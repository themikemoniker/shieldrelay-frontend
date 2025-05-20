from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx

router = APIRouter()

class SubmitTx(BaseModel):
    hex: str

@router.post("/submit_tx")
async def submit_transaction(payload: SubmitTx):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://shield.rebarlabs.io/v1/rpc",
                json={
                    "jsonrpc": "1.0",
                    "id": "shieldrelay",
                    "method": "sendrawtransaction",
                    "params": [payload.hex]
                },
                timeout=10
            )

            data = response.json()

            if "result" in data and data["result"]:
                return {"txid": data["result"]}
            elif "error" in data and data["error"]:
                raise HTTPException(status_code=400, detail=data["error"]["message"])
            else:
                raise HTTPException(status_code=500, detail="Unexpected response from Rebar")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))