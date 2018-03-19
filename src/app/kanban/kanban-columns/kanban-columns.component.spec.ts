import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanColumnsComponent } from './kanban-columns.component';

describe('KanbanColumnsComponent', () => {
  let component: KanbanColumnsComponent;
  let fixture: ComponentFixture<KanbanColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
