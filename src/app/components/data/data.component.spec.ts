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
  let traineeService: TraineeService;

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
    traineeService = TestBed.get(TraineeService);
    fixture.detectChanges();
  });

  const selectedTrainee = {
    id: 1,
    name: "Rabin Naga",
    grade: 98,
    dateJoined: "4/15/2020",
    subject: "C++",
    email: "naga.rabin01@gmail.com",
  };

  xit("should create", () => {
    expect(component).toBeTruthy();
  });

  xit("should get the list of trainee", () => {
    const spy = spyOn(traineeService, "getTraineeList").and.callThrough();
    component.getTraineeList();
    expect(spy).toHaveBeenCalled();
  });

  xit("should set the selected trainee and the index of the selected trainee", () => {
    component.selectTrainee(selectedTrainee, 1);
    expect(component.selectedTrainee).toBe(selectedTrainee);
    expect(component.selectedTraineeIndex).toBe(1);
  });

  it("should add the new trainee on click of Add button when the form is valid", () => {
    const spy = spyOn(traineeService, "addTrainee").and.callThrough();
    component.traineeForm.controls.name.setValue("Rabin");
    component.addTrainee();
    expect(spy).toHaveBeenCalled();
  });

  xit("should clear the form on click of Add button when trainee detail is displayed", () => {
    const spy = spyOn(
      component,
      "resetSelectedTraineeAndForm"
    ).and.callThrough();
    component.selectedTrainee = selectedTrainee;
    component.addTrainee();
    expect(spy).toHaveBeenCalled();
    expect(component.submitted).toBeFalsy();
  });
});
