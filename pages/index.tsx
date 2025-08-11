import { Button, Spinner } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { Data } from './api/data';
import MortgageCalc from '../components/MortgageCalc';
import HomeSelection from '../components/HomeSelection';

const Home: NextPage = () => {
    const [data, setData] = useState<Data | null>(null);
    const [page, setPage] = useState(0);
    const [regionId, setRegionId] = useState<string>();

    useEffect(() => {
        fetch('/api/data')
            .then((raw) => raw.json())
            .then((data) => setData(data));
    }, []);

    if (!data) {
        return <Spinner />;
    }

    if (page === 0)
        return (
            <div className={styles.container}>
                <HomeSelection
                    cities={data.homePrices}
                    forecastData={data.homeValueForecasts}
                    onChange={(selectedRegion) => setRegionId(selectedRegion)}
                />
                <Button onClick={() => setPage(1)}>Continue</Button>
            </div>
        );

    if (!regionId) {
        return <div>No ID specified</div>;
    }

    return (
        <div className={styles.container}>
            <MortgageCalc
                regionId={regionId}
                cities={data.homePrices}
                forecastData={data.homeValueForecasts}
                mortgageRates={data.mortgageRates}
            />
            <Button>Continue</Button>
        </div>
    );
};

export default Home;
