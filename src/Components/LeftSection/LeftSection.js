import './leftSection.css'
import { Component } from 'react'

class LeftSection extends Component {

    state = {principal: '',
                interestRate: '',
                time: '',
                remainingDays: '',
                interest: '',
                warning : ''
}
    
     submitEvent = (event) => {
        event.preventDefault();
    }
     onChangePrincipal = (event) => {
        const principal = parseInt(event.target.value)
        this.setState((prevState) => ({...prevState, principal}))
    }
     onChangeIntrest = (event) => {
        const interestRate = parseFloat(event.target.value)
        this.setState((prevState) => ({...prevState, interestRate}))
        
    }
     onChangeStartDate = (event) => {
        const startDate = new Date(event.target.value)
        this.setState((prevState) =>({...prevState, startDate}))
    }
     onChangeEndDate = (event) => {
        const endDate = new Date(event.target.value)
        this.setState((prevState) => ({...prevState, endDate}))
        
    }
     calculateRemainingDays = () => {
            const {startDate, endDate} = this.state
            const differenceInTime = endDate.getTime() - startDate.getTime()
            const differenceInDays = Math.round(differenceInTime/ (1000 * 3600 * 24))
            console.log(differenceInDays)
            console.log(typeof(differenceInDays))
            if (differenceInDays < 0) {
                const warning = "*Start Date Must Be Greater Than End Date"
                this.setState((prevState) => ({...prevState, warning}))
            }else {
                this.setState((prevState) => ({...prevState, remainingDays: differenceInDays}))
            }
            
    }
    onCalculateIntrest = () => {

            const {principal, interestRate, remainingDays} = this.state
            if(principal.toString() === "") {
                const warning = '*Enter Principal Amount'
                this.setState((prevState) => ({...prevState, warning}))
            }else if (interestRate.toString() === '') {
                const warning = '*Enter Interest Rate per Day'
                this.setState((prevState) => ({...prevState, warning}))
            }
            else {
                const warning = ''
                const interestValue = (principal * remainingDays * interestRate) / 100
                this.setState((prevState) => ({...prevState, interest: interestValue, warning}))
            }


    }
    render(){
        const {remainingDays, interest,principal, warning} = this.state
         localStorage.setItem('interestValue', interest)
        return (
                <div className='mainContainer'>
                    <div className='leftContainer'>
                    <form onSubmit={this.submitEvent}>
                    <div className='principalContainer'>
                        <label htmlFor = "principal" className='principalLabel'>Enter Principal Amount:</label>
                        <br />
                        <input type = "text" id='principal'  className='principalInput' onChange={this.onChangePrincipal}/>
                    </div>
                    <div className='startContainer'>
                        <label htmlFor='start' className='startLabel'>Enter Start Date:</label>
                        <input type='date' id='start' className='startInput' onChange={this.onChangeStartDate} />
                    </div>
                    <div className='endContainer'>
                        <label htmlFor='end' className='endLabel'>Enter End Date:</label>
                        <input type='date' id='end' className='endInput' onChange={this.onChangeEndDate} />
                    </div>
                    <div className='buttonContainer'>
                        <button onClick={this.calculateRemainingDays} className='button'>
                            calculate Days
                        </button>
                        <p className='daysLeft'>
                        No of Days: {remainingDays}
                        </p>
                    </div>
                    <div className='intrestContainer'>
                        <label htmlFor='intrest' className='intrestLabel'>Enter Intrest Rate / Day:</label>
                        <br />
                        <input type='text' id='intrest' className='intrestInput' onChange={this.onChangeIntrest} />
                    </div>
                    <div className='calculateContainer'>
                        <button onClick={this.onCalculateIntrest} className='button'>
                                Calculte Interest
                        </button>
                    </div>
                    <div className='warningContainer'>
                        <p>
                            {warning}
                        </p>
                    </div>
                </form>

            </div>
                <div className='rightContainer'>
                    <h1>
                        Total Interest: {interest}
                    </h1>
                    <h1>
                        Total Amount : {principal + interest}
                    </h1>
                </div>
            </div>
                    )
    
    }
    }
    

export default LeftSection