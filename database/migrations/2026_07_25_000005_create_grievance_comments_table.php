<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('grievance_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('grievance_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('session_id', 100)->nullable();
            $table->foreignId('parent_id')->nullable()->constrained('grievance_comments')->cascadeOnDelete();
            $table->text('body');
            $table->boolean('is_public')->default(true);
            $table->boolean('is_approved')->default(false);
            $table->timestamp('hidden_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('grievance_comments');
    }
};