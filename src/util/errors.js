export const Errors = {
    'DEFAULT': {
        message: '404!',
        description: 'Your page was not found. Sorry about that!',
    },
    'WEB_UI_MISSING': {
        message: '404!',
        description: 'Your page has expired. Sorry about that!',
    },
    'INVALID_LOGIN': {
        message: '404!',
        description: 'Your login has expired. Please try again!',
    },
}

export function createErrorHandler(code, router) {
    return () => {
        // Navigate to the 404 page and pass the error code in the query
        router.push({ path: '/404', query: { code } })
    }
}

export function throwIfNotOk(response) {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response
}