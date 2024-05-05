import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IStaff } from '../pages/shared/models/Staff';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  apiurl = 'https://localhost:44364/api/Staff';
  constructor(private http: HttpClient) { }

  // Get all staff members
  getAllStaff():Observable<ApiResponse<IStaff[]>>{
    return this.http.get<ApiResponse<IStaff[]>>(`${this.apiurl}`);
  }

  // Get a single staff member
  getStaff(): Observable<ApiResponse<IStaff[]>> {
    return this.http.get<ApiResponse<IStaff[]>>(`${this.apiurl}`);
  }

  // Create a new staff member
  createStaff(staff: IStaff): Observable<any> {
    return this.http.post(`${this.apiurl}`, staff);
  }

  // Update an existing staff member
  updateStaff(id: number, staff: IStaff): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, staff);
  }

  // Delete a staff member
  deleteStaff(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/${id}`);
  }
  // Search for staff members based on criteria
  searchStaff(staffId?: string, gender?: number, fromDate?: Date, toDate?: Date): Observable<ApiResponse<IStaff[]>> {
    // Construct query parameters
    let params = new HttpParams();
    if (staffId) params = params.set('staffId', staffId);
    if (gender) params = params.set('gender', gender.toString());
    if (fromDate) params = params.set('fromDate', formatDate(fromDate, 'yyyy-MM-dd', 'en'));
    if (toDate) params = params.set('toDate', formatDate(toDate, 'yyyy-MM-dd', 'en'));

    // Make GET request with query parameters
    return this.http.get<ApiResponse<IStaff[]>>(`${this.apiurl}/Search`, { params });
  }
}
