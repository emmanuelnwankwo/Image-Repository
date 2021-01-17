import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardLayoutRoutes } from './dashboard-layout.routing';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { ImageComponent } from 'src/app/image/image.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardLayoutRoutes),
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    DashboardComponent,
    ImageComponent
  ]
})

export class DashboardLayoutModule {}
