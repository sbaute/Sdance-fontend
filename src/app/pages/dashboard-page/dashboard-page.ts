import { Component } from '@angular/core';
import { SideMenu } from "../../components/side-menu/side-menu";
import { RouterOutlet } from '@angular/router';
import { Login } from "../login-page/login";

@Component({
  selector: 'dashboard-page',
  imports: [SideMenu, RouterOutlet],
  templateUrl: './dashboard-page.html',
})
export default class DashboardPage { }
