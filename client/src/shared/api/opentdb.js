import axios from 'axios';

export default axios.create({
  baseURL: 'https://opentdb.com/api.php',
});
