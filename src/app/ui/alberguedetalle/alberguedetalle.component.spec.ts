import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlberguedetalleComponent } from './alberguedetalle.component';

describe('AlberguedetalleComponent', () => {
  let component: AlberguedetalleComponent;
  let fixture: ComponentFixture<AlberguedetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlberguedetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlberguedetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
