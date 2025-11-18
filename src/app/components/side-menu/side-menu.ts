import { Component } from '@angular/core';
import { SideMenuHead } from "./side-menu-head/side-menu-head";
import { SideMenuOptions } from "./side-menu-options/side-menu-options";

@Component({
  selector: 'side-menu',
  imports: [SideMenuHead, SideMenuOptions],
  templateUrl: './side-menu.html',
})
export class SideMenu { }
