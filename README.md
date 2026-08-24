# Esqueleto 3D interativo — parte inferior

Visualizador 3D do modelo "Male Skeleton" (LeoVitalis, Sketchfab), recortado
da pelve pra baixo, com partes clicáveis mostrando curiosidades.

## Como rodar

Navegadores bloqueiam o carregamento de arquivos `.gltf`/`.bin` direto do
disco (`file://`) por segurança — é preciso servir a pasta por um servidor
local simples. Duas formas fáceis:

### Opção 1 — Python (já vem instalado no Mac/Linux)
```bash
cd esqueleto-3d
python3 -m http.server 8000
```
Depois abra **http://localhost:8000** no navegador.

### Opção 2 — VS Code
Instale a extensão **Live Server** e clique em "Go Live" com a pasta aberta.

## Como usar
- **Arrastar** o mouse: gira o esqueleto
- **Scroll**: zoom
- **Clicar** em uma região (quadril, coxa, joelho, perna, tornozelo, pé):
  abre um painel embaixo com o nome e uma curiosidade
- Botão **"calibrar (d)"** no canto superior direito (ou tecla `d`): ativa um
  modo de depuração que mostra as coordenadas 3D do ponto clicado — útil se
  você quiser ajustar manualmente os limites de cada região no código
  (`index.html`, array `PARTS`)

## Sobre a detecção de cliques

O arquivo `.glb`/`.gltf` baixado do Sketchfab é uma **malha única**, sem
divisão por osso e sem nomes internos (verificado na estrutura do arquivo).
Por isso, em vez de detectar cliques na malha em si, o visualizador usa
**caixas invisíveis** posicionadas por proporção de altura sobre cada região
anatômica (pelve, fêmur, joelho, tíbia/fíbula, tornozelo, pé — esquerdo e
direito). Os limites foram estimados a partir de proporções antropométricas
padrão e podem não estar perfeitos — use o modo de calibração acima para
ajustar `yFrom`/`yTo` de cada parte no array `PARTS` dentro do `index.html`.

## Licença do modelo 3D

Modelo "Male Skeleton" por **LeoVitalis**, disponível em CC BY 4.0.
Ao publicar ou compartilhar este projeto, mantenha o crédito
(veja `assets/license.txt`).
