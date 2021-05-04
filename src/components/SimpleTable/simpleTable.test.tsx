import React from 'react';
import {render} from '@testing-library/react'
import SimpleTable from './index';
import {getSingleCoinHistoryObj, getCryptoData} from '../../services/crypto';

test("Table render", async ()=>{
    const data = [
        {
            id: 1,
            internalName: 'BTC',
            fullName: 'Bitcoin',
            price: 50000,
            priceFriendlyName: '$50,000',
            mktCap: 100,
            mktCapFriendlyName: '100B',
            circulatingSupply: 100,
            circulatingSupplyFriendlyName: '100B',
        },
        {
            id: 2,
            internalName: 'ETH',
            fullName: 'etherum',
            price: 500,
            priceFriendlyName: '$500',
            mktCap: 100,
            mktCapFriendlyName: '100B',
            circulatingSupply: 100,
            circulatingSupplyFriendlyName: '100B',
        },
        {
            id: 3,
            internalName: 'XRP',
            fullName: 'xrp',
            price: 5000,
            priceFriendlyName: '$5,000',
            mktCap: 100,
            mktCapFriendlyName: '100B',
            circulatingSupply: 100,
            circulatingSupplyFriendlyName: '100B',
        }
    ];
    try{
        const results = await getCryptoData('BTC');
        const coinData = getSingleCoinHistoryObj(results.data.Data.Data, 'BTC');
        const size = coinData.data[0].data.length;
        expect(size===8).toBe(true);
        const {container} = render(<SimpleTable bestCoinsData={data} onClick={()=>console.log('')} priceLabel='Price' nameLabel='Name' onClickPrice={()=>console.log('')} onClickName={()=>console.log('')}/>);
        
        expect(container.querySelector('tbody > tr:nth-child(1) > td:nth-child(1) > div > div > div:nth-child(1)')?.textContent === 'Bitcoin').toBe(true);
        expect(container.querySelector('tbody > tr:nth-child(3) > td:nth-child(1) > div > div > div:nth-child(2)')?.textContent === 'XRP').toBe(true);
    }catch(err){
        expect(true).toBe(false);
        console.error(err);
    }


});
