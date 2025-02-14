/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useLayoutEffect } from 'react';
import { Context } from '../../App';
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";

function Filters({ url, setUrl }) {
    let { ptcategory, Category, subCategory, brands } = useParams();
    const navigate = useNavigate()
    const { parentCategory, category, subcategory, brand, selectedCategoryIndex, setSelectedCategoryIndex, brandIndex, setBrandIndex, selectedSubCategoryIndex, setSelectedSubCategoryIndex, selectedParentCategory, setSelectedParentCategory } = useContext(Context);

    useLayoutEffect(() => {
        setSelectedParentCategory(ptcategory);
        setSelectedCategoryIndex(Category)
        setSelectedSubCategoryIndex(subCategory)
        setBrandIndex(brands)
        let newUrl = url.replace(/(\?|&)ParentCategory=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
        const separator = newUrl.includes('?') ? '&' : '?';
        setUrl(newUrl + `${separator}ParentCategory=${ptcategory}`);

        if (Category) {
            let newUrl = url.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
            setUrl(newUrl + `&ItemCategoryCode=${Category}`);
        } if (subCategory) {
            let newUrl = url.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
            setUrl(newUrl + `&ItemSubCategoryCode=${subCategory}`);
        } if (brands) {
            let newUrl = url.replace(/(\?|&)Brand=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)limit=[^&]*/g, "");
            const separator = newUrl.includes('?') ? '&' : '?';
            setUrl(newUrl + `${separator}Brand=${brands}`);
        }
    }, [selectedParentCategory, ptcategory, Category, subCategory, brands])

    useEffect(() => {
        setSelectedParentCategory(ptcategory);
        setSelectedCategoryIndex(Category)
        setSelectedSubCategoryIndex(subCategory)
        setBrandIndex(brands)
        let newUrl = url.replace(/(\?|&)ParentCategory=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
        const separator = newUrl.includes('?') ? '&' : '?';
        setUrl(newUrl + `${separator}ParentCategory=${ptcategory}`);

        if (Category) {
            let newUrl = url.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
            setUrl(newUrl + `&ItemCategoryCode=${Category}`);
        } if (subCategory) {
            let newUrl = url.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
            newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
            setUrl(newUrl + `&ItemSubCategoryCode=${subCategory}`);
        } if (brands) {
            let newUrl = url.replace(/(\?|&)Brand=[^&]*/g, "");
            const separator = newUrl.includes('?') ? '&' : '?';
            setUrl(newUrl + `${separator}Brand=${brands}`);
        }
    }, [selectedParentCategory, ptcategory, Category, subCategory, brands])

    const handleParentCategoryChange = (e) => {
        const newParentCategory = e.target.value;
        setSelectedParentCategory(e.target.value);
        setSelectedCategoryIndex('');
        setSelectedSubCategoryIndex('');
        setBrandIndex('');
        let newUrl = url.replace(/(\?|&)ParentCategory=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
        const separator = newUrl.includes('?') ? '&' : '?';
        setUrl(newUrl + `${separator}ParentCategory=${newParentCategory}`);
        navigate(`/Products/${newParentCategory}/`)
    };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategoryIndex(newCategory);
        setSelectedSubCategoryIndex('');
        setBrandIndex('');
        let newUrl = url.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
        setUrl(newUrl + `&ItemCategoryCode=${newCategory}`);
        navigate(`/Products/${ptcategory}/${newCategory}`)
    };

    const handleSubCategoryChange = (e) => {
        const newSubCategory = e.target.value;
        setSelectedSubCategoryIndex(newSubCategory);
        setBrandIndex('');
        let newUrl = url.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
        setUrl(newUrl + `&ItemSubCategoryCode=${newSubCategory}`);
        navigate(`/Products/${ptcategory}/${Category}/${newSubCategory}`)
    };

    const handleBrandChange = (e) => {
        const newBrand = e.target.value;
        setBrandIndex(newBrand);
        let newUrl = url.replace(/(\?|&)Brand=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
        setUrl(newUrl + `&Brand=${newBrand}`);
        navigate(`/Products/${ptcategory}/${Category}/${subCategory}/${newBrand}`)
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' }, justifyContent: 'center', alignItems: 'center', width: '100%', my: '2rem' }}>
            {/* PARENT-CATEGORY */}
            <select style={{
                padding: '6px',
                borderRadius: '4px',
                width: '12rem',
                backgroundColor: '#5B5B5B',
                color: '#fff',
                border: 'none',
                margin: '10px',
                fontSize: '13px'
            }}
                value={selectedParentCategory} onChange={handleParentCategoryChange}>
                <option disabled>PRODUCTS</option>
                {parentCategory
                    ?.filter(item => item.Description !== "office supplies" && item.Description !== "Transport")
                    .sort((a, b) => a.Description.localeCompare(b.Description))
                    .map((item, index) => (
                        <option key={index} value={item.Description}>
                            {item.Description.toUpperCase()}
                        </option>
                    ))}
            </select>

            {/* CATEGORY */}
            <select
                style={{
                    padding: '6px',
                    borderRadius: '4px',
                    width: '12rem',
                    backgroundColor: '#5B5B5B',
                    color: '#fff',
                    border: 'none',
                    margin: '10px',
                    fontSize: '13px'
                }}
                onChange={handleCategoryChange}
                value={selectedCategoryIndex}>
                <option value="">CATEGORY</option>
                {category?.sort().map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>


            {/* SUB-CATEGORY */}
            <select
                style={{
                    padding: '6px',
                    borderRadius: '4px',
                    width: '12rem',
                    backgroundColor: '#5B5B5B',
                    color: '#fff',
                    border: 'none',
                    margin: '10px',
                    fontSize: '13px'
                }}
                onChange={handleSubCategoryChange}
                value={selectedSubCategoryIndex}
            >
                <option value="">SUB CATEGORIES</option>
                {subcategory
                    ?.sort((a, b) => a.localeCompare(b))
                    .map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
            </select>
            {/* BRANDS */}
            <select
                style={{
                    padding: '6px',
                    borderRadius: '4px',
                    width: '12rem',
                    backgroundColor: '#5B5B5B',
                    color: '#fff',
                    border: 'none',
                    margin: '10px',
                    fontSize: '13px'
                }}
                onChange={handleBrandChange}
                value={brandIndex}>
                <option value="">BRANDS</option>
                {brand
                    ?.sort((a, b) => a.localeCompare(b))
                    .map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
            </select>

        </Box >
    )
}

export default Filters
