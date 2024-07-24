import Banner from '../../views/home/Banner'
import Products from '../../views/home/Products'
import BrandCarousel from '../../views/home/BrandsCarousel'
import Promo from '../../views/home/Promo'
import Services from '../../views/home/Services'
import { Fragment } from 'react'
import '../Style.css'
const Home = () => {
    return (
        <Fragment>
            <Banner />
            <Services />
            <Products />
            <BrandCarousel />
            <Promo />
        </Fragment>
    )
}

export default Home