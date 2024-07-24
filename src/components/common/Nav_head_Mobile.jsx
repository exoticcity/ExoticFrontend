import { Box, Grid, Typography } from "@mui/material";
import Product_Dropdown from "./Product_Dropdown";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";
import Dropdown from './dropdown';
import i18next from 'i18next';

const Nav_head_Mobile = (setDrawerOpen) => {
    // Language Translation
    const { t } = useTranslation();
    const handleClick = (e) => { const selectedLanguage = e.target.value; if (i18next.isInitialized) { i18next.changeLanguage(selectedLanguage); } else { console.error("i18next is not initialized properly."); } }

    // States
    const [isProduct, setisProduct] = useState(false)
    const [isBrand, setisBrand] = useState(false)
    
    // Functions
    const toggleProduct = () => { setisProduct(!isProduct); setisBrand(false) }
    return (
        <Grid item sx={{ textAlign: 'center', mt: '2rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer' }}>
                <Box>
                    <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#5B5B5B', fontWeight: '600' }} onClick={toggleProduct}>
                        {t('PRODUCTS')} <KeyboardArrowDownIcon />
                    </Typography>
                    {isProduct && (
                        <Box sx={{ backgroundColor: '#fff', border: '1px solid lightgrey', color: '#000', padding: '1rem', borderRadius: '4px', zIndex: 10, width: '100%', marginLeft: '-1rem' }}>
                            <Product_Dropdown product={setisProduct} setDrawerOpen={setDrawerOpen}/>
                        </Box>
                    )}
                </Box>
                <Box sx={{ position: 'relative' }}>
                    <Link to='/Brands' style={{ textDecoration: 'none' }}>
                        <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#5B5B5B', fontWeight: '600' }} >
                            {t('EXCLUSIVE BRANDS')}
                        </Typography>
                    </Link>
                </Box>
                <Box>
                    <Link to='/About' style={{ textDecoration: 'none' }}>
                        <Typography onClick={() => { setisBrand(false); setisProduct(false); }}
                            sx={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#5B5B5B', fontWeight: '600', textDecoration: 'none', cursor: 'pointer', }}>
                            {t('ABOUT US')}
                        </Typography>
                    </Link>
                </Box>
                <Box>
                    <Link to='/Services' style={{ textDecoration: 'none' }}>
                        <Typography onClick={() => { setisBrand(false); setisProduct(false); }}
                            sx={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#5B5B5B', fontWeight: '600', textDecoration: "none" }} >
                            {t('SERVICES')}
                        </Typography>
                    </Link>
                </Box>
                <Box>
                    <Link to='/Contact' style={{ textDecoration: 'none' }}>
                        <Typography onClick={() => { setisBrand(false); setisProduct(false); }}
                            sx={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#5B5B5B', fontWeight: '600', textDecoration: "none" }} >
                            {t('CONTACT US')}
                        </Typography>
                    </Link>
                </Box>
                <Box sx={{width: '40%'}}>
                    <Dropdown brand={setisBrand} product={setisProduct} onChange={(e) => handleClick(e)} />
                </Box>
            </Box>
        </Grid>
    )
}

export default Nav_head_Mobile