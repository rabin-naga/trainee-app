import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DataComponent } from "./data.component";
import {
  MatGridListModule,
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatInputModule,
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { TraineeService } from "../../services/trainee.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("DataComponent", () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
      ],
      providers: [TraineeService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
