module.exports = function launchMc () {
const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();
const version = "1.8.9";

let opts = {
    uthorization: Authenticator.getAuth("username"), // Put "password" if you want to connect to your Mojang account Microsoft is not support for this time
    root: "C:/Users/endou/AppData/Roaming/.urusium",
    version: {
        number: version,
        type: "release"
    },
    memory: {
        max: "3G",
        min: "1G"
    }
}

launcher.launch(opts);

launcher.on('debug', (e) => console.log(e));
launcher.on('data', (e) => console.log(e));
}