import { useState, useContext, useEffect, useLayoutEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../App';
import axios from 'axios';
import { Grid, Typography, Button, Box, Paper } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link, useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
import { useTranslation } from 'react-i18next'
import emailjs from "@emailjs/browser";

const RequestQuote = () => {
  const { data, loading, setLoading, accessTokenUrl, user, cart, setCart, change, setorderno, setInputQuantity, setIsIncrement, cartData, setCartData } = useContext(Context);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isPricesLoading, setIsPricesLoading] = useState(true);
  const [totalAmoutExcVat, settotalAmoutExcVat] = useState(0)
  const [totalAmoutIncVat, settotalAmoutIncVat] = useState(0)
  const [vatAmount, setvatAmount] = useState(0)
  const [userObj, setUserObj] = useState({})
  const [acceptTerms, setacceptTerms] = useState(false)


  const [totalPrice, setTotalPrice] = useState(0)

  // GO Back Function
  const handleContinueShopping = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   const storedItems = JSON.parse(localStorage.getItem('selectedItems')) || {};
  //   const itemsArray = Object.values(storedItems).filter(item => item.quantity > 0);
  //   setCart(itemsArray);
  //   localStorage.setItem('PriceInVat', '0.0');
  //   localStorage.setItem('PriceExVat', '0.0');
  //   localStorage.setItem('VatAmount', '0.0');
  // }, [cart, data]);

  const sendEmail = (orderNumber, customerEmail) => {
    const templateParams = {
      order_number: orderNumber,
      customer_email: customerEmail,
      from_name: "EXOTICC",
      // add other template parameters as needed
      message: `A new web order is created Order No. is ${orderNumber} and Email is ${customerEmail}`
    };

    emailjs.send('service_1g7imx4', 'template_8uek6dd', templateParams, 'KgNk2-GMoPQOnxjqX')
      .then(response => {
        console.log('Email successfully sent!', response);
      })
      .catch(err => {
        console.error('Failed to send email. Error: ', err);
      });
  };

  // SALE ORDER API
  const postSalesOrder = () => {
    if (cartData.length === 0) {
      toast.warning('Cart is empty. Add items to the cart before posting sale order.');
      return;
    }
    setLoading(true);
    toast.info('Placing your order...');
    const newSalesLines = cartData?.map((item) => ({
      lineType: "Item",
      lineObjectNumber: item?.product?.ItemNo,
      quantity: item?.quantity,
    }));
    axios.post(
      "https://api.businesscentral.dynamics.com/v2.0/7c885fa6-8571-4c76-9e28-8e51744cf57a/Live/api/v2.0/companies(f03f6225-081c-ec11-bb77-000d3abcd65f)/salesorders?$expand=salesOrderLines",
      {
        customerNumber: user,
        salesOrderLines: newSalesLines,
        externalDocumentNumber: "WEB ORDER"
      },
      {
        headers: {
          Authorization: `Bearer ${accessTokenUrl}`,
        },
      }
    )
      .then((res) => {
        setLoading(false);
        setorderno(res.data.number);
        toast.success(`Order Successful`);
        const currUserNo = sessionStorage.getItem("user");
        axios.delete(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/cart/${currUserNo}`)
          .then((res) => {
            setCartData([]);
          }).catch((err) => {
            console.log(err);
          })
        setCartData([]);
        // Reset the values to 0
        settotalAmoutExcVat(0);
        setvatAmount(0);
        settotalAmoutIncVat(0);
        setInputQuantity(0)
        setIsIncrement(0)
        sendEmail(res.data.number, userObj.EMail, userObj.Name);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.error.message);
        console.log("Sale order error", error, error.message, error.response.data.error.message);
      });
  };

  // Clear Cart Function
  const clearCart = () => {
    if (cartData.length === 0) {
      toast.warning('Cart is already empty!');
    } else {
      const currUserNo = sessionStorage.getItem("user");
      axios.delete(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/cart/${currUserNo}`)
        .then((res) => {
          setCartData([]);
        }).catch((err) => {
          console.log(err);
        })
      toast.success('Cart cleared successfully!');
    }
  };

  useLayoutEffect(() => {
    const storedSelectedItems = JSON.parse(localStorage.getItem('selectedItems') || '{}');
    const postingGroup = localStorage.getItem('CustomerPriceGroup') || ''
    const itemKeys = Object.keys(storedSelectedItems);
    let runningTotalAmountExcVat = 0;
    let runningTotalAmountIncVat = 0;
    let totalVat = 0;
    let itemsProcessed = 0;
    if (itemKeys.length === 0) {
      setIsPricesLoading(false);
    }

    itemKeys.forEach(key => {
      const item = storedSelectedItems[key];
      const itemNo = item?.item?.ItemNo;
      const quantity = item?.quantity || 0;
      const vatRate = item?.item?.vat / 100;
      const pg = postingGroup

      axios.get(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getPrice/${itemNo}/${pg}/${quantity}`)
        .then((res) => {
          const priceExcVat = parseFloat(Math.round(res?.data?.price * 100) / 100 || 0);
          const priceIncVat = priceExcVat * (1 + vatRate);
          runningTotalAmountExcVat += priceExcVat * quantity;
          runningTotalAmountIncVat += priceIncVat * quantity;
          totalVat += (priceIncVat - priceExcVat) * quantity;
          settotalAmoutExcVat(runningTotalAmountExcVat);
          settotalAmoutIncVat(runningTotalAmountIncVat);
          setvatAmount(totalVat);

          itemsProcessed++;
          if (itemsProcessed === itemKeys.length) {
            setIsPricesLoading(false);

          }
        })
        .catch((err) => {
          setIsPricesLoading(false);
        });
    });
  }, [change]);

  useEffect(() => {
    axios.get(`https://api.businesscentral.dynamics.com/v2.0/Live/api/bctech/demo/v2.0/Companies(f03f6225-081c-ec11-bb77-000d3abcd65f)/customer?$filter=No eq '${user}'`, {
      headers: {
        Authorization: `Bearer ${accessTokenUrl}`,
      },
    })
      .then((res) => {
        setUserObj(res?.data?.value[0]);
        console.log("IIIIIIII", res?.data?.value[0]);

      })
      .catch((err) => {
        console.error("Error:", err);

      });
  }, [accessTokenUrl, cartData]);

  useEffect(() => {
    // Fetch the stored values from localStorage
    const storedTotalAmoutExcVat = parseFloat(localStorage.getItem('totalAmoutExcVat')) || 0;
    const storedVatAmount = parseFloat(localStorage.getItem('vatAmount')) || 0;
    const storedTotalAmoutIncVat = parseFloat(localStorage.getItem('totalAmoutIncVat')) || 0;

    settotalAmoutExcVat(storedTotalAmoutExcVat);
    setvatAmount(storedVatAmount);
    settotalAmoutIncVat(storedTotalAmoutIncVat);

    // Your existing logic for calculating and updating the state goes here

  }, [change]);

  useEffect(() => {
    // Store the values in localStorage whenever they change
    localStorage.setItem('totalAmoutExcVat', totalAmoutExcVat.toString());
    localStorage.setItem('vatAmount', vatAmount.toString());
    localStorage.setItem('totalAmoutIncVat', totalAmoutIncVat.toString());
  }, [totalAmoutExcVat, vatAmount, totalAmoutIncVat]);

  useEffect(() => {
    const currUserNo = sessionStorage.getItem("user");
    axios.get(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/cart/${currUserNo}`)
      .then((res) => {
        setCartData(res?.data?.items_in_cart[0]);
        setTotalPrice(res?.data);
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Paper elevation={2} sx={{ p: 2, mx: 1, my: 1, width: '95%', minHeight: '75vh' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'uppercase' }}> {t('Shopping Cart')}</Typography>
          <Typography variant="body2" color="textSecondary">You have {cartData.length} items in your cart</Typography>
          {cartData?.map((items, index) => (
            <Box key={index}>
              <ItemCard items={items} index={index} />
            </Box>
          ))}
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 3, m: 1, width: '95%', minHeight: '70vh' }}>
          {
            cartData.length >= 1 ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'uppercase', fontFamily: 'Monteserrat' }}>{t('OrderSummary')}</Typography>
                  <Typography variant="body2" >Total Items: {cartData.length}</Typography>
                </Box>
                {userObj?.CustomerPostingGroup === "LOCAL" || userObj?.CustomerPostingGroup === "PARTICULIER" ? (
                  <>
                    <Typography variant="h6" sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>
                      {t('TotalExVat')}: {(totalPrice.total_amount_excluding_vat)?.toFixed(2)}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>
                      {t('Vat Amount')}:  {(totalPrice.vat_amount)?.toFixed(2)}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>
                      {t('TotalInVat')}: {(totalPrice.total_amount_including_vat)?.toFixed(2)}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>
                      {t('Total Amount')}: € {isPricesLoading ? 'Loading...' : (isNaN(totalPrice.total_amount_excluding_vat) ? '0.00' : totalPrice.total_amount_excluding_vat.toFixed(2))}
                    </Typography>
                  </>
                )}
              </>
            ) : ""
          }
          <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', width: '100%', mt: '20px', gap: '10px' }}>
            <Button variant="contained" size="small" onClick={clearCart} sx={{ display: 'flex', justifyContent: 'space-between', px: '16px', fontSize: '10px', backgroundColor: '#fff', color: '#000', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff', }, }}><DeleteForeverIcon sx={{ fontSize: '14px' }} />{t('Clear Cart')} </Button>
            <Link to='/Ledger' style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="small" sx={{ display: 'flex', justifyContent: 'space-between', px: '16px', fontSize: '10px', backgroundColor: '#fff', color: '#000', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff', }, }}>View Order History</Button>
            </Link>
          </Box>
          <Box sx={{ mt: '10px' }}>
            <Typography sx={{ fontSize: '12px', fontWeight: 600, fontFamily: 'Monteserrat' }}>{t('GeneralTerms')}</Typography>
            <Typography sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>{t('Term1')}</Typography>
            <Typography sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>{t('Term2')}</Typography>
            <Typography sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>{t('Term3')}</Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: 600, fontFamily: 'Monteserrat' }}>{t('GeneralTerm2')}</Typography>
            <Typography sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>{t('Term4')}</Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: 600, fontFamily: 'Monteserrat' }}>{t('ReturnPolicy')}</Typography>
            <Typography sx={{ fontSize: '12px', fontFamily: 'Monteserrat' }}>{t('Claims')}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', my: '10px' }}>
              <Button variant='contained' size='small' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: '16px', fontSize: '10px', backgroundColor: '#fff', color: '#000', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff', }, }} onClick={() => setacceptTerms(true)} >
                Accept
              </Button>
              {
                acceptTerms ? (
                  <Button variant="contained" size="small" onClick={postSalesOrder} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: '16px', fontSize: '10px', backgroundColor: '#fff', color: '#000', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff', }, }}><LocalMallIcon sx={{ fontSize: '14px' }} /> {loading ? t('Placing Order') : t('Place Order')}</Button>
                ) : ""
              }
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RequestQuote;
