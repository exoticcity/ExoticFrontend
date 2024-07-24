import { Typography, Grid, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../App';
import { useNavigate } from 'react-router-dom';

const StyledTypography = styled.div`
    padding: 5px;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: red;
        animation: shake 0.5s;
    }

    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
    }
`;

const Footer = () => {
  const navigate = useNavigate();
  const { url, setUrl } = useContext(Context);
  return (
    <Grid container xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: '#4A4A4A', color: '#fff', padding: '30px', gap: '4rem', }} >
      {/* Contact */}
      <Grid xs={12} md={6} lg={1.9} item sx={{ alignItems: 'center', padding: '10px' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Contact Us</Typography>
        <Box sx={{ width: '100%', height: '2px', backgroundColor: 'orange', margin: '8px 0' }} ></Box>
        <StyledTypography>
          <LocationOnIcon sx={{ fontSize: '16px' }} /> Av. de l Expansion 1, 4432 Alleur
        </StyledTypography>
        <StyledTypography onClick={() => window.location.href = 'tel:042280400'}>
          <PhoneIcon sx={{ fontSize: '16px' }} /> 042 280 400
        </StyledTypography>
        <StyledTypography onClick={() => window.location.href = 'mailto:info@exoticcity.be'}>
          <MailIcon sx={{ fontSize: '16px' }} /> info@exoticcity.be
        </StyledTypography>
      </Grid>
      {/* Navigation */}
      <Grid xs={12} md={6} lg={1.9} item sx={{ alignItems: 'center', padding: '10px' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Navigation</Typography>
        <Box sx={{ width: '100%', height: '2px', backgroundColor: 'orange', margin: '8px 0' }} ></Box>
        <Link to='/Legal' style={{ textDecoration: 'none', color: '#fff' }}>
          <StyledTypography style={{ textTransform: 'uppercase' }}>
            <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> Legal Notice
          </StyledTypography>
        </Link>
        <Link to='/Privacy' style={{ textDecoration: 'none', color: '#fff' }}>
          <StyledTypography style={{ textTransform: 'uppercase' }}>
            <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> Privacy
          </StyledTypography>
        </Link>
        <Link to='/Services' style={{ textDecoration: 'none', color: '#fff' }}>
          <StyledTypography style={{ textTransform: 'uppercase' }}>
            <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> Services
          </StyledTypography>
        </Link>
        <Link to='/Contact' style={{ textDecoration: 'none', color: '#fff' }}>
          <StyledTypography style={{ textTransform: 'uppercase' }}>
            <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> Contact Us
          </StyledTypography>
        </Link>
        <Link to='/Brands' style={{ textDecoration: 'none', color: '#fff' }}>
          <StyledTypography style={{ textTransform: 'uppercase' }}>
            <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> Brands
          </StyledTypography>
        </Link>
      </Grid>
      {/* Food Products */}
      <Grid xs={12} md={6} lg={1.9} item sx={{ alignItems: 'center', padding: '10px' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Food Products</Typography>
        <Box sx={{ width: '100%', height: '2px', backgroundColor: 'orange', margin: '8px 0' }} ></Box>
        <StyledTypography onClick={() => {
          let newUrl = url;
          newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ParentCategory=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
          const separator = newUrl.includes('?') ? '&' : '?'; // Check if there's already a query string
          setUrl(newUrl + `${separator}ItemCategoryCode=DRINKS`);
          navigate(`/Products/FOOD`);
        }}>
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> DRINKS
        </StyledTypography>
        <StyledTypography onClick={() => {
          let newUrl = url;
          newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ParentCategory=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
          const separator = newUrl.includes('?') ? '&' : '?'; // Check if there's already a query string
          setUrl(newUrl + `${separator}ItemCategoryCode=RICE`);
          navigate(`/Products/FOOD`);
        }}>
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> RICE
        </StyledTypography>
        <StyledTypography onClick={() => {
          let newUrl = url;
          newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ParentCategory=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
          const separator = newUrl.includes('?') ? '&' : '?'; // Check if there's already a query string
          setUrl(newUrl + `${separator}ItemCategoryCode=MILK AND CREAM`);
          navigate(`/Products/FOOD`);
        }}>
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> MILKs AND CREAM
        </StyledTypography>
        <StyledTypography onClick={() => {
          let newUrl = url;
          newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ParentCategory=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
          const separator = newUrl.includes('?') ? '&' : '?'; // Check if there's already a query string
          setUrl(newUrl + `${separator}ItemCategoryCode=NOODLES`);
          navigate(`/Products/FOOD`);
        }}>
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> NOODLES
        </StyledTypography>
      </Grid>
      {/* Cosmetic Products */}
      <Grid xs={12} md={6} lg={1.9} item sx={{ alignItems: 'center', padding: '10px' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Cosmetics Products</Typography>
        <Box sx={{ width: '100%', height: '2px', backgroundColor: 'orange', margin: '8px 0' }} ></Box>
        <StyledTypography onClick={() => {
          let newUrl = url;
          newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ParentCategory=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
          const separator = newUrl.includes('?') ? '&' : '?'; // Check if there's already a query string
          setUrl(newUrl + `${separator}ItemCategoryCode=HAIR CARE PRODUCTS`);
          navigate(`/Products/COSMETICS`);
        }}>
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> HAIR CARE PRODUCTS
        </StyledTypography>
        <StyledTypography onClick={() => {
          let newUrl = url;
          newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ParentCategory=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
          const separator = newUrl.includes('?') ? '&' : '?'; // Check if there's already a query string
          setUrl(newUrl + `${separator}ItemCategoryCode=SKIN CARE PRODUCTS`);
          navigate(`/Products/COSMETICS`);
        }}>
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> SKIN CARE PRODUCTS
        </StyledTypography>
        <StyledTypography onClick={() => {
          let newUrl = url;
          newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ParentCategory=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
          const separator = newUrl.includes('?') ? '&' : '?'; // Check if there's already a query string
          setUrl(newUrl + `${separator}ItemCategoryCode=CHILD CARE`);
          navigate(`/Products/COSMETICS`);
        }}>
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> CHILD CARE
        </StyledTypography>
        <StyledTypography onClick={() => {
          let newUrl = url;
          newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ParentCategory=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
          newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
          const separator = newUrl.includes('?') ? '&' : '?'; // Check if there's already a query string
          setUrl(newUrl + `${separator}ItemCategoryCode=BODY OIL`);
          navigate(`/Products/COSMETICS`);
        }}>
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> BODY OIL
        </StyledTypography>
      </Grid>
      {/* Payment Methods */}
      <Grid xs={12} md={6} lg={1.9} item sx={{ alignItems: 'center', padding: '10px' }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Payment Methods</Typography>
        <Box sx={{ width: '100%', height: '2px', backgroundColor: 'orange', margin: '8px 0' }} ></Box>
        <StyledTypography>
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> Cash on Delivery
        </StyledTypography>
        <StyledTypography>
          <ArrowForwardIosIcon sx={{ fontSize: '16px' }} /> Credit/Debit Card
        </StyledTypography>
      </Grid>
    </Grid >
  );
};

export default Footer;
