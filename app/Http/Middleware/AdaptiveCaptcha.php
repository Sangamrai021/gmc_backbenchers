<?php

namespace App\Http\Middleware;

use App\Services\TurnstileService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdaptiveCaptcha
{
    public function handle(Request $request, \Closure $next): Response
    {
        $turnstileService = app(TurnstileService::class);
        $captchaRequired = $turnstileService->shouldShowCaptcha($request);

        if ($captchaRequired) {
            \Inertia\Inertia::share('captcha_required', true);
        }

        return $next($request);
    }
}