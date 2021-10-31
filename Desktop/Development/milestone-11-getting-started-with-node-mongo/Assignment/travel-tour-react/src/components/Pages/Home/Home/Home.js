import React from 'react';
import PopularDestionations from '../PopularDestinations/PopularDestionations';
import PopularOfferings from '../PopularOfferings/PopularOfferings';
import Services from '../Services/Services';
import Banner from '../Banner/Banner';
import Support from '../Support/Support';

const Home = () => {
    return (
      <div id="#home">
        <Banner></Banner>
        <Services></Services>
        <PopularOfferings></PopularOfferings>
        <PopularDestionations id="#home"></PopularDestionations>
        <Support></Support>
      </div>
    );
};

export default Home;