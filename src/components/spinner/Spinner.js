import './spinner.scss'

const Spinner = () => {
    return (
        <div className="spinner-border mx-auto mt-5" role="status" style={{'margin': '0 auto'}}>
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner;