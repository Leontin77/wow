import './FrensClaim.scss'
import BaseButton from '../BaseButton/BaseButton'

const FrensClaim = () => {
    return (
        <section className='frensClaim'>
            <div className='frensClaim-amount'>1,000,000</div>
            <BaseButton title='Claim' className="frensClaim-button"/>
        </section>
    )
}

export default FrensClaim