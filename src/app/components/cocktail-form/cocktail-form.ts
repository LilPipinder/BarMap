import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CocktailService } from '../../services/cocktail.service';
import { Cocktail, CocktailStep } from '../../models/cocktail.model';

@Component({
  selector: 'app-cocktail-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  templateUrl: './cocktail-form.html',
  styleUrl: './cocktail-form.scss'
})
export class CocktailForm implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(CocktailService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snack = inject(MatSnackBar);

  readonly isEdit = signal(false);
  private editId: string | null = null;

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', Validators.required],
    steps: this.fb.array([this.createStepGroup()]),
    finalImage: ['']
  });

  get steps(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.editId = id;
      const cocktail = this.service.getById(id);
      if (cocktail) {
        this.patchForm(cocktail);
      } else {
        this.snack.open('Рецепт не найден', 'OK', { duration: 3000 });
        this.router.navigate(['/']);
      }
    }
  }

  private createStepGroup(step?: CocktailStep) {
    return this.fb.group({
      text: [step?.text || '', Validators.required],
      image: [step?.image || '']
    });
  }

  private patchForm(c: Cocktail): void {
    this.form.patchValue({
      name: c.name,
      description: c.description,
      finalImage: c.finalImage || ''
    });
    this.steps.clear();
    c.steps.forEach(s => this.steps.push(this.createStepGroup(s)));
    if (this.steps.length === 0) {
      this.steps.push(this.createStepGroup());
    }
  }

  addStep(): void {
    this.steps.push(this.createStepGroup());
  }

  removeStep(index: number): void {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
    }
  }

  onStepImageSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.readAsBase64(input.files[0]).then(base64 => {
        this.steps.at(index).patchValue({ image: base64 });
        this.cdr.markForCheck();
      });
    }
  }

  onFinalImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.readAsBase64(input.files[0]).then(base64 => {
        this.form.patchValue({ finalImage: base64 });
        this.cdr.markForCheck();
      });
    }
  }

  clearFinalImage(): void {
    this.form.patchValue({ finalImage: '' });
  }

  clearStepImage(index: number): void {
    this.steps.at(index).patchValue({ image: '' });
  }

  private readAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (file.size > 2 * 1024 * 1024) {
        this.snack.open('Файл слишком большой (макс. 2 МБ)', 'OK', { duration: 3000 });
        reject(new Error('File too large'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const payload = {
      name: value.name!,
      description: value.description!,
      steps: value.steps as CocktailStep[],
      finalImage: value.finalImage || undefined
    };

    if (this.isEdit() && this.editId) {
      this.service.update(this.editId, payload);
      this.snack.open('Рецепт обновлён', 'OK', { duration: 2500 });
    } else {
      this.service.create(payload);
      this.snack.open('Рецепт создан', 'OK', { duration: 2500 });
    }
    this.router.navigate(['/']);
  }
}
