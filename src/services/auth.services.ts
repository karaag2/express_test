function isUserPayload<T>(payload: T ): Boolean {
    return (
        typeof payload !== 'string' &&
        typeof payload === 'object'
    )
}
export {isUserPayload} ;