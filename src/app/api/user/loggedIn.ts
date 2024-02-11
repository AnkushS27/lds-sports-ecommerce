export function loggedIn({params} : {params ?: {user?: string}}) {
    return !!(params && params.user);  // true if exists else not
}