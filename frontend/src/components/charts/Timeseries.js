import {useState,useEffect} from "react";
import axios from 'axios'
import { TimeSeries } from "pondjs";
import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  Baseline,
  styler
} from "react-timeseries-charts";
import moment from "moment"

// import data from "./testData/data";
// import data2 from "./testData/data2";


// Data for testing
// const points = data.data.reverse();
// const points2 = data2.data.reverse()

const BASE_URL = "http://localhost:8000"
let userRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    }
})


// for styling lines 
const styles = styler([
    { key: "test", color: "black", width: 1 },
    { key: "test2", color: "red", width: 1 }
  ]);
export default function  Timeseries(){

  const [lineData , setData] = useState()
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [timerange, setTimerange] = useState();
  const [highlight, setHighlight] = useState();
  const [selection, setSelection] = useState();

  useEffect(() => {  
    // load data 
    userRequest.get(`/market/two-data/`)
        .then((response)=> {
            setData(response.data)
            console.log(response.data)

            // setup time series data
            const t1 = new TimeSeries({
              name: response.data[0]["id"],
              columns: ["time", "test"],
              points: response.data[0]["data"].map((e)=>[
                moment(e["x"]).valueOf(),
                e["y"]
              ])
            })
            setData1(t1)
            const t2 = new TimeSeries({
              name: response.data[1]["id"],
              columns: ["time", "test2"],
              points: response.data[1]["data"].map((e)=>[
                moment(e["x"]).valueOf(),
                e["y"]
              ])
            })
            setData2(t2)
            setTimerange(t2.range())

            return Promise.resolve(response.data)

        })
        .catch((error)=>{
            return Promise.reject(error)
        })
         
  }, [])

 // track variables
  useEffect(() => {}, [lineData, data1, data2])

    return (
      <>
      
      {(lineData&& data1 && data2) &&
      <div className="container" style={{ height: "500px", width: "100%" }}>
        <h1 className="text-center" >Timeseries Chart</h1>

       <Resizable>
        <ChartContainer
          title="Test Timeseries"
          titleStyle={{ fill: "blue", fontWeight: 500 }}
          timeRange={timerange}
          //format="%b '%y"
          timeAxisTickCount={20}
          showGrid={true}
          maxTime={data2.range().end()}
          minTime={data2.range().begin()}
          timeAxisAngledLabels={true}
          timeAxisHeight={100}
          enablePanZoom={true}
          onTimeRangeChanged={setTimerange}
          // minDuration={1000 * 60 * 60 * 24 * 30}        
          >
          <ChartRow height="150">
            <YAxis
              id="presure"
              label="Presure"
              min={1}     //{data1.min()}
              max= {10}    //{data1.max()}
              width="60"
              format=".2f"
            />
            <Charts>
            <LineChart
                axis="presure"
                highlight={highlight}
                onHighlightChange={setHighlight}
                selection={selection}
                onSelectionChange={setSelection}
                columns={["test"]}
                series={data1}
                style={styles}
              />   
              <LineChart
                axis="presure"
                highlight={highlight}
                onHighlightChange={setHighlight}
                selection={selection}
                onSelectionChange={setSelection}
                columns={["test2"]}
                series={data2}
                style={styles}
              />   


              <Baseline
                axis="presure"
                value={10}
                label="Max"
                position="right"
              />
              <Baseline
                axis="presure"
                value={1}
                label="Min"
                position="right"
              />
              {/* <Baseline
                axis="presure"
                value={data1.avg() - data1.stdev()}
              />
              <Baseline
                axis="presure"
                value={data1.avg() + data1.stdev()}
              />
              <Baseline
                axis="presure"
                value={data1.avg()}
                label="Avg"
                position="right"
              /> */}
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable> 
      </div>
      } </>
    );
  }

