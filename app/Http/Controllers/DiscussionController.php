<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDiscussionRequest;
use App\Http\Requests\UpdateDiscussionRequest;
use App\Models\Discussion;
use App\Models\Subject;
use App\Services\AnonymousNameGenerator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DiscussionController extends Controller
{
    public function index(Request $request)
    {
        $query = Discussion::with(['user', 'votes'])
            ->withCount(['answers', 'votes as upvotes_count' => function ($q) {
                $q->where('type', 'upvote');
            }, 'votes as downvotes_count' => function ($q) {
                $q->where('type', 'downvote');
            }]);

        if ($request->filled('subject_id')) {
            $query->where('discussionable_type', 'subject')
                  ->where('discussionable_id', $request->subject_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $query->whereHas('discussionable');

        $user = Auth::user();
        if ($user->isTeacher()) {
            $subjectIds = $user->taughtSubjects()->pluck('subject_id');
            $query->where(function ($q) use ($subjectIds) {
                $q->where('discussionable_type', 'subject')
                  ->whereIn('discussionable_id', $subjectIds);
            });
        } elseif ($user->isStudent()) {
            $semesterIds = $user->enrolledSemesters()->pluck('semesters.id');
            $subjectIds = Subject::whereIn('semester_id', $semesterIds)->pluck('id');
            $query->where(function ($q) use ($subjectIds) {
                $q->where('discussionable_type', 'subject')
                  ->whereIn('discussionable_id', $subjectIds);
            });
        } elseif ($user->isInstitutionAdmin()) {
            $institutionIds = $user->institutions()->pluck('institutions.id');
            $semesterIds = \App\Models\Semester::whereIn('institution_id', $institutionIds)->pluck('id');
            $subjectIds = Subject::whereIn('semester_id', $semesterIds)->pluck('id');
            $query->where(function ($q) use ($subjectIds) {
                $q->where('discussionable_type', 'subject')
                  ->whereIn('discussionable_id', $subjectIds);
            });
        }

        $discussions = $query->latest()->paginate(20);

        return inertia('Questions/Index', [
            'discussions' => $discussions,
            'filters' => $request->only(['subject_id', 'status']),
        ]);
    }

    public function create()
    {
        $user = Auth::user();

        if ($user->isTeacher()) {
            $subjects = $user->taughtSubjects()->with('semester.institution')->get();
        } elseif ($user->isStudent()) {
            $semesterIds = $user->enrolledSemesters()->pluck('semesters.id');
            $subjects = Subject::whereIn('semester_id', $semesterIds)
                ->with('semester.institution')
                ->get();
        } elseif ($user->isInstitutionAdmin()) {
            $institutionIds = $user->institutions()->pluck('institutions.id');
            $subjects = Subject::whereHas('semester', function ($q) use ($institutionIds) {
                $q->whereIn('institution_id', $institutionIds);
            })->with('semester.institution')->get();
        } else {
            $subjects = Subject::with('semester.institution')->get();
        }

        return inertia('Questions/Create', ['subjects' => $subjects]);
    }

    public function store(StoreDiscussionRequest $request)
    {
        $discussion = Discussion::create([
            'user_id' => Auth::id(),
            'discussionable_id' => $request->discussionable_id,
            'discussionable_type' => $request->discussionable_type,
            'title' => $request->title,
            'body' => $request->body,
            'category' => $request->category,
            'is_anonymous' => $request->boolean('is_anonymous'),
            'status' => 'open',
        ]);

        return redirect()->route('questions.show', $discussion)
            ->with('success', 'Your question has been posted.');
    }

    public function show(Discussion $discussion)
    {
        $this->authorize('view', $discussion);

        $discussion->load([
            'user',
            'discussionable',
            'answers' => function ($q) {
                $q->with(['user', 'votes'])->withCount([
                    'votes as upvotes_count' => fn($q) => $q->where('type', 'upvote'),
                    'votes as downvotes_count' => fn($q) => $q->where('type', 'downvote'),
                ])->latest();
            },
            'votes',
        ])->loadCount([
            'answers',
            'votes as upvotes_count' => fn($q) => $q->where('type', 'upvote'),
            'votes as downvotes_count' => fn($q) => $q->where('type', 'downvote'),
        ]);

        return inertia('Questions/Show', [
            'discussion' => $discussion,
        ]);
    }

    public function edit(Discussion $discussion)
    {
        $this->authorize('update', $discussion);

        return inertia('Questions/Edit', [
            'discussion' => $discussion->load('discussionable'),
        ]);
    }

    public function update(UpdateDiscussionRequest $request, Discussion $discussion)
    {
        $this->authorize('update', $discussion);

        $discussion->update($request->validated());

        return redirect()->route('questions.show', $discussion)
            ->with('success', 'Question updated.');
    }

    public function destroy(Discussion $discussion)
    {
        $this->authorize('delete', $discussion);

        $discussion->delete();

        return redirect()->route('questions.index')
            ->with('success', 'Question deleted.');
    }
}
