<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class SetAnonymousUuid
{
    public function handle(Request $request, \Closure $next): Response
    {
        if (!$request->cookie('_auid')) {
            $uuid = (string) Str::uuid();
            cookie()->queue(cookie('_auid', $uuid, 525600, '/', null, true, false, false, 'lax'));
        }

        return $next($request);
    }
}