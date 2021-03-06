import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup-user/signup.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormUserComponent } from './components/form-user/form-user.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AlertComponent } from './components/alert/alert.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { DatePipe } from '@angular/common';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { SalaDeChatComponent } from './pages/sala-de-chat/sala-de-chat.component';
import { MenujuegosComponent } from './pages/menujuegos/menujuegos.component';
import { PptComponent } from './pages/ppt/ppt.component';
import { TatetiComponent } from './pages/tateti/tateti.component';
import { MemotestComponent } from './pages/memotest/memotest.component';
import { CaraosecaComponent } from './pages/caraoseca/caraoseca.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    HeaderComponent,
    CarouselComponent,
    LoginComponent,
    SignupComponent,
    FormUserComponent,
    AlertComponent,
    QuienSoyComponent,
    SalaDeChatComponent,
    MenujuegosComponent,
    PptComponent,
    TatetiComponent,
    MemotestComponent,
    CaraosecaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    RecaptchaModule,  //this is the recaptcha main module
    RecaptchaFormsModule, //this is the module for form incase form validation
    HttpClientModule,
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
