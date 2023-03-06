import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';  
import { CreateNotesService } from 'src/app/support/service/create-notes.service';
import { NotesApiService } from 'src/app/support/service/notes-api.service';


@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {

  name = new FormControl('');  
  constructor(private creareNotesService: CreateNotesService, private httpApi: NotesApiService) { }

  ngOnInit() {
  }

  createNotes(){
    console.log(this.name.value)
    const data = {"text": this.name.value}
    this.httpApi.CreateNotesApi(data).subscribe(response => {
      if (response['status_code'] == 200){
        this.creareNotesService.setCreateNotes(response['data'])
        this.creareNotesService.changeMessage(false)
      }
    });
    
  }

  Clear() {
    this.name.reset()
  }

  close() {
    this.creareNotesService.changeMessage(false)
  }

}
