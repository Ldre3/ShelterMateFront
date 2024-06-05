import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrarEnAlbergueComponent } from './entrar-en-albergue.component';

describe('EntrarEnAlbergueComponent', () => {
  let component: EntrarEnAlbergueComponent;
  let fixture: ComponentFixture<EntrarEnAlbergueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntrarEnAlbergueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntrarEnAlbergueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
