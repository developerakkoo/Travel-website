import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRequiredComponent } from './vehicle-required.component';

describe('VehicleRequiredComponent', () => {
  let component: VehicleRequiredComponent;
  let fixture: ComponentFixture<VehicleRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRequiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
