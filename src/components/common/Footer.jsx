import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  let { ptcategory, Category, subCategory, brands } = useParams();
  const [url, setUrl] = useState(`https://exoticcity-a0dfd0ddc0h2h9hb.northeurope-01.azurewebsites.net/items/getProducts/?Blocked=false&SalesBlocked=false&ParentCategory=${ptcategory}${Category ? `&ItemCategoryCode=${Category}` : ''}${subCategory ? `&ItemSubCategoryCode=${subCategory}` : ''}${brands ? `&Brand=${brands}` : ''}`)
  const openWhatsApp = () => {
    window.open('https://wa.me/324850001400', '_blank');
  };
  return (
    <div>
      <footer className="" style={{ backgroundColor: '#4A4A4A', color: '#fff' }}>
        <div className="mx-auto w-screen max-w-screen-xl">
          <div className="grid grid-cols-2 gap-10 px-4 py-10 lg:py-10 md:grid-cols-6">
            {/* SECTION 1 */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 uppercase dark:text-white" style={{ fontFamily: "Montserrat", color: '#fff' }}>{t('CONTACT US')}</h2>
              <Box sx={{ width: '20%', height: '4px', backgroundColor: 'orange', margin: '8px 0', mb: '30px' }} ></Box>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-3" style={{ fontFamily: "Montserrat", fontSize: '11px', fontWeight: 600, color: 'lightgray' }}>
                  Av. de l Expansion 1
                </li>
                <li className="" style={{ fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }}>
                  <LocationOnIcon sx={{ fontSize: '16px', cursor: 'pointer' }} /> 4432 Alleur
                </li>
                <Box sx={{ width: '80%', height: '1px', backgroundColor: 'lightgray', margin: '8px 0' }} ></Box>
                <li className="" style={{ fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={openWhatsApp}>
                  <WhatsAppIcon sx={{ fontSize: '16px', cursor: 'pointer' }} /> +324850001400
                </li>
                <Box sx={{ width: '80%', height: '1px', backgroundColor: 'lightgray', margin: '8px 0' }} ></Box>
                <li className="" style={{ fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => window.location.href = 'mailto:info@exoticcity.be'}>
                  <MailIcon sx={{ fontSize: '16px', cursor: 'pointer' }} /> info@exoticcity.be
                </li>
                <Box sx={{ width: '80%', height: '1px', backgroundColor: 'lightgray', margin: '8px 0' }} ></Box>
              </ul>
            </div>

            {/* SECTION 2 */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 uppercase dark:text-white" style={{ fontFamily: "Montserrat", color: '#fff' }}>
                {t('Navigation')}
              </h2>
              <Box sx={{ width: '20%', height: '4px', backgroundColor: 'orange', margin: '8px 0', mb: '30px' }} ></Box>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <Link to='/Legal' style={{ textDecoration: 'none' }}>
                  <li className="mb-2 hover:underline" style={{ fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }}>
                    <ArrowForwardIosIcon sx={{ fontSize: '12px' }} /> {t('Legal Notice')}
                  </li>
                </Link>
                <Link to='/Privacy' style={{ textDecoration: 'none' }}>
                  <li className="mb-2 hover:underline" style={{ fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }}>
                    <ArrowForwardIosIcon sx={{ fontSize: '12px' }} /> {t('Privacy')}
                  </li>
                </Link>
                <Link to='/Services' style={{ textDecoration: 'none' }}>
                  <li className="mb-2 hover:underline" style={{ fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }}>
                    <ArrowForwardIosIcon sx={{ fontSize: '12px' }} /> {t('Services')}
                  </li>
                </Link>
                <Link to='/Contact' style={{ textDecoration: 'none' }}>
                  <li className="mb-2 hover:underline" style={{ fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }}>
                    <ArrowForwardIosIcon sx={{ fontSize: '12px' }} /> {t('Contact Us')}
                  </li>
                </Link>
                <Link to='/Brands' style={{ textDecoration: 'none' }}>
                  <li className="mb-2 hover:underline" style={{ fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }}>
                    <ArrowForwardIosIcon sx={{ fontSize: '12px' }} /> {t('Brands')}
                  </li>
                </Link>
              </ul>
            </div>

            {/* SECTION 3 */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 uppercase dark:text-white" style={{ fontFamily: "Montserrat", color: '#fff' }}>
                {t('Food Products')}
              </h2>
              <Box sx={{ width: '20%', height: '4px', backgroundColor: 'orange', margin: '8px 0', mb: '30px' }} ></Box>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }}
                  onClick={() => {
                    navigate(`/Products/FOOD/DRINKS`);
                  }}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('DRINKS')}
                </li>
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/FOOD/RICE`);
                }}>
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('RICE')}
                </li>
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/FOOD/MILK AND CREAM`);
                }}>
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />{t('MILK AND CREAM')}
                </li>
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/FOOD/NOODLES`);
                }}>
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('NOODLES')}
                </li>
              </ul>
            </div>

            {/* SECTION 4 */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 uppercase dark:text-white" style={{ fontFamily: "Montserrat", color: '#fff' }}>
                {t('Cosmetics Products')}
              </h2>
              <Box sx={{ width: '20%', height: '4px', backgroundColor: 'orange', margin: '8px 0', mb: '30px' }} ></Box>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/COSMETICS/HAIR CARE PRODUCTS`);
                }}>
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('HAIR CARE PRODUCTS')}
                </li>
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/COSMETICS/SKIN CARE PRODUCTS`);
                }}>
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('SKIN CARE PRODUCTS')}
                </li>
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/COSMETICS/CHILD CARE`);
                }}>
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('CHILD CARE')}
                </li>
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/COSMETICS/BODY OIL`);
                }} >
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('BODY OIL')}
                </li>
              </ul>
            </div>

            {/* SECTION 5 */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 uppercase dark:text-white" style={{ fontFamily: "Montserrat", color: '#fff' }}>
                {t('Hair Products')}
              </h2>
              <Box sx={{ width: '20%', height: '4px', backgroundColor: 'orange', margin: '8px 0', mb: '30px' }} ></Box>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/COSMETICS/HAIR CARE PRODUCTS`);
                }}>
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('HAIR CARE')}
                </li>
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/COSMETICS/NON FOOD/ACCESSOIRES`);
                }}>
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('ACCESSORIES')}
                </li>
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/COSMETICS/HAIR CARE PRODUCTS/HAIR COLOUR`);
                }}>
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('MIXED HAIR')}

                </li>
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/COSMETICS/HAIR CARE PRODUCTS/HAIR RELAXERS`);
                }} >
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('HAIR RELAXERS')}
                </li>
                <li className="mb-2" style={{ cursor: 'pointer', fontFamily: "Montserrat", fontSize: '11px', color: 'lightgray' }} onClick={() => {
                  navigate(`/Products/COSMETICS/HUMAN HAIR/`);
                }} >
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  {t('NATURAL HAIR')}
                </li>
              </ul>
            </div>

            {/* SECTION 6 */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 uppercase dark:text-white" style={{ fontFamily: "Montserrat", color: '#fff' }}>
                {t('Payment Methods')}
              </h2>
              <Box sx={{ width: '20%', height: '4px', backgroundColor: 'orange', margin: '8px 0', mb: '30px' }} ></Box>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2" style={{ fontFamily: "Montserrat", textTransform: 'uppercase', fontSize: '11px', color: 'lightgray', cursor: 'pointer' }}>
                  <ArrowForwardIosIcon sx={{ fontSize: '12px', color: 'lightgray' }} />
                  Cash on Delivery
                </li>
                <li className="mb-2" style={{ fontFamily: "Montserrat", textTransform: 'uppercase', fontSize: '11px', color: 'lightgray', cursor: 'pointer' }}>
                  <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
                  Credit/Debit Card
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer