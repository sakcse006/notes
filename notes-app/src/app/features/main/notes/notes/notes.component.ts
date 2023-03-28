import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CreateNotesService } from 'src/app/support/service/create-notes.service';
import { NotesApiService } from 'src/app/support/service/notes-api.service';


declare var require: any;
// const FileSaver = require('file-saver');

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @ViewChild("takeInput", {static: false}) myInputVariable: ElementRef;
  subscription: Subscription;

  srcData: any;
  format: any;
  loader: boolean = false;
  blockList: any = [];
  preview: any = [];
  notesTitle: any;
  // blockList: any = [{"visible": true, "time": "Feb 6 12:00 PM", "message": "1111111111", "media": [{"format": "text", "src": "wqerq", "file_name": "name"}]}];
  blockListLength: number;
  notesForm = new FormGroup({
    text: new FormControl('', ),
    mediaList: new FormControl([], ),
  });
  
  constructor(private creareNotesService: CreateNotesService, private httpApi: NotesApiService) { }

  ngOnInit() {
    this.subscription = this.creareNotesService.getContainerNotes$.subscribe((data) => {
      console.log(data)
      this.blockList = [];
      this.preview = [];
      if (Object.keys(data).length > 0) {
          this.notesTitle = data
          this.httpApi.ViewNotesApi(data['value']).subscribe((response) => {
            this.blockList = response['data']
            console.log(this.blockList)
            this.blockListLength = this.blockList.length;

          })
      }
    })
  }

  onFileChange(event) {
    this.loader = true;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      } else if(file.type.indexOf('text')> -1){
        this.format = 'text';
      }
      if (this.blockList.length == 0 || this.blockList.slice(-1)[0].visible) {
          this.blockList.push({"visible": false, "time": "Feb 6 12:00 PM", "create_notes": this.notesTitle['value'], "message": this.notesForm.controls['text'].value, "media": [], "media_instance":[]})
      }

      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      console.log(formData)
      this.httpApi.NotesApi(formData).subscribe(response => {
        console.log(response)
        if (response['status_code'] == 200){
          this.blockList.slice(-1)[0].media_instance.push(response['message'])
        }
      });

      reader.onload = (event) => {
        this.srcData = (<FileReader>event.target).result;
        this.blockList.slice(-1)[0].media.push({'name': file.name, 'url': this.srcData, "format": this.format})
        this.preview = this.blockList.slice(-1)[0].media
        // this.blockListLength = this.blockList.length;
        // this.notesForm.controls['mediaList'].setValue([...this.notesForm.controls['mediaList'].value, {'detail': file, 'src': this.srcData, "format": this.format}])
        // this.loader = false;
      }
    }
  }

  downloadFile(data: any) {
    const downloadLink = document.createElement('a');
    downloadLink.href = data['url'];
    downloadLink.download = data['detail']['name'];
    downloadLink.click();
  }

  submit() {
    if (this.blockList.length == 0 || this.blockList.slice(-1)[0].visible) {
      this.blockList.push({"visible": true, "time": "Feb 6 12:00 PM", "create_notes": this.notesTitle['value'], "message": this.notesForm.controls['text'].value, "media": [], "media_instance":[]})
    }else{
      this.blockList.slice(-1)[0].visible = true
      this.blockList.slice(-1)[0].message = this.notesForm.controls['text'].value
    }
    this.preview = []
    let mediaData = this.blockList.slice(-1)[0]
    this.httpApi.NotesApi(mediaData).subscribe(response => {
      if (response['status_code'] == 200){
        console.log(response)
        this.blockList.pop()
        this.blockList.push(response['data'])
      }
    });
    this.blockListLength = this.blockList.length
    // this.blockList.push({"time": "Feb 6 12:00 PM", "message": this.notesForm.controls['text'].value, "media": this.notesForm.controls['mediaList'].value})
    this.notesForm.controls['text'].reset();
    // this.notesForm.controls['mediaList'].setValue([]);
    this.myInputVariable.nativeElement.value = '';
  }

  deleteNotes(data, index, blockListLength) {
    console.log(data)

    this.httpApi.deleteNotesApi(data).subscribe(response => {
      if (response){
        this.blockList.splice(blockListLength - index -1, 1);
        this.blockListLength -=1
      }
    });
  }
}
