import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GliderFormComponent } from './glider-form.component';

describe('GliderFormComponent', () => {
  let component: GliderFormComponent;
  let fixture: ComponentFixture<GliderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GliderFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GliderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
