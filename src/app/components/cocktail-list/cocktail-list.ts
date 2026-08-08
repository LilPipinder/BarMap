import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CocktailService } from '../../services/cocktail.service';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  templateUrl: './cocktail-list.html',
  styleUrl: './cocktail-list.scss'
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
