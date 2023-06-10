import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [
  {path:'' ,redirectTo:'Home',pathMatch:'full'},
  {path:'Home' ,component:HomeComponent},
  {path:'ViewTask/:taskId' ,component:ViewTaskComponent},
  {path:'AddTask' ,component:AddTaskComponent},
  {path:'EditTask/:taskId' ,component:EditTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
