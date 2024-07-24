/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import Product_Dropdown from './Product_Dropdown';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import Dropdown from './dropdown';
import i18next from 'i18next';
import { Context } from '../../App';
import './Styles.css'
const Nav_Header = ({isDrawerOpen, setDrawerOpen}) => {
    // USER-CONTEXT
    const {  isBrand, setisBrand } = useContext(Context);
    const [isProduct, setisProduct] = useState(false)

    // Language Translation
    const { t } = useTranslation();
    const handleClick = (e) => { const selectedLanguage = e.target.value; if (i18next.isInitialized) { i18next.changeLanguage(selectedLanguage); } else { console.error("i18next is not initialized properly."); } }

    // Functions
    const toggleProduct = () => { setisProduct(!isProduct); setisBrand(false) }
    const toggleBrand = () => { setisBrand(!isBrand); setisProduct(false) }
    return (
        <Grid container sx={{ fontSize: '13px' }}>
            <Hidden lgDown>
                <Grid item >
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                        <Box>
                            <Link to='/About' style={{ textDecoration: 'none' }}>
                                <Typography onClick={() => { setisBrand(false); setisProduct(false); }}
                                    sx={{ display: 'flex', fontFamily: 'Montserrat', alignItems: 'center', fontSize: '13px', color: '#5B5B5B',  textDecoration: 'none', cursor: 'pointer', }}>
                                    {t('ABOUT US')}
                                </Typography>
                            </Link>
                        </Box>
                        <Box >
                            <Typography sx={{ display: 'flex', fontFamily: 'Montserrat', alignItems: 'center', fontSize: '13px', color: '#5B5B5B' }} onClick={toggleProduct}>
                                {t('PRODUCTS')}  <KeyboardArrowDownIcon sx={{fontSize: '20px'}}/>
                            </Typography>
                            {isProduct ? (
                                <Box sx={{ backgroundColor: '#fff', border: '1px solid lightgrey', position: 'absolute', color: '#000', padding: '1rem', borderRadius: '4px', zIndex: 10, ml: '4rem', width: 'auto', height: 'auto', marginLeft: '-1rem' }}>
                                    <Product_Dropdown product={setisProduct} setDrawerOpen={setDrawerOpen} />
                                </Box>
                            ) : ""}
                        </Box>
                        <Box sx={{ position: 'relative' }}>
                            <Link to='/Brands' style={{ textDecoration: 'none' }}>
                                <Typography sx={{ display: 'flex', fontFamily: 'Montserrat', alignItems: 'center', fontSize: '13px', color: '#5B5B5B' }} >
                                    {t('EXCLUSIVE BRANDS')}
                                </Typography>
                            </Link>
                        </Box>

                        <Box>
                            <Link to='/Services' style={{ textDecoration: 'none' }}>
                                <Typography onClick={() => { setisBrand(false); setisProduct(false); }}
                                    sx={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#5B5B5B', textDecoration: "none", fontFamily: 'Montserrat' }} >
                                    {t('SERVICES')}
                                </Typography>
                            </Link>
                        </Box>
                        <Box>
                            <Link to='/Contact' style={{ textDecoration: 'none' }}>
                                <Typography onClick={() => { setisBrand(false); setisProduct(false); }}
                                    sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Montserrat', fontSize: '13px', color: '#5B5B5B', textDecoration: "none" }} >
                                    {t('CONTACT US')}
                                </Typography>
                            </Link>
                        </Box>
                        <Dropdown brand={setisBrand} product={setisProduct} onChange={(e) => handleClick(e)} />
                    </Box>
                </Grid>
            </Hidden >
        </Grid>

    )
}

export default Nav_Header;