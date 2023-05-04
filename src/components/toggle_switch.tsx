import classNames from "classnames";

function ToggleSwitch(props: {on: boolean, switch: ()=> void}) {
    const handleClick = () => {
        props.switch()
    }

    return (
        <div
            onClick={handleClick}
            className={classNames("flex w-10 h-5 rounded-full bg-gray-600 transition-all duration-500")}>
            <span className={classNames(
                'h-5 w-5 bg-white rounded-full transition-all duration-50 shadow-lg',{
                    "ml-5" : props.on
                }
            )}></span>
        </div>
    )
}

export default ToggleSwitch
