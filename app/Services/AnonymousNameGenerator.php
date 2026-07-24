<?php

namespace App\Services;

class AnonymousNameGenerator
{
    private static array $adjectives = [
        'Curious', 'Bright', 'Sharp', 'Quick', 'Wise', 'Calm', 'Brave', 'Gentle',
        'Keen', 'Swift', 'Clever', 'Bold', 'Eager', 'Focused', 'Active', 'Lively',
        'Patient', 'Steady', 'Kinder', 'Polite', 'Honest', 'Loyal', 'Warm', 'Merry',
    ];

    private static array $animals = [
        'Fox', 'Owl', 'Panda', 'Tiger', 'Eagle', 'Dolphin', 'Bear', 'Wolf',
        'Falcon', 'Rabbit', 'Deer', 'Robin', 'Lark', 'Otter', 'Seal', 'Koala',
        'Crane', 'Lynx', 'Phoenix', 'Hawk', 'Finch', 'Dove', 'Swan', 'Heron',
    ];

    public static function generate(): string
    {
        $adjective = self::$adjectives[array_rand(self::$adjectives)];
        $animal = self::$animals[array_rand(self::$animals)];
        $number = str_pad(random_int(1, 99), 2, '0', STR_PAD_LEFT);

        return $adjective . $animal . $number;
    }
}
