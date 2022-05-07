import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'empolyee-list' },
   
  { path: 'empolyee-list', component: EmployeesListComponent }
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
