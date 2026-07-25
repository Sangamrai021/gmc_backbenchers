<?php

namespace App\Services;

class IpAnonymizer
{
    public static function hash(string $ip, ?string $salt = null): string
    {
        $salt = $salt ?? config('app.key');
        return hash('sha256', $ip . $salt);
    }
}