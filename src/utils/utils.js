export const explodeQueryParams = queryObj => {
    return queryObj ? '?' + Object.entries(queryObj)
        .filter(([key, value]) => isNotNull(value))
        .map(([key, value]) => `${key}=${value}`)
        .join('&') : ''
}

export const defaultPagination = () => {
    return {
        page: 0,
        size: 9,
        sort: "id",
        direction: "asc"
    }
}

export const paginationToJ = pagination => {
    const jp = {...pagination};
    jp.sort = `${(jp.sort || 'id')},${jp.direction || 'asc'}`
    return jp;
}

export const isNotNull = data => {
    if (data) return true
    return data === 0;
}

export const label = (iconClass, label) => {
    return <>
        <i className={iconClass}/>&nbsp;{label}
    </>
}