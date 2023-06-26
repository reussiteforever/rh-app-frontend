import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypecontratComponent } from './typecontrat.component';

describe('TypecontratComponent', () => {
  let component: TypecontratComponent;
  let fixture: ComponentFixture<TypecontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypecontratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypecontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
