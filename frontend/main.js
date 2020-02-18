export class Tui6mTutorialComponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.shadow.innerHTML = `
          <style>
            :host {
                /* The "all" property resets any CSS inherited from the outer context */
                all: initial;
                display: block;
                border: 5px solid #aaa;
                background: #daffd5;
                padding: 20px;
            }
          </style>
          <div>Hello World!</div>
      `
    }
}

customElements.define('tui-6m-tutorial-component', Tui6mTutorialComponent)