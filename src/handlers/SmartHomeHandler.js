const LED = require("./LedHandler.js")
const Response = require("./ResponseHandler.js")

module.exports = {

    is_discovery: function (request) {
        if (!('directive' in request)) return;
        return request.directive.header.namespace === "Alexa.Discovery";
    },

    handle_discovery: function (request) {
        let response = {};

        response.event = request.directive;
        response.event.header.namespace = "Alexa.Discovery";
        response.event.header.name = "Discover.Response";

        response.event.payload = {};
        response.event.payload.endpoints = [{
            "endpointId": "ledStrip-01",
            "manufacturerName": "ETblaky",
            "description": "RGB Led Strip",
            "friendlyName": "Led Strip",
            "displayCategories": ["LIGHT"],
            "capabilities": [
                {
                    "type": "AlexaInterface",
                    "interface": "Alexa.PowerController",
                    "version": "3",
                    "properties": {
                        "supported": [{ "name": "powerState" }]
                    }
                },
                {
                    "type": "AlexaInterface",
                    "interface": "Alexa.PercentageController",
                    "version": "3",
                    "properties": {
                        "supported": [{ "name": "percentage" }]
                    }
                },
                {
                    "type": "AlexaInterface",
                    "interface": "Alexa.ColorController",
                    "version": "3",
                    "properties": {
                        "supported": [{ "name": "color" }]
                    }
                },
                {
                    "type": "AlexaInterface",
                    "interface": "Alexa.ColorTemperatureController ",
                    "version": "3",
                    "properties": {
                        "supported": [{ "name": "colorTemperatureInKelvin" }]
                    }
                },
            ]
        }];

        return new Promise((resolve, reject) => { resolve(response) });

    },

    is_powerState: function (request) {
        if (!('directive' in request)) return;
        return request.directive.header.namespace === "Alexa.PowerController";
    },

    handle_powerState: function (request) {

        return new Promise((resolve, reject) => {
            let finalState = request.directive.header.name === "TurnOn" ? "ON" : "OFF";

            let response = Response.createSmartHomeResponse(request, "Alexa.PowerController", "powerState", finalState)

            let value = finalState == "ON" ? 255 : 0;

            LED.set_Value(value).then(function () {
                resolve(response);
            });
        });

    },

    is_percentage: function (request) {
        if (!('directive' in request)) return;
        return request.directive.header.namespace === "Alexa.PercentageController";
    },

    handle_percentage: function (request) {
        //TODO: Implement AdjustPowerLevel Support;

        return new Promise((resolve, reject) => {

            let finalPercentage;
            if (request.directive.header.name === "SetPercentage") {
                finalPercentage = request.directive.payload.percentage;
            }
            else if (request.directive.header.name === "AdjustPercentage") {
                finalPercentage = request.directive.payload.percentageDelta;
            }

            let response = Response.createSmartHomeResponse(request, "Alexa.PercentageController", "percentage", finalPercentage)

            let value = Math.round(finalPercentage * 255 / 100);

            LED.set_Value(value).then(function (error, packet) {
                resolve(response);
            });

        });

    },

    is_color: function (request) {
        if (!('directive' in request)) return;
        return request.directive.header.namespace === "Alexa.ColorController";
    },

    handle_color: function (request) {

        return new Promise((resolve, reject) => {
            let finalHSV = request.directive.payload.color;

            let response = Response.createSmartHomeResponse(request, "Alexa.ColorController", "color", finalHSV);

            let hsv = [Math.round(finalHSV.hue * (255 / 360)), Math.round(finalHSV.saturation * 255), 0];

            LED.set_HSV(hsv).then(function (error, packet) {
                resolve(response);
            });
        });


    },

    is_colorTemperature: function (request) {
        if (!('directive' in request)) return;
        return request.directive.header.namespace === "Alexa.ColorTemperatureController";
    },

    handle_colorTemperature: function (request) {

        return new Promise((resolve, reject) => {
            //TODO: Implement AdjustColorTemperature Support;
            let finalTemp;
            if (request.directive.header.name === "SetColorTemperature") {
                finalTemp = request.directive.payload.colorTemperatureInKelvin;
            }
            else if (request.directive.header.name === "IncreaseColorTemperature") {
                finalTemp = 4000;
            }
            else if (request.directive.header.name === "DecreaseColorTemperature ") {
                finalTemp = 4000;
            }

            let response = Request.createSmartHomeResponse(request, "Alexa.ColorTemperatureController", "colorTemperatureInKelvin", finalTemp);

            // let rgb = Util.colorTemp2RGB(finalTemp);
            // let cmd = "rfk" + rgb.toString().replace("[", "").replace("]", "").replace(/\s/g, "");

            // MQTT.sendCommand(cmd).then(function (error, packet) {
            resolve(response);
            // });

        });
    },

};