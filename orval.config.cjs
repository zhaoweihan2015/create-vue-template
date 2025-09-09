module.exports = {
  petstore: {
    input: './doc/example.yaml',
    output: {
      mode: 'split',
      target: './src/api',
      client: 'axios',
      override: {
        mutator: {
          path: './src/utils/request.ts',
          name: 'customRequest',
        },
        prettier: true,
      },
    },
  },
};
