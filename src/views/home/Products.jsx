/* eslint-disable no-unused-vars */
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next'
import { useContext } from "react";
import { Context } from "../../App";
import { Link } from "react-router-dom";

const Products = () => {
    const { t } = useTranslation();
    const { parentCategory, handleParentClick } = useContext(Context);
    const productItems = [
        { image: '/assets/svg/cos.svg' },
        { image: '/assets/svg/food.svg' },
        { image: '/assets/svg/BEANS.svg' },
        { image: '/assets/svg/frozenf.svg' },
        { image: '/assets/svg/NONFOOD.svg' },
        { image: '/assets/svg/COOKINGKIT.svg' },
        { image: '/assets/svg/FROZEN.svg' },
        { image: '/assets/svg/MILK.svg' },
    ];
    return (
        <>
            <Grid container direction="column" >
                <Typography sx={{ textAlign: 'center', pt: '2rem', color: 'orange', fontSize: '30px', fontWeight: '600', backgroundColor: '#17315B', mt: '0.1rem', fontFamily: 'Montserrat' }}>{t('PRODUCTS')}</Typography>
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: '#17315B', pb: '80px', pl: '5rem' }}>
                    {parentCategory?.filter(item => item.Description !== "office supplies" && item.Description !== "Transport").map((item, index) => {
                        const productItem = productItems[index];
                        return (
                            <Grid item key={index} xs={8} sm={4} md={4} lg={2.2}>
                                <Link to={`/Products/${decodeURIComponent(item.Description.toUpperCase()).replace(/\s+/g, ' ')}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <Box sx={{ textAlign: 'center', mt: '2rem' }} onClick={() => handleParentClick(item.Description.toUpperCase())}>
                                        <img src={productItem.image} alt="item" style={{ width: '25%', height: 'auto', maxHeight: '100px', backgroundColor: '#fff', borderRadius: '80px', marginLeft: '30px' }} />
                                        <Typography sx={{ textAlign: 'center', color: '#fff', fontSize: '14px', mt: '1rem', textTransform: 'uppercase', width: '50%', fontFamily: 'Montserrat' }}>{item.Description.toUpperCase()}</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid >
        </>
    );
};

export default Products;
