import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

@Component({
  selector: "list-item",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./list-item.component.scss"],
  template: `
    <div class="list-item">
      {{item | json}}
    </div>
  `
})
export class ListItemComponent{
  @Input()
  item: any;
}
