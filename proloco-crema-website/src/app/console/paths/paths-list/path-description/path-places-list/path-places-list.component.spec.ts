import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathPlacesListComponent } from './path-places-list.component';

describe('PathPlacesListComponent', () => {
  let component: PathPlacesListComponent;
  let fixture: ComponentFixture<PathPlacesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathPlacesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathPlacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
