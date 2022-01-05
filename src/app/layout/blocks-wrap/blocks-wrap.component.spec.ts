import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksWrapComponent } from './blocks-wrap.component';

describe('BlocksWrapComponent', () => {
  let component: BlocksWrapComponent;
  let fixture: ComponentFixture<BlocksWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksWrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
