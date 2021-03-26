import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Patient } from '../clases/Usuario';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from '../interface/file';
@Injectable({
  providedIn: 'root'
})
export class PatientService
{
  //Este contendra una Coleccion de patients de la DB.
  private patientsDB: AngularFirestoreCollection<Patient>;
  public patients: Array<Patient>;
  private filePath: any;
  private downloadURL: Observable<string>;


  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  )
  {
    this.getPatients().subscribe(patients =>
    {
      this.patients = patients;
    })
    //? Accedemos a la base de datos de firebase.
    //? Vamos a acceder la lista de patients en la db.
    //? y se implementa la funcionalidad en el segundo argumento.
    //? La referencia que es nuestra lista de patients, se va a ordenar por nombre.
    this.patientsDB = this.db.collection('/patients', (ref) =>
      ref.orderBy('date')
    );
  }

  //Devuelve un Observable de tipo Patient Array.
  getPatients(): Observable<Patient[]>
  {
    return this.db.collection("patients", (ref) =>
      ref.orderBy('date')).snapshotChanges().pipe(
        map((snaps) =>
          snaps.map((snap) =>
          {
            return snap.payload.doc.data() as Patient;
          }))
      )
  }

  createPatient(patient: Patient, photos: Array<FileI>)
  {
    return this.addPatient(patient).then(patientCallback =>
    {
      console.log('Patient created');
      photos.forEach(photo =>
      {
        this.uploadImage(patient, photo);
      })
      return patientCallback;
    })

  }

  //Metodo para crear un nuevo Patient en la DB
  private addPatient(patient: Patient)
  {
    //?Con esto FireBase se encarga de todo,
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo paciente a la tabla.
    return new Promise<Patient>((resolve, reject) =>
    {
      this.patientsDB
        .add(JSON.parse(JSON.stringify(patient)))
        .then(res =>
        {
          patient.id = res.id;
          this.editPatient(patient);
          resolve(patient);
        }, err => reject(console.error(err)));
    });

  }

  //Delete a Patient de la DB
  deletePatient(patient: Patient)
  {
    try
    {
      return this.db
        .collection("patients")
        .doc(patient.id)
        .delete()
        .then(res => { console.log(res) });

    } catch (error)
    {
      console.log('Error: ', error);
    }

  }

  //Edit a Patient
  editPatient(newPatient)
  {
    return this.db
      .collection("patients")
      .doc(newPatient.id)
      .set(newPatient, { merge: true });

  }

  private uploadImage(patient: Patient, image: FileI)
  {
    this.filePath = `patients/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() =>
        {
          fileRef.getDownloadURL().subscribe(urlImage =>
          {
            this.downloadURL = urlImage;
            patient.photos = new Array;
            patient.photos.push(this.downloadURL);
            /* console.log('URL_image', urlImage); */
            this.editPatient(patient).then(() => console.log('Updated photo'));
          });
        })
      ).subscribe();
  }
}
