<?php

namespace App\Providers;

use App\Models\Assignment;
use App\Models\Discussion;
use App\Models\DiscussionAnswer;
use App\Models\Section;
use App\Models\Semester;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

use App\Events\AssignmentCreated;
use App\Events\AssignmentGraded;
use App\Events\QuestionPosted;
use App\Events\QuestionAnswered;
use App\Events\AnswerAccepted;
use App\Events\ResourceUploaded;
use App\Events\AnnouncementPublished;
use App\Events\StudentEnrolled;
use App\Events\TeacherAssigned;

use App\Listeners\NotifyAssignmentCreated;
use App\Listeners\NotifyAssignmentGraded;
use App\Listeners\NotifyQuestionPosted;
use App\Listeners\NotifyQuestionAnswered;
use App\Listeners\NotifyAnswerAccepted;
use App\Listeners\NotifyResourceUploaded;
use App\Listeners\NotifyAnnouncementPublished;
use App\Listeners\NotifyStudentEnrolled;
use App\Listeners\NotifyTeacherAssigned;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Route::model('discussion_answer', DiscussionAnswer::class);

        Relation::morphMap([
            'subject' => Subject::class,
            'semester' => Semester::class,
            'assignment' => Assignment::class,
            'section' => Section::class,
            'discussion' => Discussion::class,
            'discussion_answer' => DiscussionAnswer::class,
        ]);

        Event::listen(AssignmentCreated::class, NotifyAssignmentCreated::class);
        Event::listen(AssignmentGraded::class, NotifyAssignmentGraded::class);
        Event::listen(QuestionPosted::class, NotifyQuestionPosted::class);
        Event::listen(QuestionAnswered::class, NotifyQuestionAnswered::class);
        Event::listen(AnswerAccepted::class, NotifyAnswerAccepted::class);
        Event::listen(ResourceUploaded::class, NotifyResourceUploaded::class);
        Event::listen(AnnouncementPublished::class, NotifyAnnouncementPublished::class);
        Event::listen(StudentEnrolled::class, NotifyStudentEnrolled::class);
        Event::listen(TeacherAssigned::class, NotifyTeacherAssigned::class);
    }
}
