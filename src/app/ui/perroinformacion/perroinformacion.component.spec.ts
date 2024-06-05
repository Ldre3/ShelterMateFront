import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerroinformacionComponent } from './perroinformacion.component';

describe('PerroinformacionComponent', () => {
  let component: PerroinformacionComponent;
  let fixture: ComponentFixture<PerroinformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerroinformacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerroinformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
