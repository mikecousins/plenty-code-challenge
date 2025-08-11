import { Button, Heading, Select } from '@chakra-ui/react';
import type { HomePriceInfo, HomeValueForecastInfo } from '../pages/api/data';
import { useState } from 'react';

const HomeSelection = ({
    cities,
    forecastData,
    onChange,
}: {
    cities: HomePriceInfo[];
    forecastData: HomeValueForecastInfo[];
    onChange: (selectedRegion: string) => void;
}) => {
    const [selectedCity, setSelectedCity] = useState<string>();
    return (
        <div>
            <Heading>Where do you want to buy a house?</Heading>
            <Select
                placeholder="Select option"
                value={selectedCity}
                onChange={(event) => {
                    setSelectedCity(event.target.value);
                    onChange(event.target.value);
                }}
            >
                {cities.map((city) => (
                    <option key={city.regionId} value={city.regionId}>
                        {city.regionName}
                    </option>
                ))}
                W
            </Select>
            {selectedCity}
            Median Price: $
            {cities.find((city) => city.regionId === selectedCity)?.homePrice}
            Expected 1y Price Increase:
            {
                forecastData.find(
                    (forecast) => forecast.regionId === selectedCity
                )?.oneYearForecast
            }
            %
        </div>
    );
};

export default HomeSelection;
