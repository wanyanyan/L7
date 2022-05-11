import { Map } from '@cgcs2000/mapbox-gl';
import { IMapboxInstance } from '../../typings/index';
import BaseMapWrapper from '../BaseMapWrapper';
import './logo.css';
import MapboxService from './map';
export default class MapboxWrapper extends BaseMapWrapper<
  Map & IMapboxInstance
> {
  protected getServiceConstructor() {
    return MapboxService;
  }
}
