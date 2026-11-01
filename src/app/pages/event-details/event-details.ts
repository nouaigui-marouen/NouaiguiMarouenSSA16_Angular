import { Component, input, computed, inject } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import {EventService} from '../../service/event';

@Component({
  selector: 'app-event-details',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css'
})
export class EventDetails {
  id = input.required<string>();
  private readonly service = inject(EventService);
  readonly event = computed(() => this.service.getEventById(Number(this.id())));
}
