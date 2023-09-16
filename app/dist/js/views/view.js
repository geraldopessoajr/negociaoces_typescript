export class View {
    constructor(seletor, escapar) {
        this.escapar = false;
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error("Elemento não existe");
        }
        if (escapar) {
            this.escapar = escapar;
        }
    }
    update(model) {
        this.elemento.innerHTML = this.template(model);
    }
}
