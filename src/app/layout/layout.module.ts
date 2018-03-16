import { PostViewResolveGuard } from './../post/post-view/post-view-resolve.guard';
import { AuthInterceptor } from './../providers/interceptors/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './../providers/auth.service';
import { AuthGuard } from './../providers/auth.guard';
import { CalendarService } from './../calendar/calendar.service';
import { AddUserComponent } from './../components/add-user/add-user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PostModule } from './../post/post.module';
import { ProfileModule } from './../profile/profile.module';
import { ProfileComponent } from './../profile/profile.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { LayoutRouting } from "./layout.routing";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ButtonsModule, TooltipModule } from 'ngx-bootstrap';
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './header/search/search.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationTriggerComponent } from './header/navigation-trigger/navigation-trigger.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { LayoutResolveGuard } from './layout-resolve.guard';
import { CoreModule } from '../core/core.module';

@NgModule ({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SearchComponent,
    NavigationComponent,
    NavigationTriggerComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    LayoutRouting,
    FormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    ProfileModule,
    PostModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers:[CalendarService,LayoutResolveGuard,AuthGuard,AuthService,PostViewResolveGuard]
})

export class LayoutModule {  }