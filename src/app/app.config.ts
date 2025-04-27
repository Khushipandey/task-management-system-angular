import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./core/in-memory-data.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        delay: 500,
      })
    ),
  ],
};
