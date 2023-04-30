import ChartBox from "@/components/ChartBox";
import ChartHeader from "@/components/ChartHeader";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";




const Row3 = () => {


    // extract data
    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const { data: transactionData } = useGetTransactionsQuery();
    // end data extraction

    const { palette } = useTheme();
    const pieColors = [palette.primary[700], palette.primary[300]];


    // formating the pieChart data
    const pieChartData = useMemo(() => {
        if (kpiData) {
            const totalExpenses = kpiData[0].totalExpenses;
            return Object.entries(kpiData[0].expensesByCategory).map(
                ([key, value]) => {
                    return [
                        // the format that recharts expects for the pie chart data. The first object is  the hightlighted part of the pie chart.
                        {
                            name: key,
                            value: value,
                        },
                        {
                            name: `${key} of Total`,
                            value: totalExpenses - value,
                        },
                    ]
                }
            )
        }
    }, [kpiData]);

    // formating the products data
    const productColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
    ]


    // formating the transactions data
    const transactionColumns = [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 0.67,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.35,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.1,
            renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
        },
    ]

    return (
        <>
            <ChartBox gridArea="g">
                <ChartHeader
                    title="List of Products"
                    sideText={`${productData && productData.length} products`}
                />

                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": { /* here we're targeting the child element(DataGrid) and modifing it */
                            color: palette.grey[600],
                            border: "none"
                        },
                        // "& .MuiDataGrid-cell": {
                        //     borderTop: `1px solid ${palette.grey[800]} !important`
                        // },
                        "& .MuiDataGrid-withBorderColor": {
                            borderBottomColor: `${palette.grey[800]} !important`
                        },
                        // "& .MuiDataGrid-columnHeaderSeparator": {
                        //     visibility: "hidden"
                        // },
                        "& .MuiSvgIcon-root": {
                            color: `${palette.grey[600]}`,
                        },
                    }}
                >

                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={productData || []}
                        columns={productColumns}
                    />

                </Box>
            </ChartBox>

            <ChartBox gridArea="h">
                <ChartHeader
                    title="Recent Orders"
                    sideText={`${transactionData && transactionData.length} latest transactions`}
                />

                <Box
                    mt="0.7rem"
                    p="0 0.5rem"
                    height="81%"
                    sx={{
                        "& .MuiDataGrid-root": { /* here we're targeting the child element(DataGrid) and modifing it */
                            color: palette.grey[600],
                            border: "none"
                        },
                        // "& .MuiDataGrid-cell": {
                        //     borderTop: `1px solid ${palette.grey[800]} !important`
                        // },
                        "& .MuiDataGrid-withBorderColor": {
                            borderBottomColor: `${palette.grey[800]} !important`
                        },
                        // "& .MuiDataGrid-columnHeaderSeparator": {
                        //     visibility: "hidden"
                        // },
                        "& .MuiSvgIcon-root": {
                            color: `${palette.grey[600]}`,
                        },
                    }}
                >

                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter={true}
                        rows={transactionData || []}
                        columns={transactionColumns}
                    />

                </Box>
            </ChartBox>

            <ChartBox gridArea="i">

                <ChartHeader
                    title="Expense Breakdown By Category"
                    sideText="+4%"
                />

                <FlexBetween
                    mt="0.5rem"
                    gap="0.5rem"
                    p="0 1rem"
                    textAlign="center"
                >

                    {
                        pieChartData?.map((data, i) => (
                            <Box key={`${data[0].name}-${i}`}>
                                <PieChart
                                    width={110}
                                    height={100}
                                >
                                    <Pie
                                        stroke="none"
                                        data={data}
                                        innerRadius={18}
                                        outerRadius={35}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={pieColors[index]}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                                <Typography variant="h5">
                                    {data[0].name}
                                </Typography>
                            </Box>
                        ))
                    }
                </FlexBetween>
            </ChartBox>

            <ChartBox gridArea="j" className="overall-summary">
                <ChartHeader
                    title="OverAll Summary and Explanation Data"
                    sideText="+15%"
                />

                <Box
                    height="15px"
                    margin="1.25rem 1rem 0.4rem 1rem"
                    bgcolor={palette.primary[700]}
                    borderRadius="1rem"
                >
                    <Box
                        height="15px"
                        bgcolor={palette.primary[300]}
                        borderRadius="1rem"
                        width="40%"
                    />
                </Box>
                <Typography variant="h6" margin="0 1rem">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in.
                </Typography>
            </ChartBox>
        </>
    )
}

export default Row3