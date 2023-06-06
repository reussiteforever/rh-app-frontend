import { Component, OnInit } from '@angular/core';
import { StageService } from '../services/stage/stage.service';
import { Stage } from '../interfaces/stage';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  public stages: Stage[] = [];

  constructor(private stageService: StageService) { }

  ngOnInit(): void {
    this.stageService.getAllStages().subscribe({
      next: (value) => {
        this.stages = value;
        console.log("list stages: "+ value[1].responsableStage);
      },
      error: (value)=>{
        console.log(value);
      }
    });
  }

}
