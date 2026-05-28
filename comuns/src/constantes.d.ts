declare const MENSAGENS: {
    readonly REGISTRAR_PAGAMENTO: "registrar-pagamento";
    readonly BUSCAR_ASSINATURAS: "buscar-assinaturas";
    readonly CADASTRAR_ASSINATURA: "cadastrar-assinatura";
    readonly ATUALIZAR_ASSINATURA: "atualizar-assinatura";
    readonly EXCLUIR_ASSINATURA: "excluir-assinatura";
    readonly BUSCAR_ASSINATURAS_ATIVAS: "buscar-assinaturas-ativas";
    readonly CACHEAR_ASSINATURA_ATIVA: "cachear-assinatura-ativa";
    readonly BUSCAR_CLIENTES: "buscar-clientes";
    readonly CADASTRAR_CLIENTE: "cadastrar-cliente";
    readonly ATUALIZAR_CLIENTE: "atualizar-cliente";
    readonly EXCLUIR_CLIENTE: "excluir-cliente";
    readonly BUSCAR_PLANOS: "buscar-planos";
    readonly CADASTRAR_PLANO: "cadastrar-plano";
    readonly ATUALIZAR_PLANO: "atualizar-plano";
    readonly EXCLUIR_PLANO: "excluir-plano";
};
declare const EVENTOS: {
    readonly PAGAMENTO_REGISTRADO: "pagamento-registrado";
    readonly ASSINATURA_ATIVA: "assinatura-ativa";
    readonly ASSINATURA_CANCELADA: "assinatura-cancelada";
    readonly ASSINATURA_CRIADA: "assinatura-criada";
    readonly ASSINATURA_ATUALIZADA: "assinatura-atualizada";
    readonly ASSINATURA_EXCLUIDA: "assinatura-excluida";
};
declare const FILAS: {
    readonly FATURAMENTO: "fila-servico-faturamento";
    readonly GESTAO: "fila-servico-gestao";
    readonly ASSINATURAS_ATIVAS: "fila-servico-assinaturas-ativas";
};
export { MENSAGENS, EVENTOS, FILAS };
