import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import TextField from "@mui/material/TextField"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button } from "@mui/material";

interface ApiData {
    index: number;
    date: number;
    adj_close: number;
    open: number;
    close: number;
    volume: number;
    low: number;
    high: number;
}

const NullTicker = () => {
    return (
        <>
        <h2>Error</h2>
        <p>You have not specified a ticker to collect data for</p>
        </>
    )
}

export const DisplayInfo = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let [displayData, setDisplayData] = useState<Array<ApiData>>([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");


    let ticker = searchParams.get("ticker");
    let startParam = searchParams.get("start")
    let endParam = searchParams.get("end")

    let searchStr = `http://127.0.0.1:5000/${ticker}/all` + ((startParam || endParam) ? `?` : "") + (startParam ? `start=${startParam}` : "") + ((startParam && endParam) ? `&end=${endParam}` : (endParam ? `end=${endParam}` : ""))

    // Update start
    useEffect(() => {
        if (startParam) {
            setStart(startParam);
        }
    }, [startParam])

    // Update end
    useEffect(() => {
        if (endParam) {
            setEnd(endParam);
        }
    }, [endParam]);

    // Retrieve ticker info side effect
    useEffect(() => {
        if (!ticker) {
            // Null ticker bad
            return;
        }
        let abortController = new AbortController();

        async function get_data() {
            let response = await fetch(searchStr, {
                signal: abortController.signal,
            });
            if (!abortController.signal.aborted) {
                let data = await response.json();
                setDisplayData(JSON.parse(data));
            }
        }

        get_data();

        return () => {
            abortController.abort();
        };
    }, [searchStr, ticker]);

    // Grid column definition
    const columns: GridColDef[] = [
        {
            field: 'date', headerName: 'Date', width: 250, valueFormatter: (val) => {
                let d = new Date()
                let [year, month, day] = val.value.split("-")
                d.setUTCFullYear(year, month - 1, day)
                return d.toDateString()
            }
        },
        { field: 'open', headerName: 'Open', width: 150 },
        { field: 'close', headerName: "Close", width: 150 },
        { field: 'high', headerName: "High", width: 150 },
        { field: 'low', headerName: "Low", width: 150 },
        { field: 'volume', headerName: "Volume", width: 150 },
    ]

    return (ticker == null) ? <NullTicker /> : (
        <div style={{ display: "flex", height: "80%", width: "auto", flexDirection: "column" }}>
            <h2 style={{ margin: "0 auto" }}>{ticker} Historical Data</h2>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Start Date"
                        value={new Date(start)}
                        onChange={(val) => {
                            if (val) {
                                try {
                                    setStart(`${val.getUTCFullYear()}-${val.getUTCMonth() + 1}-${val.getUTCDate()}`)
                                } catch (e) {

                                }
                            }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        label="End Date"
                        value={new Date(end)}
                        onChange={(val) => {
                            if (val) {
                                try {
                                    setEnd(`${val.getUTCFullYear()}-${val.getUTCMonth() + 1}-${val.getUTCDate()}`)
                                } catch { }
                            }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button onClick={() => setSearchParams({ ticker: (ticker ? ticker : ""), start: start, end: end})}>Refresh Data</Button>
            </div>
            <DataGrid columns={columns} rows={displayData} getRowId={(row) => {
                return row.index
            }} />
        </div>);
}