<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuperAdminPageController extends Controller
{
    public function institutionAdmins(Request $request)
    {
        abort_if(!$request->user()->isSuperAdmin(), 403);
        return Inertia::render('Admin/InstitutionAdmins/Index');
    }

    public function analytics(Request $request)
    {
        abort_if(!$request->user()->isSuperAdmin(), 403);
        return Inertia::render('Admin/Analytics/Index');
    }

    public function monitoring(Request $request)
    {
        abort_if(!$request->user()->isSuperAdmin(), 403);
        return Inertia::render('Admin/Monitoring/Index');
    }

    public function roles(Request $request)
    {
        abort_if(!$request->user()->isSuperAdmin(), 403);
        return Inertia::render('Admin/Roles/Index');
    }

    public function reports(Request $request)
    {
        abort_if(!$request->user()->isSuperAdmin(), 403);
        return Inertia::render('Admin/Reports/Index');
    }
}
