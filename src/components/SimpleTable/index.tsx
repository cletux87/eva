import React from 'react';
import { ICoin } from '../../services/crypto';

interface ISimpleTable {
  bestCoinsData: ICoin[],
  onClick: Function,
  nameLabel: string,
  onClickName: Function,
  priceLabel: string,
  onClickPrice: Function
}

export default function SimpleTable(props: ISimpleTable): React.ReactElement {
  const { bestCoinsData, onClick, nameLabel, onClickName, priceLabel, onClickPrice } = props;
  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-hidden">
      <div className="-my-2 sm:-mx-3 lg:-mx-5">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50" style={{ position: 'sticky' }}>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                  >
                    <div data-cy='name-filter' className="absolute z-50 w-10 cursor-pointer" onClick={() => onClickName({ sortName: true })}
                      style={{ position: 'absolute', minHeight: '20px', zIndex: 999 }}
                    />
                    {nameLabel}
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Info
                    </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div data-cy='price-filter' className="absolute z-50 w-10 cursor-pointer" onClick={() => onClickPrice({ sortPrice: true })}
                      style={{ position: 'absolute', minHeight: '20px', zIndex: 999 }} />
                    {priceLabel}
                  </th>
                </tr>
              </thead>
              <tbody data-cy={bestCoinsData.length} className="bg-white divide-y divide-gray-200 cursor-pointer">
                {bestCoinsData.map((coin: any, index: number) => (
                  <tr key={coin.id} onClick={() => onClick(index)}>
                    <td data-cy={`table-row-${coin.internalName}`} className="px-2 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div data-cy='full-name' className="text-sm font-medium text-gray-900">{coin.fullName.substring(0, coin.fullName.length > 10 ? 10 :coin.fullName.length-1)}</div>
                          <div className="text-sm text-gray-500" id='coin'>{coin.internalName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{coin.mktCapFriendlyName}</div>
                      <div className="text-sm text-gray-500">{coin.circulatingSupplyFriendlyName}</div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <span data-cy='price-amount' className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {coin.priceFriendlyName}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}