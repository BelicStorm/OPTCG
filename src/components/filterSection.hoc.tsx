import BadgeButton from "../components/buttons.component";

const FilterSection = () => {
    return (
        <div className="FilterSection">
            <div className="filterTitleSection"></div>
            <div className="filters">
                <BadgeButton name="All" value="all-colors" defaultChecked={true} />
                <BadgeButton name="All" value="all-colors2" />
            </div>
        </div>

    );
}

export {FilterSection}