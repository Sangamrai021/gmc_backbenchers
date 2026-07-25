<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Discussion;
use App\Models\DiscussionAnswer;
use App\Models\Grievance;
use App\Models\Semester;
use App\Models\Subject;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $stats = ['questions' => 0, 'answers' => 0, 'subjects' => 0, 'grievances' => 0, 'open_grievances' => 0, 'resolved_grievances' => 0, 'critical_grievances' => 0];

        if ($user->isTeacher()) {
            $subjectIds = $user->taughtSubjects()->pluck('subjects.id');
            $stats['subjects'] = count($subjectIds);
            $stats['questions'] = Discussion::where('discussionable_type', 'subject')
                ->whereIn('discussionable_id', $subjectIds)->count();
            $stats['answers'] = DiscussionAnswer::whereIn('user_id', [$user->id])->count();
            $stats['grievances'] = Grievance::whereIn('subject_id', $subjectIds)->visible()->count();
            $stats['open_grievances'] = Grievance::whereIn('subject_id', $subjectIds)->visible()->where('status', '!=', 'resolved')->count();
            $stats['resolved_grievances'] = Grievance::whereIn('subject_id', $subjectIds)->visible()->where('status', 'resolved')->count();
            $stats['critical_grievances'] = Grievance::whereIn('subject_id', $subjectIds)->visible()->where('priority', 'critical')->count();
        } elseif ($user->isStudent()) {
            return redirect()->route('student.dashboard');
        } elseif ($user->isInstitutionAdmin()) {
            $institutionIds = $user->institutions()->pluck('institutions.id');
            $semesterIds = Semester::whereIn('institution_id', $institutionIds)->pluck('id');
            $subjectIds = Subject::whereIn('semester_id', $semesterIds)->pluck('id');
            $stats['subjects'] = count($subjectIds);
            $stats['questions'] = Discussion::where('discussionable_type', 'subject')
                ->whereIn('discussionable_id', $subjectIds)->count();
            $stats['answers'] = DiscussionAnswer::whereHas('discussion', function ($q) use ($subjectIds) {
                $q->where('discussionable_type', 'subject')
                    ->whereIn('discussionable_id', $subjectIds);
            })->count();
            $stats['grievances'] = Grievance::whereIn('institution_id', $institutionIds)->visible()->count();
            $stats['open_grievances'] = Grievance::whereIn('institution_id', $institutionIds)->visible()->where('status', '!=', 'resolved')->count();
            $stats['resolved_grievances'] = Grievance::whereIn('institution_id', $institutionIds)->visible()->where('status', 'resolved')->count();
            $stats['critical_grievances'] = Grievance::whereIn('institution_id', $institutionIds)->visible()->where('priority', 'critical')->count();
        } else {
            $stats['subjects'] = Subject::count();
            $stats['questions'] = Discussion::count();
            $stats['answers'] = DiscussionAnswer::count();
            $stats['grievances'] = Grievance::visible()->count();
            $stats['open_grievances'] = Grievance::visible()->where('status', '!=', 'resolved')->count();
            $stats['resolved_grievances'] = Grievance::visible()->where('status', 'resolved')->count();
            $stats['critical_grievances'] = Grievance::visible()->where('priority', 'critical')->count();
        }

        return Inertia::render('Dashboard', ['stats' => $stats]);
    }
}
