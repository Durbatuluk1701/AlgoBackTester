from fastapi import FastAPI
import pandas as pd
import datetime
import os
from data_gather import gather_data

app = FastAPI()

def retrieve_csv(ticker):
    if (os.path.isfile(f"_data/{ticker}")):
        return pd.read_csv(f"_data/{ticker}.csv")
    gather_data(ticker)
    return pd.read_csv(f"_data/{ticker}.csv")

def filter_datetime(df, start, end):
    startDate = datetime.datetime.fromisoformat(start)
    endDate = datetime.datetime.fromisoformat(end)
    df["Date"] = df["Date"].apply(pd.to_datetime)
    df = df.loc[df["Date"] > startDate]
    df = df.loc[df["Date"] < endDate]
    return df

@app.get("/{ticker}/open")
def read_root(ticker : str, start : str = "1900-01-01", end : str = datetime.date.today().isoformat()):
    data = retrieve_csv(ticker)
    data = filter_datetime(data, start, end)
    return data["Open"].to_list()

@app.get("/{ticker}/close")
def read_root(ticker : str, start : str = "1900-01-01", end : str = datetime.date.today().isoformat()):
    data = retrieve_csv(ticker)
    data = filter_datetime(data, start, end)
    return data["Close"].to_list()

@app.get("/{ticker}/low")
def read_root(ticker : str, start : str = "1900-01-01", end : str = datetime.date.today().isoformat()):
    data = retrieve_csv(ticker)
    data = filter_datetime(data, start, end)
    return data["Low"].to_list()

@app.get("/{ticker}/high")
def read_root(ticker : str, start : str = "1900-01-01", end : str = datetime.date.today().isoformat()):
    data = retrieve_csv(ticker)
    data = filter_datetime(data, start, end)
    return data["High"].to_list()

@app.get("/{ticker}/Volume")
def read_root(ticker : str, start : str = "1900-01-01", end : str = datetime.date.today().isoformat()):
    data = retrieve_csv(ticker)
    data = filter_datetime(data, start, end)
    return data["Volume"].to_list()

@app.get("/{ticker}/all")
def read_root(ticker : str, start : str = "1900-01-01", end : str = datetime.date.today().isoformat()):
    data = retrieve_csv(ticker)
    data = filter_datetime(data, start, end)
    return data.to_json(double_precision=2, orient="records")
