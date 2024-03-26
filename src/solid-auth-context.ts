import {createContext} from '@lit/context';

export interface ISolidAuthContext {
  oidcProvider: URL;
  fetch: (
    resource: string | URL | Request,
    options?: object
  ) => Promise<Response>;
  isLoggedIn: boolean;
}

export const solidAuthContext = createContext<ISolidAuthContext>(
  Symbol('solidAuthContext')
);
