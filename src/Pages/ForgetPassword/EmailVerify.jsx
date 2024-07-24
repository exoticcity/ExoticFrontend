/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

const EmailVerify = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('')
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { register, handleSubmit } = useForm();
  
    const handleVerify = async (data) => {
        const csrfToken = Cookies.get("csrftoken");
        try {
            const response = await axios.post('https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/customers/forget-password/', {
                "email": data.email
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                }
            });
            toast.success("Check Your Email!")
        } catch (err) {
            console.error('Error verifying email:', err);
            toast.error('Your request cannot be proceeded at the moment. Please try again.');
        }

    };
    
    return (
        <Grid container sx={{ width: '98vw', pt: '2rem', pb: '4rem', backgroundColor: '#f2f2f2' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <form onSubmit={handleSubmit(handleVerify)}>
                    <Card sx={{ mx: { xs: '1rem', lg: '29rem' }, width: { xs: '90vw', lg: '40vw' }, height: 'auto', p: '2.5rem', mt: '2rem' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h4' sx={{ fontWeight: '600', fontFamily: 'Montserrat' }}>{t('Create Password')}</Typography>
                            <img src="/assets/jpeg/LOGO.jpg" style={{ width: '140px' }} alt="Logo" />
                        </Box>
                        <Box sx={{ pt: '2rem' }}>
                            <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('Email')}</Typography>
                            <TextField
                                type="text"
                                size="small"
                                fullWidth
                                onChange={(e) => setUserEmail(e.target.value)}
                                {...register('email', { required: true })}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', pt: '2rem' }}> </Box>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', pt: '2rem' }}>
                            {/* <Link to='/NewPassword' style={{ textDecoration: 'none' }}> */}
                            <Button
                                type='submit'
                                size='small'
                                sx={{
                                    fontFamily: 'Montserrat',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    px: '20px',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    transition: 'background-color 0.3s, color 0.3s',
                                    '&:hover': { backgroundColor: '#000', color: '#fff' },
                                }}
                                variant='contained'
                            >
                                {t('Verify')}
                            </Button>
                            {/* </Link> */}
                            <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('Remember Password?')} <Link to='/Login'>{t('Login')}</Link> </Typography>
                        </Box>
                    </Card>
                </form>
            </Grid>
        </Grid>
    )
}

export default EmailVerify