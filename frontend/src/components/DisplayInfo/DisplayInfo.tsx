import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
    }, [ticker]);


    console.log(typeof (displayData))

    return (
        <>
            {
                displayData.map((record) => {
                    return (<p key={record.index}>{record.date}, {record.open}, {record.close}</p>)
                })
            }
        </>);
}