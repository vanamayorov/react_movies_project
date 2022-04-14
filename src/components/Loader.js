export default function Loader() {
    return (
        <div className="d-flex justify-content-center align-items-center h-100" style={{ minHeight: "100vh" }}>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
