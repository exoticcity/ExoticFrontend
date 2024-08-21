/* eslint-disable no-unused-vars */
import { Box, Button, Card, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Login = () => {
    const { t } = useTranslation();

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    // States
    const [userId, setuserId] = useState('');
    const [password, setPassword] = useState('')
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [showPass, setShowPass] = useState(false);


    const onSubmit = async (data) => {
        setIsLoggingIn(true)
        const csrfToken = Cookies.get("csrftoken");
        try {
            const response = await axios.post(
                'https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/customers/login/',
                {
                    "username": data.username,
                    "password": data.password
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    }
                }
            );
            sessionStorage.setItem('user', response?.data?.user);
            localStorage.setItem('UserDetail', data?.username)
            navigate("/");
            toast.success("Login Successfully")
        } catch (error) {
            toast.error("Access denied: wrong username or password.");
        }
    };
    const handleTogglePasswordVisibility = () => {
        setShowPass((prevShowPass) => !prevShowPass);
    };

    return (
        <Grid container sx={{ width: '98.9vw', pt: '2rem', pb: '4rem', backgroundColor: '#f2f2f2', minHeight: '81vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card sx={{ mx: { xs: '1rem', lg: '29rem' }, width: { xs: '90vw', lg: '40vw' }, height: 'auto', p: '2.5rem', mt: '2rem' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h4' sx={{ fontWeight: '600', fontFamily: 'Montserrat' }}>{t('Signin')}</Typography>
                            <img src="/assets/jpeg/LOGO.jpg" style={{ width: '140px' }} alt="Logo" />
                        </Box>
                        <Box sx={{ pt: '2rem' }}>
                            <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('Email')}</Typography>
                            <TextField type="text" size="small" fullWidth onChange={(e) => setuserId(e.target.value)} {...register('username', { required: true })} />
                        </Box>
                        <Box sx={{ pt: '2rem' }}>
                            <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('Password')}</Typography>
                            <TextField
                                type={showPass ? 'text' : 'password'}
                                size="small"
                                fullWidth
                                onChange={(e) => setPassword(e.target.value)}
                                {...register('password', { required: true })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', pt: '2rem' }}>
                            <Link to='/ForgetPassword' style={{ textDecoration: 'none' }}>
                                <Typography sx={{ fontFamily: 'Montserrat' }}>
                                    {t('Forget Password?')}
                                </Typography>
                            </Link>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', pt: '2rem' }}>

                            <Button variant='contained' color='primary' type='submit' size='small' sx={{ fontFamily: 'Montserrat', display: 'flex', justifyContent: 'space-between', px: '20px', fontSize: '13px', fontWeight: 600, backgroundColor: '#fff', color: '#000', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff', }, }} disabled={isLoggingIn}> {t('Login')}</Button>

                            <Link to='/VerifyEmail' style={{ textDecoration: 'none' }}>
                                <Tooltip title="Already a Business Central Customer?" placement="top">
                                    <Button size='small' sx={{ fontFamily: 'Montserrat', display: 'flex', justifyContent: 'space-between', px: '20px', fontSize: '13px', fontWeight: 600, backgroundColor: '#fff', color: '#000', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff', }, mt: { xs: '10px', sm: 0, md: 0, lg: 0 } }} variant='contained'>{t('Create Password')}</Button>
                                </Tooltip>
                            </Link>
                            <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}><Link to='/Signup'>{t('NoAccount')}</Link></Typography>
                        </Box>
                    </Card>
                </form>
            </Grid>
        </Grid >
    )
}

export default Login;
