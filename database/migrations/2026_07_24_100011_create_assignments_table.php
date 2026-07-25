<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->foreignId('section_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('teacher_id')->constrained('users')->cascadeOnDelete();
            $table->string('status')->default('draft');
            $table->timestamp('start_date')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('attachment')->nullable(); // Legacy, keeping for backwards compatibility
            $table->json('attachments')->nullable();
            $table->integer('max_score')->nullable();
            $table->integer('passing_score')->nullable();
            $table->timestamp('due_date')->nullable();
            $table->boolean('allow_late_submission')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};
