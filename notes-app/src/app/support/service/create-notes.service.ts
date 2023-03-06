import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateNotesService {


  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  private notesNAme = new BehaviorSubject({});
  getCreateNotes$ = this.notesNAme.asObservable();

  private containerNotes = new BehaviorSubject({});
  getContainerNotes$ = this.containerNotes.asObservable();

  constructor() { }

  changeMessage(message: boolean) {
    console.log(message,"dsdds")
    this.messageSource.next(message)
  }

  setCreateNotes(data: any) {
    this.notesNAme.next(data)
  }

  setContainerNotes(data: any) {
    console.log(data)
    this.containerNotes.next(data)
  }

}
