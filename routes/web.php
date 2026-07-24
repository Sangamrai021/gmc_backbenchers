<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\DiscussionAnswerController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\InstitutionAdminController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\DiscussionController;
use App\Http\Controllers\MentorSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentProjectController;
use App\Http\Controllers\VoteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'stats' => [
            'questions' => \App\Models\Discussion::count(),
            'answers' => \App\Models\DiscussionAnswer::count(),
            'projects' => \App\Models\StudentProject::count(),
            'subjects' => \App\Models\Subject::count(),
        ],
    ]);
});

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:super_admin'])->group(function () {
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users');
    Route::get('/admin/useractivity', [\App\Http\Controllers\Admin\UserActivityController::class, 'index'])->name('admin.useractivity');
    Route::get('/admin/institutions', [\App\Http\Controllers\Admin\InstitutionController::class, 'index'])->name('admin.institutions');
    Route::post('/admin/institutions', [\App\Http\Controllers\Admin\InstitutionController::class, 'store'])->name('admin.institutions.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/student/dashboard', function () {
        $user = Auth::user();
        if (!$user->isStudent()) {
            return redirect()->route('dashboard');
        }

        $semesterIds = $user->enrolledSemesters()->pluck('semesters.id');
        $subjectIds = \App\Models\Subject::whereIn('semester_id', $semesterIds)->pluck('id');
        $stats = [];
        $stats['subjects'] = count($subjectIds);
        $stats['questions'] = \App\Models\Discussion::where('discussionable_type', 'subject')
            ->whereIn('discussionable_id', $subjectIds)->where('user_id', $user->id)->count();
        $stats['answers'] = \App\Models\DiscussionAnswer::where('user_id', $user->id)->count();

        return Inertia::render('Student/Dashboard', ['stats' => $stats]);
    })->name('student.dashboard');
});

Route::middleware('auth')->prefix('questions')->name('questions.')->group(function () {
    Route::get('/', [DiscussionController::class, 'index'])->name('index');
    Route::get('/create', [DiscussionController::class, 'create'])->name('create');
    Route::post('/', [DiscussionController::class, 'store'])->name('store');
    Route::get('/{discussion}', [DiscussionController::class, 'show'])->name('show');
    Route::get('/{discussion}/edit', [DiscussionController::class, 'edit'])->name('edit');
    Route::put('/{discussion}', [DiscussionController::class, 'update'])->name('update');
    Route::delete('/{discussion}', [DiscussionController::class, 'destroy'])->name('destroy');

    Route::post('/{discussion}/answers', [DiscussionAnswerController::class, 'store'])->name('answers.store');
    Route::put('/answers/{answer}', [DiscussionAnswerController::class, 'update'])->name('answers.update');
    Route::delete('/answers/{answer}', [DiscussionAnswerController::class, 'destroy'])->name('answers.destroy');
    Route::post('/answers/{answer}/accept', [DiscussionAnswerController::class, 'accept'])->name('answers.accept');

    Route::post('/vote', [VoteController::class, 'toggle'])->middleware('throttle:60,1')->name('vote');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/talent-showcase', [StudentProjectController::class, 'index'])->name('projects.index');
    Route::post('/talent-showcase', [StudentProjectController::class, 'store'])->name('projects.store');
    
    Route::get('/mentor-board', [MentorSessionController::class, 'index'])->name('mentorship.index');
    Route::post('/mentor-sessions/{mentorSession}/accept', [MentorSessionController::class, 'accept'])->name('mentorship.accept');
    Route::post('/mentor-sessions/{mentorSession}/complete', [MentorSessionController::class, 'complete'])->name('mentorship.complete');
});

Route::middleware('auth')->prefix('assignments')->name('assignments.')->group(function () {
    Route::get('/', [AssignmentController::class, 'index'])->name('index');
    Route::get('/create', [AssignmentController::class, 'create'])->name('create');
    Route::post('/', [AssignmentController::class, 'store'])->name('store');

    Route::get('/submissions/{submission}', [SubmissionController::class, 'show'])->name('submissions.show');
    Route::put('/submissions/{submission}', [SubmissionController::class, 'update'])->name('submissions.update');

    Route::get('/{assignment}', [AssignmentController::class, 'show'])->name('show');
    Route::get('/{assignment}/edit', [AssignmentController::class, 'edit'])->name('edit');
    Route::put('/{assignment}', [AssignmentController::class, 'update'])->name('update');
    Route::delete('/{assignment}', [AssignmentController::class, 'destroy'])->name('destroy');

    Route::post('/{assignment}/submissions', [SubmissionController::class, 'store'])->name('submissions.store');
});

Route::middleware(['auth', 'role:super_admin|institution_admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [InstitutionAdminController::class, 'dashboard'])->name('dashboard');
    
    Route::resource('semesters', SemesterController::class)->except(['show']);
    Route::resource('subjects', SubjectController::class)->except(['show']);
    
    Route::post('/subjects/{subject}/teachers', [SubjectController::class, 'assignTeacher'])->name('subjects.teachers.assign');
    Route::delete('/subjects/{subject}/teachers/{teacher}', [SubjectController::class, 'removeTeacher'])->name('subjects.teachers.remove');
    
    Route::get('/enrollments', [EnrollmentController::class, 'index'])->name('enrollments.index');
    Route::delete('/enrollments/{semester}/{student}', [EnrollmentController::class, 'remove'])->name('enrollments.remove');
});

Route::middleware('auth')->post('/enroll', [EnrollmentController::class, 'enroll'])->name('enroll');

Route::resource('resources', \App\Http\Controllers\ResourceController::class)->middleware(['auth', 'verified']);
Route::resource('announcements', \App\Http\Controllers\AnnouncementController::class)->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
