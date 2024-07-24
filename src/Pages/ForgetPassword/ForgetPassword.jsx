import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next'

const NewPassword = () => {
    const { id, token } = useParams();
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleVerify = async () => {
        axios.post(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/customers/reset-password/${id}/${token}/`, {
            "new_password": password
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            toast.success("Password Updated Successfully!")
            navigate('/Login')
        })


    };

    return (
        <Grid container sx={{ width: '98vw', pt: '2rem', pb: '4rem', backgroundColor: '#f2f2f2' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <form >
                    <Card sx={{ mx: { xs: '1rem', lg: '29rem' }, width: { xs: '90vw', lg: '40vw' }, height: 'auto', p: '2.5rem', mt: '2rem' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h4' sx={{ fontWeight: '600' }}>Forget Password</Typography>
                            <img src="/assets/jpeg/LOGO.jpg" style={{ width: '140px' }} alt="Logo" />
                        </Box>
                        <Box sx={{ pt: '2rem' }}>
                            <Typography sx={{ fontSize: '13px' }}>New Password</Typography>
                            <TextField type="password" size="small" fullWidth onChange={(e) => { setPassword(e?.target?.value) }} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', pt: '2rem' }}> </Box>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', pt: '2rem' }}>
                            <Button size='small' sx={{ display: 'flex', justifyContent: 'space-between', px: '20px', fontSize: '13px', fontWeight: 600, backgroundColor: '#fff', color: '#000', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff', }, }} variant='contained'
                                onClick={() => { handleVerify() }} > {t('Verify')}</Button>
                        </Box>
                    </Card>
                </form>
            </Grid>
        </Grid>
    )
}

export default NewPassword