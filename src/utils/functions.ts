import axios from 'axios'

const getLatestRate = async () => {
  const params = {
    access_key: process.env.XR_KEY, // eslint-disable-line @typescript-eslint/camelcase
  }
  return await axios.get('http://data.fixer.io/api/latest', { params }) // eslint-disable-line no-return-await
    .then((res) => ({ response: res.data }))
    .catch(() => ({ error: true }))
}

export default getLatestRate
