import { Injectable, Inject, Dependencies } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { FILAS, MENSAGENS } from '@gestao-internet/comuns/constantes';
import { RedisCache } from 'cache-manager-ioredis-yet';

@Injectable()
@Dependencies(CACHE_MANAGER, FILAS.GESTAO)
class CacheAssinaturas {
  private readonly cache: Cache;
  private readonly filaGestao: ClientProxy;

  public constructor(cacheManager: Cache, filaGestao: ClientProxy) {
    this.cache = cacheManager;
    this.filaGestao = filaGestao;
  }

  private async buscarCodigosAssinatura(): Promise<number[]> {
    let codigos = ((await this.cache.get('codigos-assinaturas')) ||
      []) as number[];
    codigos = Array.from(new Set([...codigos]));
    return codigos;
  }

  private async adicionarCodigoAssinatura(codigo: number): Promise<number[]> {
    codigo = Number(codigo);
    let codigos = await this.buscarCodigosAssinatura();
    codigos = Array.from(new Set([...codigos, codigo]));
    await this.cache.set('codigos-assinaturas', codigos);
    return codigos;
  }

  private async removerCodigoAssinatura(codigo: number): Promise<number[]> {
    codigo = Number(codigo);
    let codigos = await this.buscarCodigosAssinatura();
    codigos = codigos.filter((cod) => cod !== codigo);
    await this.cache.set("codigos-assinaturas", codigos);
    return codigos;
  }

  public async adicionarAssinaturaAtiva(assinatura: any) {
    await this.cache.set(`${assinatura.codigo}`, assinatura);
    await this.adicionarCodigoAssinatura(assinatura.codigo);
  }

  public async removerAssinaturaAtiva(codigo: number) {
    await this.cache.del(`${codigo}`);
    await this.removerCodigoAssinatura(codigo);
  }

  public async buscarAssinaturaAtiva(codigo: number) {
    const assinaturaEmCache = await this.cache.get(`${codigo}`);
    if (assinaturaEmCache) {
      return assinaturaEmCache;
    }

    const observavel = this.filaGestao.send(MENSAGENS.BUSCAR_ASSINATURAS, {
      codigo,
    });
    const [assinatura = null] = await lastValueFrom(observavel);

    if (assinatura) {
      if (assinatura.status !== 'Ativo') {
        return null; // Não salva se não estiver ativa
      }

      await this.adicionarAssinaturaAtiva(assinatura);
    }

    return assinatura;
  }

  public async buscarTodasAssinaturasAtivas(): Promise<any[]> {
    const chaves: string[] = (await this.buscarCodigosAssinatura()).map(
      (cod) => `${cod}`
    );
    if (chaves.length === 0) {
      return [];
    }

    const promessas = chaves.map((chave) => this.cache.get(chave));
    const assinaturas = await Promise.all(promessas);

    return assinaturas.filter(Boolean);
  }
}

export default CacheAssinaturas;
export { CacheAssinaturas };
