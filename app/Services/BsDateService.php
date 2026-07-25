<?php

namespace App\Services;

use Carbon\Carbon;

class BsDateService
{
    private static array $nepaliMonths = [
        'en' => ['Baisakh', 'Jestha', 'Ashad', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'],
        'np' => ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कात्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'],
        'short' => ['Bai', 'Jes', 'Ash', 'Shr', 'Bhd', 'Ash', 'Kar', 'Man', 'Pou', 'Mag', 'Fal', 'Chai'],
    ];

    private static array $nepaliDays = [
        'en' => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'np' => ['आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'],
    ];

    public static function toBsString(?Carbon $date, string $format = 'short'): ?string
    {
        if (!$date) return null;

        try {
            $month = $date->month;
            $day = $date->day;
            $year = $date->year + 57;

            $monthName = $month >= 1 && $month <= 12
                ? (self::$nepaliMonths['short'][$month - 1] ?? '')
                : '';

            return match ($format) {
                'short' => "{$monthName} {$day}, {$year}",
                'datetime' => "{$monthName} {$day}, {$year}",
                'datetime_en' => self::$nepaliMonths['en'][$month - 1] . " {$day}, {$year}",
                default => "{$year}/{$month}/{$day}",
            };
        } catch (\Exception $e) {
            return $date->format('Y-m-d');
        }
    }
}