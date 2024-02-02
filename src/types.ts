import { Currency } from './currency';
import { Symbols } from './symbols';

export interface INobitexResponseBase {
  status: string;
}

export interface IOrderBookResponse extends INobitexResponseBase {
  lastUpdate: string;
  bids: Array<string[]>;
  asks: Array<string[]>;
}

export type IOrderBookAllResponse = INobitexResponseBase & {
  [key in Symbols]: {
    lastUpdate: string;
    bids: Array<string[]>;
    asks: Array<string[]>;
  };
};

export interface IDepthResponse extends INobitexResponseBase {
  lastUpdate: string;
  bids: Array<[string, string]>;
  asks: Array<[string, string]>;
  lastTradePrice: string;
}

export interface ITradeResponse extends INobitexResponseBase {
  trades: Array<{
    time: number;
    price: string;
    volume: string;
    type: 'sell' | 'buy';
  }>;
}

export type MarketStats =
  | {
      isClosed: true;
      isClosedReason: string;
    }
  | {
      isClosed: false;
      bestSell: string;
      bestBuy: string;
      volumeSrc: string;
      volumeDst: string;
      latest: string;
      mark: string;
      dayLow: string;
      dayHigh: string;
      dayOpen: string;
      dayClose: string;
      dayChange: string;
    };
export interface IMarketStatusResponse extends INobitexResponseBase {
  stats: { [key: string]: MarketStats };
}

export interface HistoryResponse {
  s: string;
  t: Array<number>;
  o: Array<number>;
  h: Array<number>;
  l: Array<number>;
  c: Array<number>;
  v: Array<number>;
}

export interface GlobalMarketResponse extends INobitexResponseBase {
  markets: Markets;
  btc: AddressTag;
  eth: Eth;
  ltc: Ltc;
  usdt: Usdt;
  xrp: Xrp;
  bch: Bch;
  bnb: Bnb;
  eos: Eos;
  xlm: Xlm;
  etc: Etc;
  trx: Trx;
  pmn: Pmn;
  doge: Doge;
  uni: Uni;
  dai: Dai;
  link: Link;
  dot: Dot;
  aave: Aave;
  ada: Ada;
  shib: Shib;
  ftm: Ftm;
  matic: Matic;
  axs: Axs;
  mana: Mana;
  sand: Sand;
  avax: Avax;
  mkr: Mkr;
  gmt: Gmt;
  usdc: Usdc;
  sol: Sol;
  atom: Atom;
  bat: Bat;
  grt: Grt;
  near: Near;
  ape: Ape;
  chz: Chz;
  qnt: Qnt;
  xmr: Xmr;
  gala: Gala;
  busd: Busd;
  algo: Algo;
  pgala: Pgala;
  egala: Egala;
  hbar: Hbar;
  yfi: Yfi;
  snx: Snx;
  enj: Enj;
  crv: Crv;
  flow: Flow;
  wbtc: Wbtc;
  ldo: Ldo;
  fil: Fil;
  dydx: Dydx;
  apt: Apt;
  mask: Mask;
  flr: Flr;
  lrc: Lrc;
  comp: Comp;
  bal: Bal;
  ens: Ens;
  sushi: Sushi;
  lpt: Lpt;
  glm: Glm;
  api3: Api3;
  one: One;
  dao: Dao;
  cvc: Cvc;
  nmr: Nmr;
  storj: Storj;
  snt: Snt;
  slp: Slp;
  ant: Ant;
  zrx: Zrx;
  imx: Imx;
  egld: Egld;
  blur: Blur;
  t: T;
  celr: Celr;
  arb: Arb;
  '1inch': N1inch;
  '100k_floki': N100kFloki;
  '1b_babydoge': N1bBabydoge;
  '1m_nft': N1mNft;
  '1m_btt': N1mBtt;
  magic: Magic;
  gmx: Gmx;
  ton: Ton;
  band: Band;
  cvx: Cvx;
  mdt: Mdt;
  ssv: Ssv;
  wld: Wld;
  omg: Omg;
  rdnt: Rdnt;
  jst: Jst;
  rndr: Rndr;
  bico: Bico;
  woo: Woo;
  skl: Skl;
  gal: Gal;
  fet: Fet;
  agix: Agix;
  ilv: Ilv;
  xtz: Xtz;
}

export interface Markets {
  binance: Binance;
}

export interface Binance {
  mkr: number;
  srm: number;
  c98: number;
  sfp: number;
  '1000xec': number;
  xem: number;
  zen: number;
  eth: number;
  mtl: number;
  bat: number;
  ldo: number;
  enj: number;
  rsr: number;
  omg: number;
  ata: number;
  iost: number;
  stg: number;
  doge: number;
  algo: number;
  ankr: number;
  chz: number;
  zrx: number;
  avax: number;
  sc: number;
  tomo: number;
  ar: number;
  celo: number;
  sxp: number;
  ocean: number;
  dot: number;
  unfi: number;
  alpha: number;
  spell: number;
  one: number;
  bts: number;
  egld: number;
  inj: number;
  dusk: number;
  ren: number;
  kava: number;
  neo: number;
  bch: number;
  cvc: number;
  sushi: number;
  lpt: number;
  sol: number;
  woo: number;
  nkn: number;
  fil: number;
  aave: number;
  hot: number;
  football: number;
  gtc: number;
  qnt: number;
  ape: number;
  vet: number;
  ant: number;
  bel: number;
  snx: number;
  bake: number;
  stmx: number;
  luna2: number;
  reef: number;
  ogn: number;
  gal: number;
  rlc: number;
  xtz: number;
  eos: number;
  cvx: number;
  coti: number;
  storj: number;
  hnt: number;
  imx: number;
  op: number;
  arpa: number;
  dash: number;
  mana: number;
  celr: number;
  grt: number;
  '1inch': number;
  bluebird: number;
  rose: number;
  defi: number;
  ksm: number;
  lina: number;
  atom: number;
  chr: number;
  iotx: number;
  xmr: number;
  ftm: number;
  iota: number;
  btcdom: number;
  ctk: number;
  uni: number;
  trx: number;
  ont: number;
  crv: number;
  knc: number;
  rvn: number;
  theta: number;
  icx: number;
  skl: number;
  api3: number;
  klay: number;
  waves: number;
  tlm: number;
  ada: number;
  alice: number;
  '1000lunc': number;
  flow: number;
  mask: number;
  lrc: number;
  near: number;
  dar: number;
  audio: number;
  people: number;
  ctsi: number;
  matic: number;
  bal: number;
  zil: number;
  ens: number;
  dgb: number;
  xlm: number;
  jasmy: number;
  dent: number;
  qtum: number;
  ftt: number;
  ltc: number;
  flm: number;
  rune: number;
  zec: number;
  shib: number;
  axs: number;
  band: number;
  gmt: number;
  etc: number;
  trb: number;
  icp: number;
  comp: number;
  link: number;
  hbar: number;
  xrp: number;
  bnx: number;
  ray: number;
  dydx: number;
  yfi: number;
  btc: number;
  apt: number;
  lit: number;
  sand: number;
  blz: number;
  bnb: number;
  usdt: number;
  usdc: number;
  busd: number;
  dai: number;
  wbtc: number;
  egala: number;
  inch: number;
  fet: number;
  fxs: number;
  hook: number;
  magic: number;
  babydoge: number;
  t: number;
  rndr: number;
  mina: number;
  high: number;
  dao: number;
  glm: number;
  astr: number;
  agix: number;
  phb: number;
  gmx: number;
  cfx: number;
  ach: number;
  ssv: number;
  cocos: number;
  stx: number;
  nmr: number;
  ckb: number;
  snt: number;
  perp: number;
  ilv: number;
  slp: number;
  tru: number;
  lqty: number;
  '1b_babydoge': number;
  blur: number;
  '100k_floki': number;
  id: number;
  arb: number;
  joe: number;
  amb: number;
  lever: number;
  rdnt: number;
  hft: number;
  xvs: number;
  edu: number;
  idex: number;
  sui: number;
  '1000pepe': number;
  '1000floki': number;
  '1m_btt': number;
  '1m_nft': number;
  rad: number;
  uma: number;
  key: number;
  combo: number;
  ton: number;
  mav: number;
  mdt: number;
  xvg: number;
  wld: number;
  pendle: number;
  arkm: number;
  agld: number;
  ygg: number;
  dodox: number;
  bnt: number;
  oxt: number;
  sei: number;
  cyber: number;
  jst: number;
  flr: number;
  hifi: number;
  ark: number;
  front: number;
  glmr: number;
  bico: number;
  strax: number;
  loom: number;
  bigtime: number;
  bond: number;
  orbs: number;
  stpt: number;
  waxp: number;
  bsv: number;
  rif: number;
  polyx: number;
  gas: number;
  powr: number;
  tia: number;
  cake: number;
  meme: number;
  twt: number;
  token: number;
  ordi: number;
  steem: number;
  badger: number;
  ntrn: number;
  mbl: number;
  kas: number;
  beamx: number;
  '1000bonk': number;
  pyth: number;
  super: number;
  ustc: number;
  ong: number;
  ethw: number;
  jto: number;
  '1000sats': number;
  auction: number;
  '1000rats': number;
  ace: number;
  movr: number;
  nfp: number;
  ai: number;
  xai: number;
  manta: number;
  wif: number;
  ondo: number;
  alt: number;
  lsk: number;
  jup: number;
}

export interface AddressTag {
  kraken: Kraken;
}

export interface Kraken {
  price: string;
}

export interface Eth {
  kraken: Kraken2;
}

export interface Kraken2 {
  price: string;
}

export interface Ltc {
  kraken: Kraken3;
}

export interface Kraken3 {
  price: string;
}

export interface Usdt {
  kraken: Kraken4;
}

export interface Kraken4 {
  price: string;
}

export interface Xrp {
  kraken: Kraken5;
}

export interface Kraken5 {
  price: string;
}

export interface Bch {
  kraken: Kraken6;
}

export interface Kraken6 {
  price: string;
}

export interface Bnb {
  kraken: Kraken7;
}

export interface Kraken7 {
  price: string;
}

export interface Eos {
  kraken: Kraken8;
}

export interface Kraken8 {
  price: string;
}

export interface Xlm {
  kraken: Kraken9;
}

export interface Kraken9 {
  price: string;
}

export interface Etc {
  kraken: Kraken10;
}

export interface Kraken10 {
  price: string;
}

export interface Trx {
  kraken: Kraken11;
}

export interface Kraken11 {
  price: string;
}

export interface Pmn {
  kraken: Kraken12;
}

export interface Kraken12 {
  price: string;
}

export interface Doge {
  kraken: Kraken13;
}

export interface Kraken13 {
  price: string;
}

export interface Uni {
  kraken: Kraken14;
}

export interface Kraken14 {
  price: string;
}

export interface Dai {
  kraken: Kraken15;
}

export interface Kraken15 {
  price: string;
}

export interface Link {
  kraken: Kraken16;
}

export interface Kraken16 {
  price: string;
}

export interface Dot {
  kraken: Kraken17;
}

export interface Kraken17 {
  price: string;
}

export interface Aave {
  kraken: Kraken18;
}

export interface Kraken18 {
  price: string;
}

export interface Ada {
  kraken: Kraken19;
}

export interface Kraken19 {
  price: string;
}

export interface Shib {
  kraken: Kraken20;
}

export interface Kraken20 {
  price: string;
}

export interface Ftm {
  kraken: Kraken21;
}

export interface Kraken21 {
  price: string;
}

export interface Matic {
  kraken: Kraken22;
}

export interface Kraken22 {
  price: string;
}

export interface Axs {
  kraken: Kraken23;
}

export interface Kraken23 {
  price: string;
}

export interface Mana {
  kraken: Kraken24;
}

export interface Kraken24 {
  price: string;
}

export interface Sand {
  kraken: Kraken25;
}

export interface Kraken25 {
  price: string;
}

export interface Avax {
  kraken: Kraken26;
}

export interface Kraken26 {
  price: string;
}

export interface Mkr {
  kraken: Kraken27;
}

export interface Kraken27 {
  price: string;
}

export interface Gmt {
  kraken: Kraken28;
}

export interface Kraken28 {
  price: string;
}

export interface Usdc {
  kraken: Kraken29;
}

export interface Kraken29 {
  price: string;
}

export interface Sol {
  kraken: Kraken30;
}

export interface Kraken30 {
  price: string;
}

export interface Atom {
  kraken: Kraken31;
}

export interface Kraken31 {
  price: string;
}

export interface Bat {
  kraken: Kraken32;
}

export interface Kraken32 {
  price: string;
}

export interface Grt {
  kraken: Kraken33;
}

export interface Kraken33 {
  price: string;
}

export interface Near {
  kraken: Kraken34;
}

export interface Kraken34 {
  price: string;
}

export interface Ape {
  kraken: Kraken35;
}

export interface Kraken35 {
  price: string;
}

export interface Chz {
  kraken: Kraken36;
}

export interface Kraken36 {
  price: string;
}

export interface Qnt {
  kraken: Kraken37;
}

export interface Kraken37 {
  price: string;
}

export interface Xmr {
  kraken: Kraken38;
}

export interface Kraken38 {
  price: string;
}

export interface Gala {
  kraken: Kraken39;
}

export interface Kraken39 {
  price: string;
}

export interface Busd {
  kraken: Kraken40;
}

export interface Kraken40 {
  price: string;
}

export interface Algo {
  kraken: Kraken41;
}

export interface Kraken41 {
  price: string;
}

export interface Pgala {
  kraken: Kraken42;
}

export interface Kraken42 {
  price?: string;
}

export interface Egala {
  kraken: Kraken43;
}

export interface Kraken43 {
  price: string;
}

export interface Hbar {
  kraken: Kraken44;
}

export interface Kraken44 {
  price: string;
}

export interface Yfi {
  kraken: Kraken45;
}

export interface Kraken45 {
  price: string;
}

export interface Snx {
  kraken: Kraken46;
}

export interface Kraken46 {
  price: string;
}

export interface Enj {
  kraken: Kraken47;
}

export interface Kraken47 {
  price: string;
}

export interface Crv {
  kraken: Kraken48;
}

export interface Kraken48 {
  price: string;
}

export interface Flow {
  kraken: Kraken49;
}

export interface Kraken49 {
  price: string;
}

export interface Wbtc {
  kraken: Kraken50;
}

export interface Kraken50 {
  price: string;
}

export interface Ldo {
  kraken: Kraken51;
}

export interface Kraken51 {
  price: string;
}

export interface Fil {
  kraken: Kraken52;
}

export interface Kraken52 {
  price: string;
}

export interface Dydx {
  kraken: Kraken53;
}

export interface Kraken53 {
  price: string;
}

export interface Apt {
  kraken: Kraken54;
}

export interface Kraken54 {
  price: string;
}

export interface Mask {
  kraken: Kraken55;
}

export interface Kraken55 {
  price: string;
}

export interface Flr {
  kraken: Kraken56;
}

export interface Kraken56 {
  price: string;
}

export interface Lrc {
  kraken: Kraken57;
}

export interface Kraken57 {
  price: string;
}

export interface Comp {
  kraken: Kraken58;
}

export interface Kraken58 {
  price: string;
}

export interface Bal {
  kraken: Kraken59;
}

export interface Kraken59 {
  price: string;
}

export interface Ens {
  kraken: Kraken60;
}

export interface Kraken60 {
  price: string;
}

export interface Sushi {
  kraken: Kraken61;
}

export interface Kraken61 {
  price: string;
}

export interface Lpt {
  kraken: Kraken62;
}

export interface Kraken62 {
  price: string;
}

export interface Glm {
  kraken: Kraken63;
}

export interface Kraken63 {
  price: string;
}

export interface Api3 {
  kraken: Kraken64;
}

export interface Kraken64 {
  price: string;
}

export interface One {
  kraken: Kraken65;
}

export interface Kraken65 {
  price: string;
}

export interface Dao {
  kraken: Kraken66;
}

export interface Kraken66 {
  price: string;
}

export interface Cvc {
  kraken: Kraken67;
}

export interface Kraken67 {
  price: string;
}

export interface Nmr {
  kraken: Kraken68;
}

export interface Kraken68 {
  price: string;
}

export interface Storj {
  kraken: Kraken69;
}

export interface Kraken69 {
  price: string;
}

export interface Snt {
  kraken: Kraken70;
}

export interface Kraken70 {
  price: string;
}

export interface Slp {
  kraken: Kraken71;
}

export interface Kraken71 {
  price: string;
}

export interface Ant {
  kraken: Kraken72;
}

export interface Kraken72 {
  price: string;
}

export interface Zrx {
  kraken: Kraken73;
}

export interface Kraken73 {
  price: string;
}

export interface Imx {
  kraken: Kraken74;
}

export interface Kraken74 {
  price: string;
}

export interface Egld {
  kraken: Kraken75;
}

export interface Kraken75 {
  price: string;
}

export interface Blur {
  kraken: Kraken76;
}

export interface Kraken76 {
  price: string;
}

export interface T {
  kraken: Kraken77;
}

export interface Kraken77 {
  price: string;
}

export interface Celr {
  kraken: Kraken78;
}

export interface Kraken78 {
  price: string;
}

export interface Arb {
  kraken: Kraken79;
}

export interface Kraken79 {
  price: string;
}

export interface N1inch {
  kraken: Kraken80;
}

export interface Kraken80 {
  price: string;
}

export interface N100kFloki {
  kraken: Kraken81;
}

export interface Kraken81 {
  price: string;
}

export interface N1bBabydoge {
  kraken: Kraken82;
}

export interface Kraken82 {
  price: string;
}

export interface N1mNft {
  kraken: Kraken83;
}

export interface Kraken83 {
  price: string;
}

export interface N1mBtt {
  kraken: Kraken84;
}

export interface Kraken84 {
  price: string;
}

export interface Magic {
  kraken: Kraken85;
}

export interface Kraken85 {
  price: string;
}

export interface Gmx {
  kraken: Kraken86;
}

export interface Kraken86 {
  price: string;
}

export interface Ton {
  kraken: Kraken87;
}

export interface Kraken87 {
  price: string;
}

export interface Band {
  kraken: Kraken88;
}

export interface Kraken88 {
  price: string;
}

export interface Cvx {
  kraken: Kraken89;
}

export interface Kraken89 {
  price: string;
}

export interface Mdt {
  kraken: Kraken90;
}

export interface Kraken90 {
  price: string;
}

export interface Ssv {
  kraken: Kraken91;
}

export interface Kraken91 {
  price: string;
}

export interface Wld {
  kraken: Kraken92;
}

export interface Kraken92 {
  price: string;
}

export interface Omg {
  kraken: Kraken93;
}

export interface Kraken93 {
  price: string;
}

export interface Rdnt {
  kraken: Kraken94;
}

export interface Kraken94 {
  price: string;
}

export interface Jst {
  kraken: Kraken95;
}

export interface Kraken95 {
  price: string;
}

export interface Rndr {
  kraken: Kraken96;
}

export interface Kraken96 {
  price: string;
}

export interface Bico {
  kraken: Kraken97;
}

export interface Kraken97 {
  price: string;
}

export interface Woo {
  kraken: Kraken98;
}

export interface Kraken98 {
  price: string;
}

export interface Skl {
  kraken: Kraken99;
}

export interface Kraken99 {
  price: string;
}

export interface Gal {
  kraken: Kraken100;
}

export interface Kraken100 {
  price: string;
}

export interface Fet {
  kraken: Kraken101;
}

export interface Kraken101 {
  price: string;
}

export interface Agix {
  kraken: Kraken102;
}

export interface Kraken102 {
  price: string;
}

export interface Ilv {
  kraken: Kraken103;
}

export interface Kraken103 {
  price: string;
}

export interface Xtz {
  kraken: Kraken104;
}

export interface Kraken104 {
  price: string;
}

export interface UserProfileResponse extends INobitexResponseBase {
  profile: Profile;
  tradeStats: TradeStats;
}

export interface Profile {
  firstName: string;
  lastName: string;
  nationalCode: string;
  email: string;
  username: string;
  phone: string;
  mobile: string;
  city: string;
  bankCards: BankCard[];
  bankAccounts: BankAccount[];
  verifications: Verifications;
  pendingVerifications: PendingVerifications;
  options: Options;
  withdrawEligible: boolean;
}

export interface BankCard {
  number: string;
  bank: string;
  owner: string;
  confirmed: boolean;
  status: string;
}

export interface BankAccount {
  id: number;
  number: string;
  shaba: string;
  bank: string;
  owner: string;
  confirmed: boolean;
  status: string;
}

export interface Verifications {
  email: boolean;
  phone: boolean;
  mobile: boolean;
  identity: boolean;
  selfie: boolean;
  bankAccount: boolean;
  bankCard: boolean;
  address: boolean;
  city: boolean;
  nationalSerialNumber: boolean;
}

export interface PendingVerifications {
  email: boolean;
  phone: boolean;
  mobile: boolean;
  identity: boolean;
  selfie: boolean;
  bankAccount: boolean;
  bankCard: boolean;
}

export interface Options {
  fee: string;
  feeUsdt: string;
  isManualFee: boolean;
  tfa: boolean;
  socialLoginEnabled: boolean;
}

export interface TradeStats {
  monthTradesTotal: string;
  monthTradesCount: number;
}

export interface LimitationResponse extends INobitexResponseBase {
  limitations: Limitations;
}

export interface Limitations {
  userLevel: string;
  features: Features;
  limits: Limits;
}

export interface Features {
  crypto_trade: boolean;
  rial_trade: boolean;
  coin_deposit: boolean;
  rial_deposit: boolean;
  coin_withdrawal: boolean;
  rial_withdrawal: boolean;
}

export interface Limits {
  withdrawRialDaily: WithdrawRialDaily;
  withdrawCoinDaily: WithdrawCoinDaily;
  withdrawTotalDaily: WithdrawTotalDaily;
  withdrawTotalMonthly: WithdrawTotalMonthly;
}

export interface WithdrawRialDaily {
  used: string;
  limit: string;
}

export interface WithdrawCoinDaily {
  used: string;
  limit: string;
}

export interface WithdrawTotalDaily {
  used: string;
  limit: string;
}

export interface WithdrawTotalMonthly {
  used: string;
  limit: string;
}

export interface WalletListResponse extends INobitexResponseBase {
  wallets: Wallet[];
}

export interface Wallet {
  depositAddress?: string;
  depositTag?: string;
  depositInfo: DepositInfo;
  id: number;
  currency: string;
  balance: string;
  blockedBalance: string;
  activeBalance: string;
  rialBalance: number;
  rialBalanceSell: number;
}

export interface DepositInfo {
  FIAT_MONEY?: AddressTag;
  'BTC-LEGACY'?: AddressTag;
  BTC?: AddressTag;
  BTCLN?: AddressTag;
  BSC?: AddressTag;
}

export interface AddressTag {
  address?: string;
  tag?: string;
}

export type WalletsResponse = INobitexResponseBase & {
  [key: string]: {
    id: number;
    balance: string;
    blocked: string;
  };
};

export interface BalanceResponse extends INobitexResponseBase {
  balance: string;
}

export interface TransactionListResponse extends INobitexResponseBase {
  transactions: Array<{
    currency: Currency;
    created_at: string;
    calculatedFee: string;
    id: number;
    amount: string;
    description: string;
  }>;
}

export interface DepositListResponse extends INobitexResponseBase {
  deposits: Array<{
    txHash: string;
    address: string;
    confirmed: boolean;
    transaction: {
      id: number;
      amount: string;
      currency: string;
      description: string;
      created_at: string;
      calculatedFee: string;
    };
    currency: string;
    blockchainUrl: string;
    confirmations: number;
    requiredConfirmations: number;
    amount: string;
  }>;
}

export interface FavoriteMarketsResponse extends INobitexResponseBase {
  favoriteMarkets: Array<string>;
}

export interface AddOrderResponse extends INobitexResponseBase {
  order: {
    type: 'sell' | 'buy';
    srcCurrency: string;
    dstCurrency: string;
    execution: 'market' | 'limit';
    price: string;
    amount: string;
    totalPrice: string;
    matchedAmount: number;
    unmatchedAmount: string;
    id: number;
    status: 'Active' | 'Done' | 'Inactive' | 'Canceled';
    partial: boolean;
    fee: number;
    created_at: string;
    clientOrderId?: string;
  };
}

export interface AddStopOrderResponse extends INobitexResponseBase {
  order: {
    id: string;
    type: 'sell' | 'buy';
    execution: 'StopMarket' | 'StopLimit';
    market: string;
    srcCurrency: string;
    dstCurrency: string;
    price: string;
    amount: string;
    param1: string;
    totalPrice: string;
    totalOrderPrice: string;
    matchedAmount: string;
    unmatchedAmount: string;
    status: 'Active' | 'Done' | 'Inactive' | 'Canceled';
    partial: boolean;
    fee: number;
    created_at: string;
    averagePrice: string;
    clientOrderId: string;
  };
}

export interface AddOCOOrderResponse extends INobitexResponseBase {
  orders: [
    {
      id: number;
      type: 'buy' | 'sell';
      execution: 'Limit';
      market: string;
      srcCurrency: string;
      dstCurrency: string;
      price: string;
      amount: string;
      totalPrice: string;
      totalOrderPrice: string;
      matchedAmount: string;
      unmatchedAmount: string;
      status: 'Active' | 'Done' | 'Inactive' | 'Canceled';
      created_at: string;
      pairId: number;
      clientOrderId?: string;
    },
    {
      id: number;
      type: string;
      execution: 'StopLimit';
      market: string;
      srcCurrency: string;
      dstCurrency: string;
      price: string;
      amount: string;
      param1: string;
      totalPrice: string;
      totalOrderPrice: string;
      matchedAmount: string;
      unmatchedAmount: string;
      status: 'Active' | 'Done' | 'Inactive' | 'Canceled';
      created_at: string;
      pairId: number;
      clientOrderId?: string;
    },
  ];
}

export interface OrderResponse extends INobitexResponseBase {
  order: {
    unmatchedAmount: string;
    fee: string;
    matchedAmount: string;
    partial: boolean;
    price: string;
    created_at: string;
    id: number;
    srcCurrency: string;
    totalPrice: string;
    type: 'sell' | 'buy';
    dstCurrency: string;
    isMyOrder: boolean;
    status: 'Active' | 'Done' | 'Inactive' | 'Canceled';
    amount: string;
    clientOrderId?: string;
  };
}

export interface OrderListResponse extends INobitexResponseBase {
  orders: Array<{
    id: number;
    type: 'sell' | 'buy';
    execution: string;
    status: 'New' | 'Active' | 'Done' | 'Inactive' | 'Canceled';
    srcCurrency: string;
    dstCurrency: string;
    price: string;
    amount: string;
    matchedAmount: string;
    averagePrice: string;
    fee: string;
    clientOrderId?: string;
    created_at?: string;
    param1?: string;
  }>;
}

export interface TradeListResponse extends INobitexResponseBase {
  trades: Array<{
    id: number;
    orderId: number;
    srcCurrency: string;
    dstCurrency: string;
    market: string;
    timestamp: string;
    type: string;
    price: string;
    amount: string;
    total: string;
    fee: string;
  }>;
  hasNext: boolean;
}

export interface FutureMarketListResponse extends INobitexResponseBase {
  markets: {
    [key: string]: {
      srcCurrency: string;
      dstCurrency: string;
      positionFeeRate: string;
      maxLeverage: string;
      sellEnabled: boolean;
      buyEnabled: boolean;
    };
  };
}
