import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

// material libraries
import { MatGridListModule } from "@angular/material/grid-list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";

// components
import { AppComponent } from "./app.component";
import { DataComponent } from "./components/data/data.component";
import { AnalysisComponent } from "./components/analysis/analysis.component";
import { MonitorComponent } from "./components/monitor/monitor.component";
import { TraineeService } from "./services/trainee.service";

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    AnalysisComponent,
    MonitorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,

    // material modules
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [TraineeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
