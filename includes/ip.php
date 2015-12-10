<?php

/**
 * @file
 * Returns the visitor IP as returned by the server variables.
 */
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");

// Uncomment the two lines below to fake a Chinese IP.
// print "1542071296";
// return;

$ip = $_SERVER['SERVER_ADDR'];

// Handles proxied requests.
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
  $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
  $ip = trim(end($ips));
}

print ip2long($ip);
