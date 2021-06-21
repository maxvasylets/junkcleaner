var banners_sizes_base = [
    '21x21',
    '48x48',
    '88x33',
    '88x62',
    '90x30',
    '90x32',
    '90x90',
    '100x30',
    '100x37',
    '100x45',
    '100x50',
    '100x100',
    '100x275',
    '110x55',
    '120x90',
    '120x120',
    '120x234',
    '120x240',
    '120x400',
    '120x500',
    '120x800',
    '125x60',
    '125x125',
    '125x250',
    '125x400',
    '125x600',
    '125x800',
    '130x60',
    '130x65',
    '132x70',
    '140x55',
    '146x60',
    '150x60',
    '150x100',
    '150x150',
    '155x275',
    '155x470',
    '160x80',
    '180x30',
    '180x66',
    '180x150',
    '194x165',
    '200x60',
    '230x30',
    '230x33',
    '230x60',
    '234x60',
    '234x68',
    '240x80',
    '280x280',
    '320x5',
    '300x60',
    '350x300',
    '392x72',
    '400x40',
    '430x225',
    '440x40',
    '470x60',
    '550x5',
    '600x30',
    '720x300',
    '850x120'
];

// https://support.google.com/adwords/editor/answer/57755?hl=en
var banners_sizes_google = [
    '468x60',
    '728x90',
    '1024x90',
    '970x90',
    '980x120',
    '930x180',
    '250x250',
    '200x200',
    '336x280',
    '300x250',
    '970x250',
    '120x600',
    '160x600',
    '425x600',
    '300x600',
    '320x50',
    '300x50',
    '240x400',
    '250x360',
    '480x32',
    '300x1050',
    '768x1024',
    '1024x768',
    '580x400',
    '480x320',
    '320x480',
    '300x100',
    '750x300',
    '750x200',
    '750x100',
    '950x90',
    '88x31',
    '220x90',
    '300x31',
    '320x100',
    '980x90',
    '240x133',
    '200x446',
    '292x30',
    '960x90',
    '970x66',
    '300x57',
    '120x60'
];

var banners_sizes = [].concat(this.banners_sizes_base, this.banners_sizes_google);

/**
 * URL by which we define YouTube frames
 */
var YOUTUBE_FRAME_SRC_PATERN = "//www.youtube.com/embed/"

/**
 * Clean junk objects from the content of current tab
 */
function cleanContent(){
    if (options.bImgbanners) { cleanImages(); }
    if (options.bIFrame) { cleanIFrames(); }
    if (options.bEmbed)  { cleanObjects('embed');  }
    if (options.bObject) { cleanObjects('object'); }
    if (options.bApplet) { cleanObjects('applet'); }
    if (options.bVideo) { cleanObjects('video'); }
    if (options.bAudio) { cleanObjects('audio'); }
}

/**
 * Find iframes and clean them
 */
function cleanIFrames(){
    var frames = document.getElementsByTagName('iframe');

    if(frames){
        for(var i=frames.length-1; i>=0; i--){
            if(options.bDontYoutube && frames[i].src){
                // don't remove youtube-clips
                // if it's not youtube-clip then remove it
                if(frames[i].src.search(YOUTUBE_FRAME_SRC_PATERN) == -1) this.fillSpace(frames[i]);
            }
            else {
                this.fillSpace(frames[i]);
            }
        }
    }
}

/**
 * Replace junk element on blank DIV
 * @param element Element to be replaced on DIV
 */
function fillSpace(element){
    var div = document.createElement('div');
    div.style.width = element.width;
    div.style.height = element.height;
    element.parentNode.replaceChild(div, element);
}

/**
 * Clean all junk elements with tag - tagname
 * @param {string} tagname Tag of elements which will be replaced on DIV
 */
function cleanObjects(tagname){
    var elements = document.getElementsByTagName(tagname);

    if(elements){
        for(var i=elements.length-1; i>=0; i--){
            this.fillSpace(elements[i]);
        }
    }
}

/**
 * Find images with banner sizes and clean them
 */
function cleanImages(){
    var images = document.images;

    if(images){
        for(var i=images.length-1; i>=0; i--){
            if(this.banners_sizes.indexOf(images[i].width + 'x' + images[i].height) > -1){
                this.fillSpace(images[i]);
            }
        }
    }
}

cleanContent();
