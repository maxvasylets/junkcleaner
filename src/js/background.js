var global_options = {};


readOptions(function(options){
    global_options = options;
    chrome.browserAction.onClicked.addListener(onClickCleanTab);

    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        title: chrome.i18n.getMessage("clean_all_tabs_title"),
        contexts: ["browser_action"],
        onclick: function() {
            onClickCleanAllTabs();
        }
    });
});

// Track changes of options store
chrome.storage.onChanged.addListener(function(changes, namespace){
    readOptions(function (options){
        global_options = options;
    });
});

function cleanTab(tab_id){
    // set default value for tab_id to null
    tab_id = typeof tab_id !== 'undefined' ? tab_id : null;

    // inject options into the content
    chrome.tabs.executeScript(tab_id, {allFrames: !global_options.bIFrame, code: 'var options = ' + JSON.stringify(global_options)},
        function(){
            // execute cleanup script
            chrome.tabs.executeScript(tab_id, {allFrames: !global_options.bIFrame, file: "js/content.js"});
        }
    );
}

function onClickCleanTab(){
    cleanTab();
    gaTrackEvent('click_button', 'clean_tab');
}

function onClickCleanAllTabs(){
    chrome.tabs.query({"currentWindow": true}, function(tabs){
        for (var i = 0; i < tabs.length; i++){
            // Check if page URL started from http
            if( !tabs[i].url.match(/^http/) ) continue;

            // https://developer.chrome.com/extensions/tabs#method-discard
            if( tabs[i].discarded ) continue;

            // Skip domains from whitelist
            var url = new URL(tabs[i].url);
            if( SKIP_DOMAINS.indexOf(url.hostname) > -1 ) continue;

            cleanTab(tabs[i].id);
        }
    });
    gaTrackEvent('click_button', 'clean_all_tabs');
}

// google analytics track install and update
chrome.storage.local.get("installed_ver", function(data){
    if (!data || !data.installed_ver){
        // first installation
        var data = {
            installed_ver: VERSION
        };
        chrome.storage.local.set(data);
        gaTrackEvent('install', 'installed');
    } else {
        if (data.installed_ver !== VERSION){
            // updating
            var data = {
                installed_ver: VERSION
            };
            chrome.storage.local.set(data);
            gaTrackEvent('install', 'updated');
        }
    }
});

gaTrackPageview();
