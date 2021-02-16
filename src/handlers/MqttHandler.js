let awsIot = require('aws-iot-device-sdk');
let secrets = require('../auth/secrets.js');

module.exports = class MQTT {

    static publish(topic, message) {
        return new Promise((resolve, reject) => {
            var device = awsIot.device({
                keyPath: secrets.private_key_path,
                certPath: secrets.cert_path,
                caPath: secrets.ca_path,
                clientId: "ETRoom-Alexa",
                host: secrets.host
            });

            device.on('connect', function () {
                console.log('connect');
                device.publish(topic, JSON.stringify(message), [], () => {
                    device.end(false, () => {
                        resolve();
                    });
                });
            });
        })
    }

}