import { Box, Grid, Typography } from "@mui/material"
import Services_cards from "../../views/services/services_cards"
import { useTranslation } from 'react-i18next'

const Services = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item>
        <Box sx={{ ml: '4rem', mt: '2rem' }}>
          <Typography sx={{ textAlign: 'left', fontSize: '25px', fontWeight: '600' }}>{t('SERVICES')}</Typography>
        </Box>
        <Box sx={{ width: '67%', height: '2px', backgroundColor: 'orange', margin: '8px 0', ml: '4rem', mt: '1rem' }} ></Box>
      </Grid>
      <Services_cards />
    </Grid>

  )
}

export default Services