const Enum = require('enum');

module.exports = class Presets {

    static types = new Enum({
        'RAINBOW': "Arco Íris",
        'RAINBOW_STATIC': "Arco Íris Estático",
        'RAINBOW_MOVING': "Arco Íris Movendo",
        'COME_N_GO': "Vai e Volta",
        'BLINK': "Piscando",
        'RAINBOW_BLINK': "Arco Íris Piscando",
        'SPOTIFY': "Spotify"
    });

};