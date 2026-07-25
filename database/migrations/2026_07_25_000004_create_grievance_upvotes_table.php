<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('grievance_upvotes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('grievance_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('session_id', 100)->nullable();
            $table->string('anonymous_uuid', 36)->nullable();
            $table->timestamps();

            $table->unique(['grievance_id', 'user_id']);
            $table->index('anonymous_uuid');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('grievance_upvotes');
    }
};