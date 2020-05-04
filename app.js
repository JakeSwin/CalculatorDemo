const mainDisplay = document.querySelector("h1")
const secondaryDisplay = document.querySelector("h2")
const keypad = document.querySelector(".keypad")
let currentNum = 0
let currentCalc = ""
let allNums = []
let operator = new function() {}
let opSign = ""
let afterEquals = false

let updateDisplay = () => {
    secondaryDisplay.textContent = currentCalc
    mainDisplay.textContent = currentNum
}

let Mod = (a, b) => a % b
let Div = (a, b) => a / b
let Mul = (a, b) => a * b
let Min = (a, b) => a - b
let Plu = (a, b) => a + b

let currentCalcFunc = () => {
    if (allNums.length !== 1) {
        currentCalc = currentNum
    } else {
        currentCalc = `${allNums[0]} ${opSign} ${currentNum}`
    }
}

let newNum = () => {
    if (currentNum !== 0 && allNums.length !== 2) {
        allNums.push(currentNum)
        currentNum = 0
        console.log(allNums)
        updateDisplay()
    }
}

let acFunc = () => {
    currentNum = 0
    currentCalc = ""
    opSign = ""
    allNums.pop()
    allNums.pop()
    updateDisplay()
}

let equalsFunc = (a, b) => {
    currentNum = b(a[0], a[1])
    updateDisplay()
}

updateDisplay()

for (let i = 0; i <= 19; i++) {
    keypad.children[i].addEventListener("click", e => {
        if (afterEquals === true) {
            acFunc()
            afterEquals = false
        }
        let clicked = e.originalTarget
        let value = clicked.textContent

        let num = Number(value)
        if (!isNaN(num)) {
            if (Number(mainDisplay.textContent) !== 0) {
                currentNum = Number(`${String(currentNum)}${num}`)
                currentCalcFunc()
                updateDisplay()
            } else {
                currentNum = num
                currentCalcFunc()
                updateDisplay()
            }
        } else {
            opSign = value
            switch(value){
                case "ac":
                    console.log("ac")
                    acFunc()
                    break
                case "%":
                    console.log("mod")
                    operator = Mod
                    newNum()
                    break
                case "/":
                    console.log("div")
                    operator = Div
                    newNum()
                    break
                case "*":
                    console.log("multi")
                    operator = Mul
                    newNum()
                    break
                case "-":
                    console.log("minus")
                    operator = Min
                    newNum()
                    break
                case "+":
                    console.log("plus")
                    operator = Plu
                    newNum()
                    break
                case "=":
                    console.log("equals")
                    newNum()
                    equalsFunc(allNums, operator)
                    afterEquals = true
                    break
            }
        }
    })
}
