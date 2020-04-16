import { Injectable } from "@angular/core";
import { TRAINEE_LIST } from "../constants/trainee";
import { Trainee } from "../models/trainee.model";

@Injectable()
export class TraineeService {
  // change to savedFilterValue
  filterValue: string = "";
  selectedTrainee: Trainee;
  selectedTraineeIndex: number;

  constructor() {}

  getTraineeList() {
    return TRAINEE_LIST;
  }

  addTrainee(trainee: Trainee) {
    TRAINEE_LIST.unshift(trainee);
  }

  updateTrainee(trainee: Trainee, index: number) {
    TRAINEE_LIST[index] = trainee;
  }

  deleteTrainee(index) {
    TRAINEE_LIST.splice(index, 1);
  }
}
