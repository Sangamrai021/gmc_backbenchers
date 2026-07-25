<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnnouncementRequest;
use App\Http\Requests\UpdateAnnouncementRequest;
use App\Models\Announcement;
use App\Models\Subject;
use App\Events\AnnouncementPublished;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $announcements = Announcement::forUser(Auth::user())
            ->with(['subject.semester.institution', 'user'])
            ->latest()
            ->paginate(20);

        return inertia('Announcements/Index', [
            'announcements' => $announcements,
        ]);
    }

    public function create()
    {
        $user = Auth::user();

        if ($user->isTeacher()) {
            $subjects = $user->taughtSubjects()->with('semester.institution')->get();
        } elseif ($user->isInstitutionAdmin()) {
            $institutionIds = $user->institutions()->pluck('institutions.id');
            $subjects = Subject::whereHas('semester', function ($q) use ($institutionIds) {
                $q->whereIn('institution_id', $institutionIds);
            })->with('semester.institution')->get();
        } else {
            $subjects = Subject::with('semester.institution')->get();
        }

        return inertia('Announcements/Create', ['subjects' => $subjects]);
    }

    public function store(StoreAnnouncementRequest $request)
    {
        $this->authorize('create', Announcement::class);

        $user = Auth::user();
        
        $data = $request->validated();
        $data['user_id'] = $user->id;

        $announcement = Announcement::create($data);

        event(new AnnouncementPublished($announcement));

        return redirect()->route('announcements.index')
            ->with('success', 'Announcement created successfully.');
    }

    public function edit(Announcement $announcement)
    {
        $this->authorize('update', $announcement);

        return inertia('Announcements/Edit', [
            'announcement' => $announcement->load('subject'),
        ]);
    }

    public function update(UpdateAnnouncementRequest $request, Announcement $announcement)
    {
        $this->authorize('update', $announcement);

        $announcement->update($request->validated());

        return redirect()->route('announcements.index')
            ->with('success', 'Announcement updated.');
    }

    public function destroy(Announcement $announcement)
    {
        $this->authorize('delete', $announcement);

        $announcement->delete();

        return redirect()->route('announcements.index')
            ->with('success', 'Announcement deleted.');
    }
}
