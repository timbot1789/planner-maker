export interface ISolidAuthContext {
    oidcProvider: URL;
    fetch: (resource: string | URL | Request, options?: object) => Promise<Response>;
    isLoggedIn: boolean;
}
export declare const solidAuthContext: {
    __context__: ISolidAuthContext;
};
//# sourceMappingURL=solid-auth-context.d.ts.map