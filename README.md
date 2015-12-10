# Media: YouKu fallback

This module provides a fallback for YouTube video for Chinese visitors.
It adds a new field to video file entities to store YouKu video URLs.

Two types of YouKu URLs are accepted:

  - Video URL: http://v.youku.com/v_show/id_VIDEO_ID.html
    (e.g. http://v.youku.com/v_show/id_XMTQwNjYwMDQ3Mg==.html)
  - Embed code containing an URL matching: http://player.youku.com/player.php/sid/VIDEO_ID
    (e.g. `<iframe height=498 width=510 src="http://player.youku.com/embed/XMTQwNjYwMDQ3Mg==" frameborder=0 allowfullscreen></iframe>`)

Unfortunately YouKu does not support HTTPS. It is possible to proxy the player
and all its assets. However this is outside the scope of this module.

## Requirements

- [Media](https://www.drupal.org/project/media) 7.x-2.x
- [Media: Youtube](https://www.drupal.org/project/media_youtube) 7.x-2.x+
- [ip2country](https://www.drupal.org/project/ip2country)
- Link

## Installation

See https://www.drupal.org/documentation/install/modules-themes


## Maintainers

 * Dan Braghis <http://drupal.org/user/354424>
