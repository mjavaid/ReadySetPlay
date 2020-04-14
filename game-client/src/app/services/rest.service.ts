import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestService {

  constructor(private http: HttpClient) {}

  post(url: string, body: any, options?: any) {
    return this.http.post(url, JSON.stringify(body), options);
  }

  get(url: string, options?: any) {
    return this.http.get(url, options);
  }

}
