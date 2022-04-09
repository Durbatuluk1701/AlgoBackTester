import pandas as pd 

def stats(ticker:str):
  data = pd.read_csv(f"_data/{ticker.upper()}.csv")

  # daily avg % change
  data["dailyAvgPrctChng"] = ((data["Close"] - data["Open"]) / data["Open"])
  print( data["dailyAvgPrctChng"].mean())