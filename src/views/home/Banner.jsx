import { Carousel, CarouselItem } from "react-bootstrap";
import { Images } from "../../Data/Project_Data";
import { Grid } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageCarousel = () => {
    return (
        <Grid container sx={{ xs: {width: '98.9vw'}, md: {width: '98.9vw'}, overflowX: "hidden" }}>
            <Grid item>
                <Carousel autoPlay animation="slide" indicators={false} navbuttonsalwaysvisible="true">
                    {Images?.map((image, index) => (
                        <CarouselItem key={index}>
                            <img src={image} alt={`Image ${index}`} className="img-responsive" style={{ width: '100%' }} />
                        </CarouselItem>
                    ))}
                </Carousel>
            </Grid>
        </Grid>
    );
};

export default ImageCarousel;
