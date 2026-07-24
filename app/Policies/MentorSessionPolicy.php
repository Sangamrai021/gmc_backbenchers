<?php

namespace App\Policies;

use App\Models\MentorSession;
use App\Models\User;

class MentorSessionPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function accept(User $user, MentorSession $mentorSession): bool
    {
        return $user->id !== $mentorSession->mentee_id && $mentorSession->status === 'requested';
    }

    public function complete(User $user, MentorSession $mentorSession): bool
    {
        return $user->id === $mentorSession->mentor_id && $mentorSession->status === 'accepted';
    }
}
