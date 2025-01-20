/* global Package */
Package.describe({
    name: 'storyteller:mojeid-oidc',
    summary: 'MojeID OpenID Connect flow',
    version: '1.0.0',
    git: 'https://github.com/StorytellerCZ/meteor-accounts-mojeid/'
});

Package.onUse(api => {
    api.versionsFrom(['2.9.0', '3.0']);
    api.use('ecmascript', ['client', 'server']);
    api.use('oauth2', ['client', 'server']);
    api.use('oauth', ['client', 'server']);
    api.use(['fetch', 'url'], 'server');
    api.use('random', 'client');
    api.use('service-configuration', ['client', 'server']);

    api.addFiles('mojeid_client.js', 'client');
    api.addFiles('mojeid_server.js', 'server');

    api.mainModule('namespace.js');

    api.export('MojeID');
});
