from fastapi import HTTPException
import pandas as pd
import datetime
import os
from data_gather import gather_data
import predict

def df_clean(ticker, start, end):
    df = retrieve_csv(ticker)        
    df = filter_datetime(df, start, end)
    df.columns = map(str.lower, df.columns)
    df["date"] = df["date"].astype("string")
    df.dropna(inplace=True)
    return df

def retrieve_csv(ticker):
    if (os.path.isfile(f"_data/{ticker}.csv")):
        return pd.read_csv(f"_data/{ticker}.csv")
    if (gather_data(ticker) == None):
        raise HTTPException(400, f"Invalid Ticker")
    return pd.read_csv(f"_data/{ticker}.csv")

def filter_datetime(df, start, end):
    startDate = datetime.datetime.fromisoformat(start)
    endDate = datetime.datetime.fromisoformat(end)
    df["Date"] = df["Date"].apply(pd.to_datetime)
    df = df.loc[df["Date"] > startDate]
    df = df.loc[df["Date"] < endDate]
    df.reset_index(inplace=True)
    return df

def get_field(ticker : str, field : str, start : str, end : str):
    data = df_clean(ticker, start, end)
    return data[field].to_list()

def get_all(ticker : str, start : str, end : str):
    data = df_clean(ticker, start, end)
    return data.to_json(double_precision=4, orient="records")

def get_average(ticker, field, start, end, width):
    data = df_clean(ticker,start,end)
    data = data[field].to_frame()
    data[field] = data[field].rolling(width).mean()
    data.dropna(inplace=True)
    return data[field].to_list()

def get_predict_linear(ticker : str, start : str, end : str):
    data = df_clean(ticker, start, end)
    return predict.predict_linear(data, "open")

def get_predict_poly(ticker : str, start : str, end : str, deg : int):
    data = df_clean(ticker, start, end)
    return predict.predict_poly(data, "open", deg)