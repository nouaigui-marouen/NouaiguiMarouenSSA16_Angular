import { Injectable, signal, computed } from '@angular/core';
import { EventItem } from '../models/event-item';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly _events = signal<EventItem[]>([
    { id: 1, title: 'Atelier Angular', category: 'Atelier', date: '2026-11-15', place: 'Salle A', price: 0, imageUrl: '', description: 'Un atelier pratique sur les composants Angular.' },
    { id: 2, title: 'Conférence IA', category: 'Conférence', date: '2026-11-20', place: 'Amphi B', price: 15, imageUrl: '', description: 'Une conférence sur les usages de l’intelligence artificielle.' },
    { id: 3, title: 'Tournoi de football', category: 'Sport', date: '2026-12-02', place: 'Stade C', price: 5, imageUrl: '', description: 'Un tournoi amical ouvert à tous les étudiants.' },
    { id: 4, title: 'Atelier TypeScript', category: 'Atelier', date: '2026-12-10', place: 'Salle D', price: 0, imageUrl: '', description: 'Découvrir les types, les interfaces et les classes.' },
    { id: 5, title: 'Conférence Cloud', category: 'Conférence', date: '2027-01-14', place: 'Amphi A', price: 0, imageUrl: '', description: 'Présentation des services cloud pour les développeurs.' },
    { id: 6, title: 'Course solidaire', category: 'Sport', date: '2027-02-06', place: 'Parc E', price: 10, imageUrl: '', description: 'Une course de quartier au profit de l’association.' }
  ]);
  private readonly _favorites = signal<number[]>([]);

  readonly events = this._events.asReadonly();
  readonly favorites = this._favorites.asReadonly();

  readonly eventCount = computed(() => this._events().length);
  readonly favoriteCount = computed(() => this._favorites().length);
  readonly freeEventCount = computed(() =>
    this._events().filter(e => e.price === 0).length
  );

  getEventById(id: number): EventItem | undefined {
    return this._events().find(e => e.id === id);
  }

  addEvent(data: Omit<EventItem, 'id'>): EventItem {
    const id = Math.max(0, ...this._events().map(e => e.id)) + 1;
    const newEvent: EventItem = { ...data, id };
    this._events.update(list => [...list, newEvent]);
    return newEvent;
  }

  deleteEvent(id: number) {
    this._events.update(list => list.filter(e => e.id !== id));
    this._favorites.update(ids => ids.filter(x => x !== id));
  }

  toggleFavorite(id: number) {
    this._favorites.update(ids =>
      ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]
    );
  }

  isFavorite(id: number): boolean {
    return this._favorites().includes(id);
  }
}
