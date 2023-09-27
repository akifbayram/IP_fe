import axios from 'axios';

export const fetchData = async (url, setData) => {
  try {
    const res = await axios.get(url);
    setData(res.data);
  } catch (error) {
    console.error(`Error fetching data from ${url}: `, error);
    // You can set data to null or an empty array if the fetch fails
    setData(null);
  }
};