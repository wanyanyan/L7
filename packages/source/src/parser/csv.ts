import { IJsonData, IParserCfg, IParserData } from '@cgcs2000/l7-core';
import { csvParse } from 'd3-dsv';
import json from './json';
export default function csv(data: string, cfg: IParserCfg): IParserData {
  const csvData: IJsonData = csvParse(data);
  return json(csvData, cfg);
}
