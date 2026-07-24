<?php

namespace App\Http\Controllers;

use App\Models\Discussion;
use App\Models\DiscussionAnswer;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function toggle(Request $request)
    {
        $validated = $request->validate([
            'votable_type' => 'required|string|in:discussion,discussion_answer',
            'votable_id' => 'required|integer',
            'type' => 'required|string|in:upvote,downvote',
        ]);

        $morphMap = [
            'discussion' => Discussion::class,
            'discussion_answer' => DiscussionAnswer::class,
        ];

        $votable = ($morphMap[$validated['votable_type']])::findOrFail($validated['votable_id']);

        $existingVote = Vote::where([
            'user_id' => Auth::id(),
            'votable_type' => $validated['votable_type'],
            'votable_id' => $validated['votable_id'],
        ])->first();

        if ($existingVote) {
            if ($existingVote->type === $validated['type']) {
                $existingVote->delete();
            } else {
                $existingVote->update(['type' => $validated['type']]);
            }
        } else {
            Vote::create([
                'user_id' => Auth::id(),
                'votable_type' => $validated['votable_type'],
                'votable_id' => $validated['votable_id'],
                'type' => $validated['type'],
            ]);
        }

        return redirect()->back();
    }
}
