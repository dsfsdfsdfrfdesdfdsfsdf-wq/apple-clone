/* ==========================================================================
   APPLE.COM - JAVASCRIPT DE INTERAÇÕES
   Funciona 100% offline, sem dependências externas
   ========================================================================== */

(function() {
    'use strict';

    // ==========================================================================
    // ESTADO DA APLICAÇÃO
    // ==========================================================================
    const state = {
        currentPage: 'home',
        selectedCountry: 'Brasil',
        cart: [],
        modalProduct: null,
        carouselIndex: 0
    };

    // ==========================================================================
    // SELETOR DE PAÍS/IDIOMA
    // ==========================================================================
    const countryBtn = document.getElementById('countryBtn');
    const countryMenu = document.getElementById('countryMenu');
    const countrySelector = document.getElementById('countrySelector');
    const countryLinks = document.querySelectorAll('.country-item a');

    const countryFlags = {
        'Brasil': '🇧🇷',
        'Estados Unidos': '🇺🇸',
        'Canadá': '🇨🇦',
        'México': '🇲🇽',
        'Reino Unido': '🇬🇧',
        'França': '🇫🇷',
        'Alemanha': '🇩🇪',
        'Itália': '🇮🇹',
        'Espanha': '🇪🇸',
        'Japão': '🇯🇵',
        'Coreia do Sul': '🇰🇷',
        'China': '🇨🇳',
        'Hong Kong': '🇭🇰',
        'Austrália': '🇦🇺',
        'Índia': '🇮🇳',
        'Emirados Árabes': '🇦🇪',
        'Suíça': '🇨🇭'
    };

    if (countryBtn) {
        countryBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            countrySelector.classList.toggle('open');
        });
    }

    document.addEventListener('click', function(e) {
        if (countrySelector && !countrySelector.contains(e.target)) {
            countrySelector.classList.remove('open');
        }
    });

    countryLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pais = this.textContent.split(' (')[0];
            state.selectedCountry = pais;
            
            const flag = countryFlags[pais] || '🌐';
            countryBtn.innerHTML = flag + ' ' + pais;
            countrySelector.classList.remove('open');
            
            // Efeito visual de confirmação
            countryBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                countryBtn.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // ==========================================================================
    // NAVEGAÇÃO MÓVEL
    // ==========================================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            this.setAttribute('aria-expanded', navLinks.classList.contains('open'));
        });

        // Fechar menu móvel ao clicar em um link
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================================================
    // NAVEGAÇÃO SCROLL (efecto de descolar na navbar)
    // ==========================================================================
    const nav = document.querySelector('.apple-nav');
    const navTop = document.querySelector('.nav-top');
    const navMenu = document.querySelector('.nav-menu');
    const navLogo = document.querySelector('.nav-logo');

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50 && currentScrollY > lastScrollY) {
            // Scroll para baixo - esconder navbar parcialmente
            if (nav) nav.classList.add('scrolled');
        } else if (currentScrollY < lastScrollY) {
            // Scroll para cima - mostrar navbar completa
            if (nav) nav.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });

    // ==========================================================================
    // BUSCA
    // ==========================================================================
    const navSearch = document.querySelector('.nav-search');
    if (navSearch) {
        navSearch.addEventListener('click', function() {
            const termo = prompt('O que você está procurando na Apple?\n\nEx: iPhone, Mac, iPad, Watch, AirPods');
            if (termo && termo.trim()) {
                // Simular busca local
                alert('🔍 Buscando por: "' + termo.trim() + '"\n\nResultado: ' + 
                    Math.floor(Math.random() * 50 + 10) + ' produtos encontrados.\n\n(Funcionalidade completa requer backend da Apple)');
            }
        });
    }

    // ==========================================================================
    // SACOLA DE COMPRAS
    // ==========================================================================
    const navBag = document.querySelector('.nav-bag');
    if (navBag) {
        navBag.addEventListener('click', function() {
            if (state.cart.length === 0) {
                alert('🛒 Sua sacola está vazia.\n\nAdicione produtos clicando em "Comprar" em qualquer item.');
                return;
            }
            
            let total = 0;
            let msg = '🛒 ITENS NA SACOLA:\n\n';
            state.cart.forEach(function(item, index) {
                total += item.preco;
                msg += (index + 1) + '. ' + item.nome + ' - ' + item.preco + '\n';
            });
            msg += '\nTOTAL: ' + total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            msg += '\n\n(Funcionalidade de checkout requer integração com pagamento da Apple)';
            
            alert(msg);
        });
    }

    // ==========================================================================
    // MODAL DE COMPRA
    // ==========================================================================
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalGrid = document.getElementById('modalGrid');

    let produtoSelecionado = '';
    let precoSelecionado = 0;

    window.openModal = function(nome, preco) {
        produtoSelecionado = nome;
        precoSelecionado = preco;
        
        if (modalTitle) modalTitle.textContent = 'Escolha seu ' + nome;
        
        // Capacidades de armazenamento
        const capacidades = [
            { nome: '128 GB', preco: preco },
            { nome: '256 GB', preco: preco + 1000 },
            { nome: '512 GB', preco: preco + 2000 },
            { nome: '1 TB', preco: preco + 3000 }
        ];

        if (modalGrid) {
            modalGrid.innerHTML = capacidades.map(function(op, i) {
                return '<div class="modal-option ' + (i === 0 ? 'selected' : '') + '" ' +
                    'onclick="selectOption(this, \'' + op.nome + '\', ' + op.preco + ')">' +
                    '<div class="modal-option-title">' + op.nome + '</div>' +
                    '<div class="modal-option-price">' + op.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + '</div>' +
                    '</div>';
            }).join('');
        }

        if (modalOverlay) {
            modalOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    };

    window.selectOption = function(element, nome, preco) {
        document.querySelectorAll('.modal-option').forEach(function(opt) {
            opt.classList.remove('selected');
        });
        element.classList.add('selected');
        produtoSelecionado = nome;
        precoSelecionado = preco;
    };

    window.closeModal = function() {
        if (modalOverlay) {
            modalOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    };

    window.checkout = function() {
        if (!produtoSelecionado) return;
        
        alert('💳 CHECKOUT DEMONSTRATIVO\n\n' +
            'Produto: ' + produtoSelecionado + '\n' +
            'Preço: ' + precoSelecionado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + '\n\n' +
            'IMPORTANTE: Este é um clone funcional para demonstração.\n' +
            'Pagamentos reais, autenticação e transações externas\n' +
            'não estão implementados neste ambiente offline.\n\n' +
            'Para comprar um produto real, visite www.apple.com');
        
        closeModal();
        
        // Adicionar à sacola
        state.cart.push({
            nome: produtoSelecionado,
            preco: precoSelecionado
        });
    };

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
            closeModal();
        }
    });

    // ==========================================================================
    // CARROSSEL DE PRODUTOS
    // ==========================================================================
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    
    if (carouselTrack && carouselDots.length > 0) {
        let currentSlide = 0;
        const totalSlides = carouselDots.length;

        function updateCarousel() {
            carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
            carouselDots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        carouselDots.forEach(function(dot, i) {
            dot.addEventListener('click', function() {
                currentSlide = i;
                updateCarousel();
            });
        });

        // Auto-rotacionar carousel a cada 5 segundos
        setInterval(function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }

    // ==========================================================================
    // ANIMAÇÃO AO SCROLL (Intersection Observer)
    // ==========================================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar animação aos cards de produto
    document.querySelectorAll('.product-card').forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(3rem)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.animationDelay = (index * 0.1) + 's';
        observer.observe(card);
    });

    // ==========================================================================
    // LINKS DE NAVEGAÇÃO INTERNA
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================================================
    // LINKS DE PRODUTO (abrir páginas locais)
    // ==========================================================================
    document.querySelectorAll('.product-buy, .section-links a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const texto = this.textContent.trim();
            
            // Se for um link externo ou #, não fazer nada especial
            if (href === '#' || href === '' || href.startsWith('http')) {
                return;
            }
            
            // Se for um link interno de produto, navegar para a página local
            if (href.endsWith('.html')) {
                return; // Deixar o navegador navegar normalmente
            }
            
            // Se for "Comprar" em um produto, abrir modal
            if (texto === 'Comprar' || texto === 'Saber mais') {
                const card = this.closest('.product-card');
                if (card) {
                    const title = card.querySelector('.product-title');
                    const price = card.querySelector('.product-price');
                    if (title && price) {
                        e.preventDefault();
                        const precoTexto = price.textContent.replace(/[^\d,]/g, '');
                        const precoNum = parseFloat(precoTexto.replace(',', '.')) || 0;
                        openModal(title.textContent, precoNum);
                    }
                }
            }
        });
    });

    // ==========================================================================
    // INICIALIZAÇÃO
    // ==========================================================================
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🍎 Apple Clone Offline - Carregado com sucesso');
        console.log('📍 País selecionado: ' + state.selectedCountry);
        console.log('🛒 Sacola: ' + state.cart.length + ' itens');
        
        // Atualizar texto do botão do país com a flag
        if (countryBtn && state.selectedCountry) {
            const flag = countryFlags[state.selectedCountry] || '🌐';
            countryBtn.innerHTML = flag + ' ' + state.selectedCountry;
        }
    });

})();