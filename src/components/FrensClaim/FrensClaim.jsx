import './FrensClaim.scss'
import BaseButton from '../BaseButton/BaseButton'

const FrensClaim = ({amountToClaim = 0, claimRefRewards = () => {}}) => {
    return (
        <section className='frensClaim'>
            <div className='frensClaim-amount'>{amountToClaim}</div>
            <BaseButton onClick={claimRefRewards} title='Claim' className="frensClaim-button"/>
        </section>
    )
}

export default FrensClaim