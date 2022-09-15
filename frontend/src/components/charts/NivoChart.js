import { ResponsiveLine } from "@nivo/line";
import { useState, useEffect} from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:8000"
let userRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    }
})
export default function NivoChart() {
    const [lineData , setData] = useState()
 // data for testing
    const Dataa = [
        {
          id: "Japan",
          data: [
            {
              x: "plane",
              y: 291
            },
            {
              x: "helicopter",
              y: 58
            },
            {
              x: "boat",
              y: 281
            },
            {
              x: "train",
              y: 204
            },
            {
              x: "subway",
              y: 72
            },
            {
              x: "bus",
              y: 228
            },
            {
              x: "car",
              y: 105
            },
            {
              x: "moto",
              y: 15
            },
            {
              x: "bicycle",
              y: 161
            },
            {
              x: "others",
              y: 209
            }
          ]
        },
        {
          id: "France",
          data: [
            {
              x: "plane",
              y: 49
            },
            {
              x: "helicopter",
              y: 105
            },
            {
              x: "boat",
              y: 124
            },
            {
              x: "train",
              y: 43
            },
            {
              x: "subway",
              y: 79
            },
            {
              x: "bus",
              y: 48
            },
            {
              x: "car",
              y: 251
            },
            {
              x: "moto",
              y: 244
            },
            {
              x: "bicycle",
              y: 12
            },
            {
              x: "others",
              y: 61
            }
          ]
        },
        {
          id: "US",
          data: [
            {
              x: "plane",
              y: 151
            },
            {
              x: "helicopter",
              y: 160
            },
            {
              x: "boat",
              y: 64
            },
            {
              x: "train",
              y: 23
            },
            {
              x: "subway",
              y: 232
            },
            {
              x: "bus",
              y: 295
            },
            {
              x: "car",
              y: 19
            },
            {
              x: "moto",
              y: 224
            },
            {
              x: "bicycle",
              y: 139
            },
            {
              x: "others",
              y: 282
            }
          ]
        },
        {
          id: "Germany",
          data: [
            {
              x: "plane",
              y: 122
            },
            {
              x: "helicopter",
              y: 95
            },
            {
              x: "boat",
              y: 60
            },
            {
              x: "train",
              y: 89
            },
            {
              x: "subway",
              y: 164
            },
            {
              x: "bus",
              y: 15
            },
            {
              x: "car",
              y: 212
            },
            {
              x: "moto",
              y: 248
            },
            {
              x: "bicycle",
              y: 187
            },
            {
              x: "others",
              y: 253
            }
          ]
        },
        {
          id: "Norway",
          data: [
            {
              x: "plane",
              y: 271
            },
            {
              x: "helicopter",
              y: 16
            },
            {
              x: "boat",
              y: 23
            },
            {
              x: "train",
              y: 69
            },
            {
              x: "subway",
              y: 99
            },
            {
              x: "bus",
              y: 22
            },
            {
              x: "car",
              y: 281
            },
            {
              x: "moto",
              y: 52
            },
            {
              x: "bicycle",
              y: 102
            },
            {
              x: "others",
              y: 86
            }
          ]
        }
      ];

      useEffect(() => {
    
        userRequest.get(`/market/two-data/`)
            .then((response)=> {
                setData(response.data)
                console.log(response.data)
                return Promise.resolve(response.data)
  
            })
            .catch((error)=>{
                return Promise.reject(error)
            }) 
      }, [])
      useEffect(() => { 
      }, [ lineData])

    return (
    <> 
     
      {lineData&&
      
      <div style={{ height: "400px", width: "80%", margin: "0 auto" }}>
          <h1 className="text-center" >Nivo Chart</h1>

       <ResponsiveLine
          data={lineData}
          margin={{ top: 50, right: 30, bottom: 100, left: 30 }}
          xScale={{
            type: "time",
            format: "%Y-%m-%d %H:%M:%S",
            precision: "minute"
          }}
          xFormat="time:%Y-%m-%d %H:%M:%S"
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false
          }}
          curve="linear"
          axisTop={null}
          enableGridX={false}
          axisRight={null}
          useMesh={true}
          axisBottom={{
            format: "%Y-%m-%d %H:%M:%S",
            tickValues: "every 15 minutes",
            legend: "time scale",
            legendOffset: -12,
            orient: "bottom",
            tickValues: 10,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: 36,
            legendPosition: "middle"
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle"
          }}
          colors={{ scheme: "nivo" }}
          pointSize={3}
          pointColor={{ theme: "background" }}
          pointBorderWidth={1}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          legends={[
            {
              fill: "white",
              anchor: "top",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: -40,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 200,
              itemTextColor: "#cccccc",
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          theme={{
            fontFamily: "Montserrat",
            textColor: "black",
            text: {
              fill: "black"
            },
            axis: {
              ticks: {
                line: {
                  stroke: "green"
                },
                text: {
                  fill: "black"
                }
              },
              legend: {
                text: {
                  fill: "black"
                }
              }
            },
            crosshair: {
              line: {
                stroke: "black",
                strokeWidth: 0.3,
                strokeOpacity: 0.75,
                strokeDasharray: "6 6"
              }
            },
            grid: {
              line: {
                stroke: "white",
                strokeWidth: 0.5
              }
            }
          }}
          animate={true}
          motionStiffness={215}
          motionDamping={20}
        />
    </div>
    }
    
    </>
  )
}