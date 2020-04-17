import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
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

  // trainee detail section form
  traineeForm: FormGroup;
  selectedTrainee: Trainee;

  // regex
  emailRegex =
    "^\\s*((?:\\w+(.\\w+)?@[a-zA-Z_]+?(\\.[a-zA-Z]{2,3})(\\.[a-zA-Z]{2,2})?\\b\\s*))+$";

  constructor(
    private traineeService: TraineeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getPreviousState(); // obtain previous state
    this.getTraineeList();
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
      email: [
        this.selectedTrainee ? this.selectedTrainee.email : "",
        Validators.pattern(this.emailRegex),
      ],
      dateJoined: [this.selectedTrainee ? this.selectedTrainee.dateJoined : ""],
      address: [this.selectedTrainee ? this.selectedTrainee.address : ""],
      city: [this.selectedTrainee ? this.selectedTrainee.city : ""],
      country: [this.selectedTrainee ? this.selectedTrainee.country : ""],
      zip: [this.selectedTrainee ? this.selectedTrainee.zip : ""],
      subject: [this.selectedTrainee ? this.selectedTrainee.subject : ""],
    });

    // detect change in form and bind it to grid
    this.traineeForm.valueChanges.subscribe(() => {
      if (this.selectedTrainee) this.updateTrainee();
    });
  }

  /**
   * retrives list of trainee
   * in presence of filter text, filters the list accordingly
   */
  getTraineeList() {
    const traineeList = this.traineeService.getTraineeList();
    this.dataSource = new MatTableDataSource(traineeList);

    if (this.filterText) this.applyFilter(this.filterText); // get filtered trainee on returning back to this component
  }

  /**
   * executes when user types on filter input
   * list filtered trainee by filterValue
   * @param filterValue - text from filter input
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase(); // Remove whitespace // MatTableDataSource defaults to lowercase matches
    this.traineeService.filterValue = filterValue; // preseve filter text even on destruction of DataComponent
    this.filterText = filterValue;
    this.dataSource.filter = filterValue; // filter trainee by filterValue
    this.dataSource.paginator = this.paginator;
  }

  /**
   * adds trainee when the form is empty
   * clears the form in presence of selected trainee
   */
  addTrainee() {
    if (this.traineeForm.invalid) return;

    // clears the form incase the trainee is selected already
    if (this.selectedTrainee) {
      this.resetSelectedTraineeAndForm();
      return;
    }

    this.traineeService.addTrainee(this.traineeForm.value);
    alert("Trainee added successfully");
    this.getTraineeList();
    this.dataSource.paginator = this.paginator;

    this.resetSelectedTraineeAndForm();
  }

  /**
   * bind the updates of trainee which is being edited on the detail form to the table
   */
  updateTrainee() {
    this.traineeService.updateTrainee(
      this.traineeForm.value,
      this.selectedTrainee
    );
    this.setSelectedTrainee(this.traineeForm.value); // set the modified trainee object for editing further or deleting
    this.getTraineeList();
  }

  /**
   * deletes the selected trainee
   */
  removeTrainee() {
    this.traineeService.deleteTrainee(this.selectedTrainee);
    alert("Trainee deleted successfully");
    this.getTraineeList();
    this.resetSelectedTraineeAndForm();
  }

  /**
   * stores the selected trainee
   * renders selected trainee on form
   * @param trainee: selected trainee
   */
  setSelectedTrainee(trainee: Trainee) {
    this.selectedTrainee = trainee;
    this.traineeService.selectedTrainee = trainee; // saves the selected trainee to service variables
    this.buildTraineeForm(); // render selected trainee on detail page form
  }

  /**
   * retrives the previous state of data on returning to the DataComponent
   */
  getPreviousState() {
    this.selectedTrainee = this.traineeService.selectedTrainee;
    this.filterText = this.traineeService.filterValue;
  }

  /**
   * clears the variable storing selected trainee information
   * clears the value in service storing selected trainee
   * clears the form
   */
  resetSelectedTraineeAndForm() {
    this.setSelectedTrainee(null);
    this.traineeForm.reset();
  }
}
