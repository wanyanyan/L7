import { IParserData } from '@cgcs2000/l7-core';
type CallBack = (...args: any[]) => any;
export function map(data: IParserData, options: { [key: string]: any }) {
  const { callback } = options;
  if (callback) {
    data.dataArray = data.dataArray.map(callback);
  }
  return data;
}
