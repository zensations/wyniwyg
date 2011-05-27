(function ($) {
  Drupal.behaviors.wyniwyg = {
    attach: function(context, settings) {
      // === external links ===
      $('a').click(function() {
        if (($(this).attr('href').indexOf('http://') > -1) && ($(this).attr('href').indexOf(window.location.host) == -1)) {
          window.open($(this).attr('href'));
          return false;
        }
      });
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
      $('.image-widget-data').each(function() {
        var widget = this;
        $('.image-alt, .image-title, .image-size, .image-position', this).change(function() {
          var snippet = '![' + $('.image-alt', widget).val() + '](' + $('.file-id', widget).text() + ' "' + $('.image-title', widget).val() + '")';  
          snippet = snippet + '{' + $('.image-size', widget).val() + ' ' + $('.image-position', widget).val() + '}';
          $('input.image-command', widget).val(snippet); 
          $('input.image-command', widget).effect('highlight');
        });
        $('input.image-command', this).click(function() { this.select(); });
      });
    }
  }
})(jQuery);
