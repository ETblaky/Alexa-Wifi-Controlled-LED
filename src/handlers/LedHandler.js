let mqtt = require("./MqttHandler.js");

module.exports = class LED {

    static set_HSV(color) {
        return mqtt.publish("HSV", {
            "color": color,
            "fade": true,
            "keep_value": true
        });
    }

    static set_Preset(preset) {
        return mqtt.publish("Preset", {
            "preset": preset,
        });
    }

    static set_Value(value) {
        return mqtt.publish("Value", {
            "value": value,
        });
    }

}