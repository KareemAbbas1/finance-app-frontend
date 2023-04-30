import ChartBox from "@/components/ChartBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { useState, useMemo } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import regression, { DataPoint } from "regression";


type Props = {}

const Predictions = (props: Props) => {

  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();


  // formatting the data for reCharts 
  const formattedData = useMemo(() => {
    // basic validation so recharts doesn't display errors
    if (!kpiData) return [];

    const monthData = kpiData[0].monthlyData;


    const formatted: Array<DataPoint> = monthData.map(// <DataPoint> is the type that regression-js expects for its input array
      ({ revenue }, i: number) => {
        return [i, revenue]; /* we formatted the data this way because this what regression-js expects as its input. Basically, we're giving regression-js the X axis value 
        and the Y axis value. In this case the "i", which is the X axis value, represents the month of the year starting from 0 which is January and so on, and the revenue is the
        the revenue for each month. We're returning an array of arrays with each nested array representing each month/dataPoint
        */
      }
    );

    // The linear formula. for more information on the linear formula visit https://www.cuemath.com/algebra/linear-equations/
    const regressionLine = regression.linear(formatted);

    // return the months data formatted in the way that reCharts expects to present the lines in the lineChart
    // this returns an array of objects. Each object represents a data point
    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],/* Here the "i" represents the current month, and the index of "1" to grap the second value which is revenue.*/
        "Predicted Revenue": regressionLine.predict(i + 12)[1],/* The expression "i + 12" represents the next year where "i" starts at "0" and we increase it by 12 to get the next year's months
          and the second index [1] returns the revenue value for that month. This how to use regression.predict to predict furter values even though the indexs[13, 14,15...] don't exist on the 
          formattedData we can use them to predict the future values.
        */
      };
    });
  }, [kpiData]);


  return (
    <ChartBox
      width="100%"
      height="100%"
      p="1rem 0"
      overflow="hidden"
    >
      <FlexBetween m="1rem 1rem" gap="1rem">
        <Box>
          <Typography variant="h3">
            Revenue and Predictions
          </Typography>

          <Typography variant="h5">
            Charted revenue and predicted revenue on a simpla linear regression model.
          </Typography>
        </Box>

        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[500],
            backgroundColor: palette.grey[800],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)"
          }}
        >
          {`${!isPredictions ? "Show" : "Hide"} Next Year's Predicted Revenue`}
        </Button>
      </FlexBetween>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={palette.grey[800]}
          />

          <Legend
            verticalAlign="top"
          />

          <XAxis
            dataKey="name"
            tickLine={false}
            style={{ fontSize: "10px" }}
          >
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>

          <YAxis
            domain={[12000, 25000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label value="Revenue in USD" angle={-90} offset={-5} position="insideLeft" />
          </YAxis>

          <Tooltip />



          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />

          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke={palette.grey[500]}
            dot={false}
          />

          {
            isPredictions && (
              <Line
                strokeDasharray="5 5"
                dataKey="Predicted Revenue"
                stroke={palette.secondary[500]}
              />
            )
          }
        </LineChart>
      </ResponsiveContainer>
    </ChartBox >
  )
}

export default Predictions