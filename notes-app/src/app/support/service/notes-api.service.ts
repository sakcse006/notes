import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class NotesApiService {

  url = environment.baseUrl

  constructor(private http: HttpClient) { }

  public get(url: string, options?: any) { 
    return this.http.get(url, options); 
  } 

  public post(url: string, data: any, options?: any) { 
    return this.http.post(url, data, options); 
  } 

  public put(url: string, data: any, options?: any) { 
    return this.http.put(url, data, options); 
  } 

  public delete(url: string, options?: any) { 
    return this.http.delete(url, options); 
  } 

  public CreateNotesApi(data: any):  Observable<any> {
    return this.http.post(this.url+`create-notes/`, data).pipe(map(res => res));
  }

  public getNotesListApi():  Observable<any> {
    return this.http.get(this.url+`create-notes/`).pipe(map(res => res));
  }

  public NotesApi(data: any):  Observable<any> {
    return this.http.post(this.url+`notes/`, data).pipe(map(res => res));
  }

  public ViewNotesApi(data: any):  Observable<any> {
    return this.http.get(this.url+`notes/${data}/`, data).pipe(map(res => res));
  }

  public deleteNotesApi(data: any):  Observable<any> {
    return this.http.post(this.url+`notes/delete-notes/`, data).pipe(map(res => res));
  }

}
