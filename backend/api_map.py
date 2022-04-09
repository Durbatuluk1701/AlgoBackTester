from fastapi import FastAPI, HTTPException
import api
import datetime

validFields = ["open", "close", "high", "low", "volume"]
firstIso = "1900-01-01"
todayIso = datetime.date.today().isoformat()

app = FastAPI()

@app.get("/{ticker}/{field}")
def read(ticker : str, field : str, start : str = firstIso, end : str = todayIso):
    ticker = str.upper(ticker)
    if (field == "all"):
        return api.get_all(ticker, start, end)
    elif (field in validFields):
        return api.get_field(ticker, field, start, end)
    return HTTPException(400, f"Invalid field name: '{field}'")

@app.get("/average/{ticker}/{field}")
def get_avg(ticker : str, field : str, start : str = firstIso, end : str = todayIso, width : int = 30):
    ticker = str.upper(ticker)
    if (field in validFields):
        return api.get_average(ticker, field, start, end, width)
    return HTTPException(418, "'f'")