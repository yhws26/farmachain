import { Context, Get, HttpResponseOK, dependency } from '@foal/core';
import { BscScanApi } from '../services';
export class ApiController {
  // forzar a instanciar el servicio 
  @dependency
  private bscscanApi: BscScanApi;

  @Get('/')
  async index(ctx: Context) {
    const transactions = await this.bscscanApi.listTransactions();
    return new HttpResponseOK({ transactions });
  }

}
