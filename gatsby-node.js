const path = require('path');
exports.onCreateWebpackConfig = ({ getConfig }) => {
  const config = getConfig();
  config.module.rules.push({
    test: /\.glsl$/,
    use: {
      loader: 'glsl-shaders-loader'
    }
  });
  config.resolve.extensions.push('.glsl');
  config.resolve.alias = {
    ...config.resolve.alias,
    '@cgcs2000/l7': path.resolve(__dirname, 'packages/l7/src'),
    '@cgcs2000/l7-mini': path.resolve(__dirname, 'packages/mini/src'),
    '@cgcs2000/l7-maps/lib/map': path.resolve(__dirname, 'packages/maps/src/map'),
    '@cgcs2000/l7-core': path.resolve(__dirname, 'packages/core/src'),
    '@cgcs2000/l7-component': path.resolve(__dirname, 'packages/component/src'),
    '@cgcs2000/l7-layers': path.resolve(__dirname, 'packages/layers/src'),
    '@cgcs2000/l7-map': path.resolve(__dirname, 'packages/map/src'),
    '@cgcs2000/l7-maps': path.resolve(__dirname, 'packages/maps/src'),
    '@cgcs2000/l7-renderer': path.resolve(__dirname, 'packages/renderer/src'),
    '@cgcs2000/l7-scene': path.resolve(__dirname, 'packages/scene/src'),
    '@cgcs2000/l7-source': path.resolve(__dirname, 'packages/source/src'),
    '@cgcs2000/l7-utils': path.resolve(__dirname, 'packages/utils/src'),
    '@cgcs2000/l7-three': path.resolve(__dirname, 'packages/three/src')
  }
};
