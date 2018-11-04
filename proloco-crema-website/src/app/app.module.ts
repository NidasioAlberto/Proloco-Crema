import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomePageComponent } from './home-page/home-page.component'
import { CoreModule } from './core/core.module'
import { FlexLayoutModule } from '@angular/flex-layout'

//material components
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'

//app components
import { MainContentComponent } from './home-page/main-content/main-content.component'
import { HowToContentComponent } from './home-page/how-to-content/how-to-content.component'
import { AboutContentComponent } from './home-page/about-content/about-content.component'
import { LoginComponent } from './home-page/login/login.component'

//firebase
import { AngularFireModule } from '@angular/fire'

//environment variable
import { environment } from '../environments/environment';
import { UserProfileComponent } from './home-page/user-profile/user-profile.component'

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        MainContentComponent,
        HowToContentComponent,
        AboutContentComponent,
        LoginComponent,
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        CoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        //material components
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatCardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
