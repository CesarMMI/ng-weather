import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextWeathersComponent } from './next-weathers.component';

describe('NextWeathersComponent', () => {
  let component: NextWeathersComponent;
  let fixture: ComponentFixture<NextWeathersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextWeathersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextWeathersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
