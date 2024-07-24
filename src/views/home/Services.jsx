import { Box, Grid, Hidden, Typography } from "@mui/material"
import { useTranslation } from 'react-i18next'
const Services = () => {
    const { t } = useTranslation();

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'space-around', mt: '2rem', height: '100%', pb: '2rem' }}>
            <Grid item >
                <Typography textAlign='center' fontSize='35px' sx={{ fontFamily: 'Montserrat' }}>{t('Propos_Title')}</Typography>
                <Box sx={{ sm: { display: 'flex', flexDirection: 'column', color: 'red' } }}>
                    <Box style={{ width: '100% ', height: '2px', backgroundColor: 'red', margin: '8px 0', }} ></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: '4rem' }}>
                        <Hidden mdDown>
                            <img src='/assets/jpeg/propos.jpg' width='50%' />
                        </Hidden>
                        <Typography width='18rem' fontSize='14px' pl='1rem' sx={{ textAlign: 'justify', fontFamily: 'Montserrat' }}>{t('Propos_Description')}</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item>
                <Typography textAlign='center' fontSize='35px' sx={{ fontFamily: 'Montserrat' }}>{t('Services_Title')}</Typography>
                <Box style={{ width: '100% ', height: '2px', backgroundColor: 'red', margin: '8px 0', }} ></Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: '4rem' }}>
                    <Hidden mdDown>
                        <img src='/assets/jpeg/services.jpg' width='50%' />
                    </Hidden>
                    <Typography width='18rem' fontSize='14px' pl='1rem' sx={{ textAlign: 'justify', fontFamily: 'Montserrat' }}>{t('Services_Description')}</Typography>
                </Box>
            </Grid>
        </Grid >
    )
}

export default Services