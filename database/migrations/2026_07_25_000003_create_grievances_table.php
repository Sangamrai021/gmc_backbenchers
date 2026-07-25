<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('grievances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('institution_id')->constrained()->cascadeOnDelete();
            $table->foreignId('semester_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('subject_id')->nullable()->constrained()->nullOnDelete();
            $table->string('reference_code', 20)->unique();
            $table->foreignId('category_id')->nullable()->constrained('grievance_categories')->nullOnDelete();
            $table->string('title', 255);
            $table->text('description');
            $table->string('priority', 20)->default('medium');
            $table->string('user_priority', 20)->nullable();
            $table->string('admin_priority', 20)->nullable();
            $table->timestamp('priority_reviewed_at')->nullable();
            $table->foreignId('priority_reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status', 20)->default('received');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('is_anonymous')->default(true);
            $table->string('reporter_ip', 45)->nullable();
            $table->string('reporter_ip_hash', 64)->nullable();
            $table->string('anonymous_uuid', 36)->nullable();
            $table->string('photo_path')->nullable();
            $table->string('video_path')->nullable();
            $table->float('spam_score')->nullable();
            $table->timestamp('hidden_at')->nullable();
            $table->string('moderation_status', 20)->default('approved');
            $table->foreignId('duplicate_of_id')->nullable()->constrained('grievances')->nullOnDelete();
            $table->timestamp('resolved_at')->nullable();
            $table->text('resolution_summary')->nullable();
            $table->foreignId('resolved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->unsignedTinyInteger('feedback_rating')->nullable();
            $table->text('feedback_comment')->nullable();
            $table->timestamp('feedback_at')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->index('reference_code');
            $table->index('anonymous_uuid');
            $table->index('reporter_ip_hash');
            $table->index('status');
            $table->index('hidden_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('grievances');
    }
};