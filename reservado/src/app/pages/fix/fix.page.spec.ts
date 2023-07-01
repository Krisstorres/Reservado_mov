import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FixPage } from './fix.page';

describe('FixPage', () => {
  let component: FixPage;
  let fixture: ComponentFixture<FixPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
