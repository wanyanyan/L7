import { Scene, RasterTileLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';

const scene = new Scene({
  id: 'map',
  map: new Map({
    center: [ 90.268, 40.3628 ],
    zoom: 3
  })
});

scene.on('loaded', () => {
  const layer = new RasterTileLayer({
    zIndex: 1
  });
  layer.source(
    'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    {
      parser: {
        type: 'rasterTile',
        tileSize: 256,
        minZoom: 2,
        maxZoom: 18,
        zoomOffset: 0
      }
    }
  );

  scene.addLayer(layer);
});
