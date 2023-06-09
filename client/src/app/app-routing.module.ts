import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View0Component } from './components/view0.component';
import { SearchResultsComponent } from './components/search-results.component';
import { CartComponent } from './components/cart.component';
import { ProfileComponent } from './components/profile.component';
import { PaymentSuccessComponent } from './components/payment-success.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: View0Component },
  { path: 'profile', component: ProfileComponent },
  { path: 'search/:flavor', component: SearchResultsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  // add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
