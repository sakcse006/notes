import { Component } from '@angular/core';
import { CreateNotesService } from './support/service/create-notes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notes-app';
  showCreateNotes: Boolean = false;
  subscription: Subscription;


  constructor(private creareNotesService: CreateNotesService) { }
  
  ngOnInit() {
    this.subscription = this.creareNotesService.currentMessage.subscribe((message) => {
      this.showCreateNotes = message
      console.log(this.showCreateNotes,"ddddddddddd")
      
    })

    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // ngOnInit() {
  //   console.log("hello==========")
  //   this.showCreateNotes = !this.showCreateNotes;
  //   console.log(this.showCreateNotes)
  // }

  // ngAfterViewInit() {
  //   console.log("hello==========")
  //   this.showCreateNotes = !this.showCreateNotes;
  //   console.log(this.showCreateNotes)
  // }
}
