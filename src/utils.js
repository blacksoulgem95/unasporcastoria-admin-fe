export const explodeQueryParams = queryObj => {
    return queryObj ? '?' + Object.entries(queryObj)
        .filter(([key, value]) => isNotNull(value))
        .map(([key, value]) => `${key}=${value}`)
        .join('&') : ''
}

export const defaultPagination = () => {
    return {
        page: 0,
        size: 10,
        sort: "id",
        direction: "asc"
    }
}

export const isNotNull = data => {
    if (data) return true
    if (data === 0) return true
    return false
}