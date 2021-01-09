import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './pages/books/books.component';
import { Err404Component } from './pages/err404/err404.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SingleBookComponent } from './pages/single-book/single-book.component';
import { SingleuserComponent } from './pages/singleuser/singleuser.component';
import { UserComponent } from './pages/user/user.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent,canActivate:[UserGuard]},
  {path:"allBooks",component:BooksComponent},
  {path:"allWriters",component:UserComponent},
  {path:"singleBook/:id",component:SingleBookComponent},
  {path:"singleUser/:id",component:SingleuserComponent},
  {path:'**',component:Err404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
