import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientManagementComponent } from './pages/patient-management/patient-management.component';
import { AppointmentCalendarComponent } from './pages/appointment-calendar/appointment-calendar.component';
import { PatientRecordComponent } from './pages/patient-record/patient-record.component';
import { PrescriptionComponent } from './pages/prescription/prescription.component';
import { AiDiagnosticComponent } from './pages/ai-diagnostic/ai-diagnostic.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { RolesComponent } from './pages/roles/roles.component';
import { RolePageComponent } from './pages/role-page/role-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientManagementComponent },
      { path: 'calendar', component: AppointmentCalendarComponent },
      { path: 'patient/:id', component: PatientRecordComponent },
      { path: 'prescription', component: PrescriptionComponent },
      { path: 'ai-diagnostic', component: AiDiagnosticComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user-page/:id', component: UserPageComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'role/:id', component: RolePageComponent },
    ]
  }
];
