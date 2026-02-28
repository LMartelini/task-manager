<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::factory()
            ->count(5)
            ->create()
            ->each(function ($project) {

                $project->tasks()->createMany(
                    \App\Models\Task::factory()
                        ->count(rand(8, 15))
                        ->make()
                        ->toArray()
                );
            });
    }
}
