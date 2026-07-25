<?php

namespace App\Http\Controllers;

use App\Models\Grievance;
use App\Models\GrievanceCategory;
use App\Models\GrievanceEvent;
use App\Models\Institution;
use App\Models\Semester;
use App\Models\Subject;
use App\Services\BsDateService;
use App\Services\GrievanceService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GrievanceController extends Controller
{
    public function create(Request $request)
    {
        $institutions = Institution::where('is_active', true)->orderBy('name')->get();
        $categories = GrievanceCategory::active()->sorted()->get(['id', 'name']);

        $user = auth()->user();
        $semesters = collect();
        $subjects = collect();

        if ($user && $user->isStudent()) {
            $semesterIds = $user->enrolledSemesters()->pluck('semesters.id');
            $semesters = Semester::whereIn('id', $semesterIds)->get();
            $subjects = Subject::whereIn('semester_id', $semesterIds)->get();
        }

        return Inertia::render('Grievances/Submit', [
            'institutions' => $institutions,
            'categories' => $categories,
            'semesters' => $semesters,
            'subjects' => $subjects,
            'priorities' => [
                'low' => 'Low',
                'medium' => 'Medium',
                'high' => 'High',
                'critical' => 'Critical',
            ],
        ]);
    }

    public function store(Request $request, GrievanceService $grievanceService)
    {
        $result = $grievanceService->createGrievance($request);

        if (!empty($result['honeypot'])) {
            return redirect()->route('dashboard');
        }

        if (!empty($result['captcha_error'])) {
            return back()->withErrors(['captcha' => 'Security check failed. Please try again.']);
        }

        if (!empty($result['merged'])) {
            return redirect()->route('grievances.show-reference', [
                'reference_code' => $result['merged_into']->reference_code,
            ])->with('info', 'Your grievance was similar to an existing report. It has been combined for better tracking.');
        }

        $grievance = $result['grievance'];
        $duplicates = $result['duplicates'] ?? [];

        $redirect = redirect()->route('grievances.show-reference', [
            'reference_code' => $grievance->reference_code,
        ]);

        if (!empty($duplicates)) {
            $redirect->with('warning', 'Similar grievances found: ' . collect($duplicates)->pluck('reference_code')->implode(', '));
        }

        return $redirect;
    }

    public function showReference($referenceCode)
    {
        $grievance = Grievance::where('reference_code', $referenceCode)
            ->with([
                'institution', 'semester', 'subject', 'category',
                'assignedUser', 'resolvedBy',
                'events' => fn($q) => $q->public()->latest()->limit(20),
                'comments' => fn($q) => $q->visible()->approved()->public()->root()->latest()->with(['user', 'replies.user']),
                'media',
            ])
            ->first();

        if (!$grievance) {
            return redirect()->route('grievances.track')->with('error', 'No grievance found with reference code: ' . $referenceCode);
        }

        if ($grievance->status === 'merged' && $grievance->duplicate_of_id) {
            $parent = Grievance::find($grievance->duplicate_of_id);
            if ($parent) {
                return redirect()->route('grievances.show-reference', ['reference_code' => $parent->reference_code])
                    ->with('info', 'This grievance was combined with ' . $parent->reference_code);
            }
        }

        $userId = auth()->id();
        $sessionId = $userId ? null : session()->getId();

        return Inertia::render('Grievances/Show', [
            'grievance' => [
                'id' => $grievance->id,
                'reference_code' => $grievance->reference_code,
                'title' => $grievance->title,
                'category' => $grievance->category?->name,
                'priority' => $grievance->priority,
                'institution' => $grievance->institution?->name,
                'semester' => $grievance->semester?->name,
                'subject' => $grievance->subject?->name,
                'description' => $grievance->description,
                'status' => $grievance->status,
                'is_anonymous' => $grievance->is_anonymous,
                'created_at' => $grievance->created_at->toISOString(),
                'bs_created_at' => BsDateService::toBsString($grievance->created_at, 'datetime_en'),
                'resolved_at' => $grievance->resolved_at?->toISOString(),
                'resolution_summary' => $grievance->resolution_summary,
                'resolved_by_name' => $grievance->resolvedBy?->name,
                'assigned_to_name' => $grievance->assignedUser?->name,
                'has_upvoted' => $grievance->isUpvotedBy($userId, $sessionId),
                'upvotes_count' => $grievance->upvotesCount(),
                'comments_count' => $grievance->commentsCount(),
                'events' => $grievance->events->map(fn($e) => [
                    'id' => $e->id,
                    'type' => $e->type,
                    'description' => $e->description,
                    'is_public' => $e->is_public,
                    'created_at' => $e->created_at->toISOString(),
                    'bs_created_at' => BsDateService::toBsString($e->created_at, 'datetime_en'),
                ]),
                'media' => $grievance->media->map(fn($m) => [
                    'id' => $m->id,
                    'path' => $m->path,
                    'type' => $m->type,
                    'url' => $m->type === 'photo' ? \Illuminate\Support\Facades\Storage::url($m->path) : null,
                ]),
            ],
        ]);
    }

    public function trackStatus(Request $request)
    {
        $grievance = null;
        $error = null;

        if ($request->filled('code')) {
            $grievance = Grievance::with(['institution', 'assignedUser', 'resolvedBy', 'events' => fn($q) => $q->public()->latest()->limit(20)])
                ->where('reference_code', strtoupper($request->code))
                ->first();

            if (!$grievance) {
                $error = 'No grievance found with this reference code. Please check and try again.';
            }
        }

        return Inertia::render('Grievances/Track', [
            'grievance' => $grievance ? [
                'id' => $grievance->id,
                'reference_code' => $grievance->reference_code,
                'title' => $grievance->title,
                'priority' => $grievance->priority,
                'institution' => $grievance->institution?->name,
                'description' => $grievance->description,
                'status' => $grievance->status,
                'assigned_to' => $grievance->assignedUser?->name,
                'created_at' => $grievance->created_at->toISOString(),
                'bs_created_at' => BsDateService::toBsString($grievance->created_at, 'datetime_en'),
                'resolved_at' => $grievance->resolved_at?->toISOString(),
                'resolution_summary' => $grievance->resolution_summary,
                'resolved_by_name' => $grievance->resolvedBy?->name,
                'events' => $grievance->events->map(fn($e) => [
                    'id' => $e->id,
                    'type' => $e->type,
                    'description' => $e->description,
                    'is_public' => $e->is_public,
                    'created_at' => $e->created_at->toISOString(),
                    'bs_created_at' => BsDateService::toBsString($e->created_at, 'datetime_en'),
                ]),
            ] : null,
            'error' => $error,
        ]);
    }
}