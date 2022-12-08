import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeNoteComponent } from './time-note.component';

describe('TimeNoteComponent', () => {
  let component: TimeNoteComponent;
  let fixture: ComponentFixture<TimeNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
