import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';
import { WebApiService } from '../Service/web-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent {
  taskId: any;
  taskDetail : any= [];

  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService,private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['taskId'];      
    this.getTaskDetailById();
  }

  getTaskDetailById() {       
    this.httpProvider.getTaskDetailById(this.taskId).subscribe((data : any) => {      
      if (data != null && data.body.data != null) {
        var resultData = data.body.data;
        if (resultData) {
          this.taskDetail = resultData;
        }
      }
      else{
        this.toastr.error(data.body.message);
      }
    },
    (error :any)=> { }); 
  }
}
