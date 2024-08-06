import { Box, Grid, Typography } from "@mui/material"
import { useTranslation } from 'react-i18next'

const LegalNotice = () => {
  const { t } = useTranslation();

    return (
        <Grid container sx={{height: "70vh"}}>
            <Grid item>
                <Typography variant="h4" sx={{ fontWeight: '600', pl: '3rem', pt: '2rem' }}>{t('Legal Notice')}</Typography>
                <Box sx={{ width: '8rem', height: '2.5px', backgroundColor: 'orange', margin: '8px 0', textAlign: 'center', marginLeft: '3rem', marginRight: 'auto' }} ></Box>
                <Box sx={{ color: 'gray', pl: '3rem', pt: '2rem', mb: '2rem' }}>
                    <Typography>Company name: Exotic City srl</Typography>
                    <Typography>Adress:  Avenue d l'expansion, 1 - 4432 Alleur - Belgium </Typography>
                    <Typography>Tel: +32 (0)4.228.04.00</Typography>
                    <Typography>Email: info@exoticcity.be</Typography>
                    <Typography>ECB/VAT: BE 0882 540 147</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default LegalNotice