import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DataComponent } from "./components/data/data.component";
import { MonitorComponent } from "./components/monitor/monitor.component";
import { AnalysisComponent } from "./components/analysis/analysis.component";

const routes: Routes = [
  { path: "", redirectTo: "/data", pathMatch: "full" },
  { path: "data", component: DataComponent },
  { path: "analysis", component: AnalysisComponent },
  { path: "monitor", component: MonitorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
