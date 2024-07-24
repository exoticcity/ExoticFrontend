import { Grid, Card, Typography, CardMedia, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import './style.css';
import { useTranslation } from 'react-i18next'


const ServicesCards = () => {
    const [animation, setAnimation] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setAnimation(true);
    }, []);

    return (
        <Grid container spacing={4} sx={{ ml: '2rem', width: '100%', mb: '20px' }}>
            {/* {Object.values(Services_Data)?.map((service, index) => ( */}
            <Grid item xs={12} sm={6} md={4}>
                <Card className={animation ? 'popUpCard' : ''} sx={{ width: '80%', height: '100%' }}>
                    <CardMedia>
                        <img src={'/assets/png/Cash-Carry.png'} alt={""} style={{ width: '100%', objectFit: 'cover' }} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Montserrat', fontSize: '14px' }}>
                            {t('Cash & Carry')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Montserrat', fontSize: '13px' }}>
                            {t('CashCarryDes')}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={animation ? 'popUpCard' : ''} sx={{ width: '80%', height: '100%' }}>
                    <CardMedia>
                        <img src={"/assets/png/Express.png"} alt={""} style={{ width: '100%', objectFit: 'cover' }} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Montserrat', fontSize: '14px' }}>
                            {t('Express')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Montserrat', fontSize: '13px'  }}>
                            {t('ExpressDes')}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={animation ? 'popUpCard' : ''} sx={{ width: '80%', height: '100%' }}>
                    <CardMedia>
                        <img src={"/assets/png/International.png"} alt={""} style={{ width: '100%', objectFit: 'cover' }} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Montserrat' , fontSize: '14px'}}>
                            {t('International')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Montserrat', fontSize: '13px'  }}>
                            {t('InternationalDes')}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={animation ? 'popUpCard' : ''} sx={{ width: '80%', height: '100%' }}>
                    <CardMedia>
                        <img src={"/assets/png/Distribution.png"} alt={""} style={{ width: '100%', objectFit: 'cover' }} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Montserrat', fontSize: '14px' }}>
                            {t('Distribution Exclusive')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Montserrat', fontSize: '13px'  }}>
                            {t('DistributionDes')}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={animation ? 'popUpCard' : ''} sx={{ width: '80%', height: '100%' }}>
                    <CardMedia>
                        <img src={"/assets/png/Logistique.png"} alt={""} style={{ width: '100%', objectFit: 'cover' }} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Montserrat', fontSize: '14px' }}>
                            {t('European Logistics Center')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Montserrat', fontSize: '13px'  }}>
                            {t('CenterDes')}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={animation ? 'popUpCard' : ''} sx={{ width: '80%', height: '100%' }}>
                    <CardMedia>
                        <img src={"/assets/png/Win-Win.png"} alt={""} style={{ width: '100%', objectFit: 'cover' }} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Montserrat', fontSize: '14px' }}>
                            {t('Relation')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Montserrat', fontSize: '13px'  }}>
                            {t('RelationDes')}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {/* ))} */}
        </Grid>
    );
};

export default ServicesCards;
