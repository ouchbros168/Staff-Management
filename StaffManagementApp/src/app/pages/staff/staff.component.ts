import { Component ,OnInit,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { StaffFormComponent } from '../staff-form/staff-form.component';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from '../../services/staff.service';
import { IStaff } from '../shared/models/Staff';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [ModelComponent,ReactiveFormsModule, StaffFormComponent],
  templateUrl: './staff.component.html',
  styles: ``
})
export class StaffComponent implements OnInit{
  @Output() onCloseModel = new EventEmitter();
  isModelOpen = false;
  isSearchModelOpen = false;
  staffs: IStaff[] = [];
  staff!: IStaff;
  @ViewChild(StaffFormComponent) staffFormComponent!: StaffFormComponent;
  searchForm!: FormGroup;
  constructor(
    private staffService: StaffService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      staffId: new FormControl(''),
      gender: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getAllStaff();
  }

  getAllStaff() {
    this.staffService.getAllStaff().subscribe({
      next: (response) => {
        if (response.data) {
          // Format the date for each staff member
          this.staffs = response.data.map(staff => {
            return {
              ...staff,
              birthDay: formatDate(staff.birthDay, 'yyyy-MM-dd', 'en')
            };
          });
        }
      },
    });
  }

  loadStaff(staff: IStaff) {
    this.staff = staff;
    this.openModel();
  }

  deleteStaff(id: number) {
    this.staffService.deleteStaff(id).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getAllStaff();
      },
    });
  }

  openModel() {
    this.staffFormComponent.data = null;
    this.staffFormComponent.resetStaffForm();
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllStaff();
  }
  openSearchModel() {
    this.isSearchModelOpen = true;
  }
  closeSearchModel() {
    this.isSearchModelOpen = false;
    this.getAllStaff();
  }

  onSearchClose() {
    this.onCloseModel.emit(false);
    this.isSearchModelOpen = false;
  }

  ngOnChanges(): void {
    this.searchForm.patchValue({
      staffId: '',
      gender: '',
      fromDate:'',
      toDate:''
    });
  }
  onSearch() {
    if (this.searchForm.valid) {
      const { staffId, gender, fromDate, toDate } = this.searchForm.value;
      // Trigger search operation using the provided criteria
      this.staffService.searchStaff(staffId, gender, fromDate, toDate).subscribe({
        next: (response) => {
          if (response.data) {
            if(response.data.length>0){
              this.staffs = response.data.map(staff => {
                return {
                  ...staff,
                  birthDay: formatDate(staff.birthDay, 'yyyy-MM-dd', 'en')
                };
              });
            }else{
              this.staffs = [];
            }
           
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
  
  exportToExcel(): void {
    const data = this.staffs.map(staff => [staff.staffId, staff.fullName, staff.birthDay, staff.gender == 1 ? 'Male' : 'Female']);
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([['Staff ID', 'Fullname', 'Birthday', 'Gender'], ...data]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Staff Data');
    XLSX.writeFile(wb, 'staff_data.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    doc.text('Staff Data', 10, 10); // Title
    // Specify the type for staffData array
   const staffData: any[] = [];
    this.staffs.forEach((staff, index) => {
      staffData.push([index + 1, staff.staffId, staff.fullName, staff.birthDay, staff.gender == 1 ? 'Male' : 'Female']);
    });
   
    (doc as any).autoTable({
      head: [['#', 'Staff ID', 'Fullname', 'Birthday', 'Gender']],
      body: staffData
    });
    doc.save('staff_data.pdf');
  }
  
}
