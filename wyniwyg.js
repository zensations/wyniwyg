(function ($) {
  Drupal.behaviors.wyniwyg = {
    attach: function(context, settings) {
      // ==== embedded videos ====
      $('a.wyniwyg-video').each(function () {
        var url = $(this).attr('href');
        var title = $(this).attr('title');
        if (/vimeo\.com\/([0-9]+)/.test(url)) {
          var vimeo_url = /vimeo\.com\/([0-9]+)/.exec(url);
          var vimeo_id = vimeo_url[1];
          $(this).replaceWith('<iframe src="http://player.vimeo.com/video/' + vimeo_id + '" class="wyniwyg-video" frameborder="0"></iframe>');
        }
        else if (/^[^v]+v.(.{11}).*/.test(url)) {
          var yt_url = url.replace(/^[^v]+v.(.{11}).*/,"http://www.youtube.com/embed/$1");
          $(this).replaceWith('<iframe class="wyniwyg-video" title="' + title + '" src="' + yt_url + '" frameborder="0" allowfullscreen></iframe>');
        }
      });

      // ==== image include snippets ====
      $('.field-name-field-images input[type=text]').change(function(){
        var field = $(this).parent().parent();
        $('pre', field).text('![' + $('.image-alt', field).val() + '](' + $('.file-id', field).text() + ' "' + $('.image-title', field).val() + '"){center}')
      });
      // ==== markitup ====
    }
  }
})(jQuery);
