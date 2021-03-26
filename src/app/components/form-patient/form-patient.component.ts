import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileI } from 'src/app/interface/file';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/users.service';


@Component({
  selector: 'app-form-patient',
  templateUrl: './form-patient.component.html',
  styleUrls: ['./form-patient.component.sass']
})
export class FormPatientComponent implements OnInit
{

  patientForm: FormGroup;
  photo1: FileI;
  photo2: FileI;
  photos: Array<FileI> = new Array();
  registered: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private patientService: PatientService,
    private router:Router
  )
  {
    this.createForm();
  }

  ngOnInit(): void
  {
  }

  createForm()
  {
    this.patientForm = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit()
  {
    try
    {
      /* console.log(this.patientForm.value); */
      this.assignPhotos();
      this.authService.register(this.patientForm.controls.email.value, this.patientForm.controls.password.value).then(user =>
      {
        if (user)
        {
          this.patientService.createPatient(this.patientForm.value, this.photos).then(patient =>
          {
            console.log('Created patient', patient);
            user.updateProfile({
              displayName: patient.name,
            }).then(() =>
            {
              console.log('Now Verify your email to login.');
              this.registered = true;
            })
          });
        }
      }).catch(error => { console.log('Error', error); });

    } catch (error)
    {
      console.error(error);
    }
  }

  handlePhoto1(file)
  {
    this.photo1 = file.target.files[0];
  }

  handlePhoto2(file)
  {
    this.photo2 = file.target.files[0];
  }

  assignPhotos()
  {
    if (this.photo1)
    {
      this.photos.push(this.photo1);
    }/* 
    if(this.photo2){
      this.photos.push(this.photo2);
    } */
  }

  navigate(){
    this.router.navigate(['/login']);
  }




}
