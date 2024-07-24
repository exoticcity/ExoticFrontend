import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next'
import './style.css'

const Message = () => {
    const { t } = useTranslation();

    return (
        <Grid container>
            <Grid item>
                <Box sx={{ ml: '4rem', mt: '2rem' }}>
                    <Typography sx={{ textAlign: 'left', fontSize: '25px', fontWeight: '600', fontFamily: 'Montserrat' }}>{t('ABOUT US')}</Typography>
                </Box>
                <Box sx={{ width: '68%', height: '2px', backgroundColor: 'orange', margin: '8px 0', ml: '4rem', mt: '1rem' }} ></Box>
            </Grid>
            <Grid item sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: '#ECF0F1',
                padding: '2rem',
                gap: '2rem',
            }}>
                <Box width={{ xs: '100%', sm: '65%' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '40px', color: '#646464', fontFamily: 'Montserrat' }}>{t('About Title')}</Typography>
                    <Typography sx={{ color: '#646464', textAlign: 'justify', fontFamily: 'Montserrat' }}>{t('About Description')}</Typography>
                </Box>
                <Box>
                    <img src='/assets/jpeg/eco.jpg' width="100%" />
                </Box>
            </Grid>
            <Box sx={{ width: '100%', height: '2px', backgroundColor: 'orange', margin: '8px 0', mt: '1rem' }} ></Box>
            <Grid item sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: '#ECF0F1',
                padding: '2rem',
                gap: '2rem',
            }}>
                <Box>
                    <img src='/assets/jpeg/warehouse.jpg' width="95%" />
                </Box>
                <Box width={{ xs: '100%', sm: '53%' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '40px', color: '#646464', fontFamily: 'Montserrat' }}>{t('Warehouse Title')}</Typography>
                    <Typography sx={{ color: '#646464', textAlign: 'justify', fontFamily: 'Montserrat' }}>{t('Warehouse Description')}</Typography>
                </Box>
            </Grid>
            <Box sx={{ width: '100%', height: '2px', backgroundColor: 'orange', margin: '8px 0', mt: '1rem' }} ></Box>
            <Grid item sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: '#ECF0F1',
                padding: '2rem',
                gap: '2rem',
            }}>
                <Box width={{ xs: '100%', sm: '63%' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '40px', color: '#646464', fontFamily: 'Montserrat' }}>{t('Coromuse Title')}</Typography>
                    <Typography sx={{ color: '#646464', textAlign: 'justify', fontFamily: 'Montserrat' }}>{t('Coromuse Description')}</Typography>
                </Box>
                <Box>
                    <img src='/assets/jpeg/coromeuse.jpg' width="100%" />
                </Box>
            </Grid>
            <Box sx={{ width: '100%', height: '2px', backgroundColor: 'orange', margin: '8px 0', mt: '1rem' }} ></Box>
            <Grid item sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-center',
                alignItems: 'center',
                backgroundColor: '#ECF0F1',
                padding: '2rem',
                gap: '1rem',
            }}>
                <Box width={{ xs: '100%', sm: '50%' }}>
                    <img src='/assets/jpeg/brand_logos.jpg' width="95%" />
                </Box>
                <Box width={{ xs: '100%', sm: '50%' }} >
                    <Typography sx={{ textAlign: 'center', fontSize: '40px', color: '#646464', fontFamily: 'Montserrat' }}>{t('Brand Title')}</Typography>
                    <Typography sx={{ color: '#646464', textAlign: 'justify', fontFamily: 'Montserrat' }}>{t('Brand Description')}</Typography>
                </Box>
            </Grid>
            <Box sx={{ width: '100%', height: '2px', backgroundColor: 'orange', margin: '8px 0', mt: '1rem' }} ></Box>
        </Grid>
    )
}
export default Message