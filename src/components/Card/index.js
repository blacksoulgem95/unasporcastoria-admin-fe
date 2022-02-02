export default function Card({title, body, buttons}) {

    function mapButton(b) {
        if (b.loading) {
            return <a aria-disabled={true} className="card-footer-item has-text-grey">{b.label} <i
                className="fas fa-circle-notch fa-spin"/></a>
        } else {
            return <a onClick={b.action} className="card-footer-item">{b.label} </a>
        }
    }

    return (
        <div className="card fadein">
            <header className="card-header">
                <p className="card-header-title">
                    {title}
                </p>
                <button className="card-header-icon" aria-label="more options">
      <span className="icon">
        <i className="fas fa-angle-down" aria-hidden="true"/>
      </span>
                </button>
            </header>
            <div className="card-content">
                <div className="content">
                    {body}
                </div>
            </div>
            <footer className="card-footer">
                {buttons?.map(mapButton)}
                {/*<a href="#" className="card-footer-item">Save</a>*/}
                {/*<a href="#" className="card-footer-item">Edit</a>*/}
                {/*<a href="#" className="card-footer-item">Delete</a>*/}
            </footer>
        </div>

    )
}