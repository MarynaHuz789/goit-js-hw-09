import throttle from 'lodash.throttle';

// Накинути на форму слухача події input
// Записувати у локальне сховище об'єкт з полями email і message
// зберігай поточні значення полів форми
//  перевіряй стан сховища, і якщо там є збережені дані, то заповнюй ними поля форми
// В іншому випадку поля повинні бути порожніми
// Під час сабміту форми очищай сховище і поля форми
//  виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями

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
