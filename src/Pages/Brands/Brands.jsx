import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import './style.css'

const items = [
    { image: '/assets/brands/africa.jpg', Name: "AFRICA VILLAGE", PatCat: "FOOD" },
    { image: '/assets/brands/care.jpg', Name: "CARE AND CLEAR", PatCat: "COSMETICS" },
    { image: '/assets/brands/chez.jpg', Name: "DE CHEZ NOUS", PatCat: "FOOD" },
    { image: '/assets/brands/congo.jpg', Name: "CONGO NATURE", PatCat: "FOOD" },
    { image: '/assets/brands/desi.jpg', Name: "DESI", PatCat: "FOOD" },
    { image: '/assets/brands/exotic.jpg', Name: "EXOTIC FOODS", PatCat: "FOOD" },
    { image: '/assets/brands/mr.jpg', Name: "MR EXOTIC", PatCat: "FOOD" },
    { image: '/assets/brands/nuts.jpg', Name: "EXOTIC NUTS", PatCat: "FOOD" },
    { image: '/assets/brands/royal.jpg', Name: "ROYAL SEA FOOD", PatCat: "FOOD" },
    { image: '/assets/brands/thai.jpg', Name: "THAI VILLAGE", PatCat: "FOOD" },
    { image: '/assets/brands/utouch.jpg', Name: "UTOUCH", PatCat: "COSMETICS" },
    { image: '/assets/brands/village.jpg', Name: "ROYAL VILLAGE", PatCat: "FOOD" },


    { image: '/assets/brands/A3.jpg', Name: "A3", PatCat: "COSMETICS" },
    { image: '/assets/brands/AFP.png', Name: "AFP", PatCat: "FOOD" },
    { image: '/assets/brands/AFRICA BEST.jpg', Name: "AFRICA BEST", PatCat: "COSMETICS" },
    { image: '/assets/brands/AKASH.jpg', Name: "AKASH", PatCat: "FOOD" },
    { image: '/assets/brands/BELDAM.jpg', Name: "BELDAM", PatCat: "COSMETICS" },

    { image: '/assets/brands/BIGEN.png', Name: "BIGEN", PatCat: "COSMETICS" },
    { image: '/assets/brands/Caresse.png', Name: "CARESSE", PatCat: "COSMETICS" },
    { image: '/assets/brands/CREME OF NATURE.jpg', Name: "CREME OF NATURE", PatCat: "COSMETICS" },


    { image: '/assets/brands/DAAWAT.jpg', Name: "DAAWAT", PatCat: "FOOD" },
    { image: '/assets/brands/DABUR.png', Name: "DABUR", PatCat: "FOOD" },
    { image: '/assets/brands/DARKANDLOVELY.png', Name: "DARKANDLOVELY", PatCat: "COSMETICS" },
    { image: '/assets/brands/DAX.jpg', Name: "DAX", PatCat: "COSMETICS" },
    { image: '/assets/brands/ELEPHANT ATTA.png', Name: "ELEPHANT ATTA", PatCat: "FOOD" },
    { image: '/assets/brands/FAIRANDWHITE.jpg', Name: "FAIRANDWHITE", PatCat: "COSMETICS" },
    { image: '/assets/brands/GOLD KILI.jpg', Name: "GOLD KILI", PatCat: "FOOD" },
    { image: '/assets/brands/GREEN DRAGON.jpg', Name: "GREEN DRAGON", PatCat: "FOOD" },
    { image: '/assets/brands/HEMANI.jpg', Name: "HEMANI", PatCat: "COSMETICS" },
    { image: '/assets/brands/HT26.png', Name: "HT26", PatCat: "COSMETICS" },
    { image: '/assets/brands/HUMZA.png', Name: "HUMZA", PatCat: "FOOD" },
    { image: '/assets/brands/JOHNSON.jpg', Name: "JOHNSON", PatCat: "COSMETICS" },
    { image: '/assets/brands/L ESPADON.png', Name: "L ESPADON", PatCat: "FOOD" },
    { image: '/assets/brands/LAILA.jpg', Name: "LAILA", PatCat: "FOOD" },
    { image: '/assets/brands/LAZIZA.jpg', Name: "LAZIZA", PatCat: "FOOD" },
    // { image: '/assets/brands/Lotus.png', Name: "LOTUS", PatCat: "" },
    { image: '/assets/brands/MAKARI.jpg', Name: "MAKARI", PatCat: "COSMETICS" },
    { image: '/assets/brands/MAMA AFRICA CARO.jpg', Name: "MAMA AFRICA CARO", PatCat: "COSMETICS" },
    { image: '/assets/brands/MAZEDAR.png', Name: "MAZEDAR", PatCat: "FOOD" },
    { image: '/assets/brands/MISS ANTILLES.jpg', Name: "MISS ANTILLES", PatCat: "COSMETICS" },
    { image: '/assets/brands/MP.png', Name: "MP", PatCat: "FOOD" },
    { image: '/assets/brands/NESTLE.jpg', Name: "NESTLE", PatCat: "COSMETICS" },
    { image: '/assets/brands/NIDO.png', Name: "NIDO", PatCat: "FOOD" },
    { image: '/assets/brands/ORS.jpg', Name: "ORS", PatCat: "COSMETICS" },
    { image: '/assets/brands/PALMERS.jpg', Name: "PALMERS", PatCat: "COSMETICS" },
    // { image: '/assets/brands/PATAKS.jpg', Name: "PATAKS", PatCat: "" },
    { image: '/assets/brands/PCD.png', Name: "PCD", PatCat: "FOOD" },
    { image: '/assets/brands/PR.FRANCOISE BEDON.jpg', Name: "PR.FRANCOISE BEDON", PatCat: "COSMETICS" },
    { image: '/assets/brands/PRAISE.png', Name: "PRAISE", PatCat: "FOOD" },
    { image: '/assets/brands/REGAL.jpg', Name: "REGAL", PatCat: "FOOD" },
    { image: '/assets/brands/REVLON.jpg', Name: "REVLON", PatCat: "COSMETICS" },
    { image: '/assets/brands/ROYAL UMBRELLA.jpg', Name: "ROYAL UBRELLA", PatCat: "FOOD" },
    { image: '/assets/brands/RUBICON.jpg', Name: "RUBICON", PatCat: "FOOD" },
    { image: '/assets/brands/SENSATIONNEL.jpg', Name: "SENSATIONAL", PatCat: "COSMETICS" },
    { image: '/assets/brands/SHAN.png', Name: "SHAN", PatCat: "FOOD" },
    { image: '/assets/brands/SLEEK.jpg', Name: "SLEEK", PatCat: "COSMETICS" },
    // { image: '/assets/brands/Sofn free.jpg', Name: "SOFN FREE", PatCat: "" },
    { image: '/assets/brands/SOUBRY.jpg', Name: "SOUBRY", PatCat: "FOOD" },
    { image: '/assets/brands/SPORTIN.jpg', Name: "SPORTIN", PatCat: "COSMETICS" },
    { image: '/assets/brands/STA SF.jpg', Name: "STA SF", PatCat: "COSMETICS" },
    { image: '/assets/brands/TILDA.png', Name: "TILDA", PatCat: "FOOD" },
    { image: '/assets/brands/TRS.png', Name: "TRS", PatCat: "FOOD" },
    { image: '/assets/brands/X PRESSION.jpg', Name: "X-PRESSION", PatCat: "COSMETICS" },
];

const Brands = () => {
    const [animation, setAnimation] = useState(false);
    useEffect(() => { setAnimation(true); }, []);
    const navigate = useNavigate()

    const { url } = useContext(Context);



    return (
        <Box sx={{ ml: '3rem' }}>
            <Typography sx={{ width: '90%', textAlign: 'center', fontSize: '24px', fontWeight: 600, m: '10px', color: '#5B5B5B' }}>OUR EXCLUSIVE BRANDS</Typography>
            <Grid container spacing={2} justifyContent="center" >
                {items?.slice(0, 12)?.map((item, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                        <Link to={`/Product/${item.PatCat}/${item.Name}`} style={{ textDecoration: 'none' }}>
                            <img
                                src={item.image}
                                alt={`Brand ${index + 1}`}
                                style={{
                                    width: '150px',
                                    height: '130px',
                                    animation: animation ? 'fadeIn 1s ease-out' : 'none',
                                    borderRadius: '50px',
                                    padding: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => navigate(`/Product/${item.ParentCat}/${item.Name}`)}
                            />
                            <Typography variant="body1" align="center" sx={{ color: item.Name === url ? 'red' : 'black', fontSize: '12px', ml: '-5rem' }}>{item.Name}</Typography>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Typography sx={{ width: '90%', textAlign: 'center', fontSize: '24px', fontWeight: 600, m: '10px', color: '#5B5B5B', mt: '2rem' }}>DISTRIBUTIONS</Typography>
            <Grid container spacing={2} justifyContent="center" >
                {items?.slice(12, 60)?.map((item, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                        <Link to={`/Product/${item.PatCat}/${item.Name}`} style={{ textDecoration: 'none' }}>
                            <img
                                src={item.image}
                                alt={`Brand ${index + 1}`}
                                style={{
                                    width: '150px',
                                    height: '130px',
                                    animation: animation ? 'fadeIn 1s ease-out' : 'none',
                                    borderRadius: '50px',
                                    padding: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => navigate(`/Product/${item.ParentCat}/${item.Name}`)}
                            />
                            <Typography variant="body1" align="center" sx={{ color: item.Name === url ? 'red' : 'black', fontSize: '12px', ml: '-5rem' }}>{item.Name}</Typography>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box >
    );
};

export default Brands;
