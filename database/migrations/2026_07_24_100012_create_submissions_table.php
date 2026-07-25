<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assignment_id')->constrained()->restrictOnDelete();
            $table->foreignId('student_id')->constrained('users')->restrictOnDelete();
            $table->integer('attempt_number')->default(1);
            $table->text('content')->nullable();
            $table->string('file_url')->nullable();
            $table->timestamp('submitted_at')->useCurrent();
            $table->integer('score')->nullable();
            $table->text('feedback')->nullable();
            $table->boolean('is_late')->default(false);
            $table->string('status')->default('submitted');
            $table->boolean('is_struggling')->default(false);
            $table->timestamps();

            $table->unique(['assignment_id', 'student_id', 'attempt_number'], 'sub_assign_student_attempt_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
