import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../email-validator.directive';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

interface IEmployee {
  name: string;
  email: string;
  address: string;
  phone: number;
}

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employeeData: any = [];
  isOpenAddModal: boolean = false;
  reactiveForm!: FormGroup;
  employee: IEmployee;
  closeResult: string = '';
  actionLabel: string = '';
  searchText = '';
  employeeTodelete: IEmployee;

  sampleData: any = [
    {
      name: 'krishna',
      email: 'kridh@gmail.com',
      address: 'Latif residence,Dubai',
      phone: '0569034556',
    },
    {
      name: 'Mukundha',
      email: 'mukundha@gmail.com',
      address: 'Brundhavan,Dwaraka',
      phone: '0569034556',
    },
    {
      name: 'Moorari',
      email: 'morrari@gmail.com',
      address: 'Srinivasa Hills,Thirumala',
      phone: '0569034556',
    },
    {
      name: 'Achuytha',
      email: 'kesava@gmail.com',
      address: 'SriRam nagar,Ayodhya',
      phone: '0569034556',
    },
  ];

  constructor(private modalService: NgbModal) {
    this.employee = {} as IEmployee;
    this.employeeTodelete = {} as IEmployee;
    let existingData: any = localStorage.getItem('employees-list');
    if (
      existingData.lenght > 0 &&
      existingData != null &&
      existingData != undefined
    ) {
      this.employeeData = JSON.parse(existingData);
    } else {
      this.employeeData = this.sampleData;
      localStorage.setItem('employees-list', this.sampleData);
    }
  }
  ngOnInit() {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.employee.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      email: new FormControl(this.employee.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        emailValidator(),
      ]),
      address: new FormControl(this.employee.address, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2000),
      ]),
      phone: new FormControl(this.employee.phone, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
    });
  }
  addEmployee() {
    this.reactiveForm.setValue({
      name: '',
      address: '',
      email: '',
      phone: '',
    });
  }
  setEmployeeObjectToDelete(employee: IEmployee) {
    this.employeeTodelete = employee;
  }
  removeEmployee() {
    const findIndex = this.employeeData.findIndex(
      (e: { name: string }) => e.name === this.employeeTodelete.name
    );

    findIndex !== -1 && this.employeeData.splice(findIndex, 1);
    localStorage.removeItem('employees-list');
    localStorage.setItem('employees-list', this.employeeData);
  }

  deleteEmployeeData() {
    this.employeeData = [];
    localStorage.setItem('employees-list', this.employeeData);
  }
  open(content: any, action: string) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    action === 'edit'
      ? (this.actionLabel = 'Save')
      : (this.actionLabel = 'Add');
  }

  editEmployee(employee: IEmployee) {
    this.reactiveForm.setValue({
      name: employee.name,
      address: employee.address,
      email: employee.email,
      phone: employee.phone,
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get name() {
    return this.reactiveForm.get('name')!;
  }

  get address() {
    return this.reactiveForm.get('address')!;
  }

  get email() {
    return this.reactiveForm.get('email')!;
  }

  get phone() {
    return this.reactiveForm.get('phone')!;
  }

  public validate(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.employee = this.reactiveForm.value;

    //this.isOpenAddModal=true;
    this.employeeData.push({
      name: this.employee.name,
      email: this.employee.email,
      address: this.employee.address,
      phone: this.employee.phone,
    });
    localStorage.removeItem('employees-list');
    localStorage.setItem('employees-list', this.employeeData);
    this.modalService.dismissAll();
  }
}
