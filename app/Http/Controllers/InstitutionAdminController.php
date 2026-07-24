<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use App\Models\Semester;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InstitutionAdminController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        if ($user->isSuperAdmin()) {
            $stats = [
                'institutions' => Institution::count(),
                'semesters' => Semester::count(),
                'subjects' => Subject::count(),
                'students' => User::where('role', 'student')->count(),
                'teachers' => User::where('role', 'teacher')->count(),
            ];
            return inertia('Admin/Index', ['stats' => $stats, 'institution' => null]);
        }

        if ($user->isInstitutionAdmin()) {
            $institutionIds = $user->institutions()->pluck('institutions.id');
            $institution = Institution::find($institutionIds->first());
            $semesterIds = Semester::whereIn('institution_id', $institutionIds)->pluck('id');

            $stats = [
                'institutions' => 1,
                'semesters' => count($semesterIds),
                'subjects' => Subject::whereIn('semester_id', $semesterIds)->count(),
                'students' => $institution->users()->where('users.role', 'student')->count(),
                'teachers' => $institution->users()->where('users.role', 'teacher')->count(),
            ];
            return inertia('Admin/Index', ['stats' => $stats, 'institution' => $institution]);
        }

        abort(403);
    }
}
