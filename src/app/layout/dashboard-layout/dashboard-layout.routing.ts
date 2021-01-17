import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { ImageComponent } from 'src/app/image/image.component';


export const DashboardLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'image',   component: ImageComponent },
    // { path: 'checkout',         component: TablesComponent },
    // { path: 'private-images',          component: IconsComponent }
];
