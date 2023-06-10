import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "https://localhost:7046/api/tasks";

var httpLink = {
  getAllTasks: apiUrl,
  deleteTaskById: apiUrl+"/DeleteTask",
  getTaskDetailById: apiUrl ,
  addTask: apiUrl + "/AddTask",
  editTask:apiUrl+"/UpdateTask"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllTasks(): Observable<any> {
    return this.webApiService.get(httpLink.getAllTasks);
  }
  public deleteTaskById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteTaskById + '/' + model, "");
  }
  public getTaskDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getTaskDetailById + '/' + model);
  }
  public addTask(model: any): Observable<any> {
    return this.webApiService.post(httpLink.addTask, model);
  }  

  public editTask(model: any): Observable<any> {
    return this.webApiService.post(httpLink.editTask, model);
  }  
}                          