const Modal = {
  open(){
    // Abrir o modal 
    // Adicionar a classa active no modal 
    document.querySelector('.modal-overlay')
    .classList
    .add('active')
  },
  close(){
    // fechar o modal 
    // remover a class active do modal
    document.querySelector('.modal-overlay')
    .classList
    .remove('active')

  }
}

const transactions = [
  {
    id: 1,
    description: 'luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 2,
    description: 'website',
    amount: 500000,
    date: '23/01/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'
  }
]

const transaction = {
  incomes(){
    // somar as entradas
  },
  expenses() {
    // somar as saidas
  },
  total(){
    // entradas - saidas
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction){
    const CCSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html =`  
      <td class="description">${transaction.description}</td> <!-- coluna do body -->
      <td class="${CCSclass}">${amount}</td>
      <td class="date"> ${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Excluir Transação">
      </td>
    `
    return html
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style:"currency",
      currency: "BRL"
    })

    return signal + value
  }
}

transactions.forEach(function(transaction){
  DOM.addTransaction(transaction)
})


