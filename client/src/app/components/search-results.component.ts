import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vape } from '../models';
import { VapeService } from '../services/vape.service';
import { CartService } from '../services/cart-service.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  vapes: Vape[] = [];

  constructor(private route: ActivatedRoute, private vapeService: VapeService,
    private cartService: CartService, private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const flavor = params['flavor'];
      this.vapeService.getVapes(flavor).subscribe(vapes => this.vapes = vapes);
    });
  }

  addToCart(vape: Vape): void {
    this.cartService.addToCart(vape);
  }

  goBack(){
    this.router.navigate(['/home']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
  
}
