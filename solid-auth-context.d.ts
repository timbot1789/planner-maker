export interface ISolidAuthContext {
    oidcProvider: URL;
    fetch: (resource: string | URL | Request, options?: object) => Promise<Response>;
}
export declare class SolidAuthContext implements ISolidAuthContext {
    private _oidcProvider;
    private _fetch;
    private _isLoggedIn;
    get oidcProvider(): URL;
    set oidcProvider(newProvider: URL);
    get fetch(): (resource: string | URL | Request, options?: object) => Promise<Response>;
    set fetch(authFetch: (resource: string | URL | Request, options?: object) => Promise<Response>);
    get isLoggedIn(): boolean;
    set isLoggedIn(loggedIn: boolean);
}
export declare const solidAuthContext: {
    __context__: ISolidAuthContext;
};
//# sourceMappingURL=solid-auth-context.d.ts.map