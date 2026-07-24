<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->restrictOnDelete(); // The Student
            $table->foreignId('institution_id')->constrained()->restrictOnDelete(); // For multi-tenant isolation
            $table->string('title');
            $table->text('description');
            $table->string('tech_stack'); // e.g., "Laravel, React, Python"
            $table->string('github_url')->nullable();
            $table->string('live_demo_url')->nullable();
            $table->string('thumbnail_url')->nullable(); // Optional UI polish
            $table->enum('status', ['pending', 'published'])->default('published'); // Default published for hackathon speed
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_projects');
    }
};