/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { Badge, Box, Button, Drawer, Grid, Hidden, IconButton, Paper, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Nav_Header from './Nav_Header';
import Nav_head_Mobile from './Nav_head_Mobile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../App';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next'

const Nav_Search = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const { otpValue, setOtpValue, counts, setCounts, data, setData, loading, setLoading, itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, nextUrl, setNextUrl, prevUrl, setPrevUrl, parentCategory, setParentCategory, category, setCategory, subcategory, setSubCategory, filterproducts, setFilterProducts, selectedCategory, setSelectedCategory, filteredCategories, setFilteredCategories, filteredSubCategories, setFilteredSubCategories, prices, setPrices, nextPriceUrl, setNextPriceUrl, prevPriceUrl, setPrevPriceUrl, nextFilterUrl, setNextFilterUrl, prevFilterUrl, setPrevFilterUrl, isBrand, setisBrand, selectedSubCategories, setSelectedSubCategories, parentData, setParentData, accessTokenUrl, isIncrement, setIsIncrement, user, handleParentClick, search, setSearch, brand, setBrand, customerPriceGroup, setCustomerPriceGroup, cart, setCart, orderno, setorderno, totalPrice, setTotalPrice, getPriceForCustomerGroup, change, setChange, selectedCategoryIndex, setSelectedCategoryIndex, brandIndex, setBrandIndex, selectedSubCategoryIndex, setSelectedSubCategoryIndex, selectedParentCategory, setSelectedParentCategory, inputQuantity, setInputQuantity, cartData, setCartData, selectedQuantity, setSelectedQuantity } = useContext(Context);
    const usenavigate = useNavigate();
    const { t } = useTranslation();

    // USE-STATES
    const userID = sessionStorage.getItem('user');
    // FUNCTIONS
    const handleDrawerClose = () => { setDrawerOpen(false); };
    const handleDrawerOpen = () => { setDrawerOpen(true); };

    const handleLogout = () => {
        sessionStorage.clear();
        usenavigate('/Login');
        toast.success('Logout success!');
    };
    const handleCartClick = () => {
        if (userID) {
            usenavigate('/Cart');
        } else {
            toast.warning('Please login to view the cart.');
        }
    };

    const userName = localStorage.getItem('UserDetail');

    return (
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '20px', width: '95%' }}>
                <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerOpen} sx={{ mr: 2, display: { sm: 'block', md: 'block', lg: 'none' } }} >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/">  <img src="/assets/jpeg/LOGO.jpg" style={{ width: '140px' }} alt="Logo" /> </Link>
                </Grid>
                <Grid item> <Nav_Header isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} /> </Grid>
                <Grid item sx={{ display: 'flex', gap: '1rem', alignItems: 'center', }} >
                    {userID ? (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                            <Hidden lgDown>
                                <Box> <Button size='small' variant='contained' sx={{ display: 'flex', justifyContent: 'space-between', px: '20px', fontSize: '10px', backgroundColor: '#fff', color: '#000', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff', } }}>{`${userName}`}</Button>  </Box>
                            </Hidden>

                            <Box>  <Button variant="contained" size="small" color="error" onClick={handleLogout} sx={{ fontFamily: 'Montserrat', fontSize: '10px' }}>{t('Logout')} </Button>  </Box>
                        </Box>
                    ) : (
                        <Link to="/Login" style={{ color: '#000', textDecoration: 'none' }} > <PersonIcon />  </Link>
                    )}

                    {userID ? <Link to="/Cart" style={{ color: '#000' }} >
                        <Badge badgeContent={cartData.length} color="primary">
                            <ShoppingCartIcon sx={{ fontSize: '20px' }} onClick={handleCartClick} />
                        </Badge>
                    </Link> : <Link to="#" style={{ color: '#000' }} >
                        <Badge badgeContent={cartData.length} color="primary">
                            <ShoppingCartIcon sx={{ fontSize: '20px' }} onClick={handleCartClick} />
                        </Badge>
                    </Link>}
                </Grid>
            </Grid>
            <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose} >
                <Box sx={{ p: 2, width: '100%', display: 'flex', flexDirection: 'column', m: '20px' }}>
                    <Link to="/"><img src="/assets/jpeg/LOGO.jpg" style={{ width: '140px' }} alt="Logo" /></Link>
                    <Nav_head_Mobile isDrawerOpen={isDrawerOpen} setDrawerOpen={setDrawerOpen} />
                </Box>
            </Drawer>
        </Paper>
    );
};

export default Nav_Search;
