import { Component ,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { IStaff } from '../shared/models/Staff';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StaffService } from '../../services/staff.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './staff-form.component.html',
  styles: ``
})
export class StaffFormComponent implements OnChanges {
  @Input() data: IStaff | null = null;
  @Output() onCloseModel = new EventEmitter();

  staffForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private toastr: ToastrService
  ) {
    this.staffForm = this.fb.group({
      staffId: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      fullName: new FormControl('', [Validators.required]),
      birthDay: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.staffForm.patchValue({
        staffId: this.data.staffId,
        fullName: this.data.fullName,
        birthDay: formatDate(this.data.birthDay, 'yyyy-MM-dd', 'en'),
        gender: this.data.gender,
      });
    }
  }
  onSubmit() {
    if (this.staffForm.valid) {
      if (this.data) {
        const formData = this.staffForm.value;
        const updatedData = {
          staffId: formData.staffId,
          fullName: formData.fullName,
          birthDay: formData.birthDay,
          gender: formData.gender,
          id: this.data.id
        };
        this.staffService
          .updateStaff(this.data.id, updatedData)
          .subscribe({
            next: (response: any) => {
              this.resetStaffForm();
              this.toastr.success(response.message);
            },
            error: (error: any) => {
              this.toastr.error('Failed to update staff: ' + error.error.message);
            }
          });
      } else {
        this.staffService.createStaff(this.staffForm.value).subscribe({
          next: (response: any) => {
            this.resetStaffForm();
            this.toastr.success(response.message);
          },
          error: (error: any) => {
            this.toastr.error('Failed to create staff: ' + error.error.message);
          }
        });
      }
    } else {
      this.staffForm.markAllAsTouched();
      this.toastr.error('Please fill in all required fields.');
    }
  }

  // onSubmit() {
  //   if (this.staffForm.valid) {
      
  //     if (this.data) {
  //       const formData = this.staffForm.value;
  //       const updatedData = {
  //         staffId: formData.staffId,
  //         fullName: formData.fullName,
  //         birthDay: formData.birthDay,
  //         gender: formData.gender,
  //         id: this.data.id
  //       };
  //       this.staffService
  //         .updateStaff(this.data.id, updatedData)
  //         .subscribe({
  //           next: (response: any) => {
  //             this.resetStaffForm();
  //             this.toastr.success(response.message);
  //           },
  //         });
  //     } else {
  //       this.staffService.createStaff(this.staffForm.value).subscribe({
  //         next: (response: any) => {
  //           this.resetStaffForm();
  //           this.toastr.success(response.message);
  //         },
  //       });
  //     }
  //   } else {
  //     this.staffForm.markAllAsTouched();
  //   }
  // }

  resetStaffForm() {
    this.staffForm.reset();
    this.onClose();
  }
}
