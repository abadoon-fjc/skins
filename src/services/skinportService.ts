import axios from 'axios';

const API_URL = 'https://api.skinport.com/v1/items';
const APP_ID = 730;
const CURRENCY = 'USD';

export const getItemsWithMinPrices = async () => {
  const { data } = await axios.get(`${API_URL}?app_id=${APP_ID}&currency=${CURRENCY}`);
  
  const items = data.map((item: any) => ({
    name: item.name,
    tradable_min_price: item.min_price_tradable,
    non_tradable_min_price: item.min_price_not_tradable,
    image: item.image,
  }));
  
  return items;
};
