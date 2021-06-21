var default_options = {
    bIFrame: true,
    bEmbed: true,
    bObject: true,
    bApplet: true,
    bImgbanners: true,
    bDontYoutube: true,
    bVideo: true,
    bAudio: true
}

function readOptions(callback){
    chrome.storage.sync.get(default_options, function(options) {
        callback(options);
    });
}

function saveOptions(options, callback){
    chrome.storage.sync.set(options, callback);
}
