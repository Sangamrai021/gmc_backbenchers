<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('grievance_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('grievance_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type', 50);
            $table->text('description');
            $table->boolean('is_public')->default(true);
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index('type');
            $table->index('grievance_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('grievance_events');
    }
};