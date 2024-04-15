import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOperationsComponent } from './search-operations.component';

describe('SearchOperationsComponent', () => {
  let component: SearchOperationsComponent;
  let fixture: ComponentFixture<SearchOperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchOperationsComponent]
    });
    fixture = TestBed.createComponent(SearchOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
