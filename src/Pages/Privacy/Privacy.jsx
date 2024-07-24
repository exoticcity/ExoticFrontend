import { Box, Grid, Typography } from "@mui/material"
import { useTranslation } from 'react-i18next'

const Privacy = () => {
    const { t } = useTranslation();

    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4" sx={{ fontWeight: '600', pl: '3rem', pt: '2rem' }}>Privacy</Typography>
                <Box sx={{ width: '8rem', height: '2.5px', backgroundColor: 'orange', margin: '8px 0', textAlign: 'center', marginLeft: '3rem', marginRight: 'auto' }} ></Box>
                <Box sx={{ color: 'gray', pl: '3rem', pt: '2rem', mb: '2rem' }}>
                    <Typography sx={{ fontWeight: 600 }}> {t('Collection of personal data')} </Typography>
                    <Box sx={{ width: '15%', height: '2px', backgroundColor: 'orange', margin: '8px 0' }} ></Box>
                    <br />
                    <Typography sx={{ fontSize: '14px' }}> {t('Para1')} </Typography>
                    <br />
                    <Typography sx={{ fontSize: '14px' }}>{t('Para2')}</Typography>
                    <br />
                    <Typography sx={{ fontSize: '14px' }}>{t('Para3')}</Typography>
                    <br />

                    <ul style={{ fontSize: '14px' }}>
                        <li> {t('Para4')} </li>
                    </ul>
                    <br />
                    <Typography sx={{ fontSize: '14px' }}> {t('Para5')} </Typography>
                    <br />

                    <Typography sx={{ fontWeight: 600 }}>{t('Respect for privacy on our website')}</Typography>
                    <Box sx={{ width: '19%', height: '2px', backgroundColor: 'orange', margin: '8px 0' }} ></Box>
                    <br />

                    <Typography>{t('Para6')}</Typography>
                    <br />

                    <Typography sx={{ fontWeight: 600 }}>{t('Your rights')}</Typography>
                    <Box sx={{ width: '6%', height: '2px', backgroundColor: 'orange', margin: '8px 0' }} ></Box>

                    <br />

                    <Typography sx={{ fontSize: '14px' }} >{t('At any time, your personal data may be:')}</Typography>
                    <br />

                    <ul style={{ fontSize: '14px' }}>
                        <li>{t('consulted')}</li>
                        <li>{t('modified')}</li>
                        <li>{t('deleted')}</li>
                    </ul>
                    <br />

                    <Typography sx={{ fontSize: '14px' }}>For this purpose, contact : <span onClick={() => window.location.href = 'mailto:privacy@exoticcity.be '}>privacy@exoticcity.be </span> </Typography>
                    <br />

                    <Typography sx={{ fontSize: '14px' }}>{t('Para7')}</Typography>
                    <br />

                    <Typography sx={{ fontSize: '14px' }}>{t('Any other questions or remarks?')}</Typography>
                    <br />


                    <Typography sx={{ fontSize: '14px' }}>Send an email to: <span onClick={() => window.location.href = 'mailto:privacy@exoticcity.be '}>privacy@exoticcity.be </span> </Typography>
                    <br />

                    <Typography sx={{ fontWeight: 600 }}>{t('Use of cookies')}</Typography>
                    <Box sx={{ width: '8%', height: '2px', backgroundColor: 'orange', margin: '8px 0' }} ></Box>

                    <br />

                    <Typography sx={{ fontSize: '14px' }}>{t('Para8')}</Typography>
                    <br />

                    <Typography sx={{ fontSize: '14px' }}>{t('Para9')}</Typography>
                    <br />

                    <Typography sx={{ fontSize: '14px' }}>{t('This cookie does not contain any other data about you or your computer.')}</Typography>
                    <br />

                    <Typography sx={{ fontSize: '14px' }}>{t('Para10')}</Typography>
                </Box>
            </Grid>
        </Grid>)
}

export default Privacy