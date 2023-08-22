import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Grid } from '@mui/material';

const columnData = {
    // "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "...",
    "images": [],
}
export const Home = () => {
    const tableHead = Object.keys(columnData);
    const [rows, setRows] = React.useState([]);
    const getProductList = () => {
        fetch('https://dummyjson.com/auth/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data =>{
                console.log(data, localStorage.getItem("token"));
                data && data.products && Array.isArray(data.products) && setRows(data.products);
            })
            .then(console.log);
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getProductList();
        }
    }, [])
    return (
        <Box p={6}>
            <h1>
                Products List
            </h1>
            <Grid container p={10}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {tableHead.map(key =>
                                    <TableCell>{key.toLocaleUpperCase()}</TableCell>
                                )};
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="right">{row.description.substr(0,10)}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.discountPercentage}</TableCell>
                                    <TableCell align="right">{row.rating}</TableCell>
                                    <TableCell align="right">{row.stock}</TableCell>
                                    <TableCell align="right">{row.brand.substr(0,10)}</TableCell>
                                    <TableCell align="right">{row.category.substr(0,10)}</TableCell>
                                    <TableCell align="right"><img width={"100px"} src={row.thumbnail}/></TableCell>
                                    <TableCell align="right">{row.images.toString().substr(0,10)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Box>
    )
}
