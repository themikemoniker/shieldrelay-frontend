from fastapi import APIRouter
import httpx

router = APIRouter()

async def fetch_rebar_data():
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get("https://shield.rebarlabs.io/v1/info")
            rebar_data = res.json()
            return {
                "name": "Rebar Shield",
                "fees": rebar_data.get("fees", []),
                "hashrate": sum(f.get("estimated_hashrate", 0) for f in rebar_data.get("fees", []))
            }
    except Exception as e:
        return {
            "name": "Rebar Shield",
            "fees": [],
            "error": str(e)
        }

async def fetch_mempool_space_data():
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get("https://mempool.space/api/v1/fees/recommended")
            fees = res.json()
            return {
                "name": "Mempool.space",
                "fees": [
                    {"label": "fastest", "feerate": fees["fastestFee"]},
                    # {"label": "halfHour", "feerate": fees["halfHourFee"]},
                    # {"label": "hour", "feerate": fees["hourFee"]}
                ],
                "hashrate": None  # Not available
            }
    except Exception as e:
        return {
            "name": "Mempool.space",
            "fees": [],
            "error": str(e)
        }

@router.get("/")
async def get_mempools():
    rebar = await fetch_rebar_data()
    mempool_space = await fetch_mempool_space_data()

    # Optional mock mempools
    # ocean = {
    #     "name": "Ocean",
    #     "fees": [{"feerate": 20, "estimated_hashrate": 15}]
    # }
    # eden = {
    #     "name": "Eden",
    #     "fees": [{"feerate": 22, "estimated_hashrate": 10}]
    # }

    return {
        "mempools": [rebar, mempool_space]
    }