import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { TraineeService } from "../../services/trainee.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Trainee } from "../../models/trainee.model";

@Component({
  selector: "app-data",
  templateUrl: "./data.component.html",
  styleUrls: ["./data.component.css"],
})
export class DataComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // table
  displayedColumns = ["id", "name", "date", "grade", "subject"];
  dataSource = new MatTableDataSource();
  filterText: string;

  // trainee detail section
  traineeForm: FormGroup;
  selectedTrainee: Trainee;
  selectedTraineeIndex: number;

  constructor(
    private traineeService: TraineeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getTraineeList();
    //get the stored filter value on returning back to this component
    this.filterText = this.traineeService.filterValue;
    // get the list of filtered trainee on returning back to this component
    this.applyFilter(this.filterText);
    this.buildTraineeForm();
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  buildTraineeForm() {
    this.traineeForm = this.formBuilder.group({
      id: this.selectedTrainee ? this.selectedTrainee.id : "",
      name: [
        this.selectedTrainee ? this.selectedTrainee.name : "",
        Validators.required,
      ],
      grade: [this.selectedTrainee ? this.selectedTrainee.grade : ""],
      email: [this.selectedTrainee ? this.selectedTrainee.email : ""],
      dateJoined: [this.selectedTrainee ? this.selectedTrainee.dateJoined : ""],
      address: [this.selectedTrainee ? this.selectedTrainee.address : ""],
      city: [this.selectedTrainee ? this.selectedTrainee.city : ""],
      country: [this.selectedTrainee ? this.selectedTrainee.country : ""],
      zip: [this.selectedTrainee ? this.selectedTrainee.zip : ""],
      subject: [this.selectedTrainee ? this.selectedTrainee.subject : ""],
    });

    // detect change in form and bind it to grid
    this.traineeForm.valueChanges.subscribe(() => {
      this.updateTrainee();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.traineeService.filterValue = filterValue; // store filter value for future purpose
    this.dataSource.filter = filterValue;
  }

  selectTrainee(trainee: Trainee, index) {
    this.selectedTrainee = trainee;
    this.selectedTraineeIndex = index;
    // display the selected trainee in detail page form
    this.buildTraineeForm();
  }

  getTraineeList() {
    const traineeList = this.traineeService.getTraineeList();
    this.dataSource = new MatTableDataSource(traineeList);
  }

  addTrainee() {
    // clears the form incase the trainee is selected
    if (this.selectedTrainee) {
      this.resetSelectedTraineeAndForm();
      return;
    }

    if (this.traineeForm.invalid) return;

    this.traineeService.addTrainee(this.traineeForm.value);
    this.getTraineeList();
    this.resetSelectedTraineeAndForm();
  }

  updateTrainee() {
    if (this.selectedTrainee) {
      this.traineeService.updateTrainee(
        this.traineeForm.value,
        this.selectedTraineeIndex
      );
      this.getTraineeList();
    }
  }

  removeTrainee() {
    this.traineeService.deleteTrainee(this.selectedTraineeIndex);
    this.getTraineeList();
    this.resetSelectedTraineeAndForm();
  }

  resetSelectedTraineeAndForm() {
    this.selectedTrainee = null;
    this.selectedTraineeIndex = null;
    this.traineeForm.reset();
  }
}
