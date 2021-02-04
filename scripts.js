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

const Transaction = { // calcula 
  all: [
    {
      
      description: 'luz',
      amount: -50000,
      date: '23/01/2021'
    },
    {
      
      description: 'website',
      amount: 500000,
      date: '23/01/2021'
    },
    {
      
      description: 'Internet',
      amount: -20000,
      date: '23/01/2021'
    },
    {
      description: 'App',
      amount: 200000,
      date: '23/01/2021'
  
  
    }
  ],
  
  add(transaction){ // add novas transaçoes no formulario
    Transaction.all.push(transaction)

    App.reload()
  },

  remove(index){
    Transaction.all.splice(index, 1)

    App.reload()
  },

  // Entradas, saidas e total mostrada nos card 
  incomes(){
    // somar as entradas
    let income = 0
    // pegou todas as transaçoes e para cada
    Transaction.all.forEach(transaction =>{
      // se ela for maior que zero 
      if (transaction.amount > 0 ) {
        // somar a uma variavel e retorna-la
        //income = income + transaction.amount
        income += transaction.amount
      }
    })
    return income;
  },

  expenses() {
    // somar as saidas
    
    let expense = 0;
    // pegou todas as transaçoes e para cada
    Transaction.all.forEach(transaction =>{
      // se ela for menor que zero 
      if (transaction.amount < 0 ) {
        // somar a uma variavel e retorna-la
        //income = income + transaction.amount
        expense += transaction.amount
      }
    })
    return expense
  },

  total(){
    // entradas - saidas
    return Transaction.incomes() + Transaction.expenses();
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transactionsin){
    const CCSclass = transactionsin.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transactionsin.amount)

    const html =`  
      <td class="description">${transactionsin.description}</td> <!-- coluna do body -->
      <td class="${CCSclass}">${amount}</td>
      <td class="date"> ${transactionsin.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Excluir Transação">
      </td>
    `
    return html
  },

  updateBalance(){ // faz deixar ficar bonito na tela 
    document
      .getElementById("incomedisplay")
      .innerHTML=Utils.formatCurrency(Transaction.incomes())
    
      document
      .getElementById("expensedisplay")
      .innerHTML= Utils.formatCurrency(Transaction.expenses())

      document
      .getElementById("totaldisplay")
      .innerHTML=Utils.formatCurrency(Transaction.total())
  },

  clearTransactions(){
    DOM.transactionsContainer.innerHTML = ""
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

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues(){
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  formatData(){

  },

  validateFields(){
    const {description, amount, date} = Form.getValues() // verifica se os acampos esta vazio
    // .trim() limpeza dos espaços vazios que existem na string
    if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
        throw new Error("Por favor, preencha todos os campos")
    }
  },

  submit(event){
    event.preventDefault()


    try {
       // Verificar se todas as informações foram preenchidas
      Form.validateFields()
      // formatar os dados para salvar 
    
      // salvar
      // apagar os dados do formulario
      // modal feche (+ aparecer uma mensagem dizendo que deu certo )
      // atualizar a aplicação 

    } catch(error){
      alert(error.message)
    }
  }
}

const App = {
  init(){
    // faz a applicaçao iniciar
    Transaction.all.forEach(transaction => { //
      DOM.addTransaction(transaction)
    })

    DOM.updateBalance()

  },
  
  reload(){
    // faaz releitura da app
    DOM.clearTransactions() // realiza a "limpeza do form"
    App.init()
  },
}

App.init()


