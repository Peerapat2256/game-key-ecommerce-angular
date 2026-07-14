import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ServerLoadingService } from './services/server-loading.service';

export class AppModule {}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('gameshop-angular');

  constructor(protected serverLoading: ServerLoadingService) {}
}
