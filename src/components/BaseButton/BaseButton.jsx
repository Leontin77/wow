import './BaseButton.scss'

const BaseButton = ({title, style, className}) => {
    return (
        <button className={`baseButton ${className}`} style={style}>
            {title}
        </button>
    )
}

export default BaseButton