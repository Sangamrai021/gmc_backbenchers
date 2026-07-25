<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'institution.create', 'institution.view', 'institution.update', 'institution.delete',
            'semester.create', 'semester.view', 'semester.update', 'semester.delete',
            'section.create', 'section.view', 'section.update', 'section.delete',
            'subject.create', 'subject.view', 'subject.update', 'subject.delete',
            'discussion.create', 'discussion.view', 'discussion.update', 'discussion.delete', 'discussion.moderate',
            'assignment.create', 'assignment.view', 'assignment.update', 'assignment.delete', 'assignment.grade',
            'submission.create', 'submission.view', 'submission.grade',
            'resource.create', 'resource.view', 'resource.delete',
            'announcement.create', 'announcement.view',
            'attendance.view', 'attendance.mark',
            'user.manage',
            'grievance.create', 'grievance.view', 'grievance.update', 'grievance.delete',
            'grievance.manage', 'grievance.moderate',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $superAdmin = Role::create(['name' => 'super_admin']);
        $superAdmin->givePermissionTo(Permission::all());

        $instAdmin = Role::create(['name' => 'institution_admin']);
        $instAdmin->givePermissionTo([
            'institution.view', 'institution.update',
            'semester.create', 'semester.view', 'semester.update', 'semester.delete',
            'section.create', 'section.view', 'section.update', 'section.delete',
            'subject.create', 'subject.view', 'subject.update', 'subject.delete',
            'discussion.view', 'discussion.moderate',
            'assignment.create', 'assignment.view', 'assignment.update', 'assignment.delete', 'assignment.grade',
            'submission.view', 'submission.grade',
            'resource.create', 'resource.view', 'resource.delete',
            'announcement.create', 'announcement.view',
            'attendance.view', 'attendance.mark',
            'user.manage',
            'grievance.view', 'grievance.manage',
        ]);

        $teacher = Role::create(['name' => 'teacher']);
        $teacher->givePermissionTo([
            'subject.view',
            'discussion.create', 'discussion.view', 'discussion.update', 'discussion.delete',
            'assignment.create', 'assignment.view', 'assignment.update', 'assignment.delete', 'assignment.grade',
            'submission.view', 'submission.grade',
            'resource.create', 'resource.view', 'resource.delete',
            'announcement.create', 'announcement.view',
            'attendance.view', 'attendance.mark',
        ]);

        $student = Role::create(['name' => 'student']);
        $student->givePermissionTo([
            'subject.view',
            'discussion.create', 'discussion.view',
            'submission.create', 'submission.view',
            'resource.view',
            'announcement.view',
            'attendance.view',
            'grievance.create', 'grievance.view',
        ]);
    }
}
