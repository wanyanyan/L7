import { IParserData } from '@cgcs2000/l7-core';
export function filter(data: IParserData, options: { [key: string]: any }) {
  const { callback } = options;
  if (callback) {
    data.dataArray = data.dataArray.filter(callback);
  }
  return data;
}
