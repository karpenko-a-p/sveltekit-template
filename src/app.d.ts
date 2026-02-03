import type { City } from '$src/models/City';
import type { TokenPayload } from '$src/services/TokenService';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}

    interface PageData {
      city: Readonly<City>;
      jwtToken: Maybe<TokenPayload>
    }

    // interface PageState {}
    // interface Platform {}
  }
}

export {};
