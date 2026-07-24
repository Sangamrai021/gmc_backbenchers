<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DiscussionAnswerController;
use App\Http\Controllers\DiscussionController;
use App\Http\Controllers\ProfileController;
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
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    $stats = ['questions' => 0, 'answers' => 0, 'subjects' => 0];

    if ($user->isTeacher()) {
        $subjectIds = $user->taughtSubjects()->pluck('subjects.id');
        $stats['subjects'] = count($subjectIds);
        $stats['questions'] = \App\Models\Discussion::where('discussionable_type', 'subject')
            ->whereIn('discussionable_id', $subjectIds)->count();
        $stats['answers'] = \App\Models\DiscussionAnswer::whereIn('user_id', [$user->id])->count();
    } elseif ($user->isStudent()) {
        return redirect()->route('student.dashboard');
    } elseif ($user->isInstitutionAdmin()) {
        $institutionIds = $user->institutions()->pluck('institutions.id');
        $semesterIds = \App\Models\Semester::whereIn('institution_id', $institutionIds)->pluck('id');
        $subjectIds = \App\Models\Subject::whereIn('semester_id', $semesterIds)->pluck('id');
        $stats['subjects'] = count($subjectIds);
        $stats['questions'] = \App\Models\Discussion::where('discussionable_type', 'subject')
            ->whereIn('discussionable_id', $subjectIds)->count();
        $stats['answers'] = \App\Models\DiscussionAnswer::whereHas('discussion', function ($q) use ($subjectIds) {
            $q->where('discussionable_type', 'subject')
              ->whereIn('discussionable_id', $subjectIds);
        })->count();
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
    Route::put('/answers/{discussion_answer}', [DiscussionAnswerController::class, 'update'])->name('answers.update');
    Route::delete('/answers/{discussion_answer}', [DiscussionAnswerController::class, 'destroy'])->name('answers.destroy');
    Route::post('/answers/{discussion_answer}/accept', [DiscussionAnswerController::class, 'accept'])->name('answers.accept');

    Route::post('/vote', [VoteController::class, 'toggle'])->name('vote');
});

require __DIR__.'/auth.php';
