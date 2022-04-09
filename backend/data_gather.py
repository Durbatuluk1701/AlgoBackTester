import time
import http.client as hc

baseUrl = "query1.finance.yahoo.com"

"""
Gathers data from a URL and saves it out
:param 'ticker': the ticker to query for
:param 'startDate': the start date as a unix epoch time
:param 'endDate': the end date as a unix epoch time
"""
def gather_data(ticker : str, startDate = 0, endDate = ((int)(time.time() // 1))):
    ticker = ticker.upper()
    connection = hc.HTTPSConnection(baseUrl)
    url = f"https://query1.finance.yahoo.com/v7/finance/download/{ticker}?period1={startDate}&period2={endDate}&interval=1d&events=history&includeAdjustedClose=true"
    print(url)
    connection.request("GET", url)
    resp = connection.getresponse()
    print(resp)
    with open(f"_data/{ticker}.csv","wb") as outFile:
        outFile.write(resp.read())
    print("Done")