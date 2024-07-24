/* eslint-disable no-unused-vars */
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const OrderLines = () => {
    const { accessTokenUrl } = useContext(Context);
    const { id } = useParams();
    const [orderLines, setOrderLines] = useState([]);

    useEffect(() => {
        axios.get(`https://api.businesscentral.dynamics.com/v2.0/7c885fa6-8571-4c76-9e28-8e51744cf57a/Live/api/v2.0/companies(f03f6225-081c-ec11-bb77-000d3abcd65f)/salesOrders?$expand=salesOrderLines&$filter=number eq '${id}'`, {
            headers: {
                Authorization: `Bearer ${accessTokenUrl}`,
            },
        })
            .then((res) => {
                setOrderLines(res.data.value[0]?.salesOrderLines || []);
            })
            .catch((err) => {
                console.log("Error fetching order lines:", err);
            });
    }, [id]);
    const handleGoBack = () => { window.history.back(); };

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ margin: '20px', minHeight: '100vh', minWidth: '90%', overflowX: 'auto' }}>
                <Button onClick={handleGoBack} sx={{ margin: '20px', backgroundColor: '#fff', color: '#000', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff' }, px: '20px' }}>
                    <KeyboardReturnIcon />
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>Item No</TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>Description</TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>Unit of Measure Code</TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>Quantity</TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>Unit Price</TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>Amount Excluding VAT</TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>VAT Amount</TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>Amount Including VAT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderLines?.map((line, index) => (
                            <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f2f2f2' } }}>
                                <TableCell align='center'>{line.lineObjectNumber}</TableCell>
                                <TableCell align='center'>{line.description}</TableCell>
                                <TableCell align='center'>{line.unitOfMeasureCode}</TableCell>
                                <TableCell align='center'>{line.quantity}</TableCell>
                                <TableCell align='center'>{line.unitPrice}</TableCell>
                                <TableCell align='center'>{line.amountExcludingTax}</TableCell>
                                <TableCell align='center'>{line.totalTaxAmount}</TableCell>
                                <TableCell align='center'>{line.amountIncludingTax}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default OrderLines;
