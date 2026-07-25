<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('assignments', function (Blueprint $table) {
            $table->string('status')->default('draft')->after('teacher_id');
            $table->timestamp('start_date')->nullable()->after('status');
            $table->integer('passing_score')->nullable()->after('max_score');
            $table->json('attachments')->nullable()->after('description');
            $table->foreignId('section_id')->nullable()->constrained()->nullOnDelete()->after('subject_id');
        });

        Schema::table('submissions', function (Blueprint $table) {
            $table->integer('attempt_number')->default(1)->after('student_id');
            $table->boolean('is_struggling')->default(false)->after('status');
            
            // Drop old unique constraint
            $table->dropUnique(['assignment_id', 'student_id']);
            // Add new unique constraint including attempt_number
            $table->unique(['assignment_id', 'student_id', 'attempt_number']);
        });
    }

    public function down(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropUnique(['assignment_id', 'student_id', 'attempt_number']);
            $table->unique(['assignment_id', 'student_id']);
            $table->dropColumn(['attempt_number', 'is_struggling']);
        });

        Schema::table('assignments', function (Blueprint $table) {
            $table->dropForeign(['section_id']);
            $table->dropColumn(['status', 'start_date', 'passing_score', 'attachments', 'section_id']);
        });
    }
};
