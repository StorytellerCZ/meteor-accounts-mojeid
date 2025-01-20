if (Package['accounts-ui']
    && !Package['service-configuration']
    && !Object.prototype.hasOwnProperty.call(Package, 'mojeid-config-ui')) {
    console.warn(
        "Note: You're using accounts-ui and accounts-mojeid,\n" +
        "but didn't install the configuration UI for the MojeID\n" +
        "OAuth. You can install it with:\n" +
        "\n" +
        "    meteor add mojeid-config-ui" +
        "\n"
    );
}
