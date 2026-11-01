import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EventForm } from './event-form';
import { routes } from '../../app.routes';

describe('EventForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventForm],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EventForm);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
