/* eslint-disable no-unused-vars */
import { Box, Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import Filters from "../../views/products/Filters";
import ProductCards from "../../views/products/ProductCards";
import { useTranslation } from 'react-i18next'
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Context } from "../../App";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
const Products = () => {
    const { data, setData, setCategory, setSubCategory, setBrand } = useContext(Context);
    const { t } = useTranslation();
    const [limit, setLimit] = useState(50);
    let { ptcategory, Category, subCategory, brands } = useParams();
    const [url, setUrl] = useState(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getProducts/?Blocked=false&SalesBlocked=false&ParentCategory=${ptcategory}${Category ? `&ItemCategoryCode=${Category}` : ''}${subCategory ? `&ItemSubCategoryCode=${subCategory}` : ''}${brands ? `&Brand=${brands}` : ''}`)
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
 
    useLayoutEffect(() => {
        let newUrl = url.replace(/(\?|&)ParentCategory=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
        const separator = newUrl.includes('?') ? '&' : '?';
        setUrl(newUrl + `${separator}ParentCategory=${ptcategory}`);
 
        if (Category) {
            let newUrl = url.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
            const separator = newUrl.includes('?') ? '&' : '?';
            setUrl(newUrl + `${separator}&ItemCategoryCode=${Category}`);
        } if (subCategory) {
            let newUrl = url.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
            const separator = newUrl.includes('?') ? '&' : '?';
            setUrl(newUrl + `${separator}&ItemSubCategoryCode=${subCategory}`);
        } if (brands) {
            let newUrl = url.replace(/(\?|&)Brand=[^&]*/g, "");
            const separator = newUrl.includes('?') ? '&' : '?';
            setUrl(newUrl + `${separator}&Brand=${brands}`);
        }
 
    }, [])
 
    useEffect(() => {
        axios.get(url)
            .then((res) => {
                setCategory(res?.data.distinct_ItemCategoryCode);
                setData(res?.data?.results?.results);
                setSubCategory(res?.data.distinct_ItemSubCategoryCode);
                setBrand(res?.data.distinct_Brand)
                setNextUrl(res?.data?.results?.next)
                setPrevUrl(res?.data?.results?.previous)
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }, [url])
 
    const handleViewMore = () => {
        const newLimit = limit + 20;
        setLimit(newLimit);
        let newUrl = url.replace(/(\?|&)limit=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, "");
        setUrl(newUrl + ((newUrl.includes('?') ? '&' : '?')) + `limit=${newLimit}`);
    };
 
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);
 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
 
    const handleSearch = () => {
        let newUrl = url.replace(/(\?|&)search=[^&]*/g, '');
        newUrl = newUrl.replace(/(\?|&)ParentCategory=[^&]*/g, '');
        newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, '');
        newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, '');
        newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, '');
        newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, '');
        newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, '');
        const separator = newUrl.includes('?') ? '&' : '?';
        setUrl(newUrl + `${separator}search=${encodeURIComponent(searchQuery)}`);
    };
 
    return (
        <Grid container sx={{ display: 'flex', flexDirection: 'column', width: '98%'}}>

            <marquee behavior="scroll" direction="left" fontSize="20px" style={{ width: '98.9vw' }} >{t('PROMO_SLIDER')}</marquee>
            <Grid item sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: { xs: "column", sm: "column", md: 'column', lg: 'row' } }}>
                    <div>
                        <Filters url={url} setUrl={setUrl} />
                    </div>
 
                    <div>
                        <TextField
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            sx={{ width: 'auto' }}
                            id="standard-basic"
                            label="Search products"
                            variant="outlined"
                            htmlFor="search"
                            size='small'
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleSearch}
                                            aria-label="search"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                </Box>
            </Grid>
            <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {data?.map((item, index) => (
                    <Grid key={index} item sm={4} xs={10} md={4} lg={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: { xs: '1rem' } }}>
                        <ProductCards item={item} url={url} setUrl={setUrl} />
                    </Grid>
                ))}
            </Grid>
 
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '98%', m: '20px' }}>
                <Button variant="contained" size="small" color="primary" onClick={handleViewMore}
                    sx={{ display: 'flex', justifyContent: 'space-between', px: '20px', fontSize: '13px', fontWeight: 600, backgroundColor: '#fff', color: '#000', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff' }, }}>  Show More  <KeyboardArrowDownIcon />
                </Button>
                <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
                    {isVisible && (
                        <Fab variant="extended" onClick={scrollToTop}>
                            <NavigationIcon sx={{ mr: 1 }} />
                            Pin to Top
                        </Fab>
                    )}
                </Box>
 
            </Box>
 
        </Grid>
    );
};
 
export default Products;