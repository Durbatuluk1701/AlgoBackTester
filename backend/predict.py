import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score


def predict_linear(df : pd.DataFrame, field : str):
    slope, intercept, r, p, std_err = stats.linregress(df.index, df[field])
    #         value
    return (
        (slope*(len(df) + 1) + intercept),
        r
    )

def predict_poly(df : pd.DataFrame, field : str, deg : int):
    # 3 degree polynomial by default
    polyModel = np.poly1d(np.polyfit(df.index, df[field], deg))

    while (r2_score(df[field], polyModel(df.index)) < 0.80):
        if (deg > 30):
            # Do not overfit
            break
        # Increment deg until great fit found
        return predict_poly(df, field, deg+1)

    myline = np.linspace(0, len(df), len(df) + 1)


    plt.scatter(df.index, df[field])
    plt.plot(myline, polyModel(myline))
    plt.show()
    return (polyModel(len(df) + 1), deg)