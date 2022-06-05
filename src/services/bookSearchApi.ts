import { axios } from 'hooks/worker'
// import { IWeatherAPIRes } from 'types/weather.d'

// const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'

// https://dapi.kakao.com/v3/search/book?query=정세랑?
export const getSearchListApi = (searchString: string | undefined) =>
  axios.get('https://dapi.kakao.com/v3/search/book', {
    headers: {
      Authorization: 'KakaoAK f8f93ed01271a5bf6acd8384d46a2c09',
    },
    params: {
      query: searchString,
    },
  })
