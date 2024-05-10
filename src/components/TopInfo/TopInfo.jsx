import './TopInfo.scss'

const TopInfo = ({score, energy}) => {

    return (
        <div className='topInfo'>
            <div>Energy {energy}</div>
            <div>Gold {score}</div>
            <div>????</div>
        </div>
    )
}

export default TopInfo
