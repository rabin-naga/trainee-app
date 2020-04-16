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
  @ViewChild("searchInput") searchInput: ElementRef;

  // table
  displayedColumns = ["id", "name", "date", "grade", "subject"];
  dataSource = new MatTableDataSource();
  filterText: string;

  // trainee detail section form
  traineeForm: FormGroup;
  selectedTrainee: Trainee;
  selectedTraineeIndex: number;
  submitted: boolean;

  // regex
  emailRegex =
    "^\\s*((?:\\w+(.\\w+)?@[a-zA-Z_]+?(\\.[a-zA-Z]{2,3})(\\.[a-zA-Z]{2,2})?\\b\\s*))+$";

  constructor(
    private traineeService: TraineeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getPreviousState();
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
   * list filtered trainee
   * @param filterValue
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.traineeService.filterValue = filterValue; // store filter value for future purpose
    this.filterText = filterValue;
    this.dataSource.filter = filterValue;
  }

  /**
   * stores the selected trainee value and index
   * @param trainee: selected trainee
   * @param index: selected trainee index
   */
  selectTrainee(trainee: Trainee, index: number) {
    this.selectedTrainee = trainee;
    this.selectedTraineeIndex = index;
    this.setSelectedTraineeonService();
  }

  /**
   * retrives list of trainee
   * in presence of filter text, filters the list accordingly
   */
  getTraineeList() {
    const traineeList = this.traineeService.getTraineeList();
    this.dataSource = new MatTableDataSource(traineeList);
    // get the list of filtered trainee on returning back to this component

    if (this.filterText) this.applyFilter(this.filterText);
  }

  /**
   * adds trainee when the form is empty
   * clears the form in presence of selected trainee
   */
  addTrainee() {
    this.submitted = true;
    if (this.traineeForm.invalid) return;

    // clears the form incase the trainee is selected
    if (this.selectedTrainee) {
      this.resetSelectedTraineeAndForm();
      return;
    }

    this.traineeService.addTrainee(this.traineeForm.value);
    this.getTraineeList();
    this.resetSelectedTraineeAndForm();
  }

  /**
   * updates the trainee being edited in the grid
   * stores the change in selected trainee
   */
  updateTrainee() {
    this.traineeService.selectedTrainee = this.traineeForm.value;
    this.traineeService.updateTrainee(
      this.traineeForm.value,
      this.selectedTraineeIndex
    );
    this.getTraineeList();
  }

  /**
   * deletes the selected trainee
   */
  removeTrainee() {
    this.traineeService.deleteTrainee(this.selectedTraineeIndex);
    this.getTraineeList();
    this.resetSelectedTraineeAndForm();
  }

  /**
   * retrives the previous state of data on returning to the data component
   */
  getPreviousState() {
    this.selectedTrainee = this.traineeService.selectedTrainee;
    this.selectedTraineeIndex = this.traineeService.selectedTraineeIndex;
    this.filterText = this.traineeService.filterValue;

    this.getTraineeList();
    // display the selected trainee in detail page form
    this.buildTraineeForm();
  }

  /**
   * saves the state of data in service variables
   * renders selected trainee on form
   */
  setSelectedTraineeonService() {
    this.traineeService.selectedTrainee = this.selectedTrainee;
    this.traineeService.selectedTraineeIndex = this.selectedTraineeIndex;
    // display the selected trainee in detail page form
    this.buildTraineeForm();
  }

  /**
   * clears the form as well as all the variables storing selected trainee information
   * clears the value in service storing selected trainee
   */
  resetSelectedTraineeAndForm() {
    this.submitted = false;
    this.selectedTrainee = null;
    this.selectedTraineeIndex = null;
    this.setSelectedTraineeonService();
    this.traineeForm.reset();
  }
}
