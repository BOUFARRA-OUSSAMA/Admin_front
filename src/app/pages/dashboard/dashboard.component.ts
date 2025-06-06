import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import all dashboard components
import { DashboardHeaderComponent } from '../../components/dashboard/dashboard-header/dashboard-header.component';
import { StatCardComponent } from '../../components/dashboard/stat-card/stat-card.component';
import { PatientDemographicsComponent } from '../../components/dashboard/patient-demographics/patient-demographics.component';
import { AgeDistributionComponent } from '../../components/dashboard/age-distribution/age-distribution.component';
import { NewPatientsComponent } from '../../components/dashboard/new-patients/new-patients.component';
import { UpcomingAppointmentsComponent } from '../../components/dashboard/upcoming-appointments/upcoming-appointments.component';
import { NotificationsComponent } from '../../components/dashboard/notifications/notifications.component';
import { WeeklyOverviewComponent } from '../../components/dashboard/weekly-overview/weekly-overview.component';
import { AiAssistantComponent } from '../../components/dashboard/ai-assistant/ai-assistant.component';
import { UserActivityComponent } from '../../components/dashboard/user-activity/user-activity.component';
import { ModuleUsageHeatmapComponent } from '../../components/dashboard/module-usage-heatmap/module-usage-heatmap.component';
import { UserStatusOverviewComponent } from '../../components/dashboard/user-status-overview/user-status-overview.component';
import { UserRegistrationTrendComponent } from '../../components/dashboard/user-registration-trend/user-registration-trend.component';
import { FailedLoginAttemptsComponent } from '../../components/dashboard/failed-login-attempts/failed-login-attempts.component';
import { UserRolesOverviewComponent } from '../../components/dashboard/user-roles-overview/user-roles-overview.component';
// Import the StatItem interface from the StatCardComponent to ensure type compatibility
interface StatItem {
  label: string;
  value: string | number;
  status?: 'normal' | 'warning' | 'urgent' | 'info';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardHeaderComponent,
    StatCardComponent,
    PatientDemographicsComponent,
    AgeDistributionComponent,
    NewPatientsComponent,
    UpcomingAppointmentsComponent,
    NotificationsComponent,
    WeeklyOverviewComponent,
    AiAssistantComponent,
    UserActivityComponent,
    ModuleUsageHeatmapComponent,
    UserStatusOverviewComponent,
    UserRegistrationTrendComponent,
    FailedLoginAttemptsComponent,
    UserRolesOverviewComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentDate = new Date();
  
  // Stats for appointment card
  appointmentStats: StatItem[] = [
    { label: 'Regular checkups', value: '6' },
    { label: 'Urgent cases', value: '2', status: 'urgent' }
  ];
  
  // Stats for patient queue card
  queueStats: StatItem[] = [
    { label: 'Waiting', value: '3' },
    { label: 'Next patient', value: 'Marie L.', status: 'info' }
  ];
  
  // Stats for pending tasks card
  taskStats: StatItem[] = [
    { label: 'Lab Reviews', value: '5' },
    { label: 'Patient Messages', value: '2' }
  ];
}
