module.exports = class Response {

    constructor(event) {
        this.event = event;
        this.request_handlers = [];
    }

    addRequestHandlers(...handlers) {
        let instance = this;
        handlers.forEach(function (val, i) {
            instance.request_handlers.push(val);
        });
    }

    lambda() {

        console.log(JSON.stringify(this.event, undefined, 4));

        let instance = this;
        return new Promise(function (resolve, reject) {
            for (let i = 0; i < instance.request_handlers.length; i++) {
                let handler = instance.request_handlers[i];
                if (handler.canHandle(instance.event)) {

                    handler.handle(instance.event).then(function (response) {
                        console.log(JSON.stringify(response));
                        resolve(response);
                    });

                    return;
                }
            }


            resolve({ "error": "no handler for this request." });
        });
    }


    static createSmartHomeResponse(request, namespace, name, value) {
        let response = {};

        response.event = request.directive;
        response.event.header.namespace = "Alexa";
        response.event.header.name = "Response";

        response.context = {
            "properties": [
                {
                    "namespace": namespace,
                    "name": name,
                    "value": value,
                    "timeOfSample": new Date().toISOString(),
                    "uncertaintyInMilliseconds": 500
                }
            ]
        }

        return response;
    }

    static createCustomSkillResponse(output_text = null, card_content = null) {

        let response = {
            "version": "1.0",
            "response": {
                "shouldEndSession": true
            }
        }

        if (output_text !== null) {
            response.response.outputSpeech = {
                "type": "PlainText",
                "text": output_text
            }
        }

        if (card_content !== null) {
            response.response.card = {
                "type": "Simple",
                "title": "Led Strip",
                "content": card_content
            }
        }

        return response;
    }


}