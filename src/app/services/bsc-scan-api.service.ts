import { Env } from '@foal/core';
import * as axios from 'axios';
import { IBscScanResponse } from '../interfaces/bcsscan-reply.interfaces';
import { IBscScanTransactions } from '../interfaces/bscscan-transaction.interface';

// https://api.bscscan.com/api
// ?module=account
// &action=tokentx
// &contractaddress=0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51
// &address=0x7bb89460599dbf32ee3aa50798bbceae2a5f7f6a
// &page=1
// &offset=5
// &startblock=0
// &endblock=999999999
// &sort=asc
// &apikey=YourApiKeyToken

const apiUrl = 'https://api.bscscan.com/api';

export class BscScanApi {
    private key: string;
    private wallet: string;

    constructor(){
        this.loadSettings()
    }

    async listTransactions(initialBlock = 0) {
        const action = 'module=account&action=tokentx';
        const url = `${apiUrl}?${action}&address=${this.wallet}&startblock=${initialBlock}&endBlock=99999999&sort=desc&apikey=${this.key}`;

        // La respuesta de BSC Scan a nuestro Request
        const response = await axios.default.get(url);
        if (response.status !== 200) {
            throw new Error('Error code ${response.status} - ${response.statusText}');
        } 

        const bscScanResponse = response.data as IBscScanResponse<IBscScanTransactions[]>;

        return bscScanResponse.result;
    }

    private loadSettings() {
        const key = Env.get("BSCSCAN_KEY");
        // si no hay una key definida que marque error
        if (!key) {
            throw new Error('BSCScan Key is undefined');
        }

        this.key = key;
        // avise que si se cargo bien el apikey
        // console.log('API KEY loaded');

        const wallet = Env.get("WALLET");
        // si no hay una key definida que marque error
        if (!wallet) {
            throw new Error('Wallet is undefined');
        }

        this.wallet = wallet;
    }

}


