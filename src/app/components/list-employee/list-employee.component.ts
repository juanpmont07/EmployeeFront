import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee-service';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  constructor(
    private dialogUploadRecords: MatDialog,
    private employeeSer: EmployeeService
  ) { }


  public searchKey: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public listEmployee: any;
  public displayedColumns: string[] = ['id', 'Name', 'LastName', 'Phone',
  'Email', 'idBoss', 'action'];

  ngOnInit(): void {
    this.getList();
  }

  ngOnChanges(): void {
    
  }

  onUploadRecords(){
    this.employeeSer.iniForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    const dialogRef = this.dialogUploadRecords.open(CreateEmployeeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.getList();
     });
  }

  onEditRecords(emp: Employee){
    this.employeeSer.setForm(emp);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    const dialogRef = this.dialogUploadRecords.open(EditEmployeeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.getList();
     });
  }

  onDelete(emp: Employee){
    this.employeeSer.delete(emp).subscribe(
      rest=>{
        alert("Delete successful")
        this.getList();
      },  error => {
        alert("Error")
      }
    )
  }
  
  applyFilter() {
    this.listEmployee.filter = this.searchKey.trim().toLowerCase();
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
    this.getList();
  }


  
  getList() {
    this.employeeSer.getAll().subscribe(
      res => {
        if (res) {
          this.listEmployee = res;
          this.listEmployee = new MatTableDataSource(this.listEmployee);
          this.listEmployee.paginator = this.paginator;
          this.listEmployee.sort = this.sort;
        }
      }, error => {
        alert('xxxx')
      });
  }

}
