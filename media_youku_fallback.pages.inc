<?php

/**
 * @file
 * Menu callbacks.
 *
 * vim:set sw=2 ts=2 et ft=php:
 */

/**
 * Menu callback for ip2country lookups().
 */
function media_youku_fallback_ip2country_lookup($ip_address = NULL) {
  if (empty($ip_address)) {
    $ip_address = $_SERVER['SERVER_ADDR'];
  }

  // Return results of manual lookup.
  $country_code = ip2country_get_country($ip_address);

  $payload = array(
    'country' => '',
  );

  if ($country_code) {
    $payload['country'] = $country_code;
  }

  return $payload;
}

/**
 * Returns IP ranges for China.
 */
function media_youku_fallback_china() {
  if ($cache = cache_get('ip2country:china')) {
    $ips = $cache->data;
  }
  else {
    $ips = db_select('ip2country', 'ips')
      ->fields('ips', array('ip_range_first', 'ip_range_last'))
      ->condition('ips.country', 'CN', '=')->execute()->fetchAllKeyed();

    // Cache for one week.
    cache_set('ip2country:china', $ips, time() + 604800);
  }

  return $ips;
}
