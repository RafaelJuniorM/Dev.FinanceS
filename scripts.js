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
