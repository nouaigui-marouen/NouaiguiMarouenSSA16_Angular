import { Component, inject, signal, computed } from '@angular/core';
import { EventCard } from '../../components/event-card/event-card';
import {EventService} from '../../service/event';

@Component({
  selector: 'app-event-list',
  imports: [EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventList {
  readonly service = inject(EventService);
  readonly categories = ['Tous', 'Atelier', 'Conférence', 'Sport'];
  readonly selectedCategory = signal('Tous');

  readonly visibleEvents = computed(() => {
    const cat = this.selectedCategory();
    const all = this.service.events();
    return cat === 'Tous' ? all : all.filter(e => e.category === cat);
  });

  selectCategory(c: string) {
    this.selectedCategory.set(c);
  }

  onToggleFavorite(id: number) {
    this.service.toggleFavorite(id);
  }

  onDelete(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.service.deleteEvent(id);
    }
  }
}
