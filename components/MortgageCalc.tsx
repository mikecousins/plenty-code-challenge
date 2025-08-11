import {
    Button,
    Heading,
    Input,
    Select,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
} from '@chakra-ui/react';
import type {
    HomePriceInfo,
    HomeValueForecastInfo,
    MortgageRateInfo,
} from '../pages/api/data';
import { useState } from 'react';
import { calculateLoan } from '../lib/loan';

const MortgageCalc = ({
    regionId,
    cities,
    forecastData,
    mortgageRates,
}: {
    regionId: string;
    cities: HomePriceInfo[];
    forecastData: HomeValueForecastInfo[];
    mortgageRates: MortgageRateInfo[];
}) => {
    const [value, setValue] = useState(1);
    const [length, setLength] = useState<string>(mortgageRates[0].name);
    const [downPayment, setDownPayment] = useState(5);

    const termLength = Number(length?.split('-')[0]);
    console.log(
        length,
        mortgageRates.find((rate) => rate.name === length),
        Number(mortgageRates.find((rate) => rate.name === length)?.rate)
    );
    const mortgageRate = mortgageRates.find(
        (rate) => rate.name === length
    )?.rate;
    const numericRate = Number(
        mortgageRate?.substring(0, mortgageRate.length - 1)
    );
    const loan = calculateLoan({
        numMonths: termLength * 12,
        amount: value,
        interestRate: numericRate,
    });

    return (
        <div>
            <Heading>How will you pay for it?</Heading>
            <Input
                type="number"
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
            />
            <Select
                placeholder="Mortgage length"
                value={length}
                onChange={(event) => setLength(event.target.value)}
            >
                {mortgageRates.map((rate) => (
                    <option key={rate.name} value={rate.name}>
                        {rate.name}
                    </option>
                ))}
                W
            </Select>
            <Slider
                value={downPayment}
                onChange={(down) => setDownPayment(down)}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
            {regionId},{value},{length},{downPayment}
            Down Payment: ${(value * downPayment) / 100}
            Interest Rate:
            {loan.interestRate}%
        </div>
    );
};

export default MortgageCalc;
