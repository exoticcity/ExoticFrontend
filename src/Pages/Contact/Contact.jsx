import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import TermsConditions from "./TermsConditions";

const Contact = () => {
  const { t } = useTranslation();
  const [isChecked, setisChecked] = useState(false);

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_1g7imx4", "template_8uek6dd", form.current, "KgNk2-GMoPQOnxjqX")
      .then((res) => {
        toast.success("Message Sent");
        console.log(res);
        form.current.reset();
        setisChecked(false);
      },
        (error) => {
          toast.error("Server is down, please try again after a few minutes");
          console.log(error);
        });
  };

  return (
    <Grid container sx={{ width: '100%', height: '100%', alignItems: 'center' }}>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '90%' }}>
          <Typography variant="h4" sx={{ textAlign: 'left', fontWeight: '600', mb: '1rem' }}>{t('CONTACT US')}</Typography>
          <Box sx={{ width: '100%', height: '2px', backgroundColor: 'orange', mb: '1rem' }} />
          <Box>
            <img src="/assets/svg/ctcimg.svg" alt="" style={{ width: '100%' }} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '90%', padding: '30px', borderRadius: '20px' }}>
          <form ref={form} onSubmit={sendEmail}>
            <Box sx={{ mt: { xs: '1rem', sm: 0 }, display: 'flex', flexDirection: 'column' }}>
              <TextField fullWidth label="Name" size="small" type="text" name="user_name" required />
              <TextField sx={{ mt: '1rem' }} fullWidth label="Company Name" size="small" name="company_name" />
              <TextField sx={{ mt: '1rem' }} fullWidth label="Email" size="small" name="user_email" required />
              <TextField sx={{ mt: '1rem' }} fullWidth label="WhatsApp Number" size="small" name="whatsapp_number" />
              <TextField sx={{ mt: '1rem' }} fullWidth label="Address" size="small" name="address" />
              <TextField sx={{ mt: '1rem' }} fullWidth label="Message" multiline rows={4} name="message" required />
              <Box sx={{ mt: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <TermsConditions />
                <Button type="submit" size="small" variant="contained" sx={{ fontFamily: 'Montserrat', display: 'flex', justifyContent: 'space-between', px: '20px', fontSize: '13px', fontWeight: 600, backgroundColor: '#fff', color: '#000', transition: 'background-color 0.3s, color 0.3s', '&:hover': { backgroundColor: '#000', color: '#fff', }, }}>{t('Submit')}</Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Contact;
