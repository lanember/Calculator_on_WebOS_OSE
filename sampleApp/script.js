const numbersButtons = document.querySelectorAll("[data-number]")
const operationsButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const DELButton = document.querySelector("[data-DEL]")
const ACButton = document.querySelector("[data-AC]")
const prevText = document.querySelector("[data-prev]")
const currText = document.querySelector("[data-curr]")

class Calculator {
    constructor (prevText, currText){
        this.prevText=prevText
        this.currText=currText
        this.AC()
    }

    AC(){
        this.prev=''
        this.curr=''
        this.operation=undefined
    }

    SelectOperation(operation){
        if (this.curr === '') return
        if (this.prev !== '') this.DoTheMath()
        this.operation=operation
        this.prev=this.curr
        this.curr=''
    }

    WriteNumber(number){
        if (number === '.' && this.curr.includes('.')) return
        this.curr=this.curr + number.toString()
    }

    DoTheMath(){
        let result
        const prev = parseFloat(this.prev)
        const curr = parseFloat(this.curr)
        if (isNaN(prev) || isNaN(this.curr)) return
        switch (this.operation){
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '*':
                result = prev * curr
                break
            case '/':
                result = prev / curr
                break
            default:
                return
        }
        this.curr=result
        this.prev=''
        this.operation=undefined
    }

    DEL(){
        this.curr=this.curr.toString().slice(0,-1)
    }

    AddComma(number){
        const stringNumber = number.toString()
        const leftSide = parseFloat(stringNumber.split('.')[0])
        const rightSide = stringNumber.split('.')[1]
        let leftDisplay
        if (isNaN(leftSide)){
            leftDisplay=''
        } else {
            leftDisplay=leftSide.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if (rightSide != null){
            return `${leftDisplay}.${rightSide}`
        } else {
            return leftDisplay
        }
    }

    RefreshDisplay(){
        this.currText.innerText=this.AddComma(this.curr)
        if (this.operation != null){
            this.prevText.innerText=`${this.AddComma(this.prev)} ${this.operation}`
        } else {
            this.prevText.innerText=''
        }
        
    }
}

const calculator = new Calculator (prevText, currText)
numbersButtons.forEach(Button => {
    Button.onclick = () => {
        calculator.WriteNumber(Button.innerText)
        calculator.RefreshDisplay()
    }
})

operationsButtons.forEach(Button => {
    Button.onclick = () => {
        calculator.SelectOperation(Button.innerText)
        calculator.RefreshDisplay()
    }
})

equalsButton.onclick = () => {
    calculator.DoTheMath()
    calculator.RefreshDisplay()
}

ACButton.onclick = () => {
    calculator.AC()
    calculator.RefreshDisplay()
}

DELButton.onclick = () => {
    calculator.DEL()
    calculator.RefreshDisplay()
}