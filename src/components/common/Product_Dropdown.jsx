/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext  } from "react";
import { Context } from "../../App";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Product_Dropdown = ({ product, setDrawerOpen }) => {
  // USER-CONTEXT
  const {  parentCategory,  setSelectedCategoryIndex,  setBrandIndex,  setSelectedSubCategoryIndex} = useContext(Context);

  return (
    <Box>
      {parentCategory?.filter(item => item.Description !== "office supplies" && item.Description !== "Transport").map((parentItem, parentIndex) => (
        <Box key={parentIndex} sx={{ boxSizing: 'border-box', padding: '8px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to={`/Products/${parentItem.Description}`} style={{ textDecoration: 'none', color: 'black' }}>
              <Typography sx={{ color: "#5B5B5B", fontSize: '13px', fontWeight: 600, fontFamily: 'Montserrat', transition: 'color 0.3s', '&:hover': { color: 'red', fontWeight: '600' }, }} onClick={() => {
               product(false)
               setDrawerOpen(false)
               setSelectedCategoryIndex("Category")
               setSelectedSubCategoryIndex("SubCategory")
               setBrandIndex("Brands")
              }} >
                {parentItem.Description}
              </Typography>
            </Link>
          </Box>
        </Box>
      ))
      }
    </Box >
  );
};

export default Product_Dropdown;
