import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../shared/employee-service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-employee-component',
  styleUrl: './employee-component.css',
  templateUrl: './employee-component.html',
})
export class EmployeeComponent implements OnInit {

  builder = inject(FormBuilder)
  employeeApi = inject(EmployeeService)


  // employees: any[] = [];
  employees = signal<any[]>([])

  employeeForm = this.builder.group({
    name: [''],
    city: [''],
    salary: [''],
    positionId: ['']
  })

  visibleModal = false

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this.getEmployees()
    } else {
      console.warn('no token found');
    }
    
  }

   getEmployees() {
    this.employeeApi.getEmployees().subscribe({
      next: (res: any) => {
        console.log(res)
        this.employees.set(Array.isArray(res) ? res : (res?.data ?? []));
      },
      error: (err) => {
        console.error('Failed to load employees:', err);
        this.employees.set([]);
      }
    });
  }


  toggleModal() {
    this.visibleModal = ! this.visibleModal
  }

  saveEmployee() {
    this.createEmployee()
  }

  createEmployee() {
    // szogáltatás hívása
    this.employeeApi.createEmployee(this.employeeForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.getEmployees();
        this.employeeForm.reset();
        this.toggleModal();
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
