var HttpsProxyAgent = require('https-proxy-agent');
var proxyConfig = [{
  context: '/',
  target: 'http://localhost:4200',
  secure: false,
  changeOrigin: true
}];

function setupForCorporateProxy(proxyConfig) {
  let proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    let agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);
    proxyConfig.forEach(function (entry) {
      entry.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
