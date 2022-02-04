export default function Pagination({data, doSearch}) {

    if (!data) {
        return <></>
    }

    const trigger = (number) => {

        doSearch({page: number})
    }

    let middle;

    if (data.first) {
        middle = (
            <>
                {data?.totalPages > 1 ? page(1, false, trigger) : <></>}
            </>
        )
    } else if (!data.first && data.number === 1) {
        middle = (
            <>
                {page(1, true, trigger)}
                {data.totalPages > 2 ? page(2, false, trigger) : <></>}
            </>
        )
    } else if (!data.first && data.number > 2 && !data.last) {
        middle = (
            <>
                {page(data.number - 1, false, trigger)}
                {page(data.number, true, trigger)}
                {data.number === (data.totalPages - 1) ? <></> : page(data.number + 1, false, trigger)}
            </>
        )
    } else if (data.last) {
        middle = (
            <>
                {data.totalPages > 3 ? page(data.number - 2, false, trigger) : <></>}
                {page(data.number - 1, false, trigger)}
            </>
        )
    }

    return (
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <a className="pagination-previous"><i className="fas fa-chevron-left"/></a>
            <a className="pagination-next"><i className="fas fa-chevron-right"/></a>
            <ul className="pagination-list">
                {page(0, data.first, trigger)}
                <li><span className="pagination-ellipsis">&hellip;</span></li>

                {middle}

                <li><span className="pagination-ellipsis">&hellip;</span></li>
                {page(data.totalPages - 1, data.last, trigger)}
            </ul>
        </nav>

    )
}

function page(number, isCurrent, trigger) {
    return <li><a onClick={() => trigger(number)} className={"pagination-link " + (isCurrent ? 'is-current' : '')}
                  aria-label={"Go to page " + (number + 1)}>{number + 1}</a></li>
}