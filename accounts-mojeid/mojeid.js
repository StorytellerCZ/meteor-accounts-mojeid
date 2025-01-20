import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Accounts.oauth.registerService('mojeid');

if (Meteor.isClient) {
    const loginWithMojeID = (options, callback) => {
        // support a callback without options
        if (!callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        const credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        MojeID.requestCredential(options, credentialRequestCompleteCallback);
    };

    Accounts.registerClientLoginFunction('mojeid', loginWithMojeID);
    Meteor.loginWithMojeID = (...args) => Accounts.applyLoginFunction('mojeid', args);
} else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.mojeid'],
        forOtherUsers: ['services.mojeid.id']
    });
}
