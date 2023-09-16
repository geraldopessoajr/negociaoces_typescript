import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView', true);
    private mensagemView = new MensagemView("#mensagemView");

    constructor(){
        this.inputData = document.querySelector("#data") as HTMLInputElement;
        this.inputQuantidade = document.querySelector("#quantidade") as HTMLInputElement;
        this.inputValor = document.querySelector("#valor") as HTMLInputElement; 
        this.negociacoesView.update(this.negociacoes);   
    }

    public adiciona(): void{
        const negociacao = this.criaNegociacao(); 
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }

    public importarDados():void {
        fetch("http://localhost:8080/dados")
            .then(res => {return res.json()})
            .then((dados: any[]) => {
                return dados.map(dado => {
                    return new Negociacao(
                        new Date(), 
                        dado.vezes, 
                        dado.montante)
                });
            })
            .then(negociacoes => {
                for(let negociacao of negociacoes) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            });
    }

    private criaNegociacao(): Negociacao {
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com Sucesso");
        
    }
}