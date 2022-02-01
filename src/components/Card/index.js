export default function Card({title, body, buttons}) {
    return (
        <div className="card">
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
                {/*<a href="#" className="card-footer-item">Save</a>*/}
                {/*<a href="#" className="card-footer-item">Edit</a>*/}
                {/*<a href="#" className="card-footer-item">Delete</a>*/}
            </footer>
        </div>

)
}