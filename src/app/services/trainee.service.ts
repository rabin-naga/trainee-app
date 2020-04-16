import { Injectable } from "@angular/core";
import { TRAINEE_LIST } from "../constants/trainee";
import { Trainee } from "../models/trainee.model";

@Injectable()
export class TraineeService {
  // change to savedFilterValue
  filterValue: string = "";
  selectedTrainee: Trainee;

  constructor() {}

  getTraineeList() {
    return TRAINEE_LIST;
  }

  addTrainee(trainee: Trainee) {
    TRAINEE_LIST.unshift(trainee);
  }

  updateTrainee(newTrainee: Trainee, selectedTrainee: Trainee) {
    const index = TRAINEE_LIST.indexOf(selectedTrainee);
    TRAINEE_LIST[index] = newTrainee;
  }

  deleteTrainee(selectedTrainee: Trainee) {
    const index = TRAINEE_LIST.indexOf(selectedTrainee);
    TRAINEE_LIST.splice(index, 1);
  }
}
