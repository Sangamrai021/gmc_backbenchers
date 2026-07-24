<?php

namespace App\Policies;

use App\Models\Assignment;
use App\Models\Discussion;
use App\Models\Subject;
use App\Models\User;

class DiscussionPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Discussion $discussion): bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        $discussionable = $discussion->discussionable;

        if ($discussionable instanceof Subject) {
            if ($user->isTeacher()) {
                return $user->taughtSubjects()->where('subject_id', $discussionable->id)->exists();
            }
            if ($user->isStudent()) {
                return $user->enrolledSemesters()->where('semester_id', $discussionable->semester_id)->exists();
            }
            if ($user->isInstitutionAdmin()) {
                return $user->institutions()->where('institutions.id', $discussionable->semester->institution_id)->exists();
            }
            return false;
        }

        if ($discussionable instanceof Assignment) {
            return $this->view($user, $discussionable->discussions()->first() ?? new Discussion);
        }

        return $user->id === $discussion->user_id;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['student', 'teacher']);
    }

    public function update(User $user, Discussion $discussion): bool
    {
        return $user->id === $discussion->user_id || $user->isInstitutionAdmin() || $user->isSuperAdmin();
    }

    public function delete(User $user, Discussion $discussion): bool
    {
        if ($user->isSuperAdmin() || $user->isInstitutionAdmin()) {
            return true;
        }

        if ($user->id === $discussion->user_id) {
            return true;
        }

        $discussionable = $discussion->discussionable;

        if ($discussionable instanceof Subject && $user->isTeacher()) {
            return $user->taughtSubjects()->where('subject_id', $discussionable->id)->exists();
        }

        return false;
    }
}
