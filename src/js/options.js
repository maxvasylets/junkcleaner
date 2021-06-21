function restoreDialogOptions(){
    readOptions(function(options){
        document.getElementById('bIFrame').checked = options.bIFrame;
        document.getElementById('bEmbed').checked = options.bEmbed;
        document.getElementById('bObject').checked = options.bObject;
        document.getElementById('bApplet').checked = options.bApplet;
        document.getElementById('bImgbanners').checked = options.bImgbanners;
        document.getElementById('bDontYoutube').checked = options.bDontYoutube;
        document.getElementById('bVideo').checked = options.bVideo;
        document.getElementById('bAudio').checked = options.bAudio;
        onIFrameItemClick();
    });
}

function onIFrameItemClick(){
    var checked = document.getElementById('bIFrame').checked;
    document.getElementById('bDontYoutube').disabled = !checked;

    if(checked) document.getElementById('lable_bDontYoutube').style.color = "";
    else document.getElementById('lable_bDontYoutube').style.color = "gray";
}

function saveDialogOptions(){
    var options = {
        bIFrame: document.getElementById('bIFrame').checked,
        bEmbed: document.getElementById('bEmbed').checked,
        bObject: document.getElementById('bObject').checked,
        bApplet: document.getElementById('bApplet').checked,
        bImgbanners: document.getElementById('bImgbanners').checked,
        bDontYoutube: document.getElementById('bDontYoutube').checked,
        bVideo: document.getElementById('bVideo').checked,
        bAudio: document.getElementById('bAudio').checked
    }

    saveOptions(options, function(){
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = chrome.i18n.getMessage("options_dialog_options_saved");
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });

    gaTrackEvent('options', 'saveOptions');
}

function localizeHtmlPage(){
    //Localize by replacing __MSG_***__ meta tags
    var objects = document.getElementsByTagName('html');
    for (var i = 0; i < objects.length; i++){
        var obj = objects[i];

        var valStrH = obj.innerHTML.toString();
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1){
            return v1 ? chrome.i18n.getMessage(v1) : "";
        });

        if(valNewH != valStrH){
            obj.innerHTML = valNewH;
        }
    }
}

localizeHtmlPage();

document.addEventListener('DOMContentLoaded', restoreDialogOptions);
document.getElementById('save').addEventListener('click', saveDialogOptions);
document.getElementById('close').addEventListener('click', function(){window.close()});
document.getElementById('bIFrame').addEventListener('click', onIFrameItemClick);

gaTrackPageview();
