import { createContext } from '@lit/context';
export class SolidAuthContext {
    constructor() {
        this._oidcProvider = new URL("http://localhost:3000");
        this._fetch = globalThis.fetch;
        this._isLoggedIn = false;
    }
    get oidcProvider() {
        return this._oidcProvider;
    }
    set oidcProvider(newProvider) {
        this._oidcProvider = newProvider;
    }
    get fetch() {
        return this._fetch;
    }
    set fetch(authFetch) {
        this._fetch = authFetch;
    }
    get isLoggedIn() {
        return this._isLoggedIn;
    }
    set isLoggedIn(loggedIn) {
        this._isLoggedIn = loggedIn;
    }
}
export const solidAuthContext = createContext(Symbol('solidAuthContext'));
//# sourceMappingURL=solid-auth-context.js.map