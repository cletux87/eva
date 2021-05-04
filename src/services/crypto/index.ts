import axios from 'axios';

/**
 * Interface for coin.
 */
export interface ICoin {
    id: number;
    internalName: string;
    fullName: string;
    price: number;
    priceFriendlyName: string,
    mktCap: number;
    mktCapFriendlyName: string;
    circulatingSupply: number;
    circulatingSupplyFriendlyName: string;
}

const instance = axios.create({
    baseURL: 'https://min-api.cryptocompare.com'
});

/**
 * Get information regarding the top cryptos on the market
 * @param {number} cryptosLimit - How many cryptos should deliver
 * @returns {Promise} - it will return the promise of that call to the api
 */
export function getTopCryptos(cryptosLimit:number){
    return instance.get(`/data/top/totalvolfull?limit=${cryptosLimit}&tsym=USD`);
}

/**
 * Get information regarding one crypto. It will have the historical data
 * @param {string} cryptosSymbol - internal name of the crypto usually BTC, ETH
 * @param {number} cryptoLimit - the amount of historical data need to be retrived (by day)
 * @returns {Promise} - it will return the promise of that call to the api
 */
export function getCryptoData(cryptoSymbol:string, cryptoLimit:number = 7){
    return instance.get(`/data/v2/histoday?fsym=${cryptoSymbol}&tsym=USD&limit=${cryptoLimit}`);
}

/**
 * Convert information from the API from getCrypto data to data that simple chart can render
 * @param {any[]} dataObj - Information from the api, this is array of data
 * @returns {any[]} - it will return the data for the SimpleChart
 */
export function getSingleCoinHistoryObj(dataObj:any, coinType:string):any{
    const value={data:[
        {
            id: `${coinType}:`,
            data: dataObj.map(
                (singleObj:any, index:number) => {
                    const xValue = new Date( singleObj.time*1000).toLocaleDateString('en-US',{ day:'numeric', month:'short'})
                    return {x:xValue, y:singleObj.close};
                }
            ),
        },
    ]};
    return value;
}

/**
 * Get information regarding the top cryptos on the market
 * @param {any} ob - This is the object retrived from the API
 * @returns {Icoin} - it will return the normalize object, an object of the ICoin type
 */
export function getCoinObj(ob:any):ICoin{
    if( ob.DISPLAY === undefined ) {
        return { 
            id: -1,
            internalName: 'Unable to fetch',
            fullName: 'Error in API',
            price: 0,
            priceFriendlyName: '0',
            mktCap: 0 ,
            mktCapFriendlyName: '0',
            circulatingSupply: 0,
            circulatingSupplyFriendlyName: '' 
        }
    }
    let tempMktCap = ob.DISPLAY.USD.MKTCAP.replace(/ /gi, '').replace(/\$/gi, '');
    const unitsIndicator = tempMktCap.charAt(tempMktCap.length - 1);
    tempMktCap = tempMktCap.slice(0,-1);
    let factor = 0;
    if( unitsIndicator === 'M' ){
        factor = 1000000; 
    } else if( unitsIndicator === 'B' ){
        factor = 1000000000;
    } else {
        factor = 1;
    }
    return { 
        id: ob.CoinInfo.Id,
        internalName: ob.CoinInfo.Internal,
        fullName: ob.CoinInfo.FullName,
        price: Number(ob.DISPLAY.USD.PRICE.replace(/ /gi, '').replace(/\$/gi, '').replace(/,/gi, '')),
        priceFriendlyName: ob.DISPLAY.USD.PRICE,
        mktCap: factor * tempMktCap.replace(/,/gi, '') ,
        mktCapFriendlyName: ob.DISPLAY.USD.MKTCAP,
        circulatingSupply: Number(ob.DISPLAY.USD.SUPPLY.replace(/\D/g,'')),
        circulatingSupplyFriendlyName: ob.DISPLAY.USD.SUPPLY
    }
}

/**
 * Transform an array of information from the API to a normalized array that we can use in our app
 * @param {any} obArray - Data from the API
 * @returns {[ICoin]]} - Normalized array of objects that we can use in our app. ICoin type array
 */
export function getProcessData(obArray:any):[ICoin]{
    return obArray.data.Data.map(
        (ob:any) => {
           return getCoinObj(ob); 
        }
    )
}