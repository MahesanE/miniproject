import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getApps, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { View0Component } from './components/view0.component';
import { SearchResultsComponent } from './components/search-results.component';
import { environment } from 'src/environment/environment.prod';
import { CartComponent } from './components/cart.component';
import { ProfileComponent } from './components/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PaymentSuccessComponent } from './components/payment-success.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AgeverifyComponent } from './components/ageverify.component';

@NgModule({
  declarations: [
    AppComponent,
    View0Component,
    SearchResultsComponent,
    CartComponent,
    ProfileComponent,
    PaymentSuccessComponent,
    AgeverifyComponent
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
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
