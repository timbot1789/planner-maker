import {createContext, ContextRoot} from '@lit/context';

export interface ISolidAuthContext {
  oidcProvider: URL;
  fetch: typeof globalThis.fetch;
  isLoggedIn: boolean;
  webId?: string | URL;
}

/* ContextRoot helps avoid race conditions in script loading
 * See: https://github.com/lit/lit/discussions/3302#discussioncomment-6319569
 */
new ContextRoot().attach(document.documentElement);

export const solidAuthContext = createContext<ISolidAuthContext>(
  Symbol('solidAuthContext')
);
