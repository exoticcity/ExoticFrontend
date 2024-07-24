/* eslint-disable no-unused-vars */
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CircularProgress from '@mui/material/CircularProgress';

const Ledger = () => {
    const { accessTokenUrl } = useContext(Context);
    const navigate = useNavigate();
    const [salesOrders, setSalesOrders] = useState([]);

    useEffect(() => {
        // Get user from session storage
        const userFromStorage = (sessionStorage.getItem('user'));

        // Fetch sales orders
        axios.get(`https://api.businesscentral.dynamics.com/v2.0/7c885fa6-8571-4c76-9e28-8e51744cf57a/Live/api/v2.0/companies(f03f6225-081c-ec11-bb77-000d3abcd65f)/salesOrders?$expand=salesOrderLines&$filter = customerNumber eq  '${userFromStorage}'`, {
            headers: {
                Authorization: `Bearer ${accessTokenUrl}`,
            },
        })
            .then((res) => {
                setSalesOrders(res.data.value);
            })
            .catch((err) => {
                console.log("Error fetching sales orders:", err);
            });
    }, [accessTokenUrl]);

    const handleOrderLineNavigate = (id) => {
        navigate(`/OrderLines/${id}`);
    }

    const handleGoBack = () => { window.history.back() };

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ margin: '20px', minHeight: '100vh', minWidth: '90%', overflowX: 'auto' }}>
                <Button onClick={handleGoBack} sx={{ margin: '20px', backgroundColor: '#fff', color: '#000', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff' }, px: '20px' }}>
                    <KeyboardReturnIcon />
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: '600' }}>Sales order no</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '600' }}>Customer Name</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '600' }}>Amount Excluding Tax</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '600' }}>Amount Including Tax</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '600' }}>Order Date</TableCell>
                            <TableCell align="center" sx={{ fontWeight: '600' }}>Sales Order Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {salesOrders?.map((order) => (
                            <Fragment key={order.id}>
                                <TableRow sx={{ '&:hover': { backgroundColor: '#f2f2f2' }, cursor: 'pointer' }} onClick={() => handleOrderLineNavigate(order.number)}>
                                    <TableCell align="center">{order.number}</TableCell>
                                    <TableCell align="center">{order.customerName}</TableCell>
                                    <TableCell align="center">{order.totalAmountExcludingTax}</TableCell>
                                    <TableCell align="center">{order.totalAmountIncludingTax}</TableCell>
                                    <TableCell align="center">{order.orderDate}</TableCell>
                                    <TableCell align="center">{order.status === "Draft" ? "Open" : "Release"}</TableCell>
                                </TableRow>
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default Ledger;