import { createConnection } from 'typeorm';
import { Currency } from '../app/entities/currency.entity';

const currencies = [
  {
    name: 'BUSD Token',
    symbol: 'BUSD',
    decimals: 18,
    contract: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    url: 'https://bscscan.com/token/0xe9e7cea3dedca5984780bafc599bd69add087d56'
  },
  {
    name: 'BSC-USD',
    symbol: 'USDT',
    decimals: 18,
    contract: '0x55d398326f99059fF775485246999027B3197955',
    url: 'https://bscscan.com/token/0x55d398326f99059fF775485246999027B3197955'
  }
];

export async function main(args: any) {
  const connection = await createConnection();

  try {
    for(const data of currencies) {
      const exists = await Currency.findOne({ contract: data.contract});
      
      if (!exists) {
        const newCurrency = Currency.create(data);
        await newCurrency.save();
        console.log('Currency created', data)
      }
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }

}
