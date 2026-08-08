import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CocktailService } from '../../services/cocktail.service';
import { Cocktail } from '../../models/cocktail.model';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-cocktail-detail',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MaterialModule,
  ],
  templateUrl: './cocktail-detail.html',
  styleUrl: './cocktail-detail.scss',
})
export class CocktailDetail implements OnInit {
  private readonly service = inject(CocktailService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly cocktail = signal<Cocktail | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const c = this.service.getById(id);
      if (c) {
        this.cocktail.set(c);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  delete(): void {
    const c = this.cocktail();
    if (c && confirm('Удалить этот рецепт?')) {
      this.service.delete(c.id);
      this.router.navigate(['/']);
    }
  }
}
