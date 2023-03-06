import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { CreateNotesService } from 'src/app/support/service/create-notes.service';
import { NotesApiService } from 'src/app/support/service/notes-api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [AppComponent],
})
export class SidebarComponent implements OnInit {

  condition: Boolean = true;
  iconName:string = "down";
  notesList: any = [];
  indexValue: number = 0;
  subscription: Subscription;
  
  constructor(private creareNotesService: CreateNotesService, private httpApi: NotesApiService) { }

  ngOnInit() {
  
    this.httpApi.getNotesListApi().subscribe(response => {
      if (response['status_code'] == 200){
        this.notesList= response['data']
        this.creareNotesService.setContainerNotes(this.notesList[0])
      }
    });

    this.subscription = this.creareNotesService.getCreateNotes$.subscribe((data) => {
      if (Object.keys(data).length > 0) {
          this.notesList.push(data) 
      }
    })
    
  }

  subList() {
    this.condition = !this.condition;
    this.iconName = (this.condition) ? "down":"right";
  }

  createNotes() {
    this.creareNotesService.changeMessage(true)
  }

  viewNotes(data, index) {
    console.log(data, index,"show object")
    this.indexValue = index
    this.creareNotesService.setContainerNotes(data)
  }

  

}
