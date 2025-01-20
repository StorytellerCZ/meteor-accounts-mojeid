Template.configureLoginServiceDialogForBluesky.helpers({
    siteUrl: () => Meteor.absoluteUrl(),
});

Template.configureLoginServiceDialogForBluesky.fields = () => [
    { property: 'clientId', label: 'Client ID'},
    { property: 'secret', label: 'Client Secret'},
    { property: 'idTokenWhitelistFields', label: 'Id Token Fields'}
];
