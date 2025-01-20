/* global Package */
Package.describe({
    name: 'storyteller:mojeid-config-ui',
    summary: 'Blaze configuration templates for MojeID OpenID Connect.',
    version: '1.0.0',
    git: 'https://github.com/StorytellerCZ/meteor-accounts-mojeid/'
});

Package.onUse(api => {
    api.versionsFrom(['2.9.0', '3.0'])
    api.use('ecmascript', 'client');
    api.use('templating@1.4.4', 'client');
    api.addFiles('mojeid_login_button.css', 'client');
    api.addFiles(
        ['mojeid_configure.html', 'mojeid_configure.js'],
        'client'
    );
});
