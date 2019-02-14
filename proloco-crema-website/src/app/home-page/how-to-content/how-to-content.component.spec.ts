import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToContentComponent } from './how-to-content.component';

describe('HowToContentComponent', () => {
  let component: HowToContentComponent;
  let fixture: ComponentFixture<HowToContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
