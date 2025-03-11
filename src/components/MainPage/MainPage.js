import React, { useState, useEffect, useContext } from 'react'
import NavBar from '../NavBar/NavBar'
import ShopPage from '../ShopPage/ShopPage'
import TransactionPage from '../TransactionPage/TransactionPage'
import StatisticsPage from '../StatisticsPage/StatisticsPage'
import OptionsPage from '../OptionsPage/OptionsPage'
import { MainContent } from './MainPage.styles'
import { fetchData } from '../../data/commandRequests'
import { KeycloakContext } from '../../auth/KeycloakProvider';

function MainPage() {
    const [currentPage, setCurrentPage] = useState(0) // 0: Shop, 1: Transaction, 2: Statistics, 3: Options
    const keycloak = useContext(KeycloakContext);

    useEffect(() => {
        if (keycloak !== undefined) {
            console.log('Keycloak:', keycloak.keycloak.token);

            fetchData('http://localhost:9090/api/commands/', {
                'Authorization': `Bearer ${keycloak.keycloak.token}`
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [keycloak])

    return (
        <div>
            <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <MainContent component="main">
                {currentPage === 0 && <ShopPage />}
                {currentPage === 1 && <TransactionPage />}
                {currentPage === 2 && <StatisticsPage />}
                {currentPage === 3 && <OptionsPage />}
            </MainContent>
        </div>
    )
}

export default MainPage
