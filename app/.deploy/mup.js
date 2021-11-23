module.exports = {
  servers: {
    one: {
      host: 'bowbites.xyz',
      username: 'root',
      password: '123Welcome'
    }
  },
  app: {
    // if you edit the app 'name' field, be sure to run 'mup stop' if the app is already running.
    // otherwise you will have two apps deployed at once, with unpredictable results.
    name: 'bow-bites',
    path: '../',
    servers: { one: {}, },
    buildOptions: { serverOnly: true },
    env: {
      ROOT_URL: 'http://bowbites.xyz',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },
    docker: { image: 'zodern/meteor:latest' },
    enableUploadProgressBar: true
  },
  proxy: {
    domains: 'bowbites.xyz',
    ssl: {
      letsEncryptEmail: 'hblazier@hawaii.edu',
      forceSSL: true
    }
  },
  mongo: { version: '3.4.1', servers: { one: {} }
  },
};
