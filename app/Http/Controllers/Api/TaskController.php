<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Models\Project;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    public function index(Project $project)
    {
        $query = $project->tasks();

        if (request('status')) {
            $query->where('status', request('status'));
        }

        if (request('priority')) {
            $query->where('priority', request('priority'));
        }

        $tasks = $query->paginate(10);

        return TaskResource::collection($tasks);
    }

    public function store(StoreTaskRequest $request, Project $project)
    {
        $task = $project->tasks()->create(
            $request->validated()
        );

        return new TaskResource($task);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return new TaskResource($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully'
        ]);
    }
}