import { Nobitex } from './nobitex';

export * from './currency';
export * from './nobitex';
export * from './resolutions';
export * from './symbols';
export * from './type-event';
export * from './types';
const main = async () => {
  const n = new Nobitex('sdsd', 'aaa');
  const a = n.watchTimeFrameOHLCV('BCHIRT', '1m');
  a.on((data) => {
    console.log(data, new Date());
  });
  // setTimeout(() => {
  //   a.stop();
  // }, 8000);
};
main();
