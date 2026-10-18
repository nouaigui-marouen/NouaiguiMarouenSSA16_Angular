import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { EventItem } from '../../models/event-item';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, CurrencyPipe, UpperCasePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  readonly event = input.required<EventItem>();
  readonly isFavorite = input(false);
  readonly favoriteToggled = output<number>();

  toggleFavorite(): void {
    this.favoriteToggled.emit(this.event().id);
  }
}
