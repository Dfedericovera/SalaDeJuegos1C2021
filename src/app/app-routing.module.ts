import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup-user/signup.component';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { SaladechatComponent } from './pages/saladechat/saladechat.component';
const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent, data: {animation: 'login'} },
  {path: 'signup',component: SignupComponent, data: {animation: 'signup'} },
  {path: 'home',component: MenuPrincipalComponent,data: {animation: 'home'}},
  {path: 'quiensoy',component: QuienSoyComponent,data: {animation: 'home'}},
  {path: 'saladechat',component: SaladechatComponent,data: {animation: 'home'}},
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
