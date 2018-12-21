import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule} from '@angular/forms'
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
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTabsModule } from '@angular/material/tabs'

//app components
import { MainContentComponent } from './home-page/main-content/main-content.component'
import { HowToContentComponent } from './home-page/how-to-content/how-to-content.component'
import { AboutContentComponent } from './home-page/about-content/about-content.component'
import { LoginComponent } from './home-page/login/login.component'

//firebase
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'

//google maps
import { AgmCoreModule } from '@agm/core'

//environment variable
import { environment } from '../environments/environment'
import { UserProfileComponent } from './home-page/user-profile/user-profile.component'
import { ConsoleComponent } from './console/console.component'
import { SummaryComponent } from './console/summary/summary.component'
import { PathsComponent } from './console/paths/paths.component'
import { PlacesComponent } from './console/places/places.component'
import { NewPlaceDialogComponent } from './console/places/new-place-dialog/new-place-dialog.component'
import { NewDescriptionDialogComponent } from './console/places/new-description-dialog/new-description-dialog.component'
import { DescriptionsListComponent } from './console/places/descriptions-list/descriptions-list.component'
import { PathsListComponent } from './console/paths/paths-list/paths-list.component'
import { GOOGLE_MAPS_API_KEY } from './api-keys';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        MainContentComponent,
        HowToContentComponent,
        AboutContentComponent,
        LoginComponent,
        UserProfileComponent,
        ConsoleComponent,
        SummaryComponent,
        PathsComponent,
        PlacesComponent,
        NewPlaceDialogComponent,
        NewDescriptionDialogComponent,
        DescriptionsListComponent,
        PathsListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        CoreModule,
        FormsModule,
        //firebase
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        //material components
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatDividerModule,
        MatExpansionModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule,
        MatSnackBarModule,
        MatTabsModule,
        //google maps
        AgmCoreModule.forRoot({
            apiKey: GOOGLE_MAPS_API_KEY
        })
    ],
    entryComponents: [
        NewPlaceDialogComponent, NewDescriptionDialogComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
