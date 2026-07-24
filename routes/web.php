<?php

use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\DiscussionAnswerController;
use App\Http\Controllers\DiscussionController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\InstitutionAdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\VoteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    $stats = ['questions' => 0, 'answers' => 0, 'subjects' => 0];

    if ($user->isTeacher()) {
        $subjectIds = $user->taughtSubjects()->pluck('subject_id');
        $stats['subjects'] = count($subjectIds);
        $stats['questions'] = \App\Models\Discussion::where('discussionable_type', 'subject')
            ->whereIn('discussionable_id', $subjectIds)->count();
        $stats['answers'] = \App\Models\DiscussionAnswer::whereIn('user_id', [$user->id])->count();
    } elseif ($user->isStudent()) {
        $semesterIds = $user->enrolledSemesters()->pluck('semesters.id');
        $subjectIds = \App\Models\Subject::whereIn('semester_id', $semesterIds)->pluck('id');
        $stats['subjects'] = count($subjectIds);
        $stats['questions'] = \App\Models\Discussion::where('discussionable_type', 'subject')
            ->whereIn('discussionable_id', $subjectIds)->where('user_id', $user->id)->count();
        $stats['answers'] = \App\Models\DiscussionAnswer::where('user_id', $user->id)->count();
    } elseif ($user->isInstitutionAdmin()) {
        $institutionIds = $user->institutions()->pluck('institutions.id');
        $semesterIds = \App\Models\Semester::whereIn('institution_id', $institutionIds)->pluck('id');
        $subjectIds = \App\Models\Subject::whereIn('semester_id', $semesterIds)->pluck('id');
        $stats['subjects'] = count($subjectIds);
        $stats['questions'] = \App\Models\Discussion::where('discussionable_type', 'subject')
            ->whereIn('discussionable_id', $subjectIds)->count();
        $stats['answers'] = \App\Models\DiscussionAnswer::count();
    } else {
        $stats['subjects'] = \App\Models\Subject::count();
        $stats['questions'] = \App\Models\Discussion::count();
        $stats['answers'] = \App\Models\DiscussionAnswer::count();
    }

    return Inertia::render('Dashboard', ['stats' => $stats]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
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
    Route::put('/answers/{discussion_answer}', [DiscussionAnswerController::class, 'update'])->name('answers.update');
    Route::delete('/answers/{discussion_answer}', [DiscussionAnswerController::class, 'destroy'])->name('answers.destroy');
    Route::post('/answers/{discussion_answer}/accept', [DiscussionAnswerController::class, 'accept'])->name('answers.accept');

    Route::post('/vote', [VoteController::class, 'toggle'])->name('vote');
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

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [InstitutionAdminController::class, 'dashboard'])->name('dashboard');

    Route::get('/semesters', [SemesterController::class, 'index'])->name('semesters.index');
    Route::get('/semesters/create', [SemesterController::class, 'create'])->name('semesters.create');
    Route::post('/semesters', [SemesterController::class, 'store'])->name('semesters.store');
    Route::get('/semesters/{semester}/edit', [SemesterController::class, 'edit'])->name('semesters.edit');
    Route::put('/semesters/{semester}', [SemesterController::class, 'update'])->name('semesters.update');
    Route::delete('/semesters/{semester}', [SemesterController::class, 'destroy'])->name('semesters.destroy');

    Route::get('/subjects', [SubjectController::class, 'index'])->name('subjects.index');
    Route::get('/subjects/create', [SubjectController::class, 'create'])->name('subjects.create');
    Route::post('/subjects', [SubjectController::class, 'store'])->name('subjects.store');
    Route::get('/subjects/{subject}/edit', [SubjectController::class, 'edit'])->name('subjects.edit');
    Route::put('/subjects/{subject}', [SubjectController::class, 'update'])->name('subjects.update');
    Route::delete('/subjects/{subject}', [SubjectController::class, 'destroy'])->name('subjects.destroy');
    Route::post('/subjects/{subject}/teachers', [SubjectController::class, 'assignTeacher'])->name('subjects.teachers.assign');
    Route::delete('/subjects/{subject}/teachers/{teacher}', [SubjectController::class, 'removeTeacher'])->name('subjects.teachers.remove');

    Route::get('/enrollments', [EnrollmentController::class, 'index'])->name('enrollments.index');
    Route::delete('/enrollments/{semester}/{student}', [EnrollmentController::class, 'remove'])->name('enrollments.remove');
});

Route::middleware('auth')->post('/enroll', [EnrollmentController::class, 'enroll'])->name('enroll');

require __DIR__.'/auth.php';
