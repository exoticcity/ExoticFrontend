import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

const Promo = () => {
    const { t } = useTranslation();
    const containerStyle = { position: "relative", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textAlign: "center", };
    const overlayStyle = { content: "", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: `url('/assets/png/background.jpg')`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center", opacity: 1, backgroundColor: "black", };

    return (
        <Grid container style={containerStyle}>
            <Box style={overlayStyle}></Box>
            <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)", position: "absolute", top: 0, right: 0, bottom: 0, left: 0, }} ></Box>
            <Box className="text-box" sx={{ position: "absolute", zIndex: 1 }}>  <Typography sx={{ fontFamily: 'Montserrat' ,fontSize: {xs: '26px', md: '35px', lg: '50px' }, width: '100%', textAlign: 'center', fontWeight: '600', color: '#fff' }}> {t('Discover Our Exclusive Brands')}! </Typography>  </Box>
            <Box> <img src='/assets/png/background.jpg' alt="" style={{ cursor: 'pointer', backgroundPosition: 'fixed', backgroundSize: 'cover', width: '100%', height: '100%' }} /></Box>
        </Grid>
    );
};

export default Promo;
