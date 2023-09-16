export abstract class View<Type> {

    protected elemento: HTMLElement;
    private escapar = false;

    constructor(seletor: string, escapar?: boolean){
        const elemento = document.querySelector(seletor);
        if(elemento) {
            this.elemento = elemento as HTMLInputElement;
        }
        else {
            throw  Error("Elemento não existe");
        }
        if(escapar) {
            this.escapar = escapar;
        }
    }

    public update(model: Type): void {
        this.elemento.innerHTML = this.template(model);
    }

    protected abstract template(model: Type): string;

}