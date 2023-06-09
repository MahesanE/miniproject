import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vape } from '../models';
import { VapeService } from '../services/vape.service';
import { CartService } from '../services/cart-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  vapes: Vape[] = [];

  constructor(private route: ActivatedRoute, private vapeService: VapeService,
    private cartService: CartService, private router: Router,
    private snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const flavor = params['flavor'];
        this.vapeService.getVapes(flavor).subscribe(vapes => {
          this.vapes = vapes;
          // Initialize selectedQuantity to null for each vape object
          this.vapes.forEach(vape => vape.selectedQuantity = null);
        });
      });
    }
    

    addToCart(vape: Vape, quantity: number | null): void {
      quantity = quantity || 0; // If quantity is null, default it to 0
    
      if (quantity <= 0) {
        // Open the snackbar with a warning message
        this.snackBar.open('Please select a quantity greater than zero', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        return;
      }
        
      // create a deep copy of the vape object to avoid reference issues
      const vapeCopy = JSON.parse(JSON.stringify(vape));
      vapeCopy.quantity = quantity;  // set the selected quantity to the vapeCopy object
      this.cartService.addToCart(vapeCopy);
      
      // open the snackbar
      this.snackBar.open(`${vapeCopy.quantity} ${vapeCopy.flavor} added to cart`, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
    

  goBack() {
    this.router.navigate(['/home']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
  createRange(number: number) {
    let items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  getNumbersUpTo(n: number): number[] {
    return Array.from({length: n}, (_, i) => i + 1);
  }
  

}
