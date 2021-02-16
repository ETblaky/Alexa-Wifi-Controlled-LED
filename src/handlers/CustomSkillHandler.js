const Response = require('./ResponseHandler.js')
const Presets = require('./PresetsHandler.js')
const LED = require('./LedHandler.js')

module.exports = {

    is_launch: function (request) {
        return request.request.type === 'LaunchRequest'
            || (request.request.type === 'IntentRequest' && request.request.intent.name === 'AMAZON.HelpIntent');
    },

    handle_launch: function (request) {

        let presets = "";
        Presets.types.enums.forEach((preset, i) => {
            presets += preset.value + (i === Presets.types.enums.length - 1 ? "." : ", ");
        });

        let response = Response.createCustomSkillResponse(
            "Os presets disponíveis são: " + presets,
            presets
        );
        return new Promise((resolve, reject) => { resolve(response) });
    },

    is_setPreset: function (request) {
        return request.request.type === 'IntentRequest'
            && request.request.intent.name === 'SetPresetIntent';
    },

    handle_setPreset: function (request) {

        return new Promise((resolve, reject) => {
            let preset = Presets.types.get(request.request.intent.slots.preset.resolutions.resolutionsPerAuthority[0].values[0].value.id);

            let response = Response.createCustomSkillResponse(
                "Led está na configuração " + preset.value
            );

            LED.set_Preset(preset.key).then(function () {
                resolve(response);
            });
        });

    },

    is_stop: function (request) {
        return request.request.type === 'IntentRequest'
            && (request.request.intent.name === 'AMAZON.CancelIntent' || request.request.intent.name === 'AMAZON.StopIntent');
    },

    handle_stop: function (request) {
        let response = Response.createCustomSkillResponse();
        return new Promise((resolve, reject) => { resolve(response) });
    }

};