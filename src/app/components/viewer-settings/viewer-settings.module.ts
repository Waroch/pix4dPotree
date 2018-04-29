import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewerSettingsComponent} from './viewer-settings/viewer-settings.component';
import {MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatSliderModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatRadioModule
  ],
  declarations: [ViewerSettingsComponent],
  exports: [ViewerSettingsComponent]
})
export class ViewerSettingsModule {
}
