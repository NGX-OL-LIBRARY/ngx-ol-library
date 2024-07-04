import { NgModule } from '@angular/core';
import { NolStyleComponent } from './style.component';
import { NolStyleCollectionComponent } from './style-collection.component';



@NgModule({
  imports: [NolStyleComponent, NolStyleCollectionComponent],
  exports: [NolStyleComponent, NolStyleCollectionComponent]
})
export class NolStyleModule { }
