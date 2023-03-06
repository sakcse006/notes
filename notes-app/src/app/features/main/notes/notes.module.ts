import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotesComponent } from './create-notes/create-notes.component';
import { NotesComponent } from './notes/notes.component';



@NgModule({
  declarations: [
    CreateNotesComponent,
    NotesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CreateNotesComponent,
    NotesComponent
  ]
})
export class NotesModule { }
