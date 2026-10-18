import { Component, computed, signal } from '@angular/core';
import { EventCard } from '../../components/event-card/event-card';
import { EventItem } from '../../models/event-item';

export const EVENTS: EventItem[] = [
  { id: 1, title: 'Atelier TypeScript', category: 'Atelier', date: '2026-11-15', place: 'Campus, salle B12', price: 0, imageUrl: 'https://picsum.photos/seed/typescript/600/400', description: 'Découverte de TypeScript : types, interfaces et bonnes pratiques.' },
  { id: 2, title: 'Conférence IA générative', category: 'Conférence', date: '2026-11-20', place: 'Amphithéâtre A', price: 5, imageUrl: 'https://picsum.photos/seed/ia/600/400', description: 'Panorama des modèles génératifs et de leurs usages.' },
  { id: 3, title: 'Soirée networking alumni', category: 'Rencontre', date: '2026-11-27', place: 'Cafétéria du campus', price: 0, imageUrl: 'https://picsum.photos/seed/networking/600/400', description: 'Échanges avec les anciens étudiants sur leurs parcours.' },
  { id: 4, title: 'Hackathon Web 24h', category: 'Compétition', date: '2026-12-05', place: 'Fablab', price: 10, imageUrl: 'https://picsum.photos/seed/hackathon/600/400', description: 'Vingt-quatre heures pour créer une application web en équipe.' },
  { id: 5, title: 'Atelier Angular Signals', category: 'Atelier', date: '2026-12-10', place: 'Campus, salle B12', price: 3, imageUrl: 'https://picsum.photos/seed/angular/600/400', description: 'Prise en main de signal(), computed(), set() et update().' },
  { id: 6, title: 'Conférence cybersécurité', category: 'Conférence', date: '2027-01-14', place: 'Amphithéâtre B', price: 8, imageUrl: 'https://picsum.photos/seed/cyber/600/400', description: 'Les menaces actuelles et les bons réflexes de sécurité.' },
  { id: 7, title: 'Tournoi e-sport inter-promos', category: 'Compétition', date: '2027-01-22', place: 'Salle polyvalente', price: 2, imageUrl: 'https://picsum.photos/seed/esport/600/400', description: 'Tournoi amical entre promotions, ouvert à tous les niveaux.' },
];

@Component({
  selector: 'app-event-list',
  imports: [EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  readonly events = signal<EventItem[]>(EVENTS);
  readonly favoriteIds = signal<number[]>([]);
  readonly favoriteCount = computed(() => this.favoriteIds().length);

  readonly categories: string[] = ['Tous', ...new Set(EVENTS.map((event) => event.category))];
  readonly selectedCategory = signal('Tous');

  readonly filteredEvents = computed(() => {
    const category = this.selectedCategory();
    const events = this.events();
    return category === 'Tous' ? events : events.filter((event) => event.category === category);
  });

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds().includes(id);
  }

  toggleFavorite(id: number): void {
    this.favoriteIds.update((ids) =>
      ids.includes(id) ? ids.filter((favoriteId) => favoriteId !== id) : [...ids, id],
    );
  }

  toggleEmptyList(): void {
    this.events.set(this.events().length === 0 ? EVENTS : []);
  }
}
