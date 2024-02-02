import axios, { AxiosInstance } from 'axios';
import {
  AddOCOOrderResponse,
  AddOrderResponse,
  AddStopOrderResponse,
  BalanceResponse,
  DepositListResponse,
  FavoriteMarketsResponse,
  FutureMarketListResponse,
  GlobalMarketResponse,
  HistoryResponse,
  IDepthResponse,
  IMarketStatusResponse,
  INobitexResponseBase,
  IOrderBookAllResponse,
  IOrderBookResponse,
  ITradeResponse,
  LimitationResponse,
  MarketStats,
  OrderListResponse,
  TradeListResponse,
  TransactionListResponse,
  UserProfileResponse,
  WalletListResponse,
  WalletsResponse,
} from './types';
import { Symbols } from './symbols';
import { TypedEvent } from './type-event';
import { Currency } from './currency';
import { TimeFrame } from './resolutions';
export class Nobitex {
  public apiUrl = 'https://api.nobitex.ir';
  protected apiClient: AxiosInstance;
  constructor(
    protected readonly apiKey: string,
    protected readonly agentName?: string,
  ) {
    this.apiClient = axios.create({ baseURL: this.apiUrl });
  }

  async orderBook(symbol: 'all'): Promise<IOrderBookAllResponse>;
  async orderBook(symbol: Symbols): Promise<IOrderBookResponse>;
  async orderBook(
    symbol: Symbols | 'all',
  ): Promise<IOrderBookResponse | IOrderBookAllResponse> {
    const response = await this.apiClient.get<
      IOrderBookResponse | IOrderBookAllResponse
    >(`/v2/orderbook/${symbol}`, {
      headers: { 'User-Agent': `TraderBot/${this.agentName || 'Servat'}` },
    });
    return response.data;
  }

  watchOrderBook(symbol: Symbols): TypedEvent<IOrderBookResponse> {
    return this.crateWatch<IOrderBookResponse>(
      () => this.orderBook(symbol),
      1000,
    );
  }

  async depth(symbol: Symbols) {
    const response = await this.apiClient.get<IDepthResponse>(
      `/v2/depth/${symbol}`,
      { headers: { 'User-Agent': `TraderBot/${this.agentName || 'Servat'}` } },
    );
    return response.data;
  }
  watchDepth(symbol: Symbols): TypedEvent<IDepthResponse> {
    return this.crateWatch<IDepthResponse>(() => this.depth(symbol), 1000);
  }

  async trades(symbol: Symbols): Promise<ITradeResponse> {
    const response = await this.apiClient.get<ITradeResponse>(
      `/v2/trades/${symbol}`,
      { headers: { 'User-Agent': `TraderBot/${this.agentName || 'Servat'}` } },
    );
    return response.data;
  }
  watchTrades(symbol: Symbols): TypedEvent<ITradeResponse> {
    return this.crateWatch<ITradeResponse>(() => this.trades(symbol), 4000);
  }

  async marketStatus(
    srcCurrency: Currency,
    dstCurrency: Currency,
  ): Promise<INobitexResponseBase & { stats: MarketStats }> {
    const response = await this.apiClient.get<IMarketStatusResponse>(
      `/market/stats?srcCurrency=${srcCurrency}&dstCurrency=${dstCurrency}`,
      { headers: { 'User-Agent': `TraderBot/${this.agentName || 'Servat'}` } },
    );
    return {
      status: response.data.status,
      stats: response.data.stats[`${srcCurrency}-${dstCurrency}`],
    };
  }

  watchMarket(
    srcCurrency: Currency,
    dstCurrency: Currency,
  ): TypedEvent<INobitexResponseBase & { stats: MarketStats }> {
    return this.crateWatch<INobitexResponseBase & { stats: MarketStats }>(
      () => this.marketStatus(srcCurrency, dstCurrency),
      600,
    );
  }

  async ohlcv(
    symbol: Symbols,
    resolution: TimeFrame,
    from: number | Date,
    to: number | Date,
    page?: number,
  ): Promise<HistoryResponse> {
    const f = from instanceof Date ? Math.round(from.getTime() / 1000) : from;
    const t = to instanceof Date ? Math.round(to.getTime() / 1000) : to;
    const response = await this.apiClient.get<HistoryResponse>(
      `/market/udf/history?symbol=${symbol}&resolution=${this.timeFrameToNobitexResolution(resolution)}&from=${f}&to=${t}${page && page > 0 ? '&page=' + page : ''}`,
      { headers: { 'User-Agent': `TraderBot/${this.agentName || 'Servat'}` } },
    );
    return response.data;
  }

  watchOHLCV(
    symbol: Symbols,
    resolution: TimeFrame,
    from: number | Date,
    to: number | Date,
    page?: number,
  ): TypedEvent<HistoryResponse> {
    return this.crateWatch<HistoryResponse>(
      () => this.ohlcv(symbol, resolution, from, to, page),
      1000,
    );
  }

  watchTimeFrameOHLCV(
    symbol: Symbols,
    resolution: TimeFrame,
  ): TypedEvent<
    | {
        t: number;
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
      }
    | undefined
  > {
    let lastTime = 0;
    return this.crateWatch<
      | {
          t: number;
          o: number;
          h: number;
          l: number;
          c: number;
          v: number;
        }
      | undefined
    >(async () => {
      const timeFrameMs = this.timeFrameToMs(resolution);
      const from = new Date(
        this.roundTimeToNearestTimeFrame(Date.now(), timeFrameMs),
      );
      const to = new Date();

      const ohlcv = await this.ohlcv(symbol, resolution, from, to);
      if (ohlcv && ohlcv.t && lastTime !== ohlcv.t[ohlcv.t.length - 1]) {
        lastTime = ohlcv.t[ohlcv.t.length - 1];
        return {
          t: ohlcv.t[ohlcv.t.length - 1],
          o: ohlcv.o[ohlcv.o.length - 1],
          h: ohlcv.h[ohlcv.h.length - 1],
          l: ohlcv.l[ohlcv.l.length - 1],
          c: ohlcv.c[ohlcv.c.length - 1],
          v: ohlcv.v[ohlcv.v.length - 1],
        };
      }
    }, 500);
  }

  async globalMarkets(): Promise<GlobalMarketResponse> {
    const response = await this.apiClient.post<GlobalMarketResponse>(
      `/market/global-stats`,
      undefined,
      { headers: { 'User-Agent': `TraderBot/${this.agentName || 'Servat'}` } },
    );
    return response.data;
  }

  watchGlobalMarkets(): TypedEvent<GlobalMarketResponse> {
    return this.crateWatch<GlobalMarketResponse>(this.globalMarkets, 6000);
  }

  async getProfile(): Promise<UserProfileResponse> {
    const response = await this.apiClient.get<UserProfileResponse>(
      '/users/profile',
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
        },
      },
    );
    return response.data;
  }

  async createWallet(
    currency: Currency,
  ): Promise<INobitexResponseBase & { address: string }> {
    const response = await this.apiClient.post<
      INobitexResponseBase & { address: string }
    >(
      '/users/wallets/generate-address',
      { currency },
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async addBankCard(
    number: string,
    bank: string,
  ): Promise<INobitexResponseBase> {
    const response = await this.apiClient.post<INobitexResponseBase>(
      '/users/cards-add',
      { number, bank },
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async addBankAccount(
    number: string,
    shaba: string,
    bank: string,
  ): Promise<INobitexResponseBase> {
    const response = await this.apiClient.post<INobitexResponseBase>(
      '/users/accounts-add',
      { number, bank, shaba },
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async limitations(): Promise<LimitationResponse> {
    const response = await this.apiClient.get<LimitationResponse>(
      '/users/limitations',
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async walletLists(): Promise<WalletListResponse> {
    const response = await this.apiClient.get<WalletListResponse>(
      '/users/wallets/list',
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async wallets(
    currencies: Currency[],
    type: 'spot' | 'margin' = 'spot',
  ): Promise<WalletsResponse> {
    const response = await this.apiClient.get<WalletsResponse>(
      `/v2/wallets?currencies=${currencies.join(',')}&type=${type}`,
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async balance(currency: Currency): Promise<BalanceResponse> {
    const response = await this.apiClient.post<BalanceResponse>(
      `/users/wallets/balance`,
      { currency },
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async transactionList(wallet: number): Promise<TransactionListResponse> {
    const response = await this.apiClient.get<TransactionListResponse>(
      `/users/wallets/transactions/list?wallet=${wallet}`,
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async depositList(wallet: number): Promise<DepositListResponse> {
    const response = await this.apiClient.get<DepositListResponse>(
      `/users/wallets/deposits/list?wallet=${wallet}`,
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async getFavoriteMarkets(): Promise<FavoriteMarketsResponse> {
    const response = await this.apiClient.get<FavoriteMarketsResponse>(
      `/users/markets/favorite`,
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async addOrder(
    type: 'buy' | 'sell',
    srcCurrency: Currency,
    dstCurrency: Currency,
    amount: string,
    price: number,
    execution: 'limit' | 'market' = 'limit',
    clientOrderId?: string,
  ): Promise<AddOrderResponse> {
    const response = await this.apiClient.post<AddOrderResponse>(
      `/market/orders/add`,
      {
        type,
        srcCurrency,
        dstCurrency,
        amount,
        price,
        clientOrderId,
        execution,
      },
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async addStopOrder(
    type: 'buy' | 'sell',
    srcCurrency: Currency,
    dstCurrency: Currency,
    amount: string,
    stopPrice: number,
    execution: 'stop_market' | 'stop_limit',
    clientOrderId?: string,
  ): Promise<AddStopOrderResponse> {
    const response = await this.apiClient.post<AddStopOrderResponse>(
      `/market/orders/add`,
      {
        type,
        srcCurrency,
        dstCurrency,
        amount,
        stopPrice,
        clientOrderId,
        execution,
      },
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async addOCOOrder(
    type: 'buy' | 'sell',
    srcCurrency: Currency,
    dstCurrency: Currency,
    amount: string,
    price: number,
    stopPrice: number,
    stopLimitPrice: number,
    execution: 'stop_market' | 'stop_limit',
    clientOrderId?: string,
  ): Promise<AddOCOOrderResponse> {
    const response = await this.apiClient.post<AddOCOOrderResponse>(
      `/market/orders/add`,
      {
        mode: 'oco',
        type,
        srcCurrency,
        dstCurrency,
        amount,
        price,
        stopPrice,
        stopLimitPrice,
        clientOrderId,
        execution,
      },
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async getOrder(id?: number, clientOrderId?: string) {
    const response = await this.apiClient.post<FavoriteMarketsResponse>(
      `/market/orders/add`,
      { id, clientOrderId },
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async getOrders(
    status: 'open' | 'all' | 'done' | 'close',
    type?: 'buy' | 'sell',
    execution?: 'market' | 'limit' | 'stop_limit' | 'stop_market',
    tradeType?: 'spot' | 'margin',
    srcCurrency?: Currency,
    dstCurrency?: Currency,
    details: 1 | 2 = 1,
    fromId: number = 1,
  ): Promise<OrderListResponse> {
    const response = await this.apiClient.get<OrderListResponse>(
      `/market/orders/list?details=${details}&fromId=${fromId}${status ? '&status=' + status : ''}${type ? '&type=' + type : ''}${execution ? '&execution=' + execution : ''}${tradeType ? '&tradeType=' + tradeType : ''}${execution ? '&execution=' + execution : ''}${srcCurrency ? '&srcCurrency=' + srcCurrency : ''}${dstCurrency ? '&srcCurrency=' + dstCurrency : ''}`,
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async cancelOrder(
    id?: number,
    clientOrderId?: string,
  ): Promise<INobitexResponseBase & { updatedStatus?: 'Canceled' }> {
    const response = await this.apiClient.post<
      INobitexResponseBase & { updatedStatus?: 'Canceled' }
    >(
      `/market/orders/update-status`,
      {
        order: id,
        clientOrderId,
        status: 'canceled',
      },
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async cancelOrders(
    hours?: number,
    execution?: 'market' | 'limit' | 'stop_market' | 'stop_limit',
    tradeType?: 'spot' | 'margin',
    srcCurrency?: Currency,
    dstCurrency?: Currency,
  ): Promise<INobitexResponseBase> {
    const response = await this.apiClient.post<INobitexResponseBase>(
      `/market/orders/update-status`,
      {
        hours,
        execution,
        tradeType,
        srcCurrency,
        dstCurrency,
      },
      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async tradeList(
    srcCurrency?: Currency,
    dstCurrency?: Currency,
    fromId?: number,
  ): Promise<TradeListResponse> {
    const response = await this.apiClient.get<TradeListResponse>(
      `/market/trades/list?${fromId ? '&fromId=' + fromId : ''}${srcCurrency ? '&srcCurrency=' + srcCurrency : ''}${dstCurrency ? '&dstCurrency=' + dstCurrency : ''}`,

      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }

  async futureMarkets(): Promise<FutureMarketListResponse> {
    const response = await this.apiClient.get<FutureMarketListResponse>(
      `/margin/markets/list`,

      {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          'User-Agent': `TraderBot/${this.agentName || 'Servat'}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }
  protected roundTimeToNearestTimeFrame(
    timestamp: number,
    timeFrameMs: number,
  ): number {
    return timestamp - (timestamp % timeFrameMs);
  }

  private timeFrameToMs(timeFrame: TimeFrame) {
    switch (timeFrame) {
      case '1m':
        return 60000;
      case '5m':
        return 300000;
      case '15m':
        return 900000;
      case '30m':
        return 1800000;
      case '1h':
        return 3600000;
      case '3h':
        return 10800000;
      case '4h':
        return 14400000;
      case '6h':
        return 21600000;
      case '12h':
        return 43200000;
      case '1d':
        return 86400000;
      case '2d':
        return 172800000;
      case '3d':
        return 259200000;
    }
  }
  private timeFrameToNobitexResolution(timeFrame: TimeFrame) {
    switch (timeFrame) {
      case '1m':
        return '1';
      case '5m':
        return '5';
      case '15m':
        return '15';
      case '30m':
        return '30';
      case '1h':
        return 60;
      case '3h':
        return '180';
      case '4h':
        return '240';
      case '6h':
        return '360';
      case '12h':
        return '720';
      case '1d':
        return 'D';
      case '2d':
        return '2D';
      case '3d':
        return '3D';
    }
  }
  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  private crateWatch<T>(fn: () => Promise<T>, sleep: number): TypedEvent<T> {
    let running = true;
    const stop = () => {
      running = false;
    };
    const emitter = new TypedEvent<T>(stop);
    setTimeout(async () => {
      while (running) {
        const response = await fn();
        if (response) {
          emitter.emit(response);
        }
        await this.sleep(sleep);
      }
    });
    return emitter;
  }
}
