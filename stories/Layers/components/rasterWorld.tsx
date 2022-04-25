// @ts-ignore
import { RasterLayer, Scene } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
import * as dat from 'dat.gui';
// @ts-ignore
// tslint:disable-next-line:no-submodule-imports
import * as GeoTIFF from 'geotiff';
import * as React from 'react';
import { colorScales } from '../lib/colorscales';
export default class RasterLayerDemo extends React.Component {
  private scene: Scene;
  private gui: dat.GUI;

  public componentWillUnmount() {
    this.scene.destroy();
    if (this.gui) {
      this.gui.destroy();
    }
  }

  public async componentDidMount() {
    const scene = new Scene({
      id: 'map',
      map: new Mapbox({
        center: [121.268, 30.3628],
        pitch: 0,
        style: 'dark',
        zoom: 2,
      }),
    });
    const tiffdata = await this.getTiffData();
    const layer = new RasterLayer({});
    const mindata = -0;
    const maxdata = 10000;
    layer
      .source(tiffdata.data.map((v:number)=>Math.log(v)), {
        parser: {
          type: 'raster',
          width: tiffdata.width,
          height: tiffdata.height,
          extent: [-180.0000000000000000, -58.5025710000000032, 180.0000000000000000, 83.6101840000000038]
        },
      })
      .style({
        opacity: 0.8,
        clampLow: true,
        domain: [ 0, Math.log(3200000) ],
      rampColors: {
        colors: [
          "rgba(33,76,118,1)",
          "rgba(27,102,144,1)",
          "rgba(17,129,167,1)",
          "rgba(18,156,188,1)",
          "rgba(39,184,205,1)",
          "rgba(45,197,203,1)",
          "rgba(68,210,197,1)",
          "rgba(99,222,188,1)",
          "rgba(132,232,177,1)",
          "rgba(164,230,162,1)",
          "rgba(192,228,153,1)",
          "rgba(217,225,148,1)",
          "rgba(238,221,150,1)",
          "rgba(245,197,131,1)",
          "rgba(245,171,122,1)",  // 开始全部变黄
          "rgba(250,171,122,1)",
          "rgba(250,145,124,1)",
          "rgba(243,121,133,1)",
          "rgba(215,100,104,1)",
          "rgba(215,100,104,1)",
        ],
        positions: [
          0.000000000001,
          0.000000625,
          0.00000313,
          0.00000469,
          0.00000938,
          0.0000188,
          0.0000375,
          0.0000625,
          0.000125,
          0.000219,
          0.000406,
          0.000844,
          0.00125,
          0.002,
          0.003125,   // 开始全部变黄
          0.00625,
          0.018125,
          0.0625,
          0.34375,
          1
        ].map((v:number)=>Math.log(v*3200000))
      }
      });
    scene.addLayer(layer);

    this.scene = scene;
    /*** 运行时修改样式属性 ***/
    const gui = new dat.GUI();
    this.gui = gui;
    const styleOptions = {
      clampLow: true,
      clampHigh: true,
      noDataValue: -9999999,
      min: mindata,
      max: maxdata,
      colorScales: 'jet',
    };
    const rasterFolder = gui.addFolder('栅格可视化');
    rasterFolder.add(styleOptions, 'clampLow').onChange((clampLow: boolean) => {
      layer.style({
        clampLow,
      });
      scene.render();
    });
    rasterFolder
      .add(styleOptions, 'clampHigh')
      .onChange((clampHigh: boolean) => {
        layer.style({
          clampHigh,
        });
        scene.render();
      });
    rasterFolder
      .add(styleOptions, 'min', mindata, maxdata)
      .onChange((min: number) => {
        layer.style({
          domain: [min, styleOptions.max],
        });
        scene.render();
      });
    rasterFolder
      .add(styleOptions, 'max', mindata, maxdata)
      .onChange((max: number) => {
        layer.style({
          domain: [styleOptions.min, max],
        });
        scene.render();
      });
    rasterFolder
      .add(styleOptions, 'colorScales', Object.keys(colorScales))
      .onChange((color: string) => {
        layer.style({
          rampColors: colorScales[color],
        });
        scene.render();
      });
  }

  public render() {
    return (
      <div
        id="map"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    );
  }
  private async getTiffData() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/63524f9d-da56-43e1-bc20-7b62484ca7b0.dat',
      // 'https://gw.alipayobjects.com/zos/antvdemo/assets/2019_clip/ndvi_201905.tiff',
    );
    const arrayBuffer = await response.arrayBuffer();
    const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
    const image = await tiff.getImage();
    const width = image.getWidth();
    const height = image.getHeight();
    const values = await image.readRasters();
    return {
      data: values[0],
      width,
      height,
      min: 0,
      max: 3200000,
    };
  }
}
