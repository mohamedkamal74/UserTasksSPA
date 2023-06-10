import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  addTaskForm: taskForm = new taskForm();

  @ViewChild('taskForm')
  taskForm!: NgForm;
  isSubmitted: boolean = false;
   

  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
    private toastr: ToastrService
  ) {}
  periorities = [
    { id: 1, name: 'LevelOne' },
    { id: 2, name: 'LevelTwo' },
    { id: 3, name: 'LevelThree' },
  ];
  // @Output() valueChange: EventEmitter<any> = new EventEmitter();
  selectedPeriorityId: number;

  ngOnInit(): void {}

  // onChange(event: any) {
  //   this.valueChange.emit(this.selectedPeriorityId);
  // }
  
  AddTask(isValid: any) {
    console.log('selectedPeriorityId : ', this.selectedPeriorityId);
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.addTask(this.addTaskForm).subscribe(
        async (data) => {
          if (data != null && data.body.data) {
            this.toastr.success(data.body.message);
            setTimeout(() => {
              this.router.navigate(['/Home']);
            }, 500);
          } else {
            this.toastr.error(data.body.message);
          }
        },
        async (error) => {
          this.toastr.error(error.message);
        }
      );
    }
  }
}

export class taskForm {
  name: string = '';
  description: string = '';
  date: Date;
  status: string = '';
  periority: number;
}
