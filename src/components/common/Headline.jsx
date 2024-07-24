import { Typography, Grid, Divider } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom";

const Headline = () => {
  return (
    <Grid container position="relative" sx={{ height: '1.8rem', backgroundColor: "#E6E6E6", width: '100%', pl: '50px' }}>
      <Grid item sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', gap: '10px' }}>
        <Link to='https://www.facebook.com/exotique.city/' target="_blank"><FacebookIcon sx={{ color: '#000', width: '15px' }} /> </Link>
        <Link to='https://www.instagram.com/exoticcitybelgium/' target="_blank"> <InstagramIcon sx={{ color: '#000', width: '15px' }} />  </Link>
        <Link to='https://www.linkedin.com/company/exotic-city-sprl/?originalSubdomain=be' target="_blank">  <LinkedInIcon sx={{ color: '#000', width: '15px' }} />  </Link>
      </Grid>
      <Divider style={{ backgroundColor: '#A8A8A8', margin: '2px', width: '1px' }} />
      <Grid item sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        <Link to='/Legal' style={{ textDecoration: 'none' }}>  <Typography sx={{ color: '#A8A8A8', fontSize: '13px', pt: '4px' }}>Legal Notice</Typography>  </Link>
      </Grid>
    </Grid>
  )
}

export default Headline