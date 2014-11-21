'use strict';

function refreshImage() {
  var slider = jQuery('#slider');
  var image = jQuery('#uploadImage');
  var src = image.attr('src');
  if (typeof src === 'undefined') {
    return;
  }
  var rate = slider.slider('value');
  image.width(rate + '%');
  image.height(rate + '%');
}

jQuery(function () {
  jQuery('#uploadImage').draggable({
    snap: '.ui-widget-header'
  });
});

jQuery(function() {
  jQuery('#slider').slider({
    orientation: 'horizontal',
    min: 1,
    max: 100,
    slide: refreshImage,
    change: refreshImage
  });
  jQuery('#slider').slider('value', 100);
});

jQuery('select').change(function() {
  jQuery('select option:selected').each(function() {
    jQuery('#preview').attr('class', $(this).val());
  });
}).change();

jQuery('input').change(function (e) {
  var uploadFile = e.target.files[0];
  if (!uploadFile) {
    console.log('invalid file.');
    return;
  }
  var fileReader = new FileReader();
  fileReader.onloadend = function () {
    jQuery('#uploadImage').attr('src', fileReader.result);
  };
  fileReader.readAsDataURL(uploadFile);
});
