// Pegando informações do formulário 
const form    = document.querySelector(".Form")
const input   = document.querySelectorAll("input")
const nome    = form.elements['Nome']
const email   = form.elements['Email']
const telef   = form.elements['Telefone']
const cep     = form.elements['Cep']
const cidade  = form.elements['Cidade']
const uf      = form.elements['Uf']

// Funções de checagem 
const isRequired = value => value === '' ? false : true

const isBetween = (length, min, max) => length < min || length > max ? false : true

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

const isPhoneValid = (telef) => {
    const re = /\(([0-9]{2}|0{1}((x|[0-9]){2}[0-9]{2}))\)\s*[0-9]{3,4}[- ]*[0-9]{4}/
    return re.test(telef)
}

const isCepValid = (cep) => {
    const re = /^[0-9]{5}-[\d]{3}/
    return re.test(cep)
}

const isUfValid = (uf) => {
    const re = /^(\s*(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)?)$/
    return re.test(uf)
}

// const isPasswordSecure = (password) => {
//     const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
//     return re.test(password);
// };

// Função para mostrar mensagem de erro

const showError = (input, message) => {
    const formItem = input.parentElement

    formItem.classList.remove('correct')
    formItem.classList.add('wrong')

    const error = formItem.querySelector('small')
    error.textContent = message
}

// Função para indicar input correto

const showSuccess = (input) => {
    const formItem = input.parentElement

    formItem.classList.remove('wrong')
    formItem.classList.add('correct')

    const error = formItem.querySelector('small')
    error.textContent = ''
}

// Checar o nome

const checkName = () => {

    let valid = false
    const min = 3
    const max = 60
    const nomeCompleto = nome.value.trim()

    if (!isRequired(nomeCompleto)) {
        showError(nome, 'Seu nome completo deve ser preenchido.')
    } else if (!isBetween(nomeCompleto.length, min, max)) {
        showError(nome, `O campo deve ter entre ${min} e ${max} caracteres.`)
    } else {
        showSuccess(nome)
        valid = true
    }

    return valid

}

// Checar o email

const checkEmail = () => {

    let valid = false
    const emailAddress = email.value.trim()

    if (!isRequired(emailAddress)) {
        showError(email, 'Seu email deve ser preenchido.')
    } else if (!isEmailValid(emailAddress)) {
        showError(email, 'O formato de email não é válido')
    } else {
        showSuccess(email)
        valid = true
    }

    return valid

}

// Checar o telefone

const checkPhone = () => {

    let valid = false
    const phoneNumber = telef.value.trim()

    if (!isRequired(phoneNumber)) {
        showError(telef, 'Seu telefone deve ser preenchido')
    } else if (!isPhoneValid(phoneNumber)) {
        showError(telef, 'Numero de telefone incorreto')
    } else {
        showSuccess(telef)
        valid = true
    }

    return valid

}

// Checar o cep

const checkCep = () => {

    let valid = false
    const CEP = cep.value.trim()
    const min = 7
    const max = 8

    if (!isRequired(CEP)) {
        showError(cep, 'Seu CEP deve ser preenchido')
    } else if (!isCepValid(CEP)) {
        showError(cep, 'CEP inválido')
    } else {
        showSuccess(cep)
        valid = true
    }

    return valid

}

// Checar a cidade

const checkCity = () => {

    let valid = false
    const cidadeUsuario = cidade.value.trim()

    if (!isRequired(cidadeUsuario)) {
        showError(cidade, 'Sua cidade deve ser preenchida')
    } else {
        showSuccess(cidade)
        valid = true
    }

    return valid

}

// Checar UF

const checkUf = () => {

    let valid = true
    const UF = uf.value.trim()

    if (!isRequired(UF)) {
        showError(uf, 'Sua uf deve ser preenchida')
    } else if (!isUfValid(UF)) {
        showError(uf, 'uf inválida')
    } else {
        showSuccess(uf)
        valid = true
    }

    return valid

}

// Form Submit Event Listener
form.addEventListener('submit', function(e) {

    e.preventDefault()

    let isNameValid = checkName()
    let isEmailValid = checkEmail()
    let isPhoneValid = checkPhone()
    let isCepValid = checkCep()
    let isCityValid = checkCity()
    let isUfValid = checkUf()

    let isFormValid = isNameValid&&isEmailValid&&isPhoneValid&&isCepValid&&isCityValid&&isUfValid

    if (isFormValid) {
        window.alert("----Formulário Válido----\nAgradeçemos por suas informações!")
        form.reset()
    }

})

// Mensagem de erro ao completar input
for (let i in input) {
    input[i].addEventListener('blur', function(e) {
        switch (e.target.name) {
            case 'Nome':
                checkName()
                break
            case 'Email':
                checkEmail()
                break
            case 'Telefone':
                checkPhone()
                break
            case 'Cep':
                checkCep()
                break
            case 'Cidade':
                checkCity()
                break
            case 'Uf':
                checkUf()
                break
        }
    })
}