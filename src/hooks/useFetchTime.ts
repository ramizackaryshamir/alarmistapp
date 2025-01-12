import {useState, useEffect} from 'react';

export const useFetchTime = () => {
  const [allTimes, setAllTimes] = useState({
    countryName: '',
    timeStamp: '',
  });

  useEffect(() => {
    const fetchAllTimes = async () => {
      const response = await fetch(
        'https://api.timezonedb.com/v2.1/list-time-zone?key=2H337C01C21J&format=json',
        {
          method: 'GET',
        },
      ).then(res => {
        return res.ok
          ? Promise.resolve(res)
          : Promise.reject(new Error(res.statusText));
      });

      const data = await response
        .json()
        .then(body => setAllTimes(body))
        .catch(error => console.log(error));

      return data;
    };
    fetchAllTimes();
  }, []);

  return allTimes;
};
