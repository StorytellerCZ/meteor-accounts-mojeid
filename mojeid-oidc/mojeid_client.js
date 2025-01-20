MojeID = {};

// Request OpenID Connect credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
MojeID.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'mojeid'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError('Service MojeID not configured.'));
    return;
  }

  var credentialToken = Random.secret();
  var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
  var display = mobile ? 'touch' : 'popup';
  var loginStyle = OAuth._loginStyle('mojeid', config, options);
  var scope = config.requestPermissions || ['openid', 'profile', 'email'];

  // options
  options = options || {};
  options.client_id = config.clientId;
  options.response_type = options.response_type || 'code';
  options.redirect_uri = OAuth._redirectUri('mojeid', config);
  options.state = OAuth._stateParam(loginStyle, credentialToken, options.redirectUrl);
  options.scope = scope.join(' ');

  if (config.loginStyle && config.loginStyle == 'popup') {
    options.display = 'popup';
  }

  var loginUrl = "https://mojeid.cz/oidc/authorization/"; // config.serverUrl + config.authorizationEndpoint;
  // check if the loginUrl already contains a '?'
  var hasExistingParams = loginUrl.indexOf('?') !== -1;

  if (!hasExistingParams) {
    loginUrl += '?';
  }
  else {
    loginUrl += '&'
  }

  loginUrl += Object.keys(options).map(function(key) {
    return [key, options[key]].map(encodeURIComponent).join('=');
  }).join('&');

  //console.log('XXX: loginURL: ' + loginUrl)

  options.popupOptions = options.popupOptions || {};
  var popupOptions = {
    width:  options.popupOptions.width || 320,
    height: options.popupOptions.height || 450
  };

  OAuth.launchLogin({
    loginService: 'mojeid',
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: popupOptions,
  });
};

MojeID.fields = [
  { property: 'clientId', label: 'Client ID'},
  { property: 'secret', label: 'Client Secret'},
  // { property: 'serverUrl', label: 'OIDC Server URL'},
  // { property: 'authorizationEndpoint', label: 'Authorization Endpoint'},
  // { property: 'tokenEndpoint', label: 'Token Endpoint'},
  // { property: 'userinfoEndpoint', label: 'Userinfo Endpoint'},
  { property: 'idTokenWhitelistFields', label: 'Id Token Fields'}
];
