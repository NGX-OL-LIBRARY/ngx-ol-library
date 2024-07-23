import { NgModule } from '@angular/core';
import { NolTextStyleComponent } from './text-style.component';
import { NolTextBackgroundFillComponent } from './text-background-fill.component';
import { NolTextBackgroundStrokeComponent } from './text-background-stroke.component';



@NgModule({
  imports: [NolTextBackgroundFillComponent, NolTextBackgroundStrokeComponent, NolTextStyleComponent],
  exports: [NolTextBackgroundFillComponent, NolTextBackgroundStrokeComponent, NolTextStyleComponent]
})
export class NolTextStyleModule { }
