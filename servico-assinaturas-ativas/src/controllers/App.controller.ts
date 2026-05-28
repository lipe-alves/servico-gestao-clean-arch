import { Controller, Dependencies } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { EVENTOS, MENSAGENS } from '@gestao-internet/comuns/constantes';
import CacheAssinaturas from '../servicos/CacheAssinaturas.servico';

@Controller()
@Dependencies(CacheAssinaturas)
class AppController {
  private readonly cacheAssinaturas: CacheAssinaturas;

  public constructor(CacheAssinaturas: CacheAssinaturas) {
    this.cacheAssinaturas = CacheAssinaturas;
  }

  @EventPattern(EVENTOS.ASSINATURA_ATIVA)
  public async aoAtivarAssinatura(@Payload() assinatura: any) {
    console.log('EVENTOS.ASSINATURA_ATIVA assinatura', assinatura);
    await this.cacheAssinaturas.adicionarAssinaturaAtiva(assinatura);
  }

  @EventPattern(EVENTOS.ASSINATURA_CANCELADA)
  public async aoCancelarAssinatura(@Payload() assinatura: any) {
    console.log('EVENTOS.ASSINATURA_CANCELADA assinatura', assinatura);
    await this.cacheAssinaturas.removerAssinaturaAtiva(assinatura.codigo);
  }

  @EventPattern(EVENTOS.ASSINATURA_CRIADA)
  public async aoCriarAssinatura(@Payload() assinatura: any) {
    console.log('EVENTOS.ASSINATURA_CRIADA assinatura', assinatura);
    if (assinatura.status !== 'Ativo') return;
    await this.cacheAssinaturas.adicionarAssinaturaAtiva(assinatura);
  }

  @EventPattern(EVENTOS.ASSINATURA_ATUALIZADA)
  public async aoAtualizarAssinatura(@Payload() assinatura: any) {
    console.log('EVENTOS.ASSINATURA_ATUALIZADA assinatura', assinatura);
    if (assinatura.status !== 'Ativo') return;
    await this.cacheAssinaturas.adicionarAssinaturaAtiva(assinatura);
  }

  @EventPattern(EVENTOS.ASSINATURA_EXCLUIDA)
  public async aoExcluirAssinatura(@Payload() assinatura: any) {
    console.log('EVENTOS.ASSINATURA_EXCLUIDA assinatura', assinatura);
    if (assinatura.status !== 'Ativo') return;
    await this.cacheAssinaturas.removerAssinaturaAtiva(assinatura);
  }

  @MessagePattern(MENSAGENS.BUSCAR_ASSINATURAS_ATIVAS)
  public async buscarPlanosAtivosEmCache(
    @Payload() { codigo }: { codigo?: number }
  ) {
    console.log('MENSAGENS.BUSCAR_ASSINATURAS_ATIVAS dados', { codigo });
    if (codigo) {
      const assinatura =
        await this.cacheAssinaturas.buscarAssinaturaAtiva(codigo);
      console.log('assinatura', assinatura);
      return assinatura ? [assinatura] : [];
    } else {
      const assinaturas =
        await this.cacheAssinaturas.buscarTodasAssinaturasAtivas();
      console.log('assinaturas', assinaturas);
      return assinaturas;
    }
  }

  @MessagePattern(MENSAGENS.CACHEAR_ASSINATURA_ATIVA)
  public async salvarAssinaturaEmCache(@Payload() assinaturas: any[]) {
    console.log('MENSAGENS.CACHEAR_ASSINATURA_ATIVA assinaturas', assinaturas);
    for (const assinatura of assinaturas) {
      if (assinatura.status !== 'Ativo') continue;
      await this.cacheAssinaturas.adicionarAssinaturaAtiva(assinatura);
    }

    return {
      sucesso: true,
    };
  }
}

export default AppController;
export { AppController };
