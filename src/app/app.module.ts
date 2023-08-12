import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PageFooterComponent } from './Layout/page-footer/page-footer.component';
import { SideNavComponent } from './Layout/side-nav/side-nav.component';
import { PageHeaderComponent } from './Layout/page-header/page-header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { ManageUserComponent } from './users/components/manage-user/manage-user.component';
import { UserListComponent } from './users/components/user-list/user-list.component';
import { BooksListComponent } from './book-store/components/books-list/books-list.component';
import { ManageBooksComponent } from './book-store/components/manage-books/manage-books.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    SideNavComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    ManageUserComponent,
    UserListComponent,
    BooksListComponent,
    ManageBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [""],
        disallowedRoutes: [""],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
