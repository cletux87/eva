import React, {useEffect, useState} from 'react';
import {getTopCryptos, getProcessData, ICoin, getCryptoData, getSingleCoinHistoryObj} from './services/crypto';
import SimpleTable from './components/SimpleTable';
import FilterBox,{ FilterTypes, FilterSigns } from './components/FilterBox';
import SimpleChart from './components/SimpleChart';
import Lottie from 'react-lottie';
import { isNil } from './utils/obj';
import lottieCrypto from '../src/lotties/CryptoLottie/lottie';
import lottieBalance from '../src/lotties/BalanceLottie/lottie';
import lottieNiceCrypto from  '../src/lotties/NiceCrypto/lottie';

const tableHeaderNames = {
  NAME: 'Name',
  INFO: 'Info',
  PRICE: 'Price'
}

function App() {

  const [loadinTopCryptosData, setLoadingTopCryptosData] = useState<Boolean>(true);
  const [topCryptosData, setTopCryptosData] = useState<ICoin[]>([]);
  const [topCryptosDataSorted, setTopCryptosDataSorted] = useState<ICoin[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedIndex,setSelectedIndex] = useState<number>(0);
  const [inputValue,setInputValue] = useState<string>('');
  const [selectFilterValue, setSelectFilterValue] = useState<string>(FilterTypes.FILTER_BY);
  const [singleCoinHistory, setSingleCoinHistory] = useState<any>([]);
  const [isSingleHistoryReady, setSingleHistoryReady] = useState<Boolean>(false);
  const [coinName, setCoinName] = useState<string>('None');
  const [sortNameLabel, setSortNameLabel] = useState<string>(tableHeaderNames.NAME);
  const [sortNameOrder, setSortNameOrder] = useState<number>(0);
  const [sortPriceLabel, setSortPriceLabel] = useState<string>(tableHeaderNames.PRICE);
  const [sortPriceOrder, setSortPriceOrder] = useState<number>(0);
  const [selectedSign, setSelectedSign] = useState<string>(FilterSigns.NONE);
  const [numberFilter, setNumberFilter] = useState<string>('');

  /**
 * Fetch information from the API to set the selected crypto data in the state
 * @param {ICoin[]} theCoindDataArray - Data fetched in the state
 * @param {number} newIndex - Index selected from the user, using this index and the array it is going to fetch the selected data
 */
  function getSingleCryptoData( theCoinsDataArray:ICoin[], newIndex:number){
    const dataArray = isNil(theCoinsDataArray) ? topCryptosDataSorted : theCoinsDataArray.length === 0 ? topCryptosDataSorted : theCoinsDataArray; 
    if( dataArray.length > 0){
      getCryptoData(dataArray[newIndex].internalName)
        .then((response:any)=>{
          const coinData = getSingleCoinHistoryObj(response.data.Data.Data, dataArray[newIndex].internalName)
          setSingleCoinHistory(coinData);
          setCoinName(dataArray[newIndex].internalName);
          setSingleHistoryReady(true);
        })
        .catch((err:any)=>{
          console.log(err);
        });
    }
  }
 
  // Getting data for the initial state, getting top 50 cryptos
  useEffect(()=>{
    getTopCryptos(50)
      .then(response=>{
        const cryptoData = getProcessData(response); 
        setTopCryptosData(cryptoData);
        setTopCryptosDataSorted(cryptoData);
        getSingleCryptoData(cryptoData,0);
      })
      .catch(err=>{
        console.log(err);
      }).finally(()=>{
        setLoadingTopCryptosData(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  /**
 * Set sort values from the state to 0. That means no sort is applied
 */
  function resetSortTable(){
    setSortNameOrder(0);
    setSortNameLabel(tableHeaderNames.NAME);
    setSortPriceOrder(0)
    setSortPriceLabel(tableHeaderNames.PRICE);
  }

  /**
 * Handle the change values from the input text in the Filter Box
 * @param {string} value - new value typed in the input text
 */
  function onChangeSearchInput(value:string ){
    setInputValue(value);
    resetSortTable()
    handleReturnFilteredSortedDataArray({textFilter:value, dataArray:topCryptosDataSorted, changeTextFilter:true, sortName:false, sortPrice:false, priceValue:numberFilter, selectedSignProp: selectedSign, selectFilterValueProp: selectFilterValue, numberFilterProp: numberFilter});
  }

  /**
 * Handle values from the input at the filter box, for numeric data
 * @param {string} value - set value from the filter box that corresponds to the numeric data to filter by selected cryteria
 */
  function onChangeComparisonInput(value:string){
    const newValue = value.replace(/\D/g,'');
    resetSortTable()
    setNumberFilter(newValue);
    handleReturnFilteredSortedDataArray({textFilter:inputValue, dataArray:topCryptosData, changeTextFilter:true, sortName:false, sortPrice:false, priceValue:value, selectedSignProp: selectedSign, selectFilterValueProp: selectFilterValue, numberFilterProp: newValue});
  }

  /**
 * Set search cryteria for numeric data
 * @param {number} index - Selected index at th filter box for search cryteria
 * @returns {string} - it will return the FilterType data
 */
  function selectProperFilterValue(index:number){
    switch (index){
      case 1: 
        return  FilterTypes.PRICE;
      case 2: 
        return FilterTypes.MKT_CAP;
      case 3: 
        return FilterTypes.SUPPLY;
      default:
        return FilterTypes.FILTER_BY;
    };
  }

  /**
 * This will transform the index of the user to the text value in the combo box
 * @param {number} index - Clicked index by the user at the filter box to select the sign
 * @returns {string} - it will return the type of filter sign < > =
 */
  function selectSingPropertyFilter(index:number){
    switch (index){
      case 1: 
        return FilterSigns.EQUAL;
      case 2: 
        return  FilterSigns.BIGGER_THAN;
      case 3: 
        return FilterSigns.LESS_THAN;
      default:
        return FilterSigns.NONE;
    };
  }

  /**
 * Handle the change of the selected filter value. This is combo box from the search cryteria at the filter box
 * the cryteria is price, mkt cap, etc
 * @param {number} index - Index selected at the combo box for the selected cryteria
 */
  function onChangeSelectFilterValue(index:number){
    const value = selectProperFilterValue(index);
    setSelectFilterValue(value);
    handleReturnFilteredSortedDataArray({textFilter:inputValue, dataArray:topCryptosData, changeTextFilter:false, sortName:false, sortPrice:false, priceValue:numberFilter, selectedSignProp : selectedSign, selectFilterValueProp : value, numberFilterProp: numberFilter });
  }

  /**
 * Handle the change of the selected filter for the sign at the combobox in the filter box
 * Signs are > < =
 * @param {number} index - Index selected at the combobox in the filter box for sign=
 */
  function onChangeSelectSingFilterValue(index:number){
    const value = selectSingPropertyFilter(index);
    setSelectedSign(value);
    handleReturnFilteredSortedDataArray({textFilter:inputValue, dataArray:topCryptosData, changeTextFilter:false, sortName:false, sortPrice:false, priceValue:numberFilter, selectedSignProp : value, selectFilterValueProp : selectFilterValue, numberFilterProp: numberFilter });
  }

/**
 * Handle the selected index of the data in the table, this will call a fetch to pass the data to the chart
 * Signs are > < =
 * @param {number} index - Index selected data at the table
 */
  function handleIndexSelection( index:number ){
    setSelectedIndex(index);
    setSingleHistoryReady(false);
    getSingleCryptoData(topCryptosDataSorted, index);
  }

  /**
 * Sort by name the cryptos array, the name is inserted at the table
 * @param {ICoin[]} icoinArray - The arrays to be sorted
 * @returns {ICoin[]} - The array sorted by name cryteria
 */
  function sortByName(icoinArray:ICoin[] = topCryptosDataSorted):ICoin[]{
    let newSortOrder = sortNameOrder + 1;
    setSortPriceOrder(0);
    setSortPriceLabel(tableHeaderNames.PRICE);
    if( newSortOrder > 1 ){
      newSortOrder = -1;
      setSortNameOrder(newSortOrder);
      setSortNameLabel(tableHeaderNames.NAME + '↓');
    } else{
      setSortNameOrder(newSortOrder);
      setSortNameLabel(newSortOrder === 0 ? tableHeaderNames.NAME : tableHeaderNames.NAME + '↑');
    }
    return newSortOrder === 0 ? icoinArray: 
      icoinArray.sort((a,b) => newSortOrder > 0 
        ? a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase()) 
        : b.fullName.toLowerCase().localeCompare(a.fullName.toLowerCase())  
      )
  }

  /**
 * Get information regarding the top cryptos on the market
 * @param {number} cryptosLimit - How many cryptos should deliver
 * @returns {Promis} - it will return the promise of that call to the api
 */
  function filterByName(textFilter:string = inputValue, filteredDataParam:ICoin[] = topCryptosData):ICoin[]{
    let filteredData = filteredDataParam;
    if( !(isNil(textFilter) &&  textFilter === '') ){
      filteredData = topCryptosData.filter(cryptoData => cryptoData.fullName.toLowerCase().includes(textFilter.toLowerCase()));
    }
    return filteredData;
  }

  /**
 * Filter array of data by range of the number selected at thef filter, it will also handle the sign to be manage
 * @param {ICoin[]}  filteredDataParam - The array of data to filter, the default values are the state values
 * @param {string} selectedSignProp- Value of the filter selected at the filter box for the sign < > =
 * @param {string} selectFilterValueProp - Value for the vale of at the filter box, it can filter the price, the mkt cap. This is the value to fiter
 * @param {string} numberFilterProp - this is the value to filter, the numeric value that given the conditions from below it is foing to filter
 * @returns {ICoin[]} - it will return the promise of that call to the api
 */
  function filterByPrice(filteredDataParam:ICoin[] = topCryptosData, selectedSignProp:string = selectedSign, selectFilterValueProp:string = selectFilterValue, numberFilterProp = numberFilter):ICoin[]{
    let newArray = filteredDataParam;
    if( !(selectedSignProp === FilterSigns.NONE ||  selectFilterValueProp === FilterTypes.FILTER_BY || numberFilterProp.length <= 0 || !Number.isInteger(+numberFilterProp) ) ) {
      const amount = Number(numberFilterProp);
      newArray = filteredDataParam.filter((coin)=>{
        let value = 0;
        if( selectFilterValueProp === FilterTypes.MKT_CAP ){
          value = coin.mktCap;
        } else if(selectFilterValueProp === FilterTypes.SUPPLY){
          value = coin.circulatingSupply;
        } else {
          value = coin.price;
        }
        if(selectedSignProp === FilterSigns.BIGGER_THAN){
          return value > amount;
        }
        if( selectedSignProp === FilterSigns.LESS_THAN ){
          return value < amount;
        }
        return value === amount;
      });
    }
    return newArray;
  }

  /**
 * Filter cryptos array, this function wraps all filter functions
 * @param {ICoin[]} icoinArray - Data to filter, unfiltered data
 * @param {string} textFilter - Value from the filter box, to filter data, name that is similar to this value
 * @param {string} priceValue - This is the value set at the filter box, this value is numeric and are the units to filter for price, supply, et 
 * @param {string} selectedSignProp - This is the sign to filer the data, it can be > < =
 * @param {string} selectFilterValueProp - This is the value of the sign that is foing to be filter
 * @param {string} numberFilterProp - This is the numeric value that is going to be filter by the sign and the filter cryteria. it is filled at the filter box
 * @returns {ICoin[]} - Crypto array data
 */
  function handleFilter(icoinArray:ICoin[] = topCryptosDataSorted, textFilter:string = inputValue, priceValue:string=numberFilter, selectedSignProp:string = selectedSign, selectFilterValueProp:string = selectFilterValue, numberFilterProp:string = numberFilter){
    let newDataArray = icoinArray;
    newDataArray = filterByName(textFilter, newDataArray);
    newDataArray = filterByPrice(newDataArray, selectedSignProp, selectFilterValueProp, numberFilterProp);
    return newDataArray;
  }

  /**
 * IFilter interface, data type for calling the filter funtion
 */
  interface IFilter {
    textFilter:string,
    dataArray: ICoin[],
    changeTextFilter: Boolean,
    sortName: Boolean,
    sortPrice: Boolean,
    priceValue: string,
    selectedSignProp: string,
     selectFilterValueProp: string, 
     numberFilterProp : string
  }

  /**
 * Sort the arrays of data
 * @param {ICoin[]} icoinArray - The unsorted array of the ICoins
 * @returns {ICoin[]} - it will return an array of ICoins sorted
 */
  function sortByPrice(icoinArray:ICoin[] = topCryptosDataSorted):ICoin[]{
    let newSortOrder = sortPriceOrder + 1;
    setSortNameOrder(0);
    setSortNameLabel(tableHeaderNames.NAME);
    if( newSortOrder > 1 ){
      newSortOrder = -1;
      setSortPriceOrder(newSortOrder);
      setSortPriceLabel(tableHeaderNames.PRICE + '↓');
    } else{
      setSortPriceOrder(newSortOrder);
      setSortPriceLabel(newSortOrder === 0 ? tableHeaderNames.PRICE : tableHeaderNames.PRICE + '↑');
    }
    return newSortOrder === 0 ? icoinArray: 
      icoinArray.sort((a,b) => newSortOrder > 0 
        ? b.price - a.price
        : a.price - b.price  
      )
  }

  /**
 * Filter the data depending on the cryteria
 * @param {ICoin[]} icoinArray - Data to filter, unfiltered data
 * @param {string} textFilter - Value from the filter box, to filter data, name that is similar to this value
 * @param {string} priceValue - This is the value set at the filter box, this value is numeric and are the units to filter for price, supply, et 
 * @param {string} selectedSignProp - This is the sign to filer the data, it can be > < =
 * @param {string} selectFilterValueProp - This is the value of the sign that is foing to be filter
 * @param {string} numberFilterProp - This is the numeric value that is going to be filter by the sign and the filter cryteria. it is filled at the filter box
 */
  function handleReturnFilteredSortedDataArray({textFilter = inputValue, dataArray = topCryptosData, changeTextFilter=false, sortName=false, sortPrice=false, priceValue=numberFilter, selectedSignProp = selectedSign, selectFilterValueProp = selectFilterValue, numberFilterProp = numberFilter }:IFilter){
    let newArrayData = dataArray;
    newArrayData = handleFilter(newArrayData, textFilter, priceValue, selectedSignProp, selectFilterValueProp, numberFilterProp);
    if(sortName){
      newArrayData = sortByName(newArrayData);  
    }
    if(sortPrice) {
      newArrayData = sortByPrice(newArrayData);
    }
    setTopCryptosDataSorted(newArrayData);
  }

  // lotties configuration files
  const defaultOptionsCryptos = {
    loop:true,
    autoplay:true,
    animationData: lottieCrypto
  }

  const defaultOptionsBalance = {
    loop:true,
    autoplay:true,
    animationData: lottieBalance
  }

  const defaultOptionsFunny = {
    loop:true,
    autoplay:true,
    animationData: lottieNiceCrypto
  }

  return (
    <div className="flex flex-col h-screen items-center overflow-y-hidden w-screen overflow-x-hidden">
      <header className="flex flex-my-2 sm:-mx-12 lg:-mx-12 p-2 mt-5 justify-center text-white bg-gradient-to-br from-gray-600 via-teal-700 to-gray-800">
        <div className="flex flex-row justify-center">
          <div className="sm:w-5/6 lg:w-5/6 md:w-5/6 mt-5">
            <FilterBox inputValue={inputValue} inputOnChange={onChangeSearchInput} inputNumberOnChange={onChangeComparisonInput} selectValue={selectFilterValue} selectSign={selectedSign} selectOnChange={onChangeSelectFilterValue} selectOnChangeSign={onChangeSelectSingFilterValue} inputNumberFilter={numberFilter}/>
          </div>
          <div className="hidden md:block w-2/4 lg:visible sm:invisible md:visible">
            <Lottie 
                options={defaultOptionsCryptos}
                isStopped={false}
                isPaused={false}
                isClickToPauseDisabled={true}
              />
          </div>
        </div>
        
      </header>
      <main className="flex flex-col h-5/6 w-screen mt-5 bg-white">
          <section className="flex flex-row justify-center h-2/4 overflow-y-hidden mx-5  border-blue-500 b-5 min-w-full">
            <div className="w-7/8 overflow-x-hidden overflow-y-scroll -ml-10 min-w-min min-h-full" style={{minWidth:'470px'}}>
            { 
              !isNil(topCryptosDataSorted) && topCryptosDataSorted.length > 0 && !loadinTopCryptosData &&
              <SimpleTable bestCoinsData={topCryptosDataSorted} onClick={handleIndexSelection} priceLabel={sortPriceLabel} nameLabel={sortNameLabel} onClickPrice={handleReturnFilteredSortedDataArray} onClickName={handleReturnFilteredSortedDataArray}/>
            }
            {
              loadinTopCryptosData && <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64 overflow-x-hidden">Loading</div>
            }
            </div>
            <div className="flex flex-col hidden mb-10 justify-center items-center md:block md:visible md:w-2/6 ml-10 bg-white">
              <Lottie 
                  options={defaultOptionsFunny}
                  isStopped={false}
                  isPaused={false}
                  isClickToPauseDisabled={true}
                />
            </div>
          </section>
          <section className="flex h-2/4 justify-center items-center bg-white mt-5 mr-500 overflow-x-hidden mb-10 ml-5" 
            style={{maxWidth:'93%'}}>
            { 
              isSingleHistoryReady &&
              <SimpleChart data={singleCoinHistory} coinName={coinName}/>  
            }
            { 
              !isSingleHistoryReady && 
              <Lottie 
                  options={defaultOptionsBalance}
                  isStopped={false}
                  isPaused={false}
                  isClickToPauseDisabled={true}
                />
            }
          </section>
      </main>
      
    </div>
  );
}

export default App;
