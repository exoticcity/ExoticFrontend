/* eslint-disable no-unused-vars */
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, Card, Grid, MenuItem,  TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Context } from '../../App';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next'

const Signup = () => {
    const { t } = useTranslation();

    // USER-CONTEXT
    const { loading, setLoading, accessTokenUrl } = useContext(Context);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    // STATES
    const [postCodes, setPostCodes] = useState([]);
    const [countries, setCountries] = useState([]);
    const [language, setLanguage] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const [selectedCityCode, setSelectedCityCode] = useState('');

    // FUNCTIONS
    const handleCountryChange = (e) => { const countryCode = e.target.value; setSelectedCountryCode(countryCode); setSelectedCityCode(''); };
    const handleCityChange = (e) => { const cityCode = e.target.value; setSelectedCityCode(cityCode); };
    const filteredPostCodes = postCodes.filter((postcode) => postcode.Country_Region_Code === selectedCountryCode);
    const csrfToken = Cookies.get("csrftoken");

    // CUSTOMER API
    const handleFormSubmit = async (data) => {
        try {
            const datas = {
                "Name": data?.Name,
                "EMail": data?.Email,
                "Address": data?.Address,
                "Address2": data?.Address2,
                "City": selectedCityCode,
                "PhoneNo": data?.phoneNumber,
                "PostCode": selectedCityCode,
                "County": selectedCountryCode,
                "LanguageCode": language,
            };

            toast.success(`Your profile is being validated, please be patient`);

            const res = await axios.post(
                "https://api.businesscentral.dynamics.com/v2.0/Live/api/bctech/demo/v2.0/Companies(f03f6225-081c-ec11-bb77-000d3abcd65f)/customer/",
                datas,
                {
                    headers: {
                        Authorization: `Bearer ${accessTokenUrl}`
                    }
                }
            );

            const customerId = res?.data?.No;

            if (!customerId) {
                throw new Error('Failed to get customer ID from response');
            }

            await axios.patch(
                `https://api.businesscentral.dynamics.com/v2.0/Live/api/bctech/demo/v2.0/Companies(f03f6225-081c-ec11-bb77-000d3abcd65f)/customer(${res?.data?.SystemId})`,
                {
                    ...(selectedCountryCode === "BE" ? { "EnterpriseNo": data?.enterprise_no } : { "VATRegistrationNo": data?.VATRegistrationNo })
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessTokenUrl}`,
                        'Content-Type': 'application/json',
                        'If-Match': '*'
                    }
                }
            );
            await axios.post(
                "https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/customers/create/",
                {
                    "customer_id": customerId,
                    "name": data?.Name,
                    "email": data?.Email,
                    "addressLine1": data?.Address,
                    "region_code": selectedCountryCode,
                    "city": selectedCityCode,
                    "language_code": language,
                    "postalCode": parseInt(selectedCityCode),
                    "addressLine2": data?.Address2,
                    "enterprise_no": parseInt(data?.enterprise_no),
                    "VATRegistrationNo": parseInt(data?.VATRegistrationNo),
                    "phoneNumber": parseInt(data?.phoneNumber),
                    "mobile_phoneNumber": parseInt(data?.mobile_phoneNumber),
                    "password": data?.password,
                    "CustomerPriceGroup": "L1",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    }
                }
            );
           
            toast.success('Account created successfully');
            navigate("/Login");
        } catch (error) {
            console.error("An error occurred:", error.message);
            if (error.response) {
                console.error("Response Error Data:", error.response.data);
                console.error("Response Error Status:", error.response.status);
                console.error("Response Error Headers:", error.response.headers);
                toast.error('Cannot register at the moment, please try again later!');
            } else if (error.request) {
                console.error("No response received from server:", error.request);
                toast.error('No response received from server');
            } else {
                console.error("Request setup error:", error.message);
                toast.error('Request setup error');
            }
        } finally {
            setLoading(false);
        }
    };

    // Dropdown APIS
    const apiInstance = axios.create({
        baseURL: 'https://api.businesscentral.dynamics.com/v2.0/7c885fa6-8571-4c76-9e28-8e51744cf57a/Live/ODataV4',
        headers: { Authorization: `Bearer ${accessTokenUrl}`, },
    });

    useEffect(() => {
        const fetchCountries = async () => { try { const response = await apiInstance.get('/Company(\'My%20Company\')/countryregion'); setCountries(response.data.value); } catch (error) { console.error("Error fetching countries:", error.message); } };
        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchPostCodes = async () => { try { const response = await apiInstance.get('/Company(\'My%20Company\')/postcodes'); setPostCodes(response.data.value); } catch (error) { console.error("Error fetching postcodes:", error); } };
        fetchPostCodes();
    }, []);

    useEffect(() => {
        const fetchLanguages = async () => { try { const response = await apiInstance.get('/Company(\'My%20Company\')/Languages'); setLanguages(response.data.value); } catch (error) { console.error("Error fetching languages:", error); } };
        fetchLanguages();
    }, []);

    return (
        <Grid container sx={{ width: '100%', pt: '2rem', pb: '4rem', backgroundColor: '#f2f2f2' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Card sx={{ mx: { xs: '1rem', lg: '10rem' }, width: { xs: '90vw', lg: '80vw' }, height: 'auto', p: '2.5rem', mt: '2rem' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h4' sx={{ fontWeight: '600', fontFamily: 'Montserrat' }}>{t('Signin')}</Typography>
                            <img src="/assets/jpeg/LOGO.jpg" style={{ width: '140px' }} alt="Logo" />
                        </Box>
                        <Grid container spacing={2}>
                            {/* Name */}
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ pt: '2rem' }}>
                                    <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('Name')}</Typography>
                                    <TextField type="text" size="small" fullWidth {...register('Name', { required: true })} />
                                </Box>
                            </Grid>
                            {/* Email */}
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ pt: '2rem' }}>
                                    <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('Email')}</Typography>
                                    <TextField type="email" size="small" fullWidth {...register('Email', { required: true })} />
                                </Box>
                            </Grid>
                            {/* Address */}
                            <Grid item xs={12}>
                                <Box sx={{ pt: '10px' }}>
                                    <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('Address')}</Typography>
                                    <TextField type="text" size="small" fullWidth {...register('Address', { required: true })} />
                                </Box>
                            </Grid>
                            {/* Country Region */}
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ pt: '10px' }}>
                                    <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('COUNTRY/REGION')}</Typography>
                                    <TextField select size="small" fullWidth value={selectedCountryCode} onChange={handleCountryChange}  >
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <h4 style={{ paddingLeft: '6px' }}>{t('COUNTRY/REGION')}</h4>
                                            <input type='search' placeholder='Search Counrty/Region' />
                                        </div>
                                        <table style={{ width: '100%' }}>
                                            <thead style={{ width: '100%' }}>
                                                <tr style={{ width: '100%' }}>
                                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ccc', width: '20%' }}>Code</th>
                                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ccc', width: '45%' }}>Name</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        {countries?.map((countryOption) => (
                                            <MenuItem key={countryOption.ISO_Numeric_Code} value={countryOption.Code} style={{ borderBottom: '1px solid #ccc', padding: '0.5px' }} size="small">
                                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                    <tbody style={{ width: '100%' }}>
                                                        <tr style={{ width: '100%' }}>
                                                            <td style={{ padding: '8px', textAlign: 'left', width: '20%', fontSize: '13px' }}>{countryOption.Code.toUpperCase()}</td>
                                                            <td style={{ padding: '8px', textAlign: 'left', fontSize: '13px', width: '45%' }}>{countryOption.Name.toUpperCase()}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>
                            {/* City */}
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ pt: '10px' }}>
                                    <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('City')}</Typography>
                                    <TextField select size="small" fullWidth value={selectedCityCode} onChange={handleCityChange}  >
                                        <h4 style={{ paddingLeft: '6px' }}>{t('POST CODE')}</h4>
                                        <table style={{ width: '100%' }}>
                                            <thead style={{ width: '100%' }}>
                                                <tr style={{ width: '100%' }}>
                                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ccc', width: '20%' }}>Code</th>
                                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ccc', width: '45%' }}>City</th>
                                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ccc' }}>Country/Region</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        {filteredPostCodes?.map((postcodeOption) => (
                                            <MenuItem key={postcodeOption.Code} value={postcodeOption.Code} style={{ borderBottom: '1px solid #ccc', padding: '0.5px' }} size="small">
                                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                    <tbody style={{ width: '100%' }}>
                                                        <tr style={{ width: '100%' }}>
                                                            <td style={{ padding: '8px', textAlign: 'left', width: '20%', fontSize: '13px' }}>{postcodeOption.Code.toUpperCase()}</td>
                                                            <td style={{ padding: '8px', textAlign: 'left', width: '45%', fontSize: '13px' }}>{postcodeOption.City.toUpperCase()}</td>
                                                            <td style={{ padding: '8px', textAlign: 'left', fontSize: '13px' }}>{postcodeOption.Country_Region_Code.toUpperCase()}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>
                            {/* PostCode */}
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ pt: '10px' }}>
                                    <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('POST CODE')}</Typography>
                                    <TextField select size="small" fullWidth value={selectedCityCode} onChange={handleCityChange}  >
                                        <h4 style={{ paddingLeft: '6px' }}>{t('POST CODE')}</h4>
                                        <table style={{ width: '100%' }}>
                                            <thead style={{ width: '100%' }}>
                                                <tr style={{ width: '100%' }}>
                                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ccc', width: '20%' }}>Code</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        {filteredPostCodes?.map((postcodeOption) => (
                                            <MenuItem key={postcodeOption.Code} value={postcodeOption.Code} style={{ borderBottom: '1px solid #ccc', padding: '0.5px' }} size="small">
                                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                    <tbody style={{ width: '100%' }}>
                                                        <tr style={{ width: '100%' }}>
                                                            <td style={{ padding: '8px', textAlign: 'left', width: '20%', fontSize: '13px' }}>{postcodeOption.Code.toUpperCase()}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>
                            {/* Language Code */}
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ pt: '10px' }}>
                                    <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('Language Code')}</Typography>
                                    <TextField select size="small" fullWidth value={language} onChange={(e) => setLanguage(e.target.value)}  >
                                        <h4 style={{ paddingLeft: '6px' }}>{t('Language Code')}</h4>
                                        <table style={{ width: '100%' }}>
                                            <thead style={{ width: '100%' }}>
                                                <tr style={{ width: '100%' }}>
                                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ccc', width: '20%' }}>Code</th>
                                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ccc', width: '45%' }}>City</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        {languages?.map((lang) => (
                                            <MenuItem key={lang.Code} value={lang.Code} style={{ borderBottom: '1px solid #ccc', padding: '0.5px' }} size="small">
                                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                    <tbody style={{ width: '100%' }}>
                                                        <tr style={{ width: '100%' }}>
                                                            <td style={{ padding: '8px', textAlign: 'left', width: '20%', fontSize: '13px' }}>{lang.Code.toUpperCase()}</td>
                                                            <td style={{ padding: '8px', textAlign: 'left', width: '45%', fontSize: '13px' }}>{lang.Name.toUpperCase()}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </MenuItem>))}
                                    </TextField>
                                </Box>
                            </Grid>
                            {/*Alternate Address */}
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ pt: '10px' }}>
                                    <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}> {t('Alternate Address')}</Typography>
                                    <TextField type="text" size="small" fullWidth {...register('Address2', { required: true })} />
                                </Box>
                            </Grid>
                            {/* ENTERPRISE NO */}
                            {selectedCountryCode === "BE" ? (<Grid item xs={12} sm={6}>
                                <Box sx={{ pt: '10px' }}>
                                    <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('Enterprise Number')}</Typography>
                                    <TextField type="text" size="small" fullWidth {...register('enterprise_no', { required: true })} />
                                </Box>
                            </Grid>) : (
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ pt: '10px' }}>
                                        <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('VAT Registration Number')}</Typography>
                                        <TextField type="text" size="small" fullWidth {...register('VATRegistrationNo', { required: true })} />
                                    </Box>
                                </Grid>
                            )}
                            {/* Phone Number */}
                            <Grid item xs={12} sm={6}>
                                <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>{t('Phone Number')}</Typography>
                                <TextField
                                    type="tel"
                                    size="small"
                                    fullWidth
                                    {...register('phoneNumber', { required: true })}
                                />
                            </Grid>

                            {/* Mobile Number */}
                            <Grid item xs={12} sm={6}>
                                <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>
                                    {t('Mobile Number')}
                                </Typography>
                                <TextField
                                    type="tel"
                                    size="small"
                                    fullWidth
                                    {...register('mobile_phoneNumber', { required: true })}
                                />
                            </Grid>

                            {/* Password*/}
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ pt: '10px' }}>
                                    <Typography sx={{ fontSize: '13px' }}>{t('Password')}</Typography>
                                    <TextField type="password" size="small" fullWidth {...register('password', { required: true })} />
                                </Box>
                            </Grid>
                        </Grid>
                        {/* Submit Button */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: '20px' }}>
                            <Button variant='contained' color='primary' type='submit' sx={{ fontFamily: 'Montserrat', display: 'flex', justifyContent: 'space-between', px: '20px', fontSize: '13px', fontWeight: 600, backgroundColor: '#fff', color: '#000', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff', }, }} >
                                <AppRegistrationIcon sx={{ fontSize: '14px' }} /> {loading ? t('Registering') : t('Register')}
                            </Button>
                            <Typography sx={{ fontSize: '13px', fontFamily: 'Montserrat' }}>
                                {t('Already have an account?')} <Link to="/login">{t('Login')} </Link>
                            </Typography>
                        </Box>
                    </Card>
                </form>
            </Grid>
        </Grid >
    )
}

export default Signup;