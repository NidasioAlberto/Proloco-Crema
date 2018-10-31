import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomePageComponent } from './home-page/home-page.component'
import { MainContentComponent } from './home-page/main-content/main-content.component'
import { HowToContentComponent } from './home-page/how-to-content/how-to-content.component'
import { AboutContentComponent } from './home-page/about-content/about-content.component'

import { AuthGuard } from './core/auth.guard'

const routes: Routes = [
    { path: '', redirectTo: '/public/home', pathMatch: 'full' },
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
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
