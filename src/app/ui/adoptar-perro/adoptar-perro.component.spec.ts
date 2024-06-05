import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptarPerroComponent } from './adoptar-perro.component';

describe('AdoptarPerroComponent', () => {
  let component: AdoptarPerroComponent;
  let fixture: ComponentFixture<AdoptarPerroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdoptarPerroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptarPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
