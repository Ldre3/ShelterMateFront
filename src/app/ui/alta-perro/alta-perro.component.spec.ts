import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPerroComponent } from './alta-perro.component';

describe('AltaPerroComponent', () => {
  let component: AltaPerroComponent;
  let fixture: ComponentFixture<AltaPerroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AltaPerroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltaPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
