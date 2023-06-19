import { Component } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor() {}

  public previousCoordinates: Position;
  public currentCoordinates: Position;
  currentDistance = 0;

  async getCurrentPosition() {
    if (this.currentCoordinates) {
      this.previousCoordinates = this.currentCoordinates;
    }
    this.currentCoordinates = await Geolocation.getCurrentPosition();

    if (!this.previousCoordinates || !this.previousCoordinates) {
      return;
    }

    const R = 6371e3; // metres
    const latA = this.previousCoordinates.coords.latitude;
    const latB = this.currentCoordinates.coords.latitude;
    const lonA = this.previousCoordinates.coords.longitude;
    const lonB = this.currentCoordinates.coords.longitude;

    const phi1 = (latA * Math.PI) / 180;
    const phi2 = (latB * Math.PI) / 180;

    const deltaPhi = (latB - latA) * Math.PI / 180;
    const deltaLambda = (lonB - lonA) * Math.PI / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Metres
    this.currentDistance += distance;
  }
}
