import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './users/components/user-list/user-list.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { BooksListComponent } from './book-store/components/books-list/books-list.component';

const routes: Routes = [
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'users/list',component:UserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'books/list',component:BooksListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
