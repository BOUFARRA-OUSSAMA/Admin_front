import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-tabs.component.html',
})
export class PatientTabsComponent implements OnInit, OnChanges {
  @Input() activeTab: string = 'summary';
  @Output() tabChange = new EventEmitter<string>();
  
  // Display names for the tabs
  primaryTabs: string[] = ['Summary', 'Timeline', 'History', 'Lab Results', 'Prescriptions'];
  secondaryTabs: string[] = ['Documents','Imaging', 'Notes', 'Appointments', 'Billing'];
  
  // Maps for conversion between display names and internal values
  private tabMap: Map<string, string> = new Map();
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTab']) {
      // Force change detection when activeTab changes
      this.cdr.detectChanges();
    }
  }
  
  ngOnInit(): void {
    // Initialize the mapping between display names and values
    this.initializeTabMaps();    
    // Force initial tab detection
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }
  
  private initializeTabMaps(): void {
    // Create mappings for primary tabs
    this.primaryTabs.forEach(tab => {
      const value = tab.toLowerCase().replace(/ /g, '-');
      this.tabMap.set(tab, value);
    });
    
    // Create mappings for secondary tabs
    this.secondaryTabs.forEach(tab => {
      const value = tab.toLowerCase().replace(/ /g, '-');
      this.tabMap.set(tab, value);
    });
  }
  
  setActiveTab(tab: string): void {
    const tabValue = this.tabMap.get(tab) || tab.toLowerCase().replace(/ /g, '-');
    console.log(`Setting active tab: ${tab} → ${tabValue}`);
    this.tabChange.emit(tabValue);
  }
  
  isTabActive(tab: string): boolean {
    const tabValue = this.tabMap.get(tab) || tab.toLowerCase().replace(/ /g, '-');
    const isActive = this.activeTab === tabValue;
    return isActive;
  }
}