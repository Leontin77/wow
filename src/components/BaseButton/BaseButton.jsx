import './BaseButton.scss'

const BaseButton = ({title, style, className, onClick = () => {}}) => {
    return (
        <button onClick={onClick} className={`baseButton ${className}`} style={style}>
            {title}
        </button>
    )
}

export default BaseButton