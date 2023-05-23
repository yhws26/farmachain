export interface IBscScanTransactions {
    // Que nos interesa: saber con que, desde donde y cuanto nos pagaron
    contractAddress: string;
    from: string;
    to: string;
    tokenSybol: string;
    tokenName: string;
    blockNumber: string;
    value: string;
}