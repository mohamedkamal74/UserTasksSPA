import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  editTaskForm: taskForm = new taskForm();

  @ViewChild("taskForm")
  taskForm!: NgForm;

  isSubmitted: boolean = false;
  taskId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

    ngOnInit(): void {
      this.taskId = this.route.snapshot.params['taskId'];
      this.getTaskDetailById();
    }
    periorities = [
      { id: 1, name: 'LevelOne' },
      { id: 2, name: 'LevelTwo' },
      { id: 3, name: 'LevelThree' },
    ];
    
    getTaskDetailById() {
      this.httpProvider.getTaskDetailById(this.taskId).subscribe((data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body.data;
         
            this.editTaskForm.taskId = resultData.taskId;
            this.editTaskForm.name = resultData.name;
            this.editTaskForm.date = resultData.date;
            this.editTaskForm.description = resultData.description;
            this.editTaskForm.status = resultData.status;
            this.editTaskForm.periority = resultData.periority;
        
        }
      },
        (error: any) => { 

        });
    }

    EditTask(isValid: any) {
      this.isSubmitted = true;
      if (isValid) {
        this.httpProvider.editTask(this.editTaskForm).subscribe(async data => {
          if (data != null && data.body != null) {
            var resultData = data.body.data;
            if (resultData ) {
             
                this.toastr.success(data.body.message);
                setTimeout(() => {
                  this.router.navigate(['/Home']);
                }, 500);
             
            }else{
              this.toastr.error(data.body.message);
            }
          }
        },
          async error => {
            this.toastr.error(error.message);
            setTimeout(() => {
              this.router.navigate(['/Home']);
            }, 500);
          });
      }
    }
}


export class taskForm {
  taskId: number = 0;
  name: string = "";
  date: Date;
  status: string = "";
  description: string = "";
  periority: number;
}