import { Component ,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StaffService } from '../../services/staff.service'; 
@Component({
  selector: 'app-staff-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './staff-search.component.html',
  styles: ``
})
export class StaffSearchComponent implements OnChanges {
  @Input() data: [] | null = null;
  @Output() onCloseModel = new EventEmitter();

  searchForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
  ) {
    this.searchForm = this.fb.group({
      staffId: new FormControl(''),
      gender: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }
  onSearchClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.searchForm.patchValue({
        staffId: '',
        gender: '',
        fromDate:'',
        toDate:''
      });
    }
  }
  onSearch() {
    if (this.searchForm.valid) {
      const { staffId, gender, fromDate, toDate } = this.searchForm.value;
      // Trigger search operation using the provided criteria
      this.staffService.searchStaff(staffId, gender, fromDate, toDate).subscribe({
        next: (response) => {
          if (response.data) {
            console.log(response.data);
           
          }
        },
        error: (error) => {
          console.error('Error occurred while searching:', error);
        }
      });
    } 
  }
  resetSearchForm() {
    this.searchForm.reset();
    this.onSearchClose();
  }
}
