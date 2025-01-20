import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { Grid, Typography, Button, Box, IconButton } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Context } from '../../App';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemCard = ({ items, index }) => {
    const { t } = useTranslation();
    const { setIsIncrement, isIncrement, user, data, setData, setChange, setCart, cartData, setCartData } = useContext(Context);
    const [userObj, setUserObj] = useState({});
    const [priceOfItem, setPriceOfItem] = useState([]);
    const [picture, setPicture] = useState('');
    const CustomerPG = localStorage.getItem('CustomerPriceGroup');
    const [cartItems, setcartItems] = useState([])
    const [accessTokenUrl, setAccessTokenUrl] = useState([])

    // const [selectedQuantity, setSelectedQuantity] = useState(items?.quantity)
    const [selectedQuantity, setSelectedQuantity] = useState()

    useEffect(() => {
        setSelectedQuantity(items?.quantity)
    }, [items?.quantity])

    useEffect(() => {
        axios.get("https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getAccessToken/")
            .then((res) => {
                setAccessTokenUrl(res.data.access_token)
            }).catch((err) => {
                console.log("err" + err);
            })
    }, [setAccessTokenUrl, items])


    useEffect(() => {
        axios.get(`https://api.businesscentral.dynamics.com/v2.0/Live/api/bctech/demo/v2.0/Companies(f03f6225-081c-ec11-bb77-000d3abcd65f)/customer?$filter=No eq '${user}'`, {
            headers: {
                Authorization: `Bearer ${accessTokenUrl}`,
            },
        })
            .then((res) => {
                setUserObj(res?.data?.value[0]);

            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }, [user, accessTokenUrl]);

    useEffect(() => {
        if (accessTokenUrl) {
            axios.get(`https://api.businesscentral.dynamics.com/v2.0/7c885fa6-8571-4c76-9e28-8e51744cf57a/Live/ODataV4/Company('My%20Company')/itempic?$filter=ItemNo eq '${items?.product?.ItemNo}'`, {
                headers: {
                    Authorization: `Bearer ${accessTokenUrl}`,
                },
            })
                .then((res) => {
                    setPicture(res?.data?.value[0]?.picture);
                })
                .catch((err) => {
                    console.error("Error:", err);
                });
        }
    }, [accessTokenUrl, cartData]);

    useEffect(() => {
        if (items?.product?.ItemNo !== undefined || 0 && CustomerPG !== undefined || 0 && isIncrement[items?.product?.id] !== undefined || 0) {
            axios.get(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getPrice/${items?.product?.ItemNo}/${CustomerPG}/${isIncrement[items?.product?.id] || 0 || 1}`)
                .then((res) => {
                    setPriceOfItem(res?.data);
                    saveItemToLocalStorage(res?.data);
                })
                .catch((err) => {
                    console.log("Error:", err);
                });
        }
    }, [CustomerPG]);

    const saveItemToLocalStorage = (price) => {
        const itemDetails = {
            ...items,
            price,
        };
        localStorage.setItem('currentItem', JSON.stringify(itemDetails));
    };

    const handleIncrement = async (itemNo) => {
        const newQuantity = selectedQuantity + 1;
        setSelectedQuantity(newQuantity);
        updateCartQuantity(itemNo, newQuantity);
    };

    const handleDecrement = async (itemNo) => {
        const newQuantity = selectedQuantity - 1;
        if (newQuantity >= 0) {
            setSelectedQuantity(newQuantity);
            updateCartQuantity(itemNo, newQuantity);
        } else {
            toast.error("Cannot have less than 0 items");
        }
    };

    const updateCartQuantity = async (itemNo, quantity) => {
        const updateCartData = {
            items_to_update: [{ itemNo: itemNo, quantity: quantity }],
        };
        try {
            await axios.put(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/update_cart/${user}/`, updateCartData);
        } catch (error) {
            console.error("Failed to update cart", error);
            toast.error('Failed to update cart');
        }
        window.location.reload()
    };

    const handleDeleteItem = async (itemNo, quantity) => {
        try {
            const updateCartData = {
                items_to_update: [{ itemNo: items?.product?.ItemNo, quantity: 0 }],
            };
            await axios.put(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/update_cart/${user}/`, updateCartData)
                .then((res) => {
                    toast.success('Item deleted successfully');
                    setCartData(res?.data?.items_in_cart[0]);
                }).catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.error("Failed to delete item", error);
            toast.error('Failed to delete item');
        }
    };

    return (
        <>
            <Grid container spacing={2} sx={{ p: '10px', border: '1px solid #f2f2f2', m: '0.1px', borderRadius: '10px' }} >
                <Grid item xs={12} md={2}>
                    <img
                        src={items && picture ? `data:image/jpeg;base64,${picture.replace(/"/g, '')}` : '/assets/jpeg/ExoticLogo.jpg'}
                        alt="Shopping item"
                        style={{
                            width: "100%",
                            height: "25vh",
                            objectFit: "cover",
                            borderRadius: "8px"
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontSize: '13px', fontWeight: 600, fontFamily: 'Monteserrat' }}>{items?.product?.Description}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Box sx={{ width: '80%' }}>
                            <Typography sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>Items No: {items?.product?.ItemNo}</Typography>
                            <Typography sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>Brand: {items?.product?.Brand}</Typography>
                            <Typography sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>Sale Unit of Measure: {items?.product?.SalesUnitOfMeasure}</Typography>
                            <Typography sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>Net Weight: {items?.product?.NetWeight}</Typography>
                            <Typography sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>Packaging: {items?.product?.Packaging}</Typography>
                            <Typography sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>
                                Unit Price: {((Math.round(priceOfItem?.price * 100) / 100))} € HTVA
                            </Typography>
                        </Box>
                        <Box sx={{ width: '22rem' }}>
                            {userObj?.CustomerPostingGroup === "LOCAL" || userObj?.CustomerPostingGroup === "PARTICULIER" ? (
                                <>
                                    <Typography variant="h6" sx={{ textTransform: 'uppercase', fontSize: '12px', fontFamily: 'Monteserrat' }}>
                                        {t('Vat Rate')} : {items?.product?.vat} %
                                    </Typography>
                                    <Typography variant="body" sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>  {t('TotalExVat')}:
                                        {/* € {parseFloat((Math.round(priceOfItem?.price * 100) / 100) * selectedQuantity).toFixed(2)} */}

                                        {
                                            items?.total_amount_excluding_vat || "NULL"
                                        }
                                    </Typography>
                                    <br />
                                    <Typography variant="body" sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>
                                        {t('Vat Amount')}:
                                        {/* €{((Math.round(priceOfItem?.price * 100) / 100) * ((items?.product?.vat) / 100) * selectedQuantity).toFixed(2)} */}
                                        {
                                            items?.vat_amount || "NULL"
                                        }
                                    </Typography>
                                    <br />
                                    <Typography variant="body" sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>
                                        {t('TotalInVat')}:
                                        {/* €{((((Math.round(priceOfItem?.price * 100) / 100) * ((items?.product?.vat) / 100) * selectedQuantity)) + ((Math.round(priceOfItem?.price * 100) / 100) * selectedQuantity)).toFixed(2)} */}

                                        {
                                            items?.total_amount_including_vat || "NULL"
                                        }
                                    </Typography>

                                </>
                            ) : (
                                <>
                                    {/* <Typography variant="body" sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}> {t('Vat Amount')}:
                                        {
                                            items?.vat_amount
                                        }
                                    </Typography> */}
                                </>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '10px', borderTop: '1px solid #fff', backgroundColor: '#f2f2f2' }}>
                        <IconButton
                            onClick={() => handleDeleteItem(items?.product?.ItemNo, items?.quantity)}
                            aria-label="delete"
                            color="primary"
                            size="small"
                        >
                            <DeleteIcon />
                        </IconButton>
                        <Button
                            variant="contained"
                            size="small"
                            color="info"
                            onClick={() => {
                                if (user) {
                                    handleDecrement(items?.product?.ItemNo);
                                } else {
                                    toast.error("Login first");
                                }
                            }}
                            sx={{ fontSize: '14px', backgroundColor: '#fff', color: 'red', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: 'red', color: '#fff', }, }}
                        > - </Button>
                        <Typography variant="body">{selectedQuantity}</Typography>
                        <Button variant="contained"
                            size="small"
                            color="success"
                            onClick={() => {
                                if (user) {
                                    handleIncrement(items?.product?.ItemNo);
                                } else {
                                    toast.error("Login first");
                                }
                            }}
                            sx={{ fontSize: '14px', backgroundColor: '#fff', color: 'green', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: 'green', color: '#fff', }, }}
                        > + </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default ItemCard;
