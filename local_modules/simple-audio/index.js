// Based on Ion.Sound 2013 Denis Ineshin | IonDen.com
var loadedSounds = {};
var pathPrefix = 'assets/audio/';

var MP3_EXTENSION = '.mp3';

/**
 * Private method that creates a new sound object that immediately
 * starts to load.
 *
 * @param soundFilename
 * @return {Audio}
 */
var createSound = function(soundFilename) {
    if (loadedSounds[soundFilename]) {
        return loadedSounds[soundFilename];
    }

    var sound = new Audio();
    loadedSounds[soundFilename] = sound;

    var baseFilename = soundFilename;

    var canMp3 = sound.canPlayType("audio/mp3");

    if (soundFilename.endsWith('.wav')) {
        sound.src = pathPrefix + soundFilename;
    } else if (canMp3 === "probably" || canMp3 === "maybe") {
        // Strip the file extension if we have one.
        if (soundFilename.endsWith(MP3_EXTENSION)) {
            sound.src = pathPrefix + soundFilename;
        } else {
            sound.src = pathPrefix + soundFilename + MP3_EXTENSION;
        }
    } else {
        if (soundFilename.endsWith(MP3_EXTENSION)) {
            baseFilename = soundFilename.slice(0, soundFilename.length - 4);
            sound.src = pathPrefix + baseFilename + '.ogg';
        } else {
            sound.src = pathPrefix + soundFilename + '.ogg';
        }
    }

    sound.load();
    sound.preload = 'auto';

    return sound;
};

module.exports = {
    /**
     * Load a particular sound file, without playing it.
     * Just download it and put it in memory.
     *
     * @param filename
     */
    load: function(filename) {
        createSound(filename);
    },

    /**
     * Play a particular sound file.
     *
     * If said sound file isn't already loaded, load it and
     * play immediately.
     *
     * @param filename
     */
    play: function(filename, volume) {
        var sound = loadedSounds[filename];
        if (!sound) {
            // If the sound isn't already loaded, then load it.
            sound = createSound(filename);

            // Play the sound immediately.
            sound.autoplay = true;
        } else {
            if (!sound.ended) {
                // Try resetting the sound to its start,
                // if it is already playing.
                try {
                    sound.currentTime = 0;
                } catch (e) {}
            }
            sound.play();
        }
        sound.volume = volume === undefined ? 1 : volume;
    },

    /**
     * Remove all sounds from storage.
     */
    unloadAllSounds: function() {
        loadedSounds.forEach(function(sound) {
            // Unload each sound's source.
            sound.src = '';
        });
        // Empty the array.
        loadedSounds = [];
    }
};