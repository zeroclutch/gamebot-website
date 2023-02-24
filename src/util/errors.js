export const Errors = {
    'DEFAULT': {
        message: '404!',
        description: 'Your page was not found. Sorry about that!',
    },
    'WEB_UI_MISSING': {
        message: '404!',
        description: 'Your page has expired. Sorry about that!',
    },
}

export function createErrorHandler(code, router) {
    return (err) => {
        console.error(err)
        router.push('../404', { params: code })
    }
}