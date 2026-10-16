# Apple.com - Reconstrução Offline de Alta Fidelidade

Projeto REA (Reverse Engineer Anything) - Reconstrução funcional do site www.apple.com para execução 100% offline.

## 📋 Visão Geral

Este é um clone funcional do site oficial da Apple, reconstruído com base em engenharia reversa visual e funcional realizada com a skill REA. Todos os recursos (HTML, CSS, JavaScript, imagens) estão armazenados localmente para funcionamento sem conexão com a internet.

## 🗂️ Estrutura do Projeto

```
apple-offline/
├── index.html              # Página inicial (homepage)
├── iphone.html             # Página iPhone
├── mac.html                # Página Mac
├── ipad.html               # Página iPad
├── watch.html              # Página Apple Watch
├── vision.html             # Página Apple Vision Pro
├── airpods.html            # Página AirPods
├── casa.html               # Página Casa e Áudio
├── entretenimento.html     # Página Entretenimento/Serviços
├── acessorios.html         # Página Acessórios
├── suporte.html            # Página Suporte
├── css/
│   └── main.css            # Todos os estilos (9 arquivos CSS originais consolidados)
├── js/
│   └── app.js              # Interações JavaScript (modal, carrossel, navegação, país/idioma)
├── img/                    # 16 imagens originais da Apple
├── vercel.json             # Configuração de deploy no Vercel
├── apple-image-mapping.json # Mapeamento de URLs originais para arquivos locais
└── README.md               # Este arquivo
```

## 🚀 Funcionalidades Implementadas

### Navegação
- ✅ Barra superior com logo Apple, busca e sacola
- ✅ Menu principal: Store, Mac, iPad, iPhone, Watch, Vision, AirPods, Casa, Entretenimento, Acessórios, Suporte
- ✅ Menu móvel responsivo (hamburger)
- ✅ Seletor de país/idioma com 18 opções (Brasil, EUA, Canadá, França, Alemanha, Japão, Coreia, China, etc.)
- ✅ Navbar com efeito de scroll (descolar ao rolar)

### Interações
- ✅ Modal de compra com seleção de capacidade (128GB, 256GB, 512GB, 1TB)
- ✅ Carrossel de destaques com auto-rotação e navegação por dots
- ✅ Animações de entrada (fade-in up) ao scroll
- ✅ Efeitos hover em botões, links e cards de produto
- ✅ Busca local (simulada)
- ✅ Sacola de compras (demonstrativa)
- ✅ Links internos funcionais entre páginas

### Seções da Homepage
- ✅ Hero section com iPhone 18 Pro
- ✅ Seção iPhone (4 modelos)
- ✅ Seção Mac (4 modelos)
- ✅ Seção iPad (3 modelos)
- ✅ Seção Apple Watch (3 modelos, tema escuro)
- ✅ Seção AirPods (3 modelos)
- ✅ Carrossel de destaques semanais
- ✅ Seção Apple Upgrade Program
- ✅ Rodapé completo com links organizados

### Páginas Secundárias
Cada produto tem sua própria página com:
- Hero section dedicada
- Grid de produtos específicos
- Modal de compra funcional
- Navegação completa
- Rodapé completo

## 📱 Responsividade

- Desktop (1024px+): Navegação completa, grid de produtos múltiplas colunas
- Tablet (768px-1024px): Layout adaptado
- Mobile (<768px): Menu hamburger, grid de uma coluna, fontes ajustadas

## 🛠️ Tecnologias Utilizadas

- HTML5 semântico
- CSS3 (Flexbox, Grid, variáveis CSS, animações keyframes)
- JavaScript vanilla (sem dependências externas)
- SVG para ícones e logo

## ⚠️ Funcionamento Offline

Este projeto funciona 100% offline:
- Todas as imagens estão na pasta `img/`
- Todo o CSS está em `css/main.css`
- Todo o JavaScript está em `js/app.js`
- Não há chamadas a CDNs externos
- Não há referências a servidores da Apple
- Não há APIs remotas

## 🧪 Testar Localmente

```bash
# Usando Python
cd apple-offline
python -m http.server 8000
# Acesse: http://localhost:8000

# Ou usando Node.js
cd apple-offline
npx serve .
# Acesse: http://localhost:5000
```

## 🌐 Deploy no Vercel

O arquivo `vercel.json` está configurado para deploy automático. Conecte o repositório GitHub ao Vercel para deploy contínuo.

## 📄 Licença

Este projeto é uma reconstrução educacional para fins de engenharia reversa e estudo. Não é afiliado à Apple Inc. Todos os direitos das marcas e imagens pertencem à Apple Inc.
