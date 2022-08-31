import axios from "axios"
import dotenv from "dotenv"

dotenv.config(".env")

const getLocation = async (ip) => {
    const key = process.env.LOCATION_API_KEY;
    const url = process.env.LOCATION_API_URL;

    try {
      const { data } = await axios.get(`${url}?ip=${ip}&auth=${key}`);
      if (!data) throw Error('Can not resolve IP');
      return {
        canAccess: ['Nigeria', 'United States'].some((c) => c === data.country),
        country: data.country,
      };
    } catch (error) {
      throw Error(error);
    }
  };

  export default getLocation