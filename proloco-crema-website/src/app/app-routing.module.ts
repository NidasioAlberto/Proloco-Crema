import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomePageComponent } from './home-page/home-page.component'
import { MainContentComponent } from './home-page/main-content/main-content.component'
import { HowToContentComponent } from './home-page/how-to-content/how-to-content.component'
import { AboutContentComponent } from './home-page/about-content/about-content.component'
import { LoginComponent } from  './home-page/login/login.component'
import { UserProfileComponent } from './home-page/user-profile/user-profile.component'

import { AuthGuard } from './core/auth.guard'
import { ConsoleComponent } from './console/console.component'
import { PathsComponent } from './console/paths/paths.component'
import { PlacesComponent } from './console/places/places.component'

const routes: Routes = [
    {
        path: 'public',
        component: HomePageComponent,
        children: [
            {
                path: '',
                redirectTo: '/public/home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                component: MainContentComponent
            },
            {
                path: 'how-to',
                component: HowToContentComponent
            },
            {
                path: 'about',
                component: AboutContentComponent,
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'user-profile',
                component: UserProfileComponent
            },
        ],
    },
    {
        path: 'console/:associationId',
        component: ConsoleComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'paths',
                pathMatch: 'full'
            },
            {
                path: 'paths',
                component: PathsComponent
            },
            {
                path: 'places',
                component: PlacesComponent
            }
        ]

    },
    { path: '**', redirectTo: '/public/home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
