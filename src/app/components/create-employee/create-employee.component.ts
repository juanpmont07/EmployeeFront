import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee-service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    public empServ: EmployeeService) { }

  onClose() {
    this.dialogRef.close();
  }

  employee: any;

  ngOnInit(): void {

    this.empServ.getAll().subscribe(
       res => {
        if(res){
        this.employee = res;
        }
       }
    );
  }

  onSubmit(){
    if (this.empServ.formExternalList.valid) {
       debugger;
      const id = this.empServ.formExternalList.controls.id.value;
      const name = this.empServ.formExternalList.controls.name.value;
      const lastname = this.empServ.formExternalList.controls.lastname.value;
      const phone = this.empServ.formExternalList.controls.phone.value;
      const email = this.empServ.formExternalList.controls.email.value;
      const boss = this.empServ.formExternalList.controls.idBoss.value;

      var emp = new Employee();
      emp.email = email;
      emp.id = id;
      emp.idBoss = boss.id;
      emp.name = name;
      emp.phone = phone;
      emp.lastname = lastname;

      this.empServ.create(emp).subscribe(
        res => {
           alert("Save successful")
        },
        error => {
          alert("Error")
        }
      );
    }
  }

}
