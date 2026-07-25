<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class TurnstileService
{
    public function shouldShowCaptcha(Request $request): bool
    {
        if (config('turnstile.always_show')) {
            return true;
        }

        $uuid = $request->cookie('_auid');
        $ip = $request->ip();

        $suspicionKey = 'captcha_suspicion:' . ($uuid ?? $ip);
        $suspicionScore = (float) Cache::get($suspicionKey, 0);

        return $suspicionScore > 0.5;
    }

    public function verify(string $token): bool
    {
        $cacheKey = 'turnstile_verify:' . md5($token);

        return Cache::remember($cacheKey, 120, function () use ($token) {
            $response = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
                'secret' => config('turnstile.secret_key'),
                'response' => $token,
            ]);

            return $response->json('success') === true;
        });
    }

    public function incrementSuspicion(Request $request, float $amount = 0.1): void
    {
        $uuid = $request->cookie('_auid');
        $ip = $request->ip();

        $key = 'captcha_suspicion:' . ($uuid ?? $ip);
        $current = (float) Cache::get($key, 0);
        Cache::put($key, $current + $amount, 3600);
    }
}