<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mentor_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('discussion_id')->constrained()->cascadeOnDelete(); // The anonymous question
            $table->foreignId('mentee_id')->constrained('users')->cascadeOnDelete(); // The shy student
            $table->foreignId('mentor_id')->nullable()->constrained('users')->cascadeOnDelete(); // The senior who helps
            $table->string('topic');
            $table->enum('status', ['requested', 'accepted', 'completed'])->default('requested');
            $table->text('mentor_notes')->nullable();
            $table->timestamps();
        });

        // Add a simple badge counter to the users table
        Schema::table('users', function (Blueprint $table) {
            $table->integer('mentor_badges_count')->default(0)->after('anonymous_name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mentor_sessions');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('mentor_badges_count');
        });
    }
};