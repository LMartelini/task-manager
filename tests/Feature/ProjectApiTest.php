<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProjectApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_project(): void
    {
        $response = $this->postJson('/api/projects', [
            'name' => 'Test Project',
            'description' => 'Testing project creation',
            'status' => 'active',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('projects', [
            'name' => 'Test Project',
        ]);
    }

    public function test_can_create_task_for_project(): void
    {
        $project = \App\Models\Project::factory()->create();

        $response = $this->postJson("/api/projects/{$project->id}/tasks", [
            'title' => 'New Task',
            'description' => 'Testing task creation',
            'status' => 'todo',
            'priority' => 'high',
            'due_date' => now()->addDays(5)->format('Y-m-d'),
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('tasks', [
            'title' => 'New Task',
            'project_id' => $project->id,
        ]);
    }

    public function test_can_update_task_status(): void
    {
        $task = \App\Models\Task::factory()->create([
            'status' => 'todo'
        ]);

        $response = $this->patchJson("/api/tasks/{$task->id}", [
            'status' => 'done'
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'status' => 'done'
        ]);
    }

    public function test_can_delete_task(): void 
    {
        $task = \App\Models\Task::factory()->create();

        $response = $this->deleteJson("api/tasks/{task}/{$task->id}");

        $response->assertStatus(200);

        $this->assertSoftDeleted('tasks', [
            'id' => $task->id,
        ]);
    }
}
