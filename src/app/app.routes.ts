import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './core/auth-guard.service';
import { AuthAdminGuard } from './core/auth-admin-guard.service';
import { HomeComponent } from './home/home.component';
import { AuthCardComponent } from './auth-card/auth-card.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: AuthCardComponent,  
    },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthAdminGuard]
    },
    {
        path: '**',
        component: AuthCardComponent
    },
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
    HomeComponent,
    AuthCardComponent
];