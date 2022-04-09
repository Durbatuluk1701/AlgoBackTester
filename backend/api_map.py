from fastapi import FastAPI, HTTPException
import fastapi
import api
import datetime
from fastapi.middleware.cors import CORSMiddleware

validFields = ["open", "close", "high", "low", "volume"]
firstIso = "1900-01-01"
todayIso = datetime.date.today().isoformat()

app = FastAPI()

origins = ['http://localhost','http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

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

@app.get("/predict/linear/{ticker}")
def get_predict_linear(ticker : str):
    # Always predict from today on
    return api.get_predict_linear(ticker, firstIso, todayIso)

@app.get("/predict/poly/{ticker}")
def get_predict_poly(ticker : str, start : str = firstIso, end : str = todayIso, deg : int = 3):
    return api.get_predict_poly(ticker, start, end, deg)