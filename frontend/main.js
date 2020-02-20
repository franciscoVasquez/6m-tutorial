export class Tui6mTutorialComponent extends HTMLElement {

   
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })

        this.addEventListener("click", ev => {
            let rect = ev.target.getBoundingClientRect()

            tuiCottonBall.publish(
                "tutorial-component",
                this.getAttribute("scope") || "*",
                "click",
                { xPos: ev.clientX - rect.left, yPos: ev.clientY - rect.top }
            )
            tuiCottonBall.subscribe(
                "tutorial-component",
                this.getAttribute("scope") || "*",
                "background.change",
                (componentName, scope, eventName, data) => {
                    this.style.backgroundColor = data.color;
                }
            )
           

        })

    }


    static get observedAttributes() {
        return ['level', 'scope']
    }

    loadRandomNumber() {
        const xhr = new XMLHttpRequest(),
            shadow = this.shadow; // must be reassigned due to closure scope

        xhr.addEventListener("load", function () {
            shadow.innerHTML += ` ${JSON.parse(this.response).value}`;
        });

        xhr.addEventListener("error", error => console.error(error));

        xhr.open("GET", middlelayerUrl);
        xhr.send();
    }

    connectedCallback() {
        this.shadow.innerHTML = `
          <style>
            :host([level="warning"]) {
                border-color: #ff9900
            }

            :host([level="alert"]) {
                border-color: #900
            }
            :host {
                /* The "all" property resets any CSS inherited from the outer context */
                all: initial;
                display: block;
                border: 5px solid #aaa;
                background: #daffd5;
                padding: 20px;
            }

          </style>
          <div>Hello World</div>
      `
        this.loadRandomNumber()
    }
}
let assetsUrl = "__TUI_6M_ASSETS_URL__",
    middlelayerUrl = "__TUI_6M_MIDDLELAYER_URL__";

// development fallback
if (assetsUrl.indexOf("__") === 0) {
    assetsUrl = "http://localhost:3000";
    middlelayerUrl = "http://localhost:3500";
}

customElements.define('tui-6m-tutorial-component', Tui6mTutorialComponent)

