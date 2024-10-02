
const BadgeButton = ({name, value, defaultChecked = false, ref = null}:{name:string, value:string, defaultChecked?:boolean, ref?:any}) => {
    return (
        <div className="badgeButton">
            <input type="radio" name={name} value={value} id={`light-taglist-radio-${value}`} />
            <label htmlFor={`light-taglist-radio-${value}`} ref={ref} defaultChecked={defaultChecked}>{name}</label>
        </div>
    );
}

export default BadgeButton;