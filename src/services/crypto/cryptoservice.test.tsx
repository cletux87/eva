import React from 'react';
import {getTopCryptos, getProcessData, getSingleCoinHistoryObj, getCryptoData} from './index'

it("Api delivering values", async()=>{
    try{
        const results = await getTopCryptos(50);
        expect(results.data.Data.length===50).toBe(true)
    }catch(err){
        expect(false).toBe(true);
    }
});

// Setting 90% as the minimun threshold for object conversion from API
it("Object transformation is fine", async ()=>{
    try{
        const numberOfRecords = 50;
        const results = await getTopCryptos(50);
        const cryptoData = await getProcessData(results); 
        const totalWrongRecords = cryptoData.filter((value)=> value.id < 0 ).length;
        expect( 0.1 > (totalWrongRecords/numberOfRecords)).toBe(true)
    }catch(err){
        expect(false).toBe(true);
    }
});

it("Single Coin API delivering 7 results", async()=>{
    try{
        const response = await getCryptoData('BTC');
        const coinData = await getSingleCoinHistoryObj(response.data.Data.Data, 'BTC');
        let size = coinData.data[0].data.length;
        expect(size === 8).toBe(true);
    }catch(err){
        expect(false).toBe(true);
    }
});