import { Select } from 'antd';
import { Loader } from './Loader';
import { useCities } from '@hooks/useCities';
import { useEffect, useState } from 'react';
import _ from 'lodash';

export const SelectLocation = (props: {
  value?: string[] | undefined;
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  countryCode?: string;
  disableDropdown?: boolean;
  withCountryCode?: boolean;
  setSelectedLocations?: (value: any[]) => void;
  selectedLocations?: any[];
}) => {
  const {
    disableDropdown = false,
    countryCode,
    withCountryCode,
    setSelectedLocations,
    selectedLocations = []
  } = props;
  const { cities, handleCitySearch, handleLoadMore, hasMore, isLoading } =
    useCities({ countryCode, withCountryCode });

  useEffect(() => {
    const list = [...cities];
    const filtered = list.filter((item) => {
      return props.value?.includes(item._id);
    });
    setSelectedLocations &&
      //@ts-ignore
      setSelectedLocations((prev: any[]) => {
        return _.uniqBy([...prev, ...filtered], '_id');
      });

    cities.unshift(...selectedLocations);
  }, [cities, props.value]);

  return (
    <Select
      // placeholder="Type or Select location"
      className={`w-full placeholder:text-gray-500 placeholder:font-normal overflow-auto`}
      showSearch
      allowClear
      mode="multiple"
      disabled={disableDropdown}
      onSearch={handleCitySearch}
      filterOption={false}
      // onChange={(value: string[]) => props.onChange && props.onChange(value)}
      onPopupScroll={(event) => {
        const target = event.target as HTMLDivElement;
        if (
          hasMore &&
          target.scrollTop + target.offsetHeight === target.scrollHeight
        ) {
          target.scrollTo(0, target.scrollHeight);
          handleLoadMore();
        }
      }}
      dropdownRender={(menu) => {
        return (
          <div>
            {menu}
            {isLoading && <Loader />}
            {!isLoading && !hasMore && (
              <div className="text-center mt-4">End of results</div>
            )}
          </div>
        );
      }}
      {...props}
    >
      {_.uniqBy([...cities], '_id').map((city) => (
        <Select.Option key={city._id} value={city._id}>
          <div className="text-gray-900 font-medium">{city.name}</div>
          <div className="flex gap-1">
            <span className="text-gray-700 text-sm">{city.country.name}</span>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};
