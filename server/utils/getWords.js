import dotenv from "dotenv"
import axios from "axios"
dotenv.config(".env")

const getWord = async (word) => {
    const key = process.env.WORD_API_KEY;
    const url = process.env.WORD_API_URL;
    const host = process.env.WORD_API_HOST;
    axios.defaults.headers.common['X-RapidAPI-Key'] = key;
    axios.defaults.headers.common['X-RapidAPI-Host'] = host;
    try {
      const { data } = await axios.get(`${url}/${word}`);
      if (data.results && data.results.length > 0) {
        const responds = data.results.map((rs) => ({
          definition: rs.definition,
          partOfSpeech: rs.partOfSpeech,
          synonyms: rs.synonyms,
        }));
        return responds;
      }
      return null;
    } catch (error) {
      throw Error(error);
    }
  };

  export default getWord;