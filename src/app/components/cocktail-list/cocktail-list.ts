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
export class CocktailList {
  private readonly service = inject(CocktailService);

  readonly cocktails = this.service.cocktails;
  readonly displayedColumns = ['image', 'name', 'createdAt', 'actions'];

  deleteCocktail(id: string, event: Event): void {
    event.stopPropagation();
    if (confirm('Удалить этот рецепт?')) {
      this.service.delete(id);
    }
  }
}
