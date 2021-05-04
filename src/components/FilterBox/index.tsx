import React from "react";

export interface IFilterBox {
  selectValue: string,
  selectOnChange: Function,
  inputValue: string,
  inputOnChange: Function,
  selectOnChangeSign: Function,
  selectSign: string,
  inputNumberFilter: string,
  inputNumberOnChange: Function
}

export const FilterTypes = {
  FILTER_BY: 'Filter by...',
  MKT_CAP: 'Mkt Cap.',
  PRICE: 'Price',
  SUPPLY: 'Supply'
}

export const FilterSigns = {
  NONE: '--------------',
  BIGGER_THAN: '>',
  LESS_THAN: '<',
  EQUAL: '='
}

const FilterBox = (props:IFilterBox) => {
  const {selectValue, selectOnChange, inputValue, inputOnChange, selectOnChangeSign, selectSign, inputNumberFilter, inputNumberOnChange} = props;
  return (
    <>
      <section className="flex flex-col">
        <div className="flex flex-row justify-center space-x-11">
          <div className="leading-8 font-semibold rounded-full bg-yellow-300 text-green-800 px-5 ml-6">Cryptos</div>
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            data-cy='text-input'
            value={inputValue}
            onChange={(e)=>inputOnChange(e.target.value)}
            type="search"
            name="q"
            className="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
            placeholder="Filter..."
          />
        </div>
        </div>
        <div className="flex flex-row justify-center mt-2">
        <div className="relative inline-flex">
          <svg
            className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fill-rule="nonzero"
            />
          </svg>
          <select data-cy='filter-concept' value={selectValue} onChange={(e)=>{selectOnChange(e.target.options.selectedIndex)}} className="border text-white bg-gray-900 border-gray-600 rounded-full h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
            <option>{FilterTypes.FILTER_BY}</option>
            <option>{FilterTypes.PRICE}</option>
            <option>{FilterTypes.MKT_CAP}</option>
            <option>{FilterTypes.SUPPLY}</option>
          </select>
        </div>
        <div className="relative inline-flex">
          <svg
            className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fill-rule="nonzero"
            />
          </svg>
          <select data-cy='filter-sign' value={selectSign} onChange={(e)=>selectOnChangeSign(e.target.options.selectedIndex)} className="border text-white bg-gray-900 border-gray-600 rounded-full h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
            <option>{FilterSigns.NONE}</option>
            <option>{FilterSigns.EQUAL}</option>
            <option>{FilterSigns.BIGGER_THAN}</option>
            <option>{FilterSigns.LESS_THAN}</option>
          </select>
        </div>
        <div>
        </div>
        <input
            data-cy='filter-qty'
            value={inputNumberFilter}
            onChange={(e)=>inputNumberOnChange(e.target.value)}
            type="search"
            name="q"
            className="py-2 ml-1 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
            placeholder="value..."
            style={{maxWidth:'100px'}}
          />
        </div>
      </section>
    </>
  );
};

export default FilterBox;
