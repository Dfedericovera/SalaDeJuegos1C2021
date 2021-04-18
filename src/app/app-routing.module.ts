import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup-user/signup.component';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
const routes: Routes = [
  {path: 'login',component: LoginComponent, data: {animation: 'login'} },
  {path: 'signup',component: SignupComponent, data: {animation: 'signup'} },
  {path: 'home',component: MenuPrincipalComponent,data: {animation: 'home'}},
  {path: 'quiensoy',component: QuienSoyComponent,data: {animation: 'home'}},
  { path: ``, redirectTo: `login`, pathMatch: `full` }
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
