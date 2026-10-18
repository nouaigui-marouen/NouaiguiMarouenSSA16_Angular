import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EVENTS } from '../event-list/event-list';
import { EventItem } from '../../models/event-item';

@Component({
  selector: 'app-event-details',
  imports: [DatePipe, CurrencyPipe, UpperCasePipe, RouterLink],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {
  protected readonly route = inject(ActivatedRoute);

  readonly eventId = Number(this.route.snapshot.paramMap.get('id'));
  readonly event: EventItem | undefined = EVENTS.find((event) => event.id === this.eventId);
}
