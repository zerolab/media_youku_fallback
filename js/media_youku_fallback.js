/**
 * @file
 * Fallback behavior.
 * Checks visitor IP against Chinese IPs only if there are embeds.
 */

(function ($) {

/**
 * YouKu fallback for YouTube videos for Chinese IPs.
 */
Drupal.behaviors.youkuFallback = {
  attach: function (context, settings) {

    // @todo  bailout early.
    var embeds = settings.youku || false;
    var ip = false, in_china = false;

    if (!embeds) {
      return;
    }

    $.get(settings.media_youku_fallback.url_ip, function(data) {
      ip = data;

      $.get(settings.media_youku_fallback.url_ip_china, function(data) {
        $.each(data, function(start, end) {
          if (ip >= start && ip <= parseInt(end, 10)) {
            in_china = true;
            return false;
          }
        });

        if (in_china) {
          Drupal.behaviors.youkuFallback.swap(embeds, settings);
        }
      }, 'json');

    }, 'json');
  },
  swap: function(embeds, settings) {
    var embed_base = 'http://player.youku.com/embed/';

    $.each(embeds, function(youtube_id, youku_id) {
      var $iframe = $("iframe[src*='" + youtube_id + "']");

      if ($iframe.length) {
        $iframe.attr('src', embed_base + youku_id);
      }
    });
  }
}
}(jQuery));

/**
 * A JavaScript equivalent of PHP’s ip2long
 *
 * @see http://phpjs.org/functions/ip2long/
 *
 * @param {[type]} IP
 *
 * @return {[type]}
 */
function ip2long(IP) {
  var i = 0;
  // PHP allows decimal, octal, and hexadecimal IP components.
  // PHP allows between 1 (e.g. 127) to 4 (e.g 127.0.0.1) components.
  IP = IP.match(
    /^([1-9]\d*|0[0-7]*|0x[\da-f]+)(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?$/i
  ); // Verify IP format.
  if (!IP) {
    // Invalid format.
    return false;
  }
  // Reuse IP variable for component counter.
  IP[0] = 0;
  for (i = 1; i < 5; i += 1) {
    IP[0] += !!((IP[i] || '')
      .length);
    IP[i] = parseInt(IP[i]) || 0;
  }
  // Continue to use IP for overflow values.
  // PHP does not allow any component to overflow.
  IP.push(256, 256, 256, 256);
  // Recalculate overflow of last component supplied to make up for missing components.
  IP[4 + IP[0]] *= Math.pow(256, 4 - IP[0]);
  if (IP[1] >= IP[5] || IP[2] >= IP[6] || IP[3] >= IP[7] || IP[4] >= IP[8]) {
    return false;
  }
  return IP[1] * (IP[0] === 1 || 16777216) + IP[2] * (IP[0] <= 2 || 65536) + IP[3] * (IP[0] <= 3 || 256) + IP[4] * 1;
}
