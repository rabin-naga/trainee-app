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

  const trainee = {
    id: 1,
    name: "Rabin Naga",
    grade: 98,
    dateJoined: "4/15/2020",
    subject: "C++",
    email: "naga.rabin01@gmail.com",
  };

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get the list of trainee", () => {
    const spy = spyOn(traineeService, "getTraineeList").and.callThrough();
    component.getTraineeList();
    expect(spy).toHaveBeenCalled();
  });

  it("should get the filtered list of trainee as provided in filter input", () => {
    component.filterText = "test";
    const spy = spyOn(component, "applyFilter").and.callThrough();
    component.getTraineeList();
    expect(spy).toHaveBeenCalled();
    expect(traineeService.filterValue).toEqual("test");
  });

  it("should set the selected trainee to edit or remove", () => {
    component.setSelectedTrainee(trainee);
    expect(component.selectedTrainee).toBe(trainee);
    expect(traineeService.selectedTrainee).toBe(trainee);
  });

  it("should clear the form on adding selected trainee or modified trainee", () => {
    const spy = spyOn(
      component,
      "resetSelectedTraineeAndForm"
    ).and.callThrough();
    component.traineeForm.controls.name.setValue("Rabin"); //make form valid
    component.selectedTrainee = trainee;
    component.addTrainee();
    expect(spy).toHaveBeenCalled();
    expect(component.selectedTrainee).toBeNull();
  });

  it("should add the trainee to the top of the list on creating new trainee", () => {
    const spy = spyOn(traineeService, "addTrainee").and.callThrough();
    component.traineeForm.controls.name.setValue("Rabin");
    component.addTrainee();
    expect(spy).toHaveBeenCalled();
  });

  it("should delete the selected trainee", () => {
    const spy = spyOn(traineeService, "deleteTrainee").and.callThrough();
    component.removeTrainee();
    expect(spy).toHaveBeenCalled();
  });

  it("should update the trainee being edited in detail form", () => {
    component.traineeForm.controls.name.setValue("Test");
    const spy = spyOn(traineeService, "updateTrainee").and.callThrough();
    component.updateTrainee();
    expect(spy).toHaveBeenCalled();
    expect(traineeService.selectedTrainee.name).toBe("Test");
  });
});
