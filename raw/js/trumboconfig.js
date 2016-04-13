/* imgur parameters to upload plugin */
var uploadOptions = {
    serverPath: 'https://api.imgur.com/3/image',
    fileFieldName: 'image',
    headers: {
        'Authorization': 'Client-ID 9e57cb1c4791cea'
    },
    urlPropertyName: 'data.link'
};


$('textarea').trumbowyg({
    removeformatPasted: true,
    // fixedBtnPane: true,
    fixedFullWidth: true,
    semantic: true,
    autogrow: true,
    resetCss: true,
    btnsDef: {
        // Create new dropdowns
        image: {
            dropdown: ['insertImage', 'upload'],
            ico: 'insertImage'
        },
        link: {
            dropdown: ['createLink', 'unlink', 'noembed'],
            ico: 'link'
        },
        design: {
            dropdown: ['bold', 'strikethrough', 'italic', 'underline', 'removeformat'],
            ico: 'bold'
        },
        align: {
          dropdown: ['justifyLeft','justifyRight','justifyCenter','justifyFull'],
          ico: 'justifyFull'
        },
        lists: {
            dropdown: ['orderedList', 'unorderedList'],
            ico: 'orderedList'
        }
    },
    //btn groups as per their dropdown init names
    btns: [
        ['viewHTML'],
        ['formatting'],
        ['design'],
        ['lists'],
        ['align'],
        ['image'],
        ['foreColor', 'backColor'],
        ['link'],
        ['preformatted'],
        ['horizontalRule'],
        ['fullscreen']
    ],
    plugins: {
        upload: uploadOptions
    }
});
