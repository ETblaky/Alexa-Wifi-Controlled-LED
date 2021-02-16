
const ResponseHandler = require('./handlers/ResponseHandler.js')
const SmartHome = require('./handlers/SmartHomeHandler.js')
const CustomSkill = require('./handlers/CustomSkillHandler.js')


/*      Smart Home Side       */
const SmartHomeHandlers = {
    DiscoveryHandler: {
        canHandle(handlerInput) {
            return SmartHome.is_discovery(handlerInput);
        },

        handle(handlerInput) {
            return SmartHome.handle_discovery(handlerInput);
        }
    },

    PowerStateHandler: {
        canHandle(handlerInput) {
            return SmartHome.is_powerState(handlerInput);
        },

        handle(handlerInput) {
            return SmartHome.handle_powerState(handlerInput);
        }
    },

    PercentageHandler: {
        canHandle(handlerInput) {
            return SmartHome.is_percentage(handlerInput);
        },

        handle(handlerInput) {
            return SmartHome.handle_percentage(handlerInput);
        }
    },

    ColorHandler: {
        canHandle(handlerInput) {
            return SmartHome.is_color(handlerInput);
        },

        handle(handlerInput) {
            return SmartHome.handle_color(handlerInput);
        }
    },

    ColorTemperatureHandler: {
        canHandle(handlerInput) {
            return SmartHome.is_colorTemperature(handlerInput);
        },

        handle(handlerInput) {
            return SmartHome.handle_colorTemperature(handlerInput);
        }
    }
};

/*      Custom Skill Side       */
const CustomSkillHandlers = {
    LaunchAndHelpRequestHandler: {
        canHandle(handlerInput) {
            return CustomSkill.is_launch(handlerInput);
        },
        handle(handlerInput) {
            return CustomSkill.handle_launch(handlerInput);
        }
    },

    CancelRequestHandler: {
        canHandle(handlerInput) {
            return CustomSkill.is_stop(handlerInput);
        },
        handle(handlerInput) {
            return CustomSkill.handle_stop(handlerInput);
        }
    },

    SetPresetIntentHandler: {
        canHandle(handlerInput) {
            return CustomSkill.is_setPreset(handlerInput);
        },
        handle(handlerInput) {
            return CustomSkill.handle_setPreset(handlerInput);
        }
    },
}


exports.handler = function (event) {
    let SkillBuilder = new ResponseHandler(event);

    SkillBuilder.addRequestHandlers(
        SmartHomeHandlers.DiscoveryHandler,
        SmartHomeHandlers.PowerStateHandler,
        SmartHomeHandlers.PercentageHandler,
        SmartHomeHandlers.ColorHandler,
        SmartHomeHandlers.ColorTemperatureHandler,
        CustomSkillHandlers.LaunchAndHelpRequestHandler,
        CustomSkillHandlers.CancelRequestHandler,
        CustomSkillHandlers.SetPresetIntentHandler,
    );

    return SkillBuilder.lambda();
};