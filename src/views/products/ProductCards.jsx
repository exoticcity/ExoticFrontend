/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Box, Card, CardContent, Grid, Typography, Button, CardMedia, Chip, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../../App";
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './style.css'


const ProductCards = ({ item, url, setUrl }) => {
    const { t } = useTranslation();
    const [itemPrice, setItemPrice] = useState(0);
    const [picture, setPicture] = useState('');
    const [isInputChanged, setIsInputChanged] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [loading, setLoading] = useState(true);
    

    const [postCart, setPostCart] = useState([])

    // USER-CONTEXT
    const { data, currentPage, user, accessTokenUrl, isIncrement, setIsIncrement, cartData, setChange, cart, inputQuantity, setInputQuantity } = useContext(Context);
    let CustomerPG = localStorage.getItem('CustomerPriceGroup')

    // Initialize input quantity from local storage or set default
    useEffect(() => {
        const storedQuantities = JSON.parse(localStorage.getItem('inputQuantities')) || {};
        if (storedQuantities[item?.id]) {
            setInputQuantity(storedQuantities);
        }
    }, [item?.id, setInputQuantity]);

    useLayoutEffect(() => {
        setInputQuantity(isIncrement[item?.id])
    }, [setInputQuantity, isIncrement[item?.id]])

    useEffect(() => {
        setInputQuantity(prev => ({
            ...prev,
            [item?.id]: (isIncrement[item?.id] || 0)
        }));
    }, [item?.id]);

    const handleQuantityChange = (id, value) => {
        const numericalValue = parseInt(value, 10);
        setInputQuantity(prev => ({
            ...prev,
            [id]: numericalValue
        }));
        setIsInputChanged(prev => ({
            ...prev,
            [id]: true
        }));
        // Update the local storage with new quantity
        const newQuantities = JSON.parse(localStorage.getItem('inputQuantities')) || {};
        newQuantities[id] = numericalValue;
        localStorage.setItem('inputQuantities', JSON.stringify(newQuantities));
    };


    if (user) {
        useEffect(() => {
            const incrementValue = JSON.stringify(inputQuantity[item?.id] || 0);
            if (item?.ItemNo !== undefined || 0 && CustomerPG !== undefined || 0 && inputQuantity[item?.id] !== undefined) {
                axios.get(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getPrice/${item?.ItemNo}/${CustomerPG}/${inputQuantity[item?.id] || 1}`)
                    .then((res) => {
                        setItemPrice(res?.data)
                    })
                    .catch((err) => {
                        console.log("Error:", err);
                    }).finally(() => {
                        setLoading(false);
                    });
            }
        }, [CustomerPG, inputQuantity[item.id], item?.ItemNo]);
    }

    const addToCart = async (id) => {
        const item = data.find(item => item?.id === id);
        const currUserNo = sessionStorage.getItem("user");

        if (!item || item.Quantity < 1) {
            toast.error('Item is out of stock');
            return;
        }

        const quantity = Number(inputQuantity[id]) || 0;

        // if (quantity > item.Quantity) {
        //     toast.error(`Maximum limit reached for this item (limit: ${item.Quantity})`);
        //     return;
        // }
        try {
            const userCartResponse = await axios.get(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/cart/${currUserNo}`);
            if (userCartResponse?.status === 200) {
                const updateCartData = {
                    items_to_update: [{ itemNo: item?.ItemNo, quantity: quantity }],
                };
                await axios.put(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/update_cart/${currUserNo}/`, updateCartData);
                toast.success('Cart updated successfully');
            }
        } catch (error) {
            const postData = {
                customer: currUserNo,
                items_in_cart: [{ itemNo: item?.ItemNo, quantity: quantity }],
            }
            await axios.post('https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/create_cart/', postData);
            toast.success('Item added to cart successfully');
        } finally {
            setButtonClicked(prev => ({
                ...prev,
                [id]: true
            }));
            setIsInputChanged(prev => ({
                ...prev,
                [id]: false
            }));
        }
    };

    // FUNCTIONS
    const cartIsCleared = () => {
        const storedItems = JSON.parse(localStorage.getItem('selectedItems')) || {};
        return Object.keys(storedItems).length === 0;
    };

    const handleIncrement = (id, itemNo) => {
        const item = data.find(item => item?.id === id);

        if (item && item.Quantity > 0) {
            const newQuantity = Number(inputQuantity[id] || 0) + 1;
            handleQuantityChange(id, newQuantity); // Update quantity
            axios.get(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getPrice/${itemNo}/${CustomerPG}/${newQuantity}`)
                .then((res) => {
                    setItemPrice(res?.data);
                })
                .catch((err) => {
                    console.log("Error:", err);
                });
        } else {
            toast.error("Item Out of Stock");
        }
    };

    const handleDecrement = (id) => {
        const newQuantity = Number(inputQuantity[id] || 0) - 1;
        if (newQuantity >= 0) {
            handleQuantityChange(id, newQuantity); // Update quantity
            fetchUpdatedPrice(item?.ItemNo, CustomerPG, newQuantity); // Fetch updated price
            axios.get(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getPrice/${item?.ItemNo}/${CustomerPG}/${newQuantity}`)
                .then((res) => {
                    setItemPrice(res?.data);
                })
                .catch((err) => {
                    console.log("Error:", err);
                });
        }
    };

    useLayoutEffect(() => {
        axios.get(`https://api.businesscentral.dynamics.com/v2.0/7c885fa6-8571-4c76-9e28-8e51744cf57a/Live/ODataV4/Company('My%20Company')/itempic?$filter=ItemNo eq '${item?.ItemNo}'`, {
            headers: {
                Authorization: `Bearer ${accessTokenUrl}`,
            },
        })
            .then((res) => {
                setPicture(res?.data?.value[0]?.picture);
            })
            .catch((err) => {
                console.error("Error:", err);
            }).finally(() => {
                setLoading(false);
            });
    }, [accessTokenUrl, picture, item]);

    // USE-EFFECT
    useEffect(() => {
        if (cartIsCleared()) { setIsIncrement({}); }
        localStorage.setItem('storedData', JSON.stringify(data?.results));
    }, [currentPage, isIncrement, data]);

    useEffect(() => {
        localStorage.setItem('newIncrement', JSON.stringify(isIncrement));
    }, [isIncrement]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const formattedPrice = itemPrice?.price ? (Math.round(itemPrice.price * 100) / 100).toFixed(2) + " € HTVA" : "";
    return (
        <>
            <Grid container >
                <Card sx={{ height: '490px', width: '280px', display: 'flex', flexDirection: 'column', m: '15px' }}>
                    <Link to={`/ProductsDescription/${item.id}`}>
                        <CardMedia className='img' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <img
                                src={item && picture ? `data:image/jpeg;base64,${picture?.replace(/"/g, '')}` : '/assets/jpeg/ExoticLogo.jpg'}
                                alt=""
                            />
                        </CardMedia>
                    </Link>
                    {item.Quantity === 0 ? (<Chip label={t('Coming Soon')} sx={{ backgroundColor: '#C62828', color: '#fff' }} size='small' />) : ""}
                    <CardContent style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', backgroundColor: '#f2f2f2', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: '600', fontSize: '12px' }}>{item.Description}</Typography>
                        <Typography sx={{ fontSize: '12px' }}>ITEM NO: {item.ItemNo} </Typography>
                        <Typography sx={{ fontSize: '12px' }}>BRAND: {item.Brand}</Typography>
                        {user ? <Typography>
                            {formattedPrice}
                        </Typography>
                            : "Login to view Prices"}
                    </CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px',
                            borderTop: '1px solid #fff',
                            backgroundColor: '#f2f2f2',
                            '@media (max-width: 1280px)': {
                                '& .custom-button': {
                                    minWidth: '20px',
                                },
                                '& .custom-textfield': {
                                    maxWidth: '80px',
                                },
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            size="small"
                            color="info"
                            onClick={() => {
                                if (user) {
                                    item.Quantity === 0 ? toast.error("Item Out of Stock") : handleDecrement(item.id);
                                } else {
                                    toast.error(item.Quantity === 0 ? "Login first" : "Login first");
                                }
                            }}
                            sx={{
                                fontSize: '14px',
                                backgroundColor: '#fff',
                                color: 'red',
                                transition: 'background-color 0.3s, color 0.3s',
                                '&:hover': {
                                    backgroundColor: 'red',
                                    color: '#fff',
                                },
                            }}
                            className="custom-button"
                        >
                            -
                        </Button>
                        <TextField
                            size="small"
                            variant="outlined"
                            value={inputQuantity[item.id] || 0}
                            onChange={(e) => handleQuantityChange(item?.id, e.target.value)}
                            sx={{ maxWidth: '60px' }}
                            className="custom-textfield"
                        />
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={() => {
                                if (user) {
                                    item.Quantity === 0 ? toast.error("Item Out of Stock") : handleIncrement(item?.id, item?.ItemNo);
                                } else {
                                    toast.error(item.Quantity === 0 ? "Login first" : "Login first");
                                }
                            }}
                            sx={{
                                fontSize: '14px',
                                backgroundColor: '#fff',
                                color: 'green',
                                transition: 'background-color 0.3s, color 0.3s',
                                '&:hover': {
                                    backgroundColor: 'green',
                                    color: '#fff',
                                },
                            }}
                            className="custom-button"
                        >
                            +
                        </Button>
                    </Box>

                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={
                            () => {
                                if (user) {
                                    item.Quantity === 0 ? toast.error("Item Out of Stock") : addToCart(item.id);
                                } else {
                                    toast.error(item.Quantity === 0 ? "Login first" : "Login first");
                                }
                            }
                        }
                        sx={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', px: '18px', fontSize: '10px', backgroundColor: "#fff",
                            color: isInputChanged[item.id] ? '#ff0000' : buttonClicked[item.id] ? 'green' : '#000',
                            transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff', },
                        }}>
                        <ShoppingCartIcon />
                    </Button>
                </Card>
            </Grid >
        </>
    );
}

export default ProductCards;
