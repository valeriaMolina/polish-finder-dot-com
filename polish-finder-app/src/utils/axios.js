import axios from 'axios'

// create a single instance of axios
const axiosInstance = axios.create({
  withCredentials: true
})

export default axiosInstance
