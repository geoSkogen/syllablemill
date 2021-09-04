'use strict'

const dominator = {
  word_generator_select : document.querySelector('#sm-syllable-count'),
  param_cap_selectors : document.querySelectorAll('.sm-select-go'),
  text_output_box : document.querySelector('#sm-output'),
  modal : document.querySelector('#modal'),
  buttons : document.querySelectorAll('.fake-button'),
  close_modal : document.querySelector('#close-modal'),
  sections : document.querySelectorAll('.sm-section')
}

const forminator = {
  p_count: 1,
  phrase_cap: 9,
  word_cap: 25,
  syllable_cap: 5,
  content : [],

  get_params : function (nodes) {
    nodes.forEach( (node) => {
      let label = node.getAttribute('name').replace('-','_')
      this[label] = Number(node.value)
    })
  },

  get_random_text : function (nodes) {
    this.get_params(nodes)
    this.content = []
    for (let i = 0; i < this.p_count; i++) {
      this.content.push( paragraph_builder(
        this.phrase_cap,
        this.syllable_cap,
        this.word_cap
      ) )
    }
    return this.content
  }
}

dominator.buttons.forEach( (button) => {
  button.addEventListener('click', function (event) {
    dominator.modal.style.display = 'block'
    dominator.sections[0].style.opacity = '0.15'
    dominator.sections[1].style.opacity = '0.15'
  })
})

dominator.close_modal.addEventListener('click', function (event) {
  dominator.modal.style.display = 'none'
  dominator.sections[0].style.opacity = '1'
  dominator.sections[1].style.opacity = '1'
})

dominator.word_generator_select.addEventListener('click', function (event) {
  dominator.text_output_box.value = get_random_word(Number(this.value))
})

dominator.param_cap_selectors.forEach( (selector) => {
  selector.addEventListener('click', function (event) {
    let text_arr = forminator.get_random_text(dominator.param_cap_selectors)
    dominator.text_output_box.innerHTML = ''
    text_arr.forEach( (p) => {
      dominator.text_output_box.innerHTML+= p + "\r\n"
    })
  })
})
