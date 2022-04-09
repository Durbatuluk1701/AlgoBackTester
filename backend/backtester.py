import pandas as pd
import matplotlib.pyplot as plt
import datetime

def retrieve_clean(ticker, scrub_dates = False):
    pdData = pd.read_csv(f"_data/{ticker}.csv")
    if (scrub_dates):
        pdData["Date"] = pdData["Date"].apply(lambda x: ((int)(datetime.datetime.fromisoformat(x).timestamp())) )
    return pdData

# startDate and endDate should be in unix epoch
def back_test(ticker : str, strategy, startDate, endDate, scrub_dates = False):
    data : pd.DataFrame = retrieve_clean(ticker, scrub_dates)
    print(data.head())
    if (scrub_dates):
        data = data.loc[data["Date"] > startDate]
        print(data)
        data = data.loc[data["Date"] < endDate]
        print(data)