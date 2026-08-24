# Esqueleto e músculos 3D interativos

Visualizador 3D com duas abas — **Esqueleto** e **Músculos** — com partes
clicáveis mostrando curiosidades, com foco no contexto da dança.

- **Esqueleto**: modelo "Male Skeleton" (LeoVitalis, Sketchfab).
- **Músculos**: modelo "Myology" (Z-Anatomy, Sketchfab).

## Como rodar

Navegadores bloqueiam o carregamento de arquivos `.gltf`/`.bin` direto do
disco (`file://`) por segurança — é preciso servir a pasta por um servidor
local simples.

### Opção 1 — Python
```bash
python -m http.server 8000
```
Depois abra **http://localhost:8000** no navegador.

### Opção 2 — VS Code
Instale a extensão **Live Server** e clique em "Go Live" com a pasta aberta.

### Modelo de músculos (obrigatório rodar localmente antes de abrir a aba)

O modelo de músculos (~154MB) **não fica no repositório Git** — é grande
demais para o GitHub (limite de 100MB por arquivo) e por isso está listado
no `.gitignore`. Antes de abrir a aba "Músculos", coloque os arquivos aqui:

```
assets/muscles/scene.gltf
assets/muscles/scene.bin
assets/muscles/license.txt
```

(baixe o modelo "Myology" da Z-Anatomy no Sketchfab e copie os três
arquivos pra essa pasta).

## Como usar
- **Abas** no topo: alterna entre Esqueleto e Músculos. Cada modelo só é
  carregado na primeira vez que a aba é aberta (lazy load) e depois fica em
  cache — trocar de aba não recarrega.
- **Arrastar** o mouse: gira o modelo.
- **Scroll**: zoom.
- **Clicar** numa parte do modelo: abre um painel embaixo com o nome e uma
  curiosidade.
- Botão **"inspetor (d)"** no canto superior direito (ou tecla `d`): ativa um
  modo de depuração.
  - Na aba **Esqueleto**, mostra as coordenadas 3D do ponto clicado — útil
    pra ajustar `yFrom`/`yTo` de cada parte em `src/skeletonView.js`.
  - Na aba **Músculos**, mostra o `Object_ID` e o material (tipo de tecido)
    do objeto clicado, com um botão "copiar Object_ID" — útil pra ir
    preenchendo `src/muscleCatalog.js` comparando com um atlas de anatomia.
- Na aba **Músculos**, um painel de camadas no canto superior direito permite
  mostrar/esconder por tipo de tecido (músculos, ossos, tendões, ligamentos
  etc.), com atalhos "mostrar tudo", "só músculos" e "esconder ossos".

## Estrutura do projeto

```
/assets
  /skeleton   scene.gltf + scene.bin + license.txt (versionado, ~17MB)
  /muscles    scene.gltf + scene.bin + license.txt (NÃO versionado, ~154MB)
/src
  sharedViewer.js   câmera, luzes, controls, raycaster e painel de info —
                    compartilhados pelas duas abas
  skeletonView.js   lógica específica do esqueleto (hitboxes + array PARTS)
  muscleView.js     lógica específica dos músculos (raycaster direto nos
                    objetos + filtro de camada por material)
  muscleCatalog.js  dicionário Object_ID -> nome anatômico / curiosidade
index.html
README.md
```

## Sobre a detecção de cliques

### Esqueleto
O `.glb`/`.gltf` do esqueleto é uma **malha única**, sem divisão por osso e
sem nomes internos. Por isso o visualizador usa **caixas invisíveis**
posicionadas por proporção de altura sobre cada região anatômica. Os
limites foram estimados a partir de proporções antropométricas padrão e
podem não estar perfeitos — use o modo inspetor para ajustar `yFrom`/`yTo`
de cada parte em `src/skeletonView.js`.

### Músculos
O modelo "Myology" já vem com **283 objetos/meshes separados** — cada
estrutura anatômica (músculo, tendão, osso, cartilagem etc.) é um mesh
individual, então o raycaster acerta o objeto real diretamente, sem
precisar de hitbox. O problema é que os nomes são genéricos
(`Object_2`...`Object_284`), sem identificação anatômica — só o material
indica o tipo de tecido. A identificação de cada peça (nome/curiosidade) é
feita manualmente, aos poucos, usando o modo inspetor e preenchendo
`src/muscleCatalog.js`.

**Sobre isolar só a parte inferior dos músculos**: o modelo não tem
transform por node (as coordenadas já vêm no espaço do mundo) e o eixo de
altura real é o Z local. Testamos um corte automático por altura (na faixa
do quadril) e a maioria dos objetos (~150 de 281) atravessa qualquer linha
de corte razoável, porque músculos do quadril se originam no tronco/pelve e
inserem no fêmur — não dá pra separar de forma confiável só por bounding
box. Isolar de fato a parte inferior exige uma classificação manual objeto
a objeto (via modo inspetor) e depois um script de extração (ex.:
`gltf-transform`) que remova os nodes de fora da lista e recompacte o
buffer binário — ainda não implementado.

## Licença dos modelos 3D

Os dois modelos têm licenças diferentes:

```
Esqueleto: "Male Skeleton" por LeoVitalis (Sketchfab) — CC BY 4.0
Músculos:  "Myology" por Z-Anatomy (Sketchfab) — CC BY-SA 4.0
```

Mantenha os créditos ao publicar ou compartilhar este projeto (veja
`assets/skeleton/license.txt` e `assets/muscles/license.txt`).

⚠️ **O modelo de músculos é CC BY-SA 4.0 (share-alike)**: se este projeto
for publicado ou distribuído incluindo o modelo de músculos (original ou
modificado), a distribuição **precisa continuar sob a mesma licença
CC BY-SA 4.0**. Essa exigência não se aplica à parte do esqueleto, cuja
licença (CC BY 4.0) é mais permissiva.
