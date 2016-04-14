//selectors
$(document).ready(function(){
  $('img').addClass('imgClass');
  $('img').parent('p').addClass('paragraphClass');
  $('br').remove();
  $('p').removeAttr( 'style' );
  $('iframe').parent('p').addClass('videoClass');
  $('blockquote').removeAttr('style');
});

(function($) {
    'use strict';
    //removes nbsp blockquote spacing
    $('span.content blockquote').each(function() {
        if ('' === $.trim($(this).text())) {
            $(this).remove();
        }
    });
    //removes nbsp lines
    $('span:not(span.img-placeholder, span.dashboard-link)').each(function() {
        if ('' === $.trim($(this).text())) {
            $(this).remove();
        }
    });
}(jQuery));


//video resize to parent container
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
