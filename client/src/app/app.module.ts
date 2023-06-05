import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getApps, initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { View0Component } from './components/view0.component';
import { SearchResultsComponent } from './components/search-results.component';
import { environment } from 'src/environment/environment.prod';
import { CartComponent } from './components/cart.component';
import { ProfileComponent } from './components/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    View0Component,
    SearchResultsComponent,
    CartComponent,
    ProfileComponent
  ],
  imports: [
    provideFirebaseApp(() => {
      const existing = getApps().find(app => app.name === '[DEFAULT]');
      return existing ?? initializeApp(environment.firebaseConfig);
    }),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
