module.exports = {
  multipass: true,
  datauri: 'enc',
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    'preset-default',
    'prefixIds',
    {
      name: 'sortAttrs',
      params: {
        xmlnsOrder: 'alphabetical',
      },
    },
  ],
};
