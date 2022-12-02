import { call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from "axios";
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    payment_methods_relation: [
        {"id": "mastercard", "svg": "/media/svg/credit-card/flat/mastercard.svg"},
        {"id": "visa", "svg": "/media/svg/credit-card/flat/visa.svg"},
        {"id": "amex", "svg": "/media/svg/credit-card/flat/amex.svg"},
        {"id": "hipercard", "svg": "/media/svg/credit-card/flat/hipercard.svg"},
        {"id": "elo", "svg": "/media/svg/credit-card/flat/elo.svg"},
    ],
    default_trial_days: 7,
	is_tour_open: false,
	is_modal_tour_open: false,
    cards: [],
    dashboard: {},
    is_dashboard_loading: false,
    petitions_categories: [],
    is_petitions_categories_loading: false,
    petitions_category_types: [],
    is_petitions_category_types_loading: false,
    petitions_category_name: '',
    petitions: {
        data: [],
        pages: 0,
    },
    is_petitions_loading: false,
    petition: {},
    is_petition_loading: false,
    institutions: [],
    institutions_select: [],
    is_institutions_loading: false,
    indexes: [],
    indexes_pf: [],
    indexes_pj: [],
    average_price_indexes: [],
    is_indexes_loading: false,
    periodicity_types: [
        {id: '0', name: 'Mensal'},
        {id: '1', name: 'Anual'}
    ],
    installment_types: [
        {id: '0', name: 'Parcela de Débito'},
        {id: '1', name: 'Abatimento / Pagamento'}
    ],
    stakeholder_types: [
        {id: '1', name: 'Autor'},
        {id: '2', name: 'Credor'},
        {id: '3', name: 'Devedor'},
        {id: '4', name: 'Réu'},
    ],
    person_types: [
        {id: 'pf', name: 'Pessoa Física'},
        {id: 'pj', name: 'Pessoa Jurídica'}
    ],
    amortization_types: [
        {id: 'price', name: 'Fixas (Price)'},
        {id: 'sac', name: 'Variáveis (SAC)'},
    ],
    contract_types: [
        {code:"25471", name: "Aquisição de veículos", type: "PF"},
        {code: "25472", name: "Aquisição de outros bens", type: "PF"},
        {code:"25478", name: "Cartão de crédito parcelado", type: "PF"},
        {code:"25477", name: "Cartão de crédito rotativo", type: "PF"},
        {code:"25468", name: "Crédito pessoal consignado INSS", type: "PF"},
        {code:"25463", name: "Cheque especial", type: "PF"},
        {code:"25467", name: "Crédito pessoal consignado para trabalhadores do setor público", type: "PF"},
        {code:"25464", name: "Crédito pessoal não consignado", type: "PF"},
        {code:"25497", name: "Financiamento imobiliário com taxas de mercado", type: "PF"},
        {code: "25447", name: "Aquisição de veículos", type: "PJ"},
        {code: "25448", name: "Aquisição de bens", type: "PJ"},
        {code: "25440", name: "Antecipação de faturas de cartão de crédito", type: "PJ"},
        {code: "25442", name: "Capital de giro com prazo superior a 365 dias ", type: "PJ"},
        {code: "25441", name: "Capital de giro com prazo inferior a 365 dias", type: "PJ"},
        {code: "25456", name: "Cartão de crédito parcelado", type: "PJ"},
        {code: "25455", name: "Cartão de crédito rotativo", type: "PJ"},
        {code: "25450", name: "Arrendamento mercantil de veículos", type: "PJ"},
        {code: "25446", name: "Cheque especial", type: "PJ"},
        {code: "25445", name: "Conta garantida", type: "PJ"},
        {code: "25487", name: "Financiamento Imobiliário - Taxa regulada", type: "PJ"},
        {code: "25488", name: "Financiamento Imobiliário - Taxa total", type: "PJ"},
        {code: "25498", name: "Financiamento Imobiliário - Taxa regulada", type: "PF"},
        {code: "25499", name: "Financiamento Imobiliário - Taxa total", type: "PF"},
    ],
    simulation_result: {
        odds: 0,
        avg_interest_rate: 0,
        original_interest_rate: 0,
    },
    is_simulation_loading: false,
    report_review: {},
    is_report_review_loading: false,
    report_correction: {},
    report_correction_fgts: {},
    is_report_correction_loading: false,
    report_correction_complete: {},
    is_report_correction_complete_loading: false,
    report_childcare: {},
    is_report_childcare_loading: false,
    report_rent: {},
    is_report_rent_loading: false,
    states: [],
    is_states_loading: false,
    is_customer_loading: false,
    jurisprudences: {},
    is_jurisprudences_loading: false,
    jurisprudence: {},
    is_jurisprudence_loading: false,
    jurisprudence_fulltext: '',
    is_jurisprudence_fulltext_loading: false,
    query_data: {},
    professions: [],
    is_professions_loading: false,
    opportunities: [],
    is_opportunities_loading: false,
    is_query_validating_document: false,
    query_available_products: [],
    query_document_type: "",
    query_document_number: "",
    query_checkout_response: {},
    is_activating_account: false,
    account_activation_response: {},
    is_processing_pdf: false,
    processed_pdf_data: [],
    processed_cnis_data: {},
    report_prev: {},
    is_report_prev_loading: false,
    modal_subscription: {
        visible: false,
        title: '',
        subtitle: ''
    },
    calculations: {},
    calculations_loading: false,
    minimum_wages: [],
    inss_tetos: [],
    coupom: {},
    is_loading_coupom: false,
    is_loading_cards: false,
    unlocked_users: [
        'aadvocacia29@gmail.com',
        'adrianaadv.taborda@outlook.com',
        'adrianogmartins1977@gmail.com',
        'advamorimbruno@gmail.com',
        'adv.arthurpires@gmail.com',
        'adv.brunaporto@gmail.com',
        'paulus@paulusdesimoneadvogados.com.br',
        'advcezar@hotmail.com',
        'adv.claudiapeixoto@gmail.com',
        'adv.flaviaduarte@gmail.com',
        'advgledison@gmail.com',
        'adv.gsalles@gmail.com',
        'adv.jglameza@gmail.com',
        'cyntiaadv@yahoo.com.br',
        'adv.joaobatistapr@gmail.com',
        'miguel@moraesecassiano.com.br',
        'paulogoncalvesadv@hotmail.com',
        'advjoycefeitosa@gmail.com',
        'jean.advg@gmail.com',
        'paulogoncalvesadv@hotmail.com',
        'adv.maiara.almeida@gmail.com',
        'advocaciacgusmao@gmail.com',
        'donaldscott.adv@gmail.com',
        'andre_rock_andrade@outlook.com',
        'advocaciaevmoraes@gmail.com',
        'advogada_edines.rocha@outlook.com',
        'advprevidenciariocleci@outlook.com',
        'adv.rafaelas@gmail.com',
        'adv.robertovieira@gmail.com',
        'adv.romulolima@gmail.com',
        'alan_snak@hotmail.com',
        'alexpedrassolli@adv.oabsp.org.br',
        'alvesdsouza.adv@gmail.com',
        'johncarvalho.adv@gmail.com',
        'amanda-amorim2009@hotmail.com',
        'amanda@borssukemarcos.com.br',
        'amandatenorio.porto@gmail.com',
        'anaflaviaaquino355@gmail.com',
        'anamarnieri@gmail.com',
        'andersonmb_adv@hotmail.com',
        'andreaciribelliadv@gmail.com',
        'andrealuizamoura@gmail.com',
        'andre_a.viotto@hotmail.com',
        'andreia_ferrao@yahoo.com.br',
        'andremalaquias.adv@gmail.com',
        'andrericardocintra@yahoo.com.br',
        'andressaborgesrossini@gmail.com',
        'andreylealadv@gmail.com',
        'antoniocarlospeteradv@gmail.com',
        'apcarvalhoassessoriajuridica@gmail.com',
        'arleteaju@bol.com.br',
        'as_advogado@yahoo.com.br',
        'augustacesario.adv1@gmail.com',
        'azevedow.adv@gmail.com',
        'baquetebb@gmail.com',
        'bergamasco.advmorais@gmail.com',
        'brandenburgadvogado@gmail.com',
        'caiodelarolle@gmail.com',
        'caiomarcelociarelli@gmail.com',
        'calacorte.rodrigues@gmail.com',
        'calcrevisoes@gmail.com',
        'carlos@borrelliadvogados.com.br',
        'carloslimacontadorprev@gmail.com',
        'carlosmontigno@gmail.com',
        'cassioncardoso@hotmail.com',
        'catiack@yahoo.com.br',
        'cdzagatto@ig.com.br',
        'cleitonandradeadv@hotmail.com',
        'cleolopez5@hotmail.com',
        'clerisdasilva@gmail.com',
        'colenadv@gmail.com',
        'contato@jrjadvocacia.com',
        'contato@laisbraga.com.br',
        'contato@lucianaamaro.com.br',
        'contato@tmfadvogados.com',
        'contsud@hotmail.com',
        'cristianevrodriguesadv@gmail.com',
        'cristianonfalcao@hotmail.com',
        'csantos.adv@outlook.com',
        'dairrodrigoadv@gmail.com',
        'danieldiasadvogado@gmail.com',
        'danilobalmeida@hotmail.com',
        'danyelasilveira@gmail.com',
        'ddkoenig@gmail.com',
        'ddscherrer@hotmail.com',
        'cristianepadilhaadv@gmail.com',
        'debbora.araujo@hotmail.com',
        'deiasebold1@hotmail.com',
        'dellbastos@hotmail.com',
        'denise_schiavo31@yahoo.com.br',
        'diasadalbertoadv@gmail.com',
        'diegoffoontes@gmail.com',
        'diegorochaadv.n@gmail.com',
        'dimasvitormoret1@gmail.com',
        'dimilapratas@gmail.com',
        'direitoapsil@gmail.com',
        'doutorcarlao@gmail.com',
        'dra.luciana.lemosadvocaciajur@gmail.com',
        'dra.patriciavsantos@gmail.com',
        'drbenetti@terra.com.br',
        'dr.carlosneves.adv@gmail.com',
        'dr.elicampelocabral@gmail.com',
        'dr.feliperodrigues@gmail.com',
        'dr.fernando.e.franco@gmail.com',
        'duanevsantana@gmail.com',
        'dutrapinaadvogados@gmail.com',
        'ec_soares@adv.oabsp.org.br',
        'edeviarbl@gmail.com',
        'ednagoncalvesadv@gmail.com',
        'eduardo.boschetto@gmail.com',
        'eedivan1@gmail.com',
        'elielbpo@gmail.com',
        'elineidesantos.juridico@gmail.com',
        'elisangeladesousa.adv@gmail.com',
        'emanuelaadrianoadv@gmail.com',
        'erickferraz-adv@hotmail.com',
        'erivaniamedeiros.adv@gmail.com',
        'escritorio.dradaniele@gmail.com',
        'escritorio@marinhovieira.com',
        'estersbaptista@yahoo.com.br',
        'evelynremohi@hotmail.com',
        'evertoncipri@gmail.com',
        'e_zambanini@hotmail.com',
        'fabianafantim@fantimadvogados.com',
        'fabianamoura.advocacia@gmail.com',
        'fabianefontes1@yahoo.com.br',
        'fabianorosario@hotmail.com',
        'fabianossantana@hotmail.com',
        'fabriciogmlt@yahoo.com.br',
        'fabricio.pincini@gmail.com',
        'farias.ivan@hotmail.com',
        'fcarmo.adv@gmail.com',
        'felipecavalcanti@mbja.com.br',
        'felipe@felipelopesadv.com',
        'felipe.sens@gmail.com',
        'fernandapiola.adv@hotmail.com',
        'financeiro.cph4@gmail.com',
        'fragaadvog_miriam@hotmail.com',
        'francisco.bariani@gmail.com',
        'fsn@aasp.org.br',
        'gabriel.centraldpvat@gmail.com',
        'gabriellealvesadv@outlook.com',
        'gabriellmota17@hotmail.com',
        'gabrielteixeiramelo@hotmail.com',
        'gandinisanseverino@gmail.com',
        'geilealine@gmail.com',
        'gestao@mgtm.com.br',
        'giselequerino15@hotmail.com',
        'gleicecleia90@gmail.com',
        'gloriagodoy26@hotmail.com',
        'gregoryz.adv@gmail.com',
        'gssclementino@gmail.com',
        'guilhermebzagonel@gmail.com',
        'guilhermegiraldez@gmail.com',
        'gustavo.mascarello@outlook.com',
        'heinzen67@hotmail.com',
        'heldermiguel02@hotmail.com',
        'hugoprates@mpratesadvocacia.com.br',
        'idenipe@hotmail.com',
        'inairacarvalho1@hotmail.com',
        'inaja.advogada@gmail.com',
        'ingridquariguasi.adv@gmail.com',
        'ingridy.mauricio@gmail.com',
        'itaci_simon@hotmail.com',
        'iuryrafael.adv@gmail.com',
        'ivonepaz386@gmail.com',
        'izabellecosta.advocacia@gmail.com',
        'jachildebrand@hotmail.com',
        'jaquegarciaadv@gmail.com',
        'jaquelineremorini.advocacia@gmail.com',
        'jaquesar@gmail.com',
        'jcmeinsadvocacia@gmail.com',
        'jeduardoalves.adv@gmail.com',
        'jefferson.espindola@gmail.com',
        'jefferson@javollmann.adv.br',
        'jenniferlorenas@hotmail.com',
        'jeremiascarvalho.adv@gmail.com',
        'jessicaassis@adv.oabsp.org.br',
        'jessyca.baqueiro@gmail.com',
        'jmlira.advocacia@gmail.com',
        'jnsilvajunioradv@gmail.com',
        'joao08_mb@hotmail.com',
        'joaoeduardoadv@yahoo.com.br',
        'jorgerbrito@gmail.com',
        'joseane.linck@hotmail.com',
        'josedematosadv@gmail.com',
        'josemariaribeiroadv@hotmail.com',
        'jpereznunes@hotmail.com',
        'jpiedade.adv@outlook.com',
        'juliamartinsandradeadv@gmail.com',
        'julianaferreira.jfp@gmail.com',
        'julianaflaviaoliveira@adv.oabsp.org.br',
        'julioolivetti44@gmail.com',
        'juridico@albaniadv.com',
        'juridico.dmassessoria@gmail.com',
        'jussaracostabala@yahoo.com.br',
        'jussara.santana.adv@outlook.com',
        'juufaiad@hotmail.com',
        'jvmarys@hotmail.com',
        'kallyandrabarreto@gmail.com',
        'karencozete.adv@outlook.com',
        'karlatrust360@gmail.com',
        'karlavelosoadv90@gmail.com',
        'kelli.mariani@hotmail.com',
        'keniacaroline.santos@gmail.com',
        'khineraski@gmail.com',
        'krbg.bueno@gmail.com',
        'laborcontabil@yahoo.com.br',
        'lailalucioadvocacia@outlook.com',
        'laisa.amorim@live.com',
        'larisseramoscruz@gmail.com',
        'lavsadv@gmail.com',
        'laysmorgana@hotmail.com',
        'lcg1954@hotmail.com',
        'leilainyaquino@gmail.com',
        'lianaaraujo.adv@hotmail.com',
        'liandramartins2008@hotmail.com',
        'lidiamlseixas@gmail.com',
        'limaadvpb@gmail.com',
        'lima.adv.rs@gmail.com',
        'lopesferreiraadvocacia@yahoo.com',
        'lorena.mfritzen@gmail.com',
        'lourdes.martins.adv@gmail.com',
        'lu67263@gmail.com',
        'luannamv@hotmail.com',
        'lucas-festa@adv.oabsp.org.br',
        'luciangs@hotmail.com',
        'lucianoreis.adv@gmail.com',
        'adv.saulocruz@outlook.com',
        'luizeugeniosouza@terra.com.br',
        'luizgularte.adv@gmail.com',
        'daysevieiraadv@gmail.com',
        'luizhenriqueoliveira271261@gmail.com',
        'luiz.rocha@rjladv.com',
        'lusoaressilva@bol.com.br',
        'luzineteribeiro.advogada@gmail.com',
        'machadoraquel@bmmcadv.com.br',
        'maira.marostica@gmail.com',
        'manuelacteixeira@hotmail.com',
        'marceloandrade14@hotmail.com',
        'marcelonadin.adv@gmail.com',
        'marcocdadv@gmail.com',
        'marcosevarini@gmail.com',
        'alessandra74andrade@gmail.com',
        'margareteojuliao@gmail.com',
        'maria@mendoncaelbacha.com.br',
        'mariana.palma01@hotmail.com',
        'maribeiro802@gmail.com',
        'marisa.sonhocredi@gmail.com',
        'marra.adv@hotmail.com',
        'matheusmendes@adv.oabsp.org.br',
        'maybi_brogliatto@yahoo.com.br',
        'mcrmari@gmail.com',
        'mellohorta@gmail.com',
        'michelle.silvasouza0@gmail.com',
        'miguel@moraesecassiano.com.br',
        'mirantemar@yahoo.com.br',
        'mkvillasante@gmail.com',
        'moniquenobrega.adv@gmail.com',
        'morettoesiviero@hotmail.com',
        'mrdoliveiraadv@bol.com.br',
        'nelizefalcao.adv@gmail.com',
        'nildson.adv@outlook.com',
        'norbertoadv7@gmail.com',
        'nothemoteo@yahoo.com.br',
        'nunesbeatriz.adv@outlook.com',
        'opolakjr@gmail.com',
        'o.soares.adv@hotmail.com',
        'patriciabitu@adv.oabsp.org.br',
        'paulovictor.ayres@gmail.com',
        'paulo_vieira_rs@hotmail.com',
        'pedro.alem.santinho@gmail.com',
        'peres@peresadvogados.adv.br',
        'phscalixto@gmail.com',
        'poletto.douglas@gmail.com',
        'queiroz.muniz.advogados@gmail.com',
        'rafaelacordolino@hotmail.com',
        'rafael@bbadvocacia.com',
        'rafael.coelho@yahoo.com.br',
        'rangelcfarias@gmail.com',
        'rayheny_karla@hotmail.com',
        'r.christoantunes@gmail.com',
        'regirubens@hotmail.com',
        'reisadriane30@gmail.com',
        'ricardowallace.rw@gmail.com',
        'rmattosvieira@hotmail.com',
        'rodrigocorreaadvocacia@gmail.com',
        'rogeriopereira_advogado@hotmail.com',
        'rosanaocchi@adv.oabsp.org.br',
        'rosangelaalmeida@evellyoliveira.adv.br',
        'rosyyonaka.adv@gmail.com',
        'roxanajcosta@gmail.com',
        'rulli_ira@hotmail.com',
        'samanthabastos22@gmail.com',
        'samzilch@hotmail.com',
        'sanchesemerelesadvogados@gmail.com',
        'sandra.gogemski@gmail.com',
        'sandro.silva@adv.oabsp.org.br',
        'sergio.braido@uol.com.br',
        's.gustavo384@gmail.com',
        'sheilamartinss.sm@gmail.com',
        'silvares1@hotmail.com',
        'silviatavaresadvogada@gmail.com',
        'silvioneto9992@gmail.com',
        'simoesefrazaoadv@gmail.com',
        'sincomam.ntg@terra.com.br',
        'sindsfop.juridico@gmail.com',
        'souza.anapaula.adv@gmail.com',
        'souzarocha03.adv@gmail.com',
        'tainahlara@hotmail.com',
        'tania.freire@gmail.com',
        'taniamfs5@gmail.com',
        'teixeira.advocacia.pc@gmail.com',
        'totalcontabilidade42@gmail.com',
        'tsa.advogados@gmail.com',
        'uesleilima.adv@gmail.com',
        'valdemir_barbosaalves@hotmail.com',
        'valdison.nascimento@yahoo.com.br',
        'valqrobe@gmail.com',
        'valquiria.jjesus@gmail.com',
        'valterfilho2@bol.com.br',
        'vaz.eloiza@gmail.com',
        'venilsonpereiraadv@gmail.com',
        'veronicadoprado@hotmail.com',
        'vfpaulaadv@gmail.com',
        'victor.serutti@gmail.com',
        'victor@tpfadvogados.com.br',
        'vilsonmeyring@gmail.com',
        'viniciusgordon@gmail.com',
        'vitor.hk.tsuda@gmail.com',
        'viviane.adv0804@gmail.com',
        'vivianemaltchik@gmail.com',
        'volnandy@hotmail.com',
        'vsabino2019@gmail.com',
        'waldenayde@gmail.com',
        'wendrill@gmail.com',
        'willdson.advogado@gmail.com',
        'wvianasilva@outlook.com',
        'xcadvogados@aasp.org.br',
        'yasminfernandesadv@gmail.com',
    ],
    rent_installments: [],
    rent_contract_indexes: [],
    notifications: [],
    notifications_not_read: 0,
    is_notifications_loading: false,
    customer: {},

    customers: [],
    is_customers_loading: false,
    is_customer_deleting: true,
    customers_list: [],
    is_customers_list_loading: false,

    ufs: [],
    is_ufs_loading: false,

    cities: [],
    is_cities_loading: false,

    address_by_postal_code: [],
    is_address_by_postal_code_loading: false,

    courts_services: [],
    is_courts_services_loading: false,

    schedules: [],
    is_schedules_loading: false,

    available_schedules: [],
    is_available_schedules_loading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_CARDS':
			return { ...state, cards: INITIAL_STATE.cards, is_loading_cards: true }
        case 'LOAD_CARDS_SUCCESS':
            return { ...state, cards: action.payload, is_loading_cards: false }
        case 'LOAD_CARDS_FAILED':
            return { ...state, cards: INITIAL_STATE.cards, is_loading_cards: false }
        case 'LOAD_COUPOM':
			return { ...state, coupom: INITIAL_STATE.coupom, is_loading_coupom: true }
        case 'LOAD_COUPOM_SUCCESS':
            return { ...state, coupom: action.payload, is_loading_coupom: false }
        case 'LOAD_COUPOM_FAILED':
            return { ...state, coupom: INITIAL_STATE.coupom, is_loading_coupom: false }
        case 'LOAD_MINIMUM_WAGES':
			return { ...state, minimum_wages: INITIAL_STATE.minimum_wages }
        case 'LOAD_MINIMUM_WAGES_SUCCESS':
            return { ...state, minimum_wages: action.payload }
        case 'LOAD_MINIMUM_WAGES_FAILED':
            return { ...state, minimum_wages: INITIAL_STATE.minimum_wages }
        case 'LOAD_INSS_TETOS':
            return { ...state, inss_tetos: INITIAL_STATE.inss_tetos }
        case 'LOAD_INSS_TETOS_SUCCESS':
            return { ...state, inss_tetos: action.payload }
        case 'LOAD_INSS_TETOS_FAILED':
            return { ...state, inss_tetos: INITIAL_STATE.inss_tetos }
    
        case 'LOAD_CALCULATIONS':
			return { ...state, calculations_loading: true, calculations: INITIAL_STATE.calculations }
        case 'LOAD_CALCULATIONS_SUCCESS':
            return { ...state, calculations_loading: false, calculations: action.payload }
        case 'LOAD_CALCULATIONS_FAILED':
            return { ...state, calculations_loading: false, calculations: INITIAL_STATE.calculations }
		case 'OPEN_MODAL_TOUR':
			return { ...state, is_modal_tour_open: true }
		case 'CLOSE_MODAL_TOUR':
			return { ...state, is_modal_tour_open: false }
		case 'OPEN_TOUR':
			return { ...state, is_tour_open: true }
		case 'CLOSE_TOUR':
			return { ...state, is_tour_open: false }
        case 'SET_CARDS':
            return { ...state, cards: action.payload }
        case 'SET_MODAL_SUBSCRIPTION':
            return { ...state, modal_subscription: action.payload }
        case 'CLOSE_MODAL_SUBSCRIPTION':
            return {
                ...state,
                modal_subscription: INITIAL_STATE.modal_subscription
            }
        case 'FGTS_PROCESS':
            return { ...state, processed_pdf_data: INITIAL_STATE.processed_pdf_data, is_processing_pdf: true }
        case 'FGTS_PROCESS_SUCCESS':
            return { ...state, processed_pdf_data: action.payload, is_processing_pdf: false }
        case 'FGTS_PROCESS_FAILED':
            return { ...state, processed_pdf_data: INITIAL_STATE.processed_pdf_data, is_processing_pdf: false }

        case 'CNIS_PROCESS':
            return { ...state, processed_cnis_data: INITIAL_STATE.processed_cnis_data, is_processing_pdf: true }
        case 'CNIS_PROCESS_SUCCESS':
            return { ...state, processed_cnis_data: action.payload, is_processing_pdf: false }
        case 'CNIS_PROCESS_FAILED':
            return { ...state, processed_cnis_data: INITIAL_STATE.processed_cnis_data, is_processing_pdf: false }
    
        case 'REPORT_PREV':
            return { ...state, report_prev: INITIAL_STATE.processed_cnis_data, is_report_prev_loading: true }
        case 'REPORT_PREV_SUCCESS':
            return { ...state, report_prev: action.payload, is_report_prev_loading: false }
        case 'REPORT_PREV_FAILED':
            return { ...state, report_prev: INITIAL_STATE.processed_cnis_data, is_report_prev_loading: false }

                
        case 'ACTIVATE_ACCOUNT':
            return { ...state, account_activation_response: INITIAL_STATE.account_activation_response, is_activating_account: true }
        case 'ACTIVATE_ACCOUNT_SUCCESS':
            return { ...state, account_activation_response: action.payload, is_activating_account: false }
        case 'ACTIVATE_ACCOUNT_FAILED':
            return { ...state, account_activation_response: action.payload, is_activating_account: false }

        case 'LOAD_DASHBOARD':
            return { ...state, dashboard: INITIAL_STATE.dashboard, is_dashboard_loading: true }
        case 'LOAD_DASHBOARD_SUCCESS':
            return { ...state, dashboard: action.payload, is_dashboard_loading: false }
        case 'LOAD_DASHBOARD_FAILED':
            return { ...state, dashboard: INITIAL_STATE.dashboard, is_dashboard_loading: false }
        case 'QUERY_CHECKOUT':
            return {
                ...state,
                query_checkout_response: INITIAL_STATE.query_checkout_response,
            }
        case 'QUERY_CHECKOUT_SUCCESS':
            return {
                ...state,
                query_checkout_response: action.payload,
            }
        case 'QUERY_CHECKOUT_FAILED':
            return {
                ...state,
                query_checkout_response: INITIAL_STATE.query_checkout_response,
            }
        case 'QUERY_VALIDATE_DOCUMENT':
            return {
                ...state,
                is_query_validating_document: true,
                query_available_products: INITIAL_STATE.query_available_products,
                query_document_type: INITIAL_STATE.query_document_type,
                query_document_number: INITIAL_STATE.query_document_number,
            }
        case 'QUERY_VALIDATE_DOCUMENT_SUCCESS':
            return {
                ...state,
                is_query_validating_document: false,
                query_available_products: action.payload.available_products,
                query_document_type: action.payload.document_type,
                query_document_number: action.payload.document_number,
            }
        case 'QUERY_VALIDATE_DOCUMENT_FAILED':
            return {
                ...state,
                is_query_validating_document: false,
                query_available_products: INITIAL_STATE.query_available_products,
                query_document_type: INITIAL_STATE.query_document_type,
                query_document_number: INITIAL_STATE.query_document_number
            }
        case 'LOAD_PETITION':
            return { ...state, petition: INITIAL_STATE.petition, is_petition_loading: true }
        case 'LOAD_PETITION_SUCCESS':
            return { ...state, petition: action.payload, is_petition_loading: false }
        case 'LOAD_PETITION_FAILED':
            return { ...state, petition: INITIAL_STATE.petition, is_petition_loading: false }
        case 'LOAD_PETITIONS':
            return { ...state, petitions: INITIAL_STATE.petitions, is_petitions_loading: true }
        case 'LOAD_PETITIONS_SUCCESS':
            return { ...state, petitions: action.payload, is_petitions_loading: false }
        case 'LOAD_PETITIONS_FAILED':
            return { ...state, petitions: INITIAL_STATE.petitions, is_petitions_loading: false }
        case 'LOAD_PETITIONS_CATEGORIES':
            return { ...state, petitions_categories: [], is_petitions_categories_loading: true }
        case 'LOAD_PETITIONS_CATEGORIES_SUCCESS':
            return { ...state, petitions_categories: action.payload, is_petitions_categories_loading: false }
        case 'LOAD_PETITIONS_CATEGORIES_FAILED':
            return { ...state, petitions_categories: [], is_petitions_categories_loading: false }
        case 'LOAD_PETITIONS_CATEGORY_TYPES':
            return { ...state, petitions_category_types: [], petitions_category_name: '', is_petitions_category_types_loading: true }
        case 'LOAD_PETITIONS_CATEGORY_TYPES_SUCCESS':
            return {
                ...state,
                petitions_category_types: action.payload.types,
                petitions_category_name: action.payload.category_name,
                is_petitions_category_types_loading: false
            }
        case 'LOAD_PETITIONS_CATEGORY_TYPES_FAILED':
            return { ...state, petitions_category_types: [], petitions_category_name: '', is_petitions_category_types_loading: false }
        case 'LOAD_INSTITUTIONS':
            return { ...state, institutions: [], is_institutions_loading: true }
        case 'LOAD_INSTITUTIONS_SUCCESS':
            return {
                ...state,
                institutions: action.payload,
                is_institutions_loading: false,
                institutions_select: action.payload.map(institution => ({
                    label: institution.company_name
                }))
            }
        case 'LOAD_INSTITUTIONS_FAILED':
            return { ...state, institutions: [], is_institutions_loading: false }
        case 'LOAD_SIMULATION':
            return { ...state, simulation_result: INITIAL_STATE.simulation_result, is_simulation_loading: true }
        case 'LOAD_SIMULATION_SUCCESS':
            return { ...state, simulation_result: action.payload, is_simulation_loading: false }
        case 'LOAD_SIMULATION_FAILED':
            return { ...state, simulation_result: INITIAL_STATE.simulation_result, is_simulation_loading: false }
        case 'LOAD_INDEXES':
            return { ...state, indexes: [], indexes_pf: [], indexes_pj: [], is_indexes_loading: true }
        case 'LOAD_INDEXES_SUCCESS':
            return {
                ...state,
                indexes: action.payload,
                indexes_pf: action.payload.filter(index => index.interest_person_type === 'PF'),
                indexes_pj: action.payload.filter(index => index.interest_person_type === 'PJ'),
                average_price_indexes: action.payload.filter(index => index.type === 'average_price_index'),
                is_indexes_loading: false
            }
        case 'LOAD_INDEXES_FAILED':
            return { ...state, indexes: [], indexes_pf: [], indexes_pj: [], average_price_indexes: [], is_indexes_loading: false }
        case 'REPORT_REVIEW':
            return { ...state, report_review: {}, is_report_review_loading: true }
        case 'REPORT_REVIEW_SUCCESS':
            return { ...state, report_review: action.payload, is_report_review_loading: false }
        case 'REPORT_REVIEW_FAILED':
            return { ...state, report_review: {}, is_report_review_loading: false }
        case 'REPORT_CORRECTION_FGTS':
            return { ...state, report_correction_fgts: {} }
        case 'REPORT_CORRECTION_FGTS_SUCCESS':
            return { ...state, report_correction_fgts: action.payload }
        case 'REPORT_CORRECTION_FGTS_FAILED':
            return { ...state, report_correction_fgts: {} }
        case 'REPORT_CORRECTION':
            return { ...state, report_correction: {}, is_report_correction_loading: true }
        case 'REPORT_CORRECTION_SUCCESS':
            return { ...state, report_correction: action.payload, is_report_correction_loading: false }
        case 'REPORT_CORRECTION_FAILED':
            return { ...state, report_correction: {}, is_report_correction_loading: false }
        case 'REPORT_CORRECTION_COMPLETE':
            return { ...state, report_correction_complete: {}, is_report_correction_complete_loading: true }
        case 'REPORT_CORRECTION_COMPLETE_SUCCESS':
            return { ...state, report_correction_complete: action.payload, is_report_correction_complete_loading: false }
        case 'REPORT_CORRECTION_COMPLETE_FAILED':
            return { ...state, report_correction_complete: {}, is_report_correction_complete_loading: false }
        case 'REPORT_CHILDCARE':
            return { ...state, report_childcare: {}, is_report_childcare_loading: true }
        case 'REPORT_CHILDCARE_SUCCESS':
            return { ...state, report_childcare: action.payload, is_report_childcare_loading: false }
        case 'REPORT_CHILDCARE_FAILED':
            return { ...state, report_childcare: {}, is_report_childcare_loading: false }
        case 'REPORT_RENT':
            return { ...state, report_rent: {}, is_report_rent_loading: true }
        case 'REPORT_RENT_SUCCESS':
            return { ...state, report_rent: action.payload, is_report_rent_loading: false }
        case 'REPORT_RENT_FAILED':
            return { ...state, report_rent: {}, is_report_rent_loading: false }
        case 'LOAD_STATES':
            return { ...state, states: INITIAL_STATE.states, is_states_loading: true }
        case 'LOAD_STATES_SUCCESS':
            return { ...state, states: action.payload, is_states_loading: false }
        case 'LOAD_STATES_FAILED':
            return { ...state, states: INITIAL_STATE.states, is_states_loading: false }
        case 'LOAD_CUSTOMER':
            return { ...state, customer: INITIAL_STATE.customer, is_customer_loading: true }
        case 'LOAD_CUSTOMER_SUCCESS':
            return { ...state, customer: action.payload, is_customer_loading: false }
        case 'LOAD_CUSTOMER_FAILED':
            return { ...state, customer: INITIAL_STATE.customer, is_customer_loading: false }
        case 'LOAD_JURISPRUDENCES':
            return { ...state, jurisprudences: INITIAL_STATE.jurisprudences, is_jurisprudences_loading: true }
        case 'LOAD_JURISPRUDENCES_SUCCESS':
            return { ...state, jurisprudences: action.payload, is_jurisprudences_loading: false }
        case 'LOAD_JURISPRUDENCES_FAILED':
            return { ...state, jurisprudences: INITIAL_STATE.jurisprudences, is_jurisprudences_loading: false }
        case 'LOAD_JURISPRUDENCE':
            return { ...state, jurisprudence_fulltext: INITIAL_STATE.jurisprudence_fulltext, jurisprudence: INITIAL_STATE.jurisprudence, is_jurisprudence_loading: true }
        case 'LOAD_JURISPRUDENCE_SUCCESS':
            return { ...state, jurisprudence: action.payload, is_jurisprudence_loading: false }
        case 'LOAD_JURISPRUDENCE_FAILED':
            return { ...state, jurisprudence: INITIAL_STATE.jurisprudence, is_jurisprudence_loading: false }
        case 'LOAD_JURISPRUDENCE_FULLTEXT':
            return { ...state, jurisprudence_fulltext: INITIAL_STATE.jurisprudence_fulltext, is_jurisprudence_fulltext_loading: true }
        case 'LOAD_JURISPRUDENCE_FULLTEXT_SUCCESS':
            return { ...state, jurisprudence_fulltext: action.payload, is_jurisprudence_fulltext_loading: false }
        case 'LOAD_JURISPRUDENCE_FULLTEXT_FAILED':
            return { ...state, jurisprudence_fulltext: INITIAL_STATE.jurisprudence_fulltext, is_jurisprudence_fulltext_loading: false }
        case 'QUERY_DATA':
            return { ...state, query_data: INITIAL_STATE.query_data }
        case 'QUERY_DATA_SUCCESS':
            return { ...state, query_data: action.payload }
        case 'QUERY_DATA_FAILED':
            return { ...state, query_data: INITIAL_STATE.query_data }
        case 'LOAD_PROFESSIONS':
            return { ...state, professions: INITIAL_STATE.professions, is_professions_loading: true }
        case 'LOAD_PROFESSIONS_SUCCESS':
            return { ...state, professions: action.payload, is_professions_loading: false }
        case 'LOAD_PROFESSIONS_FAILED':
            return { ...state, professions: INITIAL_STATE.professions, is_professions_loading: false }
        case 'LOAD_OPPORTUNITIES':
            return { ...state, opportunities: INITIAL_STATE.opportunities, is_opportunities_loading: true }
        case 'LOAD_OPPORTUNITIES_SUCCESS':
            return { ...state, opportunities: action.payload, is_opportunities_loading: false }
        case 'LOAD_OPPORTUNITIES_FAILED':
            return { ...state, opportunities: INITIAL_STATE.opportunities, is_opportunities_loading: false }
        case 'SET_NOTIFICATIONS_LOADING':
            return { ...state, is_notifications_loading: action.payload  }
        case 'LOAD_NOTIFICATIONS_SUCCESS':
            return { ...state, notifications: action.payload.notifications, is_notifications_loading: false, notifications_not_read: action.payload.n_not_read }
        case 'LOAD_NOTIFICATIONS_FAILED':
            return { ...state, notifications: [], is_notifications_loading: false, notifications_not_read: 0 }
        case 'SET_RENT_INSTALLMENTS':
            return { ...state, rent_installments: action.payload.installments, rent_contract_indexes: action.payload.indexes }

        case 'LOAD_CUSTOMERS':
            return { ...state, customers: INITIAL_STATE.customers, is_customers_loading: true }
        case 'LOAD_CUSTOMERS_SUCCESS':
            return { ...state, customers: action.payload, is_customers_loading: false }
        case 'LOAD_CUSTOMERS_FAILED':
            return { ...state, customers: INITIAL_STATE.customers, is_customers_loading: false }
        case 'LOAD_CUSTOMERS_LIST':
            return { ...state, customers_list: INITIAL_STATE.customers, is_customers_list_loading: true }
        case 'LOAD_CUSTOMERS_LIST_SUCCESS':
            return { ...state, customers_list: action.payload, is_customers_list_loading: false }
        case 'LOAD_CUSTOMERS_LIST_FAILED':
            return { ...state, customers_list: INITIAL_STATE.customers_list, is_customers_list_loading: false }
        case 'LOAD_UFS':
            return { ...state, ufs: INITIAL_STATE.ufs, is_ufs_loading: true }
        case 'LOAD_UFS_SUCCESS':
            return { ...state, ufs: action.payload, is_ufs_loading: false }
        case 'LOAD_UFS_FAILED':
            return { ...state, ufs: INITIAL_STATE.ufs, is_ufs_loading: false }
        case 'LOAD_CITIES':
            return { ...state, cities: INITIAL_STATE.cities, is_cities_loading: true }
        case 'LOAD_CITIES_SUCCESS':
            return { ...state, cities: action.payload, is_cities_loading: false }
        case 'LOAD_CITIES_FAILED':
            return { ...state, cities: INITIAL_STATE.cities, is_cities_loading: false }
        case 'LOAD_ADDRESS_BY_POSTAL_CODE':
            return { ...state, address_by_postal_code: INITIAL_STATE.address_by_postal_code, is_address_by_postal_code_loading: true }
        case 'LOAD_ADDRESS_BY_POSTAL_CODE_SUCCESS':
            return { ...state, address_by_postal_code: action.payload, is_address_by_postal_code_loading: false }
        case 'LOAD_ADDRESS_BY_POSTAL_CODE_FAILED':
            return { ...state, address_by_postal_code: INITIAL_STATE.cities, is_address_by_postal_code_loading: false }
        case 'LOAD_COURTS_SERVICES':
            return { ...state, courts_services: INITIAL_STATE.courts_services, is_courts_services_loading: true }
        case 'LOAD_COURTS_SERVICES_SUCCESS':
            return { ...state, courts_services: action.payload, is_courts_services_loading: false }
        case 'LOAD_COURTS_SERVICES_FAILED':
            return { ...state, courts_services: INITIAL_STATE.cities, is_courts_services_loading: false }
        case 'DELETE_CUSTOMER':
            return { ...state, is_customer_deleting: true }
        case 'DELETE_CUSTOMER_SUCCESS':
            return { ...state, is_customer_deleting: false }
        case 'DELETE_CUSTOMER_FAILED':
            return { ...state, is_customer_deleting: false }
        case 'LOAD_SCHEDULES':
            return { ...state, schedules: INITIAL_STATE.schedules, is_schedules_loading: true }
        case 'LOAD_SCHEDULES_SUCCESS':
            return { ...state, schedules: action.payload, is_schedules_loading: false }
        case 'LOAD_SCHEDULES_FAILED':
            return { ...state, schedules: INITIAL_STATE.cities, is_schedules_loading: false }
        case 'LOAD_AVAILABLE_SCHEDULES':
            return { ...state, available_schedules: INITIAL_STATE.schedules, is_available_schedules_loading: true }
        case 'LOAD_AVAILABLE_SCHEDULES_SUCCESS':
            return { ...state, available_schedules: action.payload, is_available_schedules_loading: false }
        case 'LOAD_AVAILABLE_SCHEDULES_FAILED':
            return { ...state, available_schedules: INITIAL_STATE.cities, is_available_schedules_loading: false }

        default:
            return state;
    }
}

function* loadInstitutions({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/financial_institutions`, payload);
        yield put({type: 'LOAD_INSTITUTIONS_SUCCESS', payload: response.data.data});
        payload.callback(response.data.data);
    } catch {
        yield put({type: 'LOAD_INSTITUTIONS_FAILED'});
        payload.callback([]);
    }
}

function* loadPetition({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/petitions/${payload.id}`, {});
        yield put({type: 'LOAD_PETITION_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_PETITION_FAILED'});
    }
}

function* loadPetitions({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/petitions`, payload);
        yield put({type: 'LOAD_PETITIONS_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_PETITIONS_FAILED'});
    }
}

function* loadPetitionsCategories({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/petitions/categories`, payload);
        yield put({type: 'LOAD_PETITIONS_CATEGORIES_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_PETITIONS_CATEGORIES_FAILED'});
    }
}

function* loadPetitionsCategoryTypes({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/petitions/category/${payload.category_id}/types`, payload);
        yield put({type: 'LOAD_PETITIONS_CATEGORY_TYPES_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_PETITIONS_CATEGORY_TYPES_FAILED'});
    }
}

function* loadSimulation({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/reports/simulation`, payload.values);
        if (!response.data.success) {
            toast.error("Ocorreu um erro ao realizar a simulação, tente novamente.");
            yield put({type: 'LOAD_SIMULATION_FAILED'});
            return;
        }
        yield put({type: 'LOAD_SIMULATION_SUCCESS', payload: response.data.data});
        payload.callback();
    } catch {
        yield put({type: 'LOAD_SIMULATION_FAILED'});
    }
}

function* loadDashboard({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/dashboard`, {});
        yield put({type: 'LOAD_DASHBOARD_SUCCESS', payload: response.data.data});
    } catch (err) {
        yield put({type: 'LOAD_DASHBOARD_FAILED'});
    }
}

function* loadIndexes({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/indexes`, payload);
        yield put({type: 'LOAD_INDEXES_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_INDEXES_FAILED'});
    }
}

function* loadMinimumWages({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/indexes/index_rates/salarios_minimos`, payload);
        yield put({type: 'LOAD_MINIMUM_WAGES_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_MINIMUM_WAGES_FAILED'});
    }
}

function* loadInssTetos({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/indexes/index_rates/inss_tetos`, payload);
        yield put({type: 'LOAD_INSS_TETOS_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_INSS_TETOS_FAILED'});
    }
}

function* loadCoupom({payload}) {
    if (payload.coupom == '') {
        yield put({type: 'LOAD_COUPOM_SUCCESS', payload: {}});
        return;
    }

    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/coupons/validate`, payload);
        yield put({type: 'LOAD_COUPOM_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_COUPOM_FAILED'});
    }
}

function* loadStates({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/locations/states`, payload);
        yield put({type: 'LOAD_STATES_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_STATES_FAILED'});
    }
}

function* reportReview({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/reports/review`, payload);

        if (response.data.data.success === false) {
            yield put({type: 'REPORT_REVIEW_FAILED'});
            toast.error(response.data.data.msg);
            payload.setSubmitting(false);
            return false;
        }

        yield put({type: 'REPORT_REVIEW_SUCCESS', payload: response.data.data});
        payload.callback();
        payload.setSubmitting(false);
    } catch {
        yield put({type: 'REPORT_REVIEW_FAILED'});
        toast.error("Ocorreu um erro ao carregar o relatório, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* reportCorrection({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/reports/correction`, payload);
        if (response.data.success === false) {
            toast.error(response.data.msg);
        } else {
            yield put({type: 'REPORT_CORRECTION_SUCCESS', payload: response.data.data});
        }

        payload.setSubmitting(false);
    } catch (err) {
        yield put({type: 'REPORT_CORRECTION_FAILED'});
        toast.error("Ocorreu um erro ao carregar o relatório, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* reportCorrectionFgts({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/fgts/correction`, payload);
        if (response.data.success === false) {
            if (response.data.msg === 'REACHED_LIMIT') {
                toast.error('Você estourou o limite de cálculos de FGTS!');
                yield put({
                    type: 'SET_MODAL_SUBSCRIPTION',
                    payload: {
                        visible: true,
                        title: 'Você atingiu o limite de cálculos de FGTS!',
                        subtitle: 'Mas você pode continuar utilizando, basta escolher um plano para realizar a assinatura agora mesmo.'
                    }
                });
            } else {
                toast.error(response.data.msg);
            }
        } else {
            yield put({type: 'REPORT_CORRECTION_FGTS_SUCCESS', payload: response.data.data});
        }

        payload.setSubmitting(false);
    } catch (err) {
        yield put({type: 'REPORT_CORRECTION_FGTS_FAILED'});
        toast.error("Ocorreu um erro ao carregar o relatório, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* reportCorrectionComplete({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/reports/correction/complete`, payload);
        if (response.data.success === false) {
            toast.error(response.data.msg);
        } else {
            yield put({type: 'REPORT_CORRECTION_COMPLETE_SUCCESS', payload: response.data.data});
            payload.callback();
        }
        payload.setSubmitting(false);
    } catch (err) {
        yield put({type: 'REPORT_CORRECTION_COMPLETE_FAILED'});
        toast.error("Ocorreu um erro ao carregar o relatório, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* reportChildcare({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/reports/childcare`, payload);
        if (response.data.success === false) {
            toast.error(response.data.msg);
        } else {
            yield put({type: 'REPORT_CHILDCARE_SUCCESS', payload: response.data.data});
            payload.callback();
        }
        payload.setSubmitting(false);
    } catch (err) {
        yield put({type: 'REPORT_CHILDCARE_FAILED'});
        toast.error("Ocorreu um erro ao carregar o relatório, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* reportRent({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/reports/rent`, payload);
        if (response.data.success === false) {
            toast.error(response.data.msg);
        } else {
            yield put({type: 'REPORT_RENT_SUCCESS', payload: response.data.data});
            payload.callback();
        }
        payload.setSubmitting(false);
    } catch (err) {
        yield put({type: 'REPORT_RENT_FAILED'});
        toast.error("Ocorreu um erro ao carregar o relatório, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* loadCustomer({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/client_customers/` + payload.id, {});
        yield put({type: 'LOAD_CUSTOMER_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_CUSTOMER_FAILED'});
        toast.error("Ocorreu um erro ao carregar os dados do cliente, tente novamente.");
    }
}

function* loadJurisprudences({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/jurisprudences`, payload.values);
        yield put({type: 'LOAD_JURISPRUDENCES_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_JURISPRUDENCES_FAILED'});
        toast.error("Ocorreu um erro ao carregar as jurisprudências, tente novamente.");
    }
}

function* loadJurisprudence({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/jurisprudences/jurisprudence`, payload);
        yield put({type: 'LOAD_JURISPRUDENCE_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_JURISPRUDENCE_FAILED'});
        toast.error("Ocorreu um erro ao carregar a jurisprudência, tente novamente.");
    }
}

function* loadJurisprudenceFullText({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/jurisprudences/jurisprudence`, payload);
        yield put({type: 'LOAD_JURISPRUDENCE_FULLTEXT_SUCCESS', payload: response.data.data.fullText});
    } catch {
        yield put({type: 'LOAD_JURISPRUDENCE_FULLTEXT_FAILED'});
        toast.error("Ocorreu um erro ao carregar a jurisprudência, tente novamente.");
    }
}

function* queryData({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/queries`, payload.values);
        yield put({type: 'QUERY_DATA_SUCCESS', payload: response.data.data});
        payload.setSubmitting(false);
    } catch {
        yield put({type: 'QUERY_DATA_FAILED'});
        payload.setSubmitting(false);
        toast.error("Ocorreu um erro ao carregar os dados da consulta, tente novamente.");
    }
}

function* loadProfessions({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/professions`, {});
        yield put({type: 'LOAD_PROFESSIONS_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_PROFESSIONS_FAILED'});
        toast.error("Ocorreu um erro ao carregar as profissões, tente novamente.");
    }
}

function* loadOpportunities({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/opportunities`, {});
        yield put({type: 'LOAD_OPPORTUNITIES_SUCCESS', payload: response.data.data});
    } catch {
        yield put({type: 'LOAD_OPPORTUNITIES_FAILED'});
        toast.error("Ocorreu um erro ao carregar as oportunidades, tente novamente.");
    }
}

function* saveUser({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/auth/register`, payload.submitValues);

        payload.setSubmitting(false);
        if (!response.data.success) {
            toast.error(response.data.message);
            return false;
        }

        toast.success("Cadastro realizado com sucesso! Realize login na nossa plataforma.");
        window.gtag_report_conversion();
        window.gtag('event', 'conversion', {
            'send_to': 'AW-10896649833/TgpHCPGm8boDEOnc9sso',
            'value': 1.0,
            'currency': 'BRL'
        });
      
        window.fbq('track', 'Purchase', {currency: "BRL", value: 59.9});
        payload.callback();
    } catch (err) {
        console.log(err);
        toast.error("Ocorreu um erro ao salvar o seu cadastro, por favor, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* adminSaveUser({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/clients`, payload.submitValues);

        payload.setSubmitting(false);
        if (!response.data.success) {
            toast.error(response.data.message);
            return false;
        }

        toast.success("Cadastro realizado com sucesso!.");
        payload.callback();
    } catch (err) {
        console.log(err);
        toast.error("Ocorreu um erro ao salvar o cadastro, por favor, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* saveOpportunity({payload}) {
    try {

        const response = yield axios.post(process.env.REACT_APP_API_URL + `/opportunities`, payload.submitValues);
        payload.setSubmitting(false);
        toast.success("Solicitação enviada com sucesso!");
        payload.callback();
    } catch (err) {
        console.log(err);
        toast.error("Ocorreu um erro ao salvar seus dados, por favor, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* unlockOpportunity({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/opportunities/unlock`, payload.submitValues);
        if (!response.data.success) {
            toast.error(response.data.message);
            return false;
        }

        toast.success("Oportunidade desbloqueada com sucesso, parabéns!");
        payload.callback();
    } catch (err) {
        console.log(err);
        toast.error("Ocorreu um erro ao desbloquear esta oportunidade, por favor, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* queryValidateDocument({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/queries/validate`, {
            document: payload.document
        });

        if (!response.data.success) {
            yield put({type: "QUERY_VALIDATE_DOCUMENT_FAILED"});
            toast.warn(response.data.msg);
            return false;
        }

        yield put({
            type: "QUERY_VALIDATE_DOCUMENT_SUCCESS",
            payload: {
                available_products: response.data.available_products,
                document_type: response.data.document_type,
                document_number: response.data.document_number,
            }
        });
        payload.callback();
    } catch (err) {
        toast.error("Ocorreu um erro ao realizar a consulta, por favor, tente novamente.");
        yield put({type: "QUERY_VALIDATE_DOCUMENT_FAILED"});
    }
}

function* queryCheckout({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/queries/checkout`, payload.values);

        yield put({
            type: 'QUERY_CHECKOUT_SUCCESS',
            payload: response.data
        });
        payload.onResponse();
        if (payload.setSubmitting !== undefined) payload.setSubmitting(false);
    } catch (err) {
        yield put({
            type: 'QUERY_CHECKOUT_FAILED'
        });
        toast.error("Ocorreu um erro ao realizar sua compra, por favor, tente novamente.");
        if (payload.setSubmitting !== undefined) payload.setSubmitting(false);
    }
}

function* activateAccount({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/auth/validation`, {token: payload.token});

        if (!response.data.success) {
            toast.error(response.data.msg);
            yield put({type: 'ACTIVATE_ACCOUNT_FAILED', payload: response.data});
            return;
        }

        yield put({type: 'ACTIVATE_ACCOUNT_SUCCESS', payload: response.data});
        toast.success("Conta ativada com sucesso!");
    } catch (err) {
        console.log(err);

        yield put({type: 'ACTIVATE_ACCOUNT_FAILED', payload: {
            success: false,
            msg: 'Ocorreu um erro ao verificar sua conta, por favor, tente novamente'
        }});
    }
}

function* loadCards({payload}) {
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/subscription/cards`);

        if (!response.data.success) {
            yield put({ type: 'LOAD_CARDS_FAILED', payload: response.data.data });
            toast.error(response.data.msg);
            return;
        }

        yield put({ type: 'LOAD_CARDS_SUCCESS', payload: response.data.data });
    } catch (err) {
        console.log(err);
        yield put({ type: 'LOAD_CARDS_FAILED' });
    }
}

function* fgtsProcess({payload}) {
    try {
        var formData = new FormData();
        formData.append('pdf', payload.file);
        formData.append('thesis', payload.thesis);

        const response = yield axios.post(process.env.REACT_APP_API_URL + `/fgts/process`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (!response.data.success) {
            toast.error(response.data.msg);
            yield put({type: 'FGTS_PROCESS_FAILED'});
            return false;
        }

        yield put({type: 'FGTS_PROCESS_SUCCESS', payload: response.data.data});
    } catch (err) {
        yield put({type: 'FGTS_PROCESS_FAILED', payload: {
            success: false,
            msg: 'Ocorreu um erro ao processar este PDF, por favor, tente novamente'
        }});
    }
}

function* reportPrev({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/prev/calculate`, payload.values);

        if (!response.data.success) {
            toast.error(response.data.msg);
            yield put({type: 'REPORT_PREV_FAILED'});
            payload.setSubmitting(false);
            return false;
        }

        yield put({type: 'REPORT_PREV_SUCCESS', payload: response.data.data});
    } catch (err) {
        yield put({type: 'REPORT_PREV_FAILED'});
        toast.error("Ocorreu um erro ao calcular, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* cnisProcess({payload}) {
    try {
        var formData = new FormData();
        formData.append('pdf', payload.file);

        const response = yield axios.post(process.env.REACT_APP_API_URL + `/fgts/process_prev`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (!response.data.success) {
            toast.error(response.data.msg);
            yield put({type: 'CNIS_PROCESS_FAILED'});
            return false;
        }

        yield put({type: 'CNIS_PROCESS_SUCCESS', payload: response.data.data});
    } catch (err) {
        yield put({type: 'CNIS_PROCESS_FAILED', payload: {
            success: false,
            msg: 'Ocorreu um erro ao processar este PDF, por favor, tente novamente'
        }});
    }
}

function* loadCalculations({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/calculations`, payload);
        if (response.data.success === false) {
            toast.error(response.data.msg);
        } else {
            yield put({type: 'LOAD_CALCULATIONS_SUCCESS', payload: response.data.data});
        }
    } catch (err) {
        yield put({type: 'LOAD_CALCULATIONS_FAILED'});
        toast.error("Ocorreu um erro ao carregar os seus cálculos, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* saveProfile({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/me/update`, payload);
        if (response.data.success === false) {
            toast.error(response.data.msg);
        } else {
            toast.success('Perfil atualizado com sucesso!');
        }
    } catch (err) {
        toast.error("Ocorreu um erro ao salvar o seu perfil, tente novamente.");
    }
    payload.callback();
}

function* saveCard({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/subscription/card`, payload.submitValues);
        if (response.data.success === false) {
            toast.error(response.data.msg);
        } else {
            yield put({ type: 'LOAD_CARDS' });
            toast.success('Cartão adicionado com sucesso!');
        }
    } catch (err) {
        toast.error("Ocorreu um erro ao adicionar o seu cartão, tente novamente.");
    }
    payload.callback();
}

//Josias
function* loadRentInstallments({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/reports/rent/installments`, payload);
        yield put({type: 'SET_RENT_INSTALLMENTS', payload: {installments: response.data.installments, indexes: response.data.indexes}});
    } catch {
        yield put({type: 'SET_RENT_INSTALLMENTS', payload: {installments: [], indexes: []}});
    }
}

function* loadNotifications({payload}) {
    yield put({type: 'SET_NOTIFICATIONS_LOADING', payload: true});
    try {
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/notifications/`);
        yield put({type: 'LOAD_NOTIFICATIONS_SUCCESS', payload: {notifications: response.data.notifications, n_not_read: response.data.n_not_read}});
    } catch {
        yield put({type: 'LOAD_NOTIFICATIONS_FAILED', payload: {notifications: [], n_not_read: 0}});
    }
}

function* setNotificationRead({payload}) {
    try {
        yield axios.post(process.env.REACT_APP_API_URL + `/notifications/saveRead/`, payload);
    } catch {
        yield put({type: 'LOAD_NOTIFICATIONS_FAILED', payload: {notifications: [], n_not_read: 0}});
    }
}

function* loadCustomers({payload}) {
    try {

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/clientes/clientes`, payload);
        
        yield put({type: 'LOAD_CUSTOMERS_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_CUSTOMERS_FAILED'});
    }
}

function* loadCustomersList({payload}) {
    try {

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/clientes/clientes_list`, payload);
        
        yield put({type: 'LOAD_CUSTOMERS_LIST_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_CUSTOMERS_LIST_FAILED'});
    }
}

function* loadUfs({payload}) {
    try {

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/estados/index`, payload);
        
        yield put({type: 'LOAD_UFS_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_UFS_FAILED'});
    }
}

function* loadCities({payload}) {
    try {
        if (payload.uf == '' || payload.uf == null) {
            yield put({type: 'LOAD_CITIES_SUCCESS', payload: []});
            return true;
        }
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/cidades/index/${payload.uf}/`, {});

        yield put({type: 'LOAD_CITIES_SUCCESS', payload: response.data.dados});
        if (payload.callback !== undefined) payload.callback(response.data.dados);
    } catch {
        yield put({type: 'LOAD_CITIES_FAILED'});
    }
}

function* loadAddressByPostalCode({payload}) {
    try {

        if ( payload == null ) {
            yield put({type: 'LOAD_ADDRESS_BY_POSTAL_CODE_SUCCESS', payload: []});
            return true;
        }

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/enderecos/buscaDadosCep/`, {params: {
            cep: payload
        }});

        yield put({type: 'LOAD_ADDRESS_BY_POSTAL_CODE_SUCCESS', payload: response.data.dados});
        if (payload.callback !== undefined) payload.callback(response.data.dados);
    } catch {
        yield put({type: 'LOAD_ADDRESS_BY_POSTAL_CODE_FAILED'});
    }
}

function* saveCustomer({payload}) {
    try {

        let url = process.env.REACT_APP_API_URL + `/ClientesClientes/cadastrar`;
        let msg_success = "Cliente salvo com sucesso!";

        if ( payload.submitValues.id && payload.submitValues.id != "" ) {
            url = process.env.REACT_APP_API_URL + `/ClientesClientes/alterar`;
            msg_success = "Cliente atualizado com sucesso!";
        }

        const response = yield axios.post(url, payload.submitValues, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });
        payload.setSubmitting(false);
        toast.success(msg_success);
        payload.callback();
    } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao salvar o cliente, tente novamente.");
        payload.setSubmitting(false);
    }
}

function* deleteCustomer({payload}) {
    try {
        const response = yield axios.post(process.env.REACT_APP_API_URL + `/ClientesClientes/excluir`, payload, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        });
        yield put({type: 'DELETE_CUSTOMER_SUCCESS', payload: []});
        toast.success("Cliente excluido com sucesso!");
        payload.callback();
    } catch {
        toast.error("Ocorreu um erro ao excluir o cliente, tente novamente.");
        yield put({type: 'DELETE_CUSTOMER_FAILED', payload: []});
    }
}

function* loadCourtServices({payload}) {
    try {

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/clientes/servicos`, payload);
        
        yield put({type: 'LOAD_COURTS_SERVICES_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_COURTS_SERVICES_FAILED'});
    }
}

function* loadSchedules({payload}) {
    try {

        const response = yield axios.get(process.env.REACT_APP_API_URL + `/agendamentos/empresa`, payload);
        
        yield put({type: 'LOAD_SCHEDULES_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_SCHEDULES_FAILED'});
    }
}

function* loadAvailableSchedules({payload}) {
    try {
        if ( payload.params.date == "" ) {
            yield put({type: 'LOAD_AVAILABLE_SCHEDULES_SUCCESS', payload: []});
            return false;
        }
        const response = yield axios.get(process.env.REACT_APP_API_URL + `/clientes/horariosDisponiveis`, payload);
        yield put({type: 'LOAD_AVAILABLE_SCHEDULES_SUCCESS', payload: response.data.dados});
    } catch (e) {
        yield put({type: 'LOAD_AVAILABLE_SCHEDULES_FAILED'});
    }
}

export function* saga() {
    yield takeLatest('ACTIVATE_ACCOUNT', activateAccount);
    yield takeLatest('LOAD_CARDS', loadCards);
    yield takeLatest('SAVE_PROFILE', saveProfile);
    yield takeLatest('QUERY_CHECKOUT', queryCheckout);
    yield takeLatest('LOAD_DASHBOARD', loadDashboard);
    yield takeLatest('QUERY_VALIDATE_DOCUMENT', queryValidateDocument);
    yield takeLatest('LOAD_INSTITUTIONS', loadInstitutions);
    yield takeLatest('LOAD_PETITION', loadPetition);
    yield takeLatest('LOAD_PETITIONS', loadPetitions);
    yield takeLatest('LOAD_PETITIONS_CATEGORIES', loadPetitionsCategories);
    yield takeLatest('LOAD_PETITIONS_CATEGORY_TYPES', loadPetitionsCategoryTypes);
    yield takeLatest('LOAD_SIMULATION', loadSimulation);
    yield takeLatest('LOAD_INDEXES', loadIndexes);
    yield takeLatest('REPORT_REVIEW', reportReview);
    yield takeLatest('REPORT_CORRECTION', reportCorrection);
    yield takeLatest('REPORT_CORRECTION_FGTS', reportCorrectionFgts);
    yield takeLatest('REPORT_CORRECTION_COMPLETE', reportCorrectionComplete);
    yield takeLatest('LOAD_STATES', loadStates);
    yield takeLatest('LOAD_CUSTOMER', loadCustomer);
    yield takeLatest('LOAD_JURISPRUDENCES', loadJurisprudences);
    yield takeLatest('LOAD_JURISPRUDENCE', loadJurisprudence);
    yield takeLatest('LOAD_JURISPRUDENCE_FULLTEXT', loadJurisprudenceFullText);
    yield takeLatest('QUERY_DATA', queryData);
    yield takeLatest('LOAD_PROFESSIONS', loadProfessions);
    yield takeLatest('SAVE_USER', saveUser);
    yield takeLatest('ADMIN_SAVE_USER', adminSaveUser);
    yield takeLatest('SAVE_OPPORTUNITY', saveOpportunity);
    yield takeLatest('LOAD_OPPORTUNITIES', loadOpportunities);
    yield takeLatest('UNLOCK_OPPORTUNITY', unlockOpportunity);
    yield takeLatest('FGTS_PROCESS', fgtsProcess);
    yield takeLatest('CNIS_PROCESS', cnisProcess);
    yield takeLatest('LOAD_CALCULATIONS', loadCalculations);
    yield takeLatest('REPORT_PREV', reportPrev);
    yield takeLatest('LOAD_COUPOM', loadCoupom);
    yield takeLatest('REPORT_CHILDCARE', reportChildcare);
    yield takeLatest('REPORT_RENT', reportRent);
    yield takeLatest('LOAD_MINIMUM_WAGES', loadMinimumWages);
    yield takeLatest('LOAD_INSS_TETOS', loadInssTetos);
    yield takeLatest('SAVE_CARD', saveCard);
    yield takeLatest('LOAD_RENT_INSTALLMENTS', loadRentInstallments);
    yield takeLatest('LOAD_NOTIFICATIONS', loadNotifications);
    yield takeLatest('SET_NOTIFICATIONS_READ', setNotificationRead);

    yield takeLatest('LOAD_CUSTOMERS', loadCustomers);
    yield takeLatest('LOAD_CUSTOMERS_LIST', loadCustomersList);
    yield takeLatest('LOAD_UFS', loadUfs);
    yield takeLatest('LOAD_CITIES', loadCities);
    yield takeLatest('LOAD_ADDRESS_BY_POSTAL_CODE', loadAddressByPostalCode);
    yield takeLatest('SAVE_CUSTOMER', saveCustomer);
    yield takeLatest('DELETE_CUSTOMER', deleteCustomer);

    yield takeLatest('LOAD_COURTS_SERVICES', loadCourtServices);
    yield takeLatest('LOAD_AVAILABLE_SCHEDULES', loadAvailableSchedules);

    yield takeLatest('LOAD_SCHEDULES', loadSchedules);
    
}
