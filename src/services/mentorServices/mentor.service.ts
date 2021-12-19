import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class MentorService {
  private _url: string = '/assets/data/mentor.json';
  constructor(private http: HttpClient) {}
  getMentor() {
    return this.http.get(this._url);
  }
}
