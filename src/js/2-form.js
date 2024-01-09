import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const button = document.querySelector("button");

const FORM_KEY = "feedback-form-state"; 


const safeFeedback = JSON.parse(localStorage.getItem(FORM_KEY));

if (safeFeedback) {
    emailInput.value = safeFeedback.email
    messageInput.value = safeFeedback.message
    button.disabled = !(emailInput.value && messageInput.value)
}

form.addEventListener("input", throttle(() => { 
    localStorage.setItem(FORM_KEY, JSON.stringify({
        email: emailInput.value,
        message: messageInput.value
    }))
button.disabled = !(emailInput.value.trim() && messageInput.value.trim())
}, 500))

form.addEventListener("submit", submitForm)

function submitForm(event) {
    event.preventDefault() 

console.log({
    email: emailInput.value,
    message: messageInput.value    
})
    form.reset()
    localStorage.removeItem(FORM_KEY)
    button.disabled = true
}
