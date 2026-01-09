import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const translations = {
  pt: {
    nav: {
      services: 'Expertise',
      projects: 'Soluções',
      philosophy: 'Filosofia',
      contact: 'Contato',
    },
    hero: {
      tagline: 'Estratégia Digital & IA',
      title: 'Transformando complexidade em clareza operacional.',
      subtitle: 'Sistemas inteligentes e automações desenhados para eliminar o trabalho manual e escalar sua operação com eficiência máxima.',
      ctaPrimary: 'Agendar Consultoria',
      ctaSecondary: 'Explorar Soluções',
    },
    techStack: [
      "Automação Inteligente", "Redução de Custos", "Atendimento 24/7", 
      "Escalabilidade", "Alta Performance", "Segurança de Dados", 
      "Gestão Eficiente", "Inovação", "Conversão de Vendas", 
      "Agilidade", "Estratégia Digital", "Organização"
    ],
    services: {
      heading: 'Tecnologia invisível, resultados visíveis.',
      subheading: 'Não entrego apenas código. Entrego sistemas que funcionam sozinhos, aprendem com seu negócio e liberam seu tempo.',
      items: [
        {
          title: "Inteligência Artificial",
          description: "Soluções que pensam pelo seu negócio. Desenvolvo assistentes virtuais que atendem seus clientes 24/7 e sistemas que analisam seus dados para gerar insights valiosos, transformando informações soltas em decisões estratégicas automáticas.",
        },
        {
          title: "Automação de Processos",
          description: "Sincronização total da sua empresa. Conecto suas ferramentas de Vendas, Financeiro e Gestão em um fluxo único. Elimine tarefas repetitivas, reduza erros manuais a zero e ganhe velocidade operacional para focar no que realmente importa.",
        },
        {
          title: "Sistemas Sob Medida",
          description: "Plataformas digitais robustas e seguras, construídas especificamente para a sua necessidade. Crio softwares que suportam o crescimento acelerado da sua empresa, garantindo estabilidade e uma experiência impecável para seus usuários.",
        }
      ]
    },
    projects: {
      heading: 'Soluções Premium. Foco no resultado.',
      subheading: 'Do atendimento ao cliente à gestão interna. Produtos desenvolvidos para gerar eficiência imediata e crescimento sustentável.',
      cta: 'SABER MAIS',
      items: [
        {
          category: "Atendimento Inteligente",
          title: "Assistente Virtual WhatsApp",
          description: "Atendimento humanizado que nunca dorme. Seu assistente qualifica clientes, agenda reuniões e tira dúvidas instantaneamente, aumentando suas vendas enquanto você descansa.",
        },
        {
          category: "Gestão Eficiente",
          title: "Controle de Estoque Preditivo",
          description: "O sistema que prevê o futuro do seu estoque. Utiliza dados históricos para antecipar demandas e automatizar compras, otimizando seu fluxo de caixa e evitando desperdícios.",
        },
        {
          category: "Presença Digital",
          title: "Sites de Alta Conversão",
          description: "Páginas desenhadas estrategicamente para vender. Design premium, carregamento instantâneo e foco total em transformar visitantes em clientes reais.",
        },
        {
          category: "Software Personalizado",
          title: "Plataformas de Gestão",
          description: "O sistema operacional da sua empresa. Painéis administrativos e ferramentas internas criadas sob medida para resolver os gargalos específicos da sua operação.",
        }
      ]
    },
    philosophy: {
      heading: 'Mais do que tecnologia. Estratégia de negócio.',
      text: 'Um sistema complexo gera ruído. Meu trabalho é criar silêncio operacional: soluções que funcionam tão bem que você esquece que estão lá, permitindo que sua empresa cresça sem dores.',
      list: [
        { title: "Clareza Total", desc: "Sem termos complicados. Você entende exatamente o que está sendo construído e por quê." },
        { title: "Segurança Primeiro", desc: "Proteção dos seus dados e do seu negócio como prioridade absoluta." },
        { title: "Pronto para Crescer", desc: "Soluções preparadas para escalar junto com o faturamento da sua empresa." }
      ],
      diagram: {
        label: 'Fluxo de Automação',
        input: 'Dados de Entrada',
        inputSub: 'Vendas & Clientes',
        process: 'Decisão Inteligente',
        processSub: 'Lógica & Regras',
        output: 'Resultado',
        outputSub: 'Ação Realizada'
      }
    },
    faq: {
      heading: 'Dúvidas Frequentes',
      subheading: 'Questões comuns sobre como podemos trabalhar juntos.',
      ctaText: 'Ainda restam dúvidas sobre o seu projeto?',
      ctaButton: 'Agende uma conversa rápida',
      items: [
        {
          question: "A tecnologia desenvolvida será minha?",
          answer: "Sim, totalmente. A solução é um ativo da sua empresa. Após a entrega, transfiro toda a propriedade e documentação para você. Você tem liberdade total sobre o que construímos, sem ficar preso a mim."
        },
        {
          question: "Vocês dão suporte após a entrega?",
          answer: "Com certeza. Todo projeto inclui um período de garantia para ajustes. Para o longo prazo, ofereço planos de acompanhamento para garantir que sua operação continue rodando perfeitamente."
        },
        {
          question: "Quanto tempo leva para ficar pronto?",
          answer: "Depende da complexidade, mas focamos em agilidade. Automações rápidas podem levar de 1 a 3 semanas. Projetos maiores, de 4 a 10 semanas. Definimos um cronograma claro antes de começar."
        },
        {
          question: "Como funciona o pagamento?",
          answer: "Trabalho com preço fechado para projetos definidos ou valor mensal para consultoria contínua. Tudo transparente, sem custos ocultos ou surpresas no final do mês."
        }
      ]
    },
    contact: {
      heading: 'Vamos conversar.',
      subheading: 'Grandes projetos começam com um bom alinhamento. Conte-me um pouco sobre o seu desafio atual.',
      successTitle: 'Solicitação Recebida',
      successText: 'Entrarei em contato pelo email fornecido em até 24 horas úteis.',
      newMessage: 'Nova mensagem',
      form: {
        name: 'Nome',
        namePlaceholder: 'Seu nome completo',
        email: 'Email Corporativo',
        emailPlaceholder: 'nome@empresa.com',
        context: 'Objetivo Principal',
        contextPlaceholder: 'O que você precisa resolver?',
        options: [
          'Automatizar Processos Internos',
          'Implementar Inteligência Artificial',
          'Criar um Novo Sistema/Site',
          'Consultoria Estratégica'
        ],
        details: 'Detalhes Adicionais',
        detailsPlaceholder: 'Descreva brevemente o desafio ou o objetivo...',
        button: 'INICIAR CONVERSA',
        sending: 'ENVIANDO...',
        errorRequired: 'Preencha todos os campos obrigatórios.',
        errorSubmit: 'Não foi possível enviar agora. Tente novamente em instantes.'
      },
      info: {
        direct: 'Contato Direto',
        location: 'Brasil • Remoto Global',
        expect: 'O Que Esperar',
        step1Title: 'Análise Inicial',
        step1Desc: 'Avalio seu cenário para entender se posso ajudar.',
        step2Title: 'Reunião de Alinhamento',
        step2Desc: 'Conversa rápida de 30min para mapear as dores.',
        step3Title: 'Plano de Ação',
        step3Desc: 'Entrega da proposta com cronograma e investimento.',
        timezone: 'Fuso horário: GMT-3 (Brasília)'
      }
    },
    footer: {
      rights: 'Todos os direitos reservados.'
    }
  },
  en: {
    nav: {
      services: 'Expertise',
      projects: 'Solutions',
      philosophy: 'Philosophy',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Digital Strategy & AI',
      title: 'Transforming complexity into operational clarity.',
      subtitle: 'Smart systems and automations designed to eliminate manual work and scale your operation with maximum efficiency.',
      ctaPrimary: 'Book Consultation',
      ctaSecondary: 'Explore Solutions',
    },
    techStack: [
      "Intelligent Automation", "Cost Reduction", "24/7 Support", 
      "Scalability", "High Performance", "Data Security", 
      "Efficient Management", "Innovation", "Sales Conversion", 
      "Agility", "Digital Strategy", "Organization"
    ],
    services: {
      heading: 'Invisible technology, visible results.',
      subheading: 'I don\'t just deliver code. I deliver systems that work autonomously, learn from your business, and free up your time.',
      items: [
        {
          title: "Artificial Intelligence",
          description: "Solutions that think for your business. I develop virtual assistants that serve your customers 24/7 and systems that analyze your data to generate valuable insights, turning raw information into automatic strategic decisions.",
        },
        {
          title: "Process Automation",
          description: "Total synchronization for your company. I connect your Sales, Finance, and Management tools into a single seamless flow. Eliminate repetitive tasks, reduce manual errors to zero, and gain operational speed to focus on what matters.",
        },
        {
          title: "Custom Systems",
          description: "Robust and secure digital platforms, built specifically for your needs. I create software that supports your company's accelerated growth, ensuring stability and a flawless experience for your users.",
        }
      ]
    },
    projects: {
      heading: 'Premium Solutions. Result-focused.',
      subheading: 'From customer service to internal management. Products developed to generate immediate efficiency and sustainable growth.',
      cta: 'LEARN MORE',
      items: [
        {
          category: "Smart Support",
          title: "WhatsApp Virtual Assistant",
          description: "Humanized support that never sleeps. Your assistant qualifies leads, schedules meetings, and answers questions instantly, increasing your sales while you rest.",
        },
        {
          category: "Efficient Management",
          title: "Predictive Inventory Control",
          description: "The system that predicts your inventory's future. It uses historical data to anticipate demand and automate purchasing, optimizing your cash flow and avoiding waste.",
        },
        {
          category: "Digital Presence",
          title: "High-Conversion Sites",
          description: "Pages strategically designed to sell. Premium design, instant loading, and total focus on turning visitors into real customers.",
        },
        {
          category: "Custom Software",
          title: "Management Platforms",
          description: "Your company's operating system. Administrative dashboards and internal tools custom-made to solve the specific bottlenecks of your operation.",
        }
      ]
    },
    philosophy: {
      heading: 'More than technology. Business strategy.',
      text: 'A complex system generates noise. My job is to create operational silence: solutions that work so well you forget they are there, allowing your company to grow without growing pains.',
      list: [
        { title: "Total Clarity", desc: "No complicated terms. You understand exactly what is being built and why." },
        { title: "Security First", desc: "Protecting your data and your business is the absolute priority." },
        { title: "Ready to Grow", desc: "Solutions prepared to scale along with your company's revenue." }
      ],
      diagram: {
        label: 'Automation Flow',
        input: 'Input Data',
        inputSub: 'Sales & Customers',
        process: 'Smart Decision',
        processSub: 'Logic & Rules',
        output: 'Result',
        outputSub: 'Action Taken'
      }
    },
    faq: {
      heading: 'Frequently Asked Questions',
      subheading: 'Common questions about how we can work together.',
      ctaText: 'Still have questions about your project?',
      ctaButton: 'Schedule a quick chat',
      items: [
        {
          question: "Will the developed technology be mine?",
          answer: "Yes, completely. The solution is an asset of your company. Upon delivery, I transfer all ownership and documentation to you. You have total freedom over what we built, without being locked in."
        },
        {
          question: "Do you offer support after delivery?",
          answer: "Absolutely. Every project includes a warranty period for adjustments. For the long term, I offer maintenance plans to ensure your operation continues running perfectly."
        },
        {
          question: "How long does it take?",
          answer: "It depends on complexity, but we focus on agility. Quick automations can take 1 to 3 weeks. Larger projects, 4 to 10 weeks. We define a clear timeline before starting."
        },
        {
          question: "How does payment work?",
          answer: "I work with fixed pricing for defined projects or a monthly retainer for continuous consulting. Everything is transparent, with no hidden costs or surprises."
        }
      ]
    },
    contact: {
      heading: 'Let\'s talk.',
      subheading: 'Great projects start with good alignment. Tell me a bit about your current challenge.',
      successTitle: 'Request Received',
      successText: 'I will contact you via the provided email within 24 business hours.',
      newMessage: 'New message',
      form: {
        name: 'Name',
        namePlaceholder: 'Your full name',
        email: 'Corporate Email',
        emailPlaceholder: 'name@company.com',
        context: 'Primary Objective',
        contextPlaceholder: 'What do you need to solve?',
        options: [
          'Automate Internal Processes',
          'Implement Artificial Intelligence',
          'Create a New System/Site',
          'Strategic Consulting'
        ],
        details: 'Additional Details',
        detailsPlaceholder: 'Briefly describe the challenge or objective...',
        button: 'START CONVERSATION',
        sending: 'SENDING...',
        errorRequired: 'Please fill in all required fields.',
        errorSubmit: 'Could not send now. Please try again shortly.'
      },
      info: {
        direct: 'Direct Contact',
        location: 'Brazil • Remote Global',
        expect: 'What to Expect',
        step1Title: 'Initial Analysis',
        step1Desc: 'I evaluate your scenario to understand if I can help.',
        step2Title: 'Alignment Meeting',
        step2Desc: 'Quick 30min chat to map out the pain points.',
        step3Title: 'Action Plan',
        step3Desc: 'Delivery of the proposal with timeline and investment.',
        timezone: 'Timezone: GMT-3 (Brasília)'
      }
    },
    footer: {
      rights: 'All rights reserved.'
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
      setLanguage(savedLang);
    } else {
      // Default to user's browser preference if available
      const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
      setLanguage(browserLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};