import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all card components used in the template
import { VitalSignsCardComponent } from '../vital-signs-card/vital-signs-card.component';
import { MedicationsCardComponent } from '../medications-card/medications-card.component';
import { MedicalHistoryCardComponent } from '../medical-history-card/medical-history-card.component';
import { LabResultsCardComponent } from '../lab-results-card/lab-results-card.component';
import { AppointmentHistoryCardComponent } from '../appointment-history-card/appointment-history-card.component';
import { DoctorNotesCardComponent } from '../doctor-notes-card/doctor-notes-card.component';

@Component({
  selector: 'app-tab-summary',
  standalone: true,
  imports: [
    CommonModule,
    VitalSignsCardComponent,
    MedicationsCardComponent,
    MedicalHistoryCardComponent,
    LabResultsCardComponent,
    AppointmentHistoryCardComponent,
    DoctorNotesCardComponent
  ],
  templateUrl: './tab-summary.component.html',
})
export class TabSummaryComponent implements OnChanges {
  @Input() patient: any = null; // Initialize with default value
  @Input() vitals: any[] = []; // Initialize with empty array
  @Input() medications: any[] = []; // Initialize with empty array
  @Input() conditions: any[] = []; // Initialize with empty array
  @Input() labResults: any[] = []; // Initialize with empty array
  @Input() appointments: any[] = []; // Initialize with empty array
  @Input() patientNotes: any[] = []; // Add missing patientNotes input
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    // Log when input data changes to help with debugging
    const changedInputs = Object.keys(changes);
    console.log('TabSummaryComponent inputs changed:', changedInputs.join(', '));
    
    // Log lengths of arrays to verify data is received
    if (changedInputs.length > 0) {
      console.log('TabSummaryComponent data status:', {
        patient: this.patient ? 'present' : 'missing',
        vitals: this.vitals?.length || 0,
        medications: this.medications?.length || 0,
        conditions: this.conditions?.length || 0,
        labResults: this.labResults?.length || 0,
        appointments: this.appointments?.length || 0,
        patientNotes: this.patientNotes?.length || 0
      });
    }
    
    // Force change detection
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }
}