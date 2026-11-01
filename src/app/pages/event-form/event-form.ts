import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {EventService} from '../../service/event';
import { EventItem } from '../../models/event-item';

@Component({
  selector: 'app-event-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css'
})
export class EventForm {
  private readonly service = inject(EventService);
  private readonly router = inject(Router);

  eventForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
    }),
    category: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    place: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    price: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)]
    }),
    imageUrl: new FormControl('', { nonNullable: true }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(20)]
    })
  });

  // Live values as signals (the brief's toSignal step)
  formValue = toSignal(this.eventForm.valueChanges, {
    initialValue: this.eventForm.getRawValue()
  });
  formStatus = toSignal(this.eventForm.statusChanges, {
    initialValue: this.eventForm.status
  });

  // Short name for the template: f.title instead of eventForm.controls.title
  get f() {
    return this.eventForm.controls;
  }

  addEvent() {
    this.eventForm.markAllAsTouched();
    if (this.eventForm.invalid) {
      return;
    }

    const v = this.eventForm.getRawValue();
    this.service.addEvent({
      title: v.title,
      category: v.category as EventItem['category'],
      date: v.date,
      place: v.place,
      price: v.price ?? 0,
      imageUrl: v.imageUrl,
      description: v.description
    });

    this.eventForm.reset();
    this.router.navigate(['/events']);
  }
}
