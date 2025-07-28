import { DataService } from '@services/DataService';
import { fuzzySearch } from '@utils/fuzzySearch';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export interface ICountry {
  code: string;
  name: string;
}

export function useCountries(): {
  countries: ICountry[];
  handleCountrySearch: (keyword: string) => void;
  getCountryByCode: (countryCode: string) => ICountry | undefined;
} {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const { data } = useQuery<ICountry[]>([DataService.GET_COUNTRIES], () => {
    return DataService.getCountries();
  });

  useEffect(() => {
    if (data) {
      setCountries(data);
    }
  }, [data]);

  function handleCountrySearch(keyword: string) {
    let actualKeyword = keyword.trim();

    if (!actualKeyword) return setCountries(data as ICountry[]);

    const searchResult = fuzzySearch<ICountry>(
      data as ICountry[],
      actualKeyword,
      {
        keys: ['name', 'code']
      }
    );

    setCountries(searchResult);
  }

  function getCountryByCode(countryCode: string) {
    return countries.find((country) => country.code === countryCode);
  }

  return { countries, handleCountrySearch, getCountryByCode };
}
