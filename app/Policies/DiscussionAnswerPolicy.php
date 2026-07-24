<?php

namespace App\Policies;

use App\Models\DiscussionAnswer;
use App\Models\User;

class DiscussionAnswerPolicy
{
    public function create(User $user): bool
    {
        return in_array($user->role, ['student', 'teacher']);
    }

    public function update(User $user, DiscussionAnswer $answer): bool
    {
        return $user->id === $answer->user_id;
    }

    public function delete(User $user, DiscussionAnswer $answer): bool
    {
        return $user->id === $answer->user_id || $user->isInstitutionAdmin() || $user->isSuperAdmin();
    }
}
