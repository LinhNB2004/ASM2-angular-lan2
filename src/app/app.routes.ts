import { ProductAddComponent } from './Pages/product-add/product-add.component';
import { Routes } from '@angular/router';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ProductEditComponent } from './Pages/product-edit/product-edit.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'product-add', component: ProductAddComponent },
      { path: 'product-edit/:id', component: ProductEditComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];
