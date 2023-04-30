import ChartBox from "@/components/ChartBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line,
    LineChart,
    PieChart,
    Pie,
    Cell,
    ScatterChart,
    Scatter,
    ZAxis,
} from "recharts";
import { useMemo } from "react";
import { useTheme, Box, Typography } from "@mui/material";
import ChartHeader from "@/components/ChartHeader";
import FlexBetween from "@/components/FlexBetween";




const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
]

const Row2 = () => {

    const { palette } = useTheme();

    const pieColors = [palette.primary[700], palette.primary[300]];

    const { data: operationalData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();

    /* Reformating the data to be competable with recharts expected data types */
    const operationalExpenses = useMemo(() => {
        return (
            operationalData &&
            operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
                return {
                    name: month.substring(0, 3),
                    "Operational Expenses": operationalExpenses,
                    "Non Operational Expenses": nonOperationalExpenses
                }
            })
        )
    }, [operationalData]);


    /* Reformating the data to be competable with recharts expected data types */
    const productExpenseData = useMemo(() => {
        return (
            productData &&
            productData.map(({ _id, price, expense }) => {
                return {
                    id: _id,
                    price: price,
                    expense: expense,
                }
            })
        )
    }, [productData]);


    return (
        <>
            <ChartBox gridArea="d">
                <ChartHeader
                    title="Operational vs Non-Operational Expenses"
                    sideText="+4%"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={operationalExpenses}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 65,
                        }}
                    >

                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />

                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <Tooltip />


                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="Non Operational Expenses"
                            dot={true}
                            stroke={palette.grey[500]}
                        />

                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="Operational Expenses"
                            dot={true}
                            stroke={palette.primary.main}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ChartBox>

            <ChartBox gridArea="e">
                <ChartHeader
                    title="Campaigns and Targets"
                    sideText="+4%"
                />

                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                    <PieChart
                        width={110}
                        height={100}
                        margin={{
                            top: 0,
                            right: -10,
                            left: 10,
                            bottom: 0,
                        }}
                    >
                        <Pie
                            stroke="none"
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={pieColors[index]}
                                />
                            ))}
                        </Pie>
                    </PieChart>

                    <Box
                        ml="-0.7rem"
                        flexBasis="40%"/*flexBasis === width*/
                        textAlign="center"
                    >
                        <Typography variant="h5">Target Sales</Typography>

                        <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
                            83
                        </Typography>

                        <Typography variant="h6">
                            The desired Finance goals
                        </Typography>
                    </Box>

                    <Box
                        flexBasis="40%"/*flexBasis === width*/
                    >
                        <Typography variant="h5">Losses in Revenue</Typography>

                        <Typography variant="h6">
                            Losses are down 25%
                        </Typography>

                        <Typography mt="0.4rem" variant="h5">
                            Profit Margins
                        </Typography>

                        <Typography variant="h6">
                            Margins are up by 30% from last month.
                        </Typography>
                    </Box>

                </FlexBetween>
            </ChartBox >

            <ChartBox gridArea="f">
                <ChartHeader
                    title="Product Prices vs Expenses"
                    sideText="+4%"
                />
                <ResponsiveContainer width="100%" height="100%">

                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 40,
                            left: -20,
                        }}
                    >
                        <CartesianGrid stroke={palette.grey[800]} />

                        <XAxis
                            type="number"
                            dataKey="price"
                            name="price"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`} /* reformating to add the "$" befor the nums */
                        />

                        <YAxis
                            type="number"
                            dataKey="expense"
                            name="expense"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`} /* reformating to add the "$" befor the nums */
                        />

                        <ZAxis type="number" range={[20]} />

                        <Tooltip
                            formatter={(v) => `$${v}`}
                        />
                        <Scatter
                            name="Product Expense Ratio"
                            data={productExpenseData}
                            fill={palette.primary[300]}
                        />
                    </ScatterChart>

                </ResponsiveContainer>
            </ChartBox>
        </>
    )
}

export default Row2