<?php

namespace App\Providers;

use App\Models\Assignment;
use App\Models\Discussion;
use App\Models\DiscussionAnswer;
use App\Models\Section;
use App\Models\Semester;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Relation::morphMap([
            'subject' => Subject::class,
            'semester' => Semester::class,
            'assignment' => Assignment::class,
            'section' => Section::class,
            'discussion' => Discussion::class,
            'discussion_answer' => DiscussionAnswer::class,
        ]);
    }
}
