<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Discussion extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'discussionable_id',
        'discussionable_type',
        'title',
        'body',
        'category',
        'is_anonymous',
        'status',
        'tracking_token',
    ];

    protected function casts(): array
    {
        return [
            'is_anonymous' => 'boolean',
        ];
    }

    protected $appends = ['author_name'];
    protected $with = ['user'];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function discussionable(): \Illuminate\Database\Eloquent\Relations\MorphTo
    {
        return $this->morphTo();
    }

    public function answers(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(DiscussionAnswer::class);
    }

    public function votes(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Vote::class, 'votable');
    }

    public function getAuthorNameAttribute(): string
    {
        if ($this->is_anonymous) {
            return $this->user->anonymous_name ?? 'Anonymous';
        }
        return $this->user->name;
    }

    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }
}
