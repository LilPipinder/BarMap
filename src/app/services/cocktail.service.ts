import { Injectable, signal, computed } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

const STORAGE_KEY = 'bar-map-cocktails';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private readonly _cocktails = signal<Cocktail[]>(this.loadFromStorage());

  readonly cocktails = this._cocktails.asReadonly();
  readonly count = computed(() => this._cocktails().length);

  private loadFromStorage(): Cocktail[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw) as Cocktail[];
      }
    } catch {
    }
    return this.getSeedData();
  }

  private saveToStorage(list: Cocktail[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  private getSeedData(): Cocktail[] {
    return [
      {
        id: '1',
        name: 'Мохито',
        description: 'Классический кубинский коктейль с мятой, лаймом и ромом.',
        steps: [
          { text: 'Разомните листья мяты с сахаром и соком лайма в хайболе.' },
          { text: 'Добавьте дроблёный лёд и белый ром.' },
          { text: 'Долейте содовой и перемешайте.' }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Маргарита',
        description: 'Мексиканский коктейль на основе текилы с лаймом и трипл-секом.',
        steps: [
          { text: 'Смешайте текилу, трипл-сек и сок лайма со льдом.' },
          { text: 'Процедите в бокал с солёной кромкой.' }
        ],
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  }

  getById(id: string): Cocktail | undefined {
    return this._cocktails().find(c => c.id === id);
  }

  create(cocktail: Omit<Cocktail, 'id' | 'createdAt'>): Cocktail {
    const newCocktail: Cocktail = {
      ...cocktail,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    const updated = [...this._cocktails(), newCocktail];
    this._cocktails.set(updated);
    this.saveToStorage(updated);
    return newCocktail;
  }

  update(id: string, changes: Partial<Omit<Cocktail, 'id' | 'createdAt'>>): Cocktail | null {
    const list = this._cocktails();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return null;
    const updatedItem: Cocktail = {
      ...list[idx],
      ...changes,
      updatedAt: new Date().toISOString()
    };
    const updated = [...list];
    updated[idx] = updatedItem;
    this._cocktails.set(updated);
    this.saveToStorage(updated);
    return updatedItem;
  }

  delete(id: string): boolean {
    const list = this._cocktails();
    const filtered = list.filter(c => c.id !== id);
    if (filtered.length === list.length) return false;
    this._cocktails.set(filtered);
    this.saveToStorage(filtered);
    return true;
  }
}
