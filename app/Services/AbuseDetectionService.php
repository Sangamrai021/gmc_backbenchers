<?php

namespace App\Services;

use App\Models\Issue;
use Illuminate\Support\Facades\Cache;

class AbuseDetectionService
{
    public static function check(
        string $description,
        ?string $phone = null,
        ?string $ipHash = null,
        ?string $uuid = null,
        ?float $trustScore = null
    ): array {
        $score = 0.0;
        $reasons = [];

        $multiplier = 1.0;
        if ($trustScore !== null) {
            if ($trustScore > 0.8) $multiplier = 0.5;
            if ($trustScore < 0.3) $multiplier = 1.5;
        }

        preg_match_all('/https?:\/\/[^\s]+|www\.[^\s]+/i', $description, $urls);
        $urlCount = count($urls[0]);
        if ($urlCount > 5) {
            $score += 0.4;
            $reasons[] = "Contains {$urlCount} URLs";
        } elseif ($urlCount > 2) {
            $score += 0.2;
            $reasons[] = "Contains {$urlCount} URLs";
        }

        $letters = preg_replace('/[^a-zA-Z]/', '', $description);
        $upperLetters = preg_replace('/[^A-Z]/', '', $description);
        if (strlen($letters) > 20 && (strlen($upperLetters) / strlen($letters)) > 0.6) {
            $score += 0.25;
            $reasons[] = 'Excessive use of CAPS';
        }

        $words = str_word_count($description, 1);
        $wordFreq = array_count_values(array_map('strtolower', $words));
        $maxFreq = max($wordFreq);
        if ($maxFreq > 5) {
            $score += 0.2;
            $reasons[] = 'Repetitive text detected';
        }

        preg_match_all('/9[876]\d{8}/', $description, $phones);
        if (count($phones[0]) > 2) {
            $score += 0.3;
            $reasons[] = 'Contains multiple phone numbers';
        }

        $emojiCount = preg_match_all('/[\x{1F600}-\x{1F64F}\x{1F300}-\x{1F5FF}\x{1F680}-\x{1F6FF}]/u', $description);
        if ($emojiCount > 5) {
            $score += 0.15;
            $reasons[] = 'Excessive emoji characters';
        }

        $score = min($score * $multiplier, 1.0);

        return [
            'spam_score' => $score,
            'is_spam' => $score > 0.7,
            'reasons' => $reasons,
        ];
    }
}