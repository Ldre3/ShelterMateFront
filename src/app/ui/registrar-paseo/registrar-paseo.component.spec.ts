import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPaseoComponent } from './registrar-paseo.component';

describe('RegistrarPaseoComponent', () => {
  let component: RegistrarPaseoComponent;
  let fixture: ComponentFixture<RegistrarPaseoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarPaseoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarPaseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
