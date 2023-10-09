import axios from 'axios';

export const fetchData = async (url, setData) => {
  try {
    const res = await axios.get(url);
    if (typeof setData === 'function') {
      setData(res.data);
    } else {
      console.warn('setData is not a function');
    }
  } catch (error) {
    console.error(`Error fetching data from ${url}: `, error);
    if (typeof setData === 'function') {
      // You can set data to null or an empty array if the fetch fails
      setData(null);
    } else {
      console.warn('setData is not a function');
    }
  }
};
