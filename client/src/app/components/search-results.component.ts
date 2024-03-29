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
        this.vapes.forEach(vape => vape.selectedQuantity = null);
      });
    });
  }

  search(flavor: string): void {
    if (flavor) {
      this.vapeService.getVapes(flavor).subscribe(vapes => {
        this.vapes = vapes;
        this.vapes.forEach(vape => vape.selectedQuantity = null);
      });
    }
  }



  addToCart(vape: Vape, quantity: number | null): void {
    quantity = quantity || 0;

    if (quantity <= 0) {
      this.snackBar.open('Please select a quantity greater than zero', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

 
    const vapeCopy = JSON.parse(JSON.stringify(vape));
    vapeCopy.selectedQuantity = quantity;  
    this.cartService.addToCart(vapeCopy);

  
    this.snackBar.open(`${vapeCopy.selectedQuantity} ${vapeCopy.flavor} added to cart`, 'Close', {
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
    return Array.from({ length: n }, (_, i) => i + 1);
  }


}
