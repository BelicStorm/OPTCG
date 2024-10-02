import loading from "/loading.gif"
import loading2 from "/loading2.gif"

const LoadingComponent = () => {
    return (
        <div className="loadingSection">
            <img src={loading} alt="Loading gif" />
            <h2 className="loadingText">
                Loading...
            </h2>
        </div>
    );
}
const LoadingMoreComponent = () => {
    return <div className="loadingMoreContainer">
        <img src={loading2} alt="Loading gif" />
        <h2 className="loadingText">
            Loading...
        </h2>
    </div>
}

export {LoadingComponent, LoadingMoreComponent};