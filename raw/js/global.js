
$(document).ready(function(){
  $('img').addClass('imgClass');
  $('img').parent('p').addClass('paragraphClass');
  $('br').remove();
  $('p').removeAttr( 'style' );
  $('iframe').parent('p').addClass('videoClass');


});


// $('blockquote').filter(function(){
//     'use strict';
//     return $.trim(this.innerHTML) === "&nbsp;"
// }).remove();

(function($) {
    'use strict';
    $('span.content blockquote').each(function() {
        if ('' === $.trim($(this).text())) {
            $(this).remove();
        }
    });
}(jQuery));






$(function() {
    var $allVideos = $('iframe,object, embed'),
    $mainwrapper = $('.side-body');

	$allVideos.each(function() {

	  $(this)
	    // jQuery .data does not work on object/embed elements
	    .attr('data-aspectRatio', this.height / this.width)
	    .removeAttr('height')
	    .removeAttr('width');

	});

	$(window).resize(function() {

	  var newWidth = $mainwrapper.width();
	  $allVideos.each(function() {

	    var $el = $(this);
	    $el
	        .width(newWidth)
	        .height(newWidth * $el.attr('data-aspectRatio'));

	  });

	}).resize();

});
