import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './store';
import { BoardListComponent } from './components/board-list/board-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TaskListsComponent } from './components/task-lists/task-lists.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { BoardEffects } from './store/effects/board.effects';
import { RouterModule } from '@angular/router';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { BoardService } from './services/board.service';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskListsService } from './services/task-lists.service';
import { TaskListsEffects } from './store/effects/task-lists.effects';

@NgModule({
  declarations: [
    AppComponent,
    BoardListComponent,
    TaskListsComponent,
    TasksListComponent,
    TaskListItemComponent,
    CommonDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([BoardEffects, TaskListsEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    DragDropModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSliderModule,
    FormsModule,
    MatIconModule,
    MatChipsModule,
    RouterModule,
  ],
  providers: [
    BoardService,
    TaskListsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
