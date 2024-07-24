/* eslint-disable react/prop-types */
import { Box } from "@mui/material"
import Headline from "../components/common/Headline"
import Nav_Search from "../components/common/Nav_Search"
import Footer from "../components/common/Footer"

const Layout = ({ children }) => {
    return (
        <Box>
            <Headline />
            <Nav_Search />
            {children}
            <Footer />
        </Box>
    )
}

export default Layout