import {createContext} from '@lit/context';

export interface ISolidAuthContext {
  oidcProvider: URL;
  fetch: (resource: string | URL | Request, options?: object) => Promise<Response>
}

export class SolidAuthContext implements ISolidAuthContext {
  private _oidcProvider = new URL("http://localhost:3000");
  private _fetch = globalThis.fetch;
  private _isLoggedIn = false;
  public get oidcProvider() {
    return this._oidcProvider;
  }

  public set oidcProvider(newProvider: URL) {
    this._oidcProvider = newProvider;
  }

  public get fetch() {
    return this._fetch;
  }

  public set fetch(authFetch: (resource: string | URL | Request, options?: object) => Promise<Response>) {
    this._fetch = authFetch;
  }

  public get isLoggedIn() {
    return this._isLoggedIn
  }

  public set isLoggedIn(loggedIn: boolean) {
    this._isLoggedIn = loggedIn
  }
}

export const solidAuthContext = createContext<ISolidAuthContext>(Symbol('solidAuthContext'));
