import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid"

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

export const DisplayInfo = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let [displayData, setDisplayData] = useState<Array<ApiData>>([]);

    let ticker = searchParams.get("ticker");
    let start = searchParams.get("start")
    let end = searchParams.get("end")

    useEffect(() => {
        let abortController = new AbortController();

        async function get_data() {
            let searchStr = `http://127.0.0.1:5000/${ticker}/all` + ((start || end) ? `?` : "") + (start ? `start=${start}` : "") + ((start && end) ? `&end=${end}` : (end ? `end=${end}` : ""))
            console.log(searchStr)
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
    }, [ticker, end, start]);

    const columns: GridColDef[] = [
        {
            field: 'date', headerName: 'Date', width: 250, valueFormatter: (val) => {
                let d = new Date()
                let [year, month, day] = val.value.split("-")
                d.setUTCFullYear(year, month - 1, day)
                return d.toDateString()
            }
        },
        { field: 'open',headerName: 'Open',width: 150}, 
        { field: 'close', headerName: "Close", width: 150 },
        { field: 'high', headerName: "High", width: 150 },
        { field: 'low', headerName: "Low", width: 150 },
        { field: 'volume', headerName: "Volume", width: 150 },
        ]

    return (
        <div style={{ display: "flex", height: "80%", width: "auto", flexDirection: "column" }}>
            <h2 style={{margin: "0 auto"}}>{ticker} Historical Data</h2>
            <DataGrid columns={columns} rows={displayData} getRowId={(row) => {
                return row.index
            }} />
        </div>);
}