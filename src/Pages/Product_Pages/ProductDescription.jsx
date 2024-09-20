import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Box, Button } from "@mui/material";
import { Context } from "../../App";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDescription = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isIncrement, user, accessTokenUrl, url, setUrl } = useContext(Context);
    const [picture, setPicture] = useState('');
    const [priceOfProduct, setPriceOfProduct] = useState([]);
    const customerPG = localStorage.getItem('CustomerPriceGroup');
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getProducts/?id=${id}`);
                setProduct(res?.data?.results?.results[0]);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };

        if (accessTokenUrl) {
            fetchProduct();
        }
    }, [id, accessTokenUrl]);
    console.log("ooooo", product);


    useEffect(() => {
        const fetchPicture = async () => {
            try {
                const res = await axios.get(`https://api.businesscentral.dynamics.com/v2.0/7c885fa6-8571-4c76-9e28-8e51744cf57a/Live/ODataV4/Company('My%20Company')/itempic?$filter=ItemNo eq '${product?.ItemNo}'`, {
                    headers: {
                        Authorization: `Bearer ${accessTokenUrl}`,
                    },
                });
                setPicture(res?.data?.value[0]?.picture);
            } catch (err) {
                console.error("Error fetching picture:", err);
            }
        };

        if (accessTokenUrl && product) {
            fetchPicture();
        }
    }, [accessTokenUrl, product]);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const res = await axios.get(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getPrice/${product?.ItemNo}/${customerPG}/${isIncrement[product?.id] || 0}`);
                setPriceOfProduct(res?.data);
            } catch (err) {
                console.error("Error fetching price:", err);
            }
        };

        if (customerPG && product) {
            fetchPrice();
        }
    }, [customerPG, isIncrement, product]);

    if (!product) {
        return <div>Item not found</div>;
    }

    const handleContinueShopping = () => {
        navigate(-1);
    };

    const userID = sessionStorage.getItem("user");

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        modifyCart(newQuantity);
    };

    const handleDecrement = () => {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        modifyCart(newQuantity);
    };

    const modifyCart = async (newQuantity) => {
        try {
            const userCartResponse = await axios.get(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/cart/${userID}`);
            const updateCartData = {
                items_to_update: [{ itemNo: product?.ItemNo, quantity: newQuantity }],
            };
            if (userCartResponse?.status === 200) {
                await axios.put(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/update_cart/${userID}/`, updateCartData);
            }
        } catch (error) {
            const postData = {
                customer: userID,
                items_in_cart: [{ itemNo: product?.ItemNo, quantity: newQuantity }],
            }
            await axios.post(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/create_cart/`, postData);
            toast.success('Item added to cart successfully');
        }
    };


    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh', p: '20px' }}>
            <Box sx={{ width: '100%', textAlign: 'left', p: '10px' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography variant="subtitle2" color="inherit" sx={{ cursor: 'pointer' }} onClick={() => {
                        let newUrl = url;
                        newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
                        newUrl = newUrl.replace(/(\?|&)ParentCategory=[^&]*/g, "");
                        newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
                        newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
                        newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
                        newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
                        const separator = newUrl.includes('?') ? '&' : '?';
                        setUrl(newUrl + `${separator}ItemCategoryCode=HAIR CARE PRODUCTS`);
                        navigate(`/Products/COSMETICS`);
                    }}>
                        PRODUCTS
                    </Typography>
                    <Typography variant="subtitle2" color="inherit" onClick={handleContinueShopping} sx={{ cursor: 'pointer' }}>
                        {product?.ParentCategory}
                    </Typography>
                    <Typography variant="subtitle2" color="text.primary" sx={{ cursor: 'pointer' }}>{product.ItemNo}</Typography >
                </Breadcrumbs>
            </Box>
            <Grid container sx={{ height: { xs: 'auto', sm: 'auto', lg: '100%' }, display: 'flex', width: '100%', justifyContent: 'center' }}>
                <Grid item xs={12} sm={6} lg={4} >
                    <img src={product && picture ? `data:image/jpeg;base64,${picture?.replace(/"/g, '')}` : '/assets/jpeg/ExoticLogo.jpg'}
                        alt="" style={{ width: '100%', height: "80vh" }} />
                </Grid>
                <Grid item xs={12} sm={6} lg={6} sx={{ p: '20px' }}>
                    <Typography variant="subtitle1" sx={{ mb: '10px', fontWeight: 600, fontSize: '35px' }}>{product.Description}</Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={5}>
                            <Typography variant="body2" sx={{ mb: '10px' }}>Item No:</Typography>
                            <Typography variant="body2" sx={{ mb: '10px' }}>Unit Price:</Typography>
                            <Typography variant="body2" sx={{ mb: '10px' }}>Bar Code:</Typography>
                            <Typography variant="body2" sx={{ mb: '10px' }}>Sale Unit of Measure:</Typography>
                            <Typography variant="body2" sx={{ mb: '10px' }}>Net Weight:</Typography>
                            <Typography variant="body2" sx={{ mb: '10px' }}>Brand:</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Typography variant="body2" sx={{ mb: '10px' }}>{product.ItemNo}</Typography>
                            <Typography variant="body2" sx={{ mb: '10px' }}>{userID ? (Math.round(priceOfProduct?.price * 100) / 100).toFixed(2) : "Login To View Price"}</Typography>
                            <Typography variant="body2" sx={{ mb: '10px' }}>{product.BarCode}</Typography>
                            <Typography variant="body2" sx={{ mb: '10px' }}>{product.SalesUnitOfMeasure}</Typography>
                            <Typography variant="body2" sx={{ mb: '10px' }}>{product.WeightDescription}</Typography>
                            <Typography variant="body2" sx={{ mb: '10px' }}>{product.Brand}</Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '10px', borderTop: '1px solid #fff', backgroundColor: '#f2f2f2' }}>
                        <Button
                            variant="contained"
                            size="small"
                            color="info"
                            onClick={() => {
                                if (user) {
                                    product.Quantity === 0 ? toast.error("product Out of Stock") : handleDecrement(product.id);
                                } else {
                                    toast.error(product.Quantity === 0 ? "Login first" : "Login first");
                                }
                            }}
                            sx={{ fontSize: '14px', backgroundColor: '#fff', color: 'red', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: 'red', color: '#fff', }, }}  > - </Button>
                        <Typography variant="body">{isIncrement[product?.id] || quantity}</Typography>
                        <Button variant="contained"
                            size="small"
                            color="success"
                            onClick={() => {
                                if (user) {
                                    product.Quantity === 0 ? toast.error("Item Out of Stock") : handleIncrement(product.id);
                                } else {
                                    toast.error(product.Quantity === 0 ? "Login first" : "Login first");
                                }
                            }}
                            sx={{ fontSize: '14px', backgroundColor: '#fff', color: 'green', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: 'green', color: '#fff', }, }}> + </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProductDescription;
