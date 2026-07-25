<?php

namespace App\Events;

use App\Models\Semester;
use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StudentEnrolled
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Semester $semester,
        public User $student,
    ) {}
}
