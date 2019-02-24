import {Pipe , PipeTransform} from "@angular/core";

@Pipe({
  name: "workout"
})
export class WorkoutPipe implements PipeTransform {
  transform(value: any) {
    if(value.type === "endurance"){
      return `Duration: ${value.endurance.duration} minutes, Distance: ${value.endurance.distance}km`
    }else{
      return `Reps: ${value.strength.reps}, Sets: ${value.strength.sets}, Weight: ${value.strength.weight}kg`
    }
  }
}

