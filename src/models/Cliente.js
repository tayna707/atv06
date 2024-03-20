

export default class Cliente {

    constructor(pNome, pTel_cel, pTel_fixo, pEmail) {
        this.nome = nome;
        this.tel_cel = tel_cel;
        this.tel_fixo = tel_fixo;
        this.email = email;
    }

    get Nome() { return this.nome; }
    set Nome(value) { this.nome = value }

    get Tel_cel() { return this.tel_cel; }
    set Tel_cel(value) { this.tel_cel = value }

    get Tel_fixo() { return this.tel_fixo; }
    set Tel_fixo(value) { this.tel_fixo = value }

    get Email() { return this.email; }
    set Email(value) { this.nome = email }
}
