/**
 * Add your Analytics tracking ID here.
 */

if(USE_GA) {
    // Init Google Analytics
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', ANALYTICS_CODE]);
    _gaq.push(['_setCustomVar',
        1,                // This custom var is set to slot #1.  Required parameter.
        'Version',        // The name of the custom variable.  Required parameter.
        VERSION,          // The value of the custom variable.  Required parameter.
        1                 // Sets the scope to visitor-level.  Optional parameter.
    ]);


    function gaTrackPageview(){
        _gaq.push(['_trackPageview']);
    }

    function gaTrackEvent(category, action){
        _gaq.push(['_trackEvent', category, action]);
    }
}
else {
    function gaTrackPageview(){}
    function gaTrackEvent(category, action){}
}
