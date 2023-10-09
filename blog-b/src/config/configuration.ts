export default () => ({
  mode: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  server: {
    port: parseInt(process.env.PORT, 10),
    host:
      process.env.NODE_ENV === 'development'
        ? process.env.URL_DEV
        : process.env.URL_PROD,
  },
});
