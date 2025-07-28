import { DataService } from '@services/DataService';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from './useDebounce';

interface ICity {
  _id: string;
  name: string;
  countryCode: string;
  country: {
    code: string;
    name: string;
  };
}

interface IGetCitiesResponse {
  cities: ICity[];
  totalCount: number;
}

export function useCities(payload: {
  countryCode?: string;
  withCountryCode?: boolean;
}): {
  cities: ICity[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  handleCitySearch: (keyword: string) => void;
  handleLoadMore: () => void;
} {
  const { countryCode, withCountryCode } = payload;

  const [cities, setCities] = useState<ICity[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);
  const { data, isLoading } = useQuery<IGetCitiesResponse>(
    [
      DataService.GET_CITIES,
      {
        size: 20,
        page,
        searchKeyword: debouncedSearchKeyword,
        countryCode
      }
    ],
    () => {
      return DataService.getCities({
        page,
        size: 20,
        searchKeyword: debouncedSearchKeyword || undefined,
        countryCode
      });
    },
    {
      enabled: withCountryCode ? Boolean(countryCode) : true
    }
  );

  useEffect(() => {
    setPage(1);
    setCities([]);
  }, [countryCode]);

  useEffect(() => {
    if (data) {
      setCities((prev) => [...prev, ...data.cities]);
      setHasMore(data.cities.length === 20);
    }
  }, [data]);

  function handleCitySearch(keyword: string) {
    let actualKeyword = keyword.trim();

    setPage(1);
    setCities([]);
    setSearchKeyword(actualKeyword);
  }

  function handleLoadMore() {
    setPage((prev) => prev + 1);
  }

  return {
    cities,
    isLoading,
    hasMore,
    page,
    handleCitySearch,
    handleLoadMore
  };
}
