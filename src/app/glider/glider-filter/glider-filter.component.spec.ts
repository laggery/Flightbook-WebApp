import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GliderFilterComponent } from './glider-filter.component';

describe('GliderFilterComponent', () => {
  let component: GliderFilterComponent;
  let fixture: ComponentFixture<GliderFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GliderFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GliderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
