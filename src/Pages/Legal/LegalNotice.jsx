import { Box, Grid, Typography } from "@mui/material"

const LegalNotice = () => {
    return (
        <Grid container>
            <Grid item>
                <Typography variant="h4" sx={{ fontWeight: '600', pl: '3rem', pt: '2rem' }}>Legal Notice</Typography>
                <Box sx={{ width: '8rem', height: '2.5px', backgroundColor: 'orange', margin: '8px 0', textAlign: 'center', marginLeft: '3rem', marginRight: 'auto' }} ></Box>
                <Box sx={{ color: 'gray', pl: '3rem', pt: '2rem', mb: '2rem' }}>
                    <Typography>Company name: Exotic City sprl</Typography>
                    <Typography>Legal form: Private limited company - SPRL</Typography>
                    <Typography>Headquarters address: Avenue de l expansion, 1 - 4432 Alleur - Belgium</Typography>
                    <Typography>Tel: +32 (0)4.228.04.00</Typography>
                    <Typography>Email: info@exoticcity.be</Typography>
                    <Typography>ECB number - VAT: BE 0882 540 147</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default LegalNotice