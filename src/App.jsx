/* eslint-disable react-hooks/exhaustive-deps */
import 'vite/modulepreload-polyfill'
import { Suspense, createContext, useEffect, useState } from "react";
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from "./Layout/Layout";
import { ToastContainer } from "react-toastify";
import { AllRoutes } from "./Routes/Routes";
import axios from 'axios';
import Loader from './components/Loader/Loader';
export const Context = createContext();
import './App.css';

function App() {
  //    States
  const [counts, setCounts] = useState({});
  const [otpValue, setOtpValue] = useState(0)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(parseInt(localStorage.getItem('itemsPerPage'), 10) || 10);
  const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage'), 10) || 1);
  const [nextFilterUrl, setNextFilterUrl] = useState('')
  const [nextUrl, setNextUrl] = useState('')
  const [prevFilterUrl, setPrevFilterUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [nextPriceUrl, setNextPriceUrl] = useState('')
  const [prevPriceUrl, setPrevPriceUrl] = useState('')
  const [parentCategory, setParentCategory] = useState([])
  const [category, setCategory] = useState([])
  const [subcategory, setSubCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [prices, setPrices] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  // const [priceUrl, setPriceUrl] = useState(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getSalesPrice/`)
  const [filterproducts, setFilterProducts] = useState([]);
  const [isBrand, setisBrand] = useState(false)
  const [accessTokenUrl, setAccessTokenUrl] = useState([])
  const [parentData, setParentData] = useState([])
  const [isIncrement, setIsIncrement] = useState(() => {
    const storedData = localStorage.getItem('newIncrement');
    const parsedData = storedData ? JSON.parse(storedData) : {};
    return parsedData;
  });
  const [cartData, setCartData] = useState([])

  // const [user, setUser] = useState(null)
  const [search, setSearch] = useState('');
  const [change, setChange] = useState('');
  const [customerPriceGroup, setCustomerPriceGroup] = useState("");
  const [cart, setCart] = useState([]);
  const [orderno, setorderno] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerPrice, setcustomerPrice] = useState("")
  const [inputQuantity, setInputQuantity] = useState({});
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState('Category');
  const [brandIndex, setBrandIndex] = useState('Brands');
  const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState('Sub Category');
  const [selectedParentCategory, setSelectedParentCategory] = useState("");
  const user = sessionStorage.getItem('user');

  const fetchCustomerPriceGroup = () => {
    if (user !== '') {
      axios.get(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/customers/user/${user}`)
        .then((response) => {
          setcustomerPrice(response.data.CustomerPriceGroup);
        })
        .catch((error) => {
          console.error('Error fetching customer price group:', error);
        });
    }
  };

  useEffect(() => {
    fetchCustomerPriceGroup();
  }, [user]);

  localStorage.setItem("CustomerPriceGroup", customerPrice)

  // Empty dependency array means this runs once on component mount
  useEffect(() => {
    axios.get("https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getAccessToken/")
      .then((res) => {
        setAccessTokenUrl(res.data.access_token)
      }).catch((err) => {
        console.log("err" + err);
      })
  }, [setAccessTokenUrl])

  // Parent Categories
  useEffect(() => {
    if (accessTokenUrl) {
      axios.get(`https://api.businesscentral.dynamics.com/v2.0/7c885fa6-8571-4c76-9e28-8e51744cf57a/Live/ODataV4/Company('My%20Company')/parentcategory`, {
        headers: {
          Authorization: `Bearer ${accessTokenUrl}`,
        },
      })
        .then((res) => {
          setParentCategory(res?.data?.value);
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  }, [accessTokenUrl]);

  // const filteredURL = `${url}?ParentCategory=`
  const handleParentClick = (selectedDescription) => {
    let newUrl = url.replace(/(\?|&)ParentCategory=[^&]*/g, "");
    newUrl = newUrl.replace(/(\?|&)ItemCategoryCode=[^&]*/g, "");
    newUrl = newUrl.replace(/(\?|&)ItemSubCategoryCode=[^&]*/g, "");
    newUrl = newUrl.replace(/(\?|&)Brand=[^&]*/g, "");
    newUrl = newUrl.replace(/(\?|&)search=[^&]*/g, "");
    setUrl(newUrl + `?ParentCategory=${selectedDescription}`);
  };

  const getPriceForCustomerGroup = (priceDetails) => {
    switch (customerPriceGroup) {
      case "L1":
        return priceDetails.L1;
      case "L2":
        return priceDetails.L2;
      case "L3":
        return priceDetails.L3;
      case "L4":
        return priceDetails.L4;
      case "L5":
        return priceDetails.L5;
      default:
        return priceDetails.promotion;
    }
  };

  const LazyRoutes = AllRoutes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      element={
        <Suspense fallback={<Loader />}>
          <route.component />
        </Suspense>
      }
      exact={true}
    />
  ));

  return (
    <Context.Provider value={{ otpValue, setOtpValue, counts, setCounts, data, setData, loading, setLoading, itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, nextUrl, setNextUrl, prevUrl, setPrevUrl, parentCategory, setParentCategory, category, setCategory, subcategory, setSubCategory, filterproducts, setFilterProducts, selectedCategory, setSelectedCategory, filteredCategories, setFilteredCategories, filteredSubCategories, setFilteredSubCategories, prices, setPrices, nextPriceUrl, setNextPriceUrl, prevPriceUrl, setPrevPriceUrl, nextFilterUrl, setNextFilterUrl, prevFilterUrl, setPrevFilterUrl, isBrand, setisBrand, selectedSubCategories, setSelectedSubCategories, parentData, setParentData, accessTokenUrl, isIncrement, setIsIncrement, user, handleParentClick, search, setSearch, brand, setBrand, customerPriceGroup, setCustomerPriceGroup, cart, setCart, orderno, setorderno, totalPrice, setTotalPrice, getPriceForCustomerGroup, change, setChange, selectedCategoryIndex, setSelectedCategoryIndex, brandIndex, setBrandIndex, selectedSubCategoryIndex, setSelectedSubCategoryIndex, selectedParentCategory, setSelectedParentCategory, inputQuantity, setInputQuantity, cartData, setCartData }}>
      <HashRouter>
        <Suspense fallback={<Loader />}>
          <Layout className="app">
            <ToastContainer />
            <Routes>{LazyRoutes}</Routes>
          </Layout>
        </Suspense>
      </HashRouter>
    </Context.Provider>
  );
}

export default App;
