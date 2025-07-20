const urlParams = new URLSearchParams(window.location.search);
const modoJogo = urlParams.get('modo') || 'facil';
let bandeirasCorretas = [];
let atual = {};
let errosRestantes = 3;
let tempoInicio;
let tempoTotal = 0;
let tentativas = 0;
let playerName = localStorage.getItem('playerName') || 'Jogador Anônimo';

function atualizarErrosRestantes() {
    const errosRestantesElement = document.getElementById('erros-restantes');
    if (modoJogo === 'dificil') {
        errosRestantesElement.textContent = `Erros restantes: ${errosRestantes}`;
    } else {
        errosRestantesElement.textContent = '';
    }
}

$('.st0').click(function(){
  var id = $(this).attr('id');

  $('.st0').removeClass('active');
  $(this).addClass('active');
  
  $('.item-tab').removeClass('active');
  $('.item-tab[data-id="'+id+'"]').addClass('active'); 
});

$('#BR').addClass('active');
$('.item-tab[data-id="BR"]').addClass('active'); 

const bandeiras = [
    { codigo: 'AF', nome: 'Afeganistão', imagem: 'https://flagcdn.com/w320/af.png' },
    { codigo: 'SZ', nome: 'Essuatíni', imagem: 'https://flagcdn.com/w320/sz.png' },
    { codigo: 'AL', nome: 'Albânia', imagem: 'https://flagcdn.com/w320/al.png' },
    { codigo: 'DZ', nome: 'Argélia', imagem: 'https://flagcdn.com/w320/dz.png' },
    { codigo: 'AD', nome: 'Andorra', imagem: 'https://flagcdn.com/w320/ad.png' },
    { codigo: 'AO', nome: 'Angola', imagem: 'https://flagcdn.com/w320/ao.png' },
    { codigo: 'AI', nome: 'Anguilla', imagem: 'https://flagcdn.com/w320/ai.png' },
    { codigo: 'AR', nome: 'Argentina', imagem: 'https://flagcdn.com/w320/ar.png' },
    { codigo: 'BE', nome: 'Bélgica', imagem: 'https://flagcdn.com/w320/be.png' },
    { codigo: 'BR', nome: 'Brasil', imagem: 'https://flagcdn.com/w320/br.png' },
    { codigo: 'BN', nome: 'Brunei Darussalam', imagem: 'https://flagcdn.com/w320/bn.png' },
    { codigo: 'BF', nome: 'Burquina Faso', imagem: 'https://flagcdn.com/w320/bf.png' },
    { codigo: 'BI', nome: 'Burundi', imagem: 'https://flagcdn.com/w320/bi.png' },
    { codigo: 'KH', nome: 'Camboja', imagem: 'https://flagcdn.com/w320/kh.png' },
    { codigo: 'CM', nome: 'Camarões', imagem: 'https://flagcdn.com/w320/cm.png' },
    { codigo: 'KS', nome: 'Kosovo', imagem: 'https://flagcdn.com/w320/xk.png' },
    { codigo: 'CA', nome: 'Canadá', imagem: 'https://flagcdn.com/w320/ca.png' },
    { codigo: 'CL', nome: 'Chile', imagem: 'https://flagcdn.com/w320/cl.png' },
    { codigo: 'CN', nome: 'China', imagem: 'https://flagcdn.com/w320/cn.png' },
    { codigo: 'CO', nome: 'Colômbia', imagem: 'https://flagcdn.com/w320/co.png' },
    { codigo: 'CR', nome: 'Costa Rica', imagem: 'https://flagcdn.com/w320/cr.png' },
    { codigo: 'CU', nome: 'Cuba', imagem: 'https://flagcdn.com/w320/cu.png' },
    { codigo: 'CZ', nome: 'República Tcheca', imagem: 'https://flagcdn.com/w320/cz.png' },
    { codigo: 'DK', nome: 'Dinamarca', imagem: 'https://flagcdn.com/w320/dk.png' },
    { codigo: 'DM', nome: 'Dominica', imagem: 'https://flagcdn.com/w320/dm.png' },
    { codigo: 'SV', nome: 'El Salvador', imagem: 'https://flagcdn.com/w320/sv.png' },
    { codigo: 'FK', nome: 'Ilhas Malvinas', imagem: 'https://flagcdn.com/w320/fk.png' },
    { codigo: 'FJ', nome: 'Fiji', imagem: 'https://flagcdn.com/w320/fj.png' },
    { codigo: 'FI', nome: 'Finlândia', imagem: 'https://flagcdn.com/w320/fi.png' },
    { codigo: 'FR', nome: 'França', imagem: 'https://flagcdn.com/w320/fr.png' },
    { codigo: 'GF', nome: 'Guiana Francesa', imagem: 'https://flagcdn.com/w320/gf.png' },
    { codigo: 'GA', nome: 'Gabon', imagem: 'https://flagcdn.com/w320/ga.png' },
    { codigo: 'AW', nome: 'Aruba', imagem: 'https://flagcdn.com/w320/aw.png' },
    { codigo: 'AG', nome: 'Antígua e Barbuda', imagem: 'https://flagcdn.com/w320/ag.png' },
    { codigo: 'BM', nome: 'Bermudas', imagem: 'https://flagcdn.com/w320/bm.png' },
    { codigo: 'BB', nome: 'Barbados', imagem: 'https://flagcdn.com/w320/bb.png' },
    { codigo: 'BS', nome: 'Bahamas', imagem: 'https://flagcdn.com/w320/bs.png' },
    { codigo: 'BZ', nome: 'Belize', imagem: 'https://flagcdn.com/w320/bz.png' },
    { codigo: 'CW', nome: 'Curaçao', imagem: 'https://flagcdn.com/w320/cw.png' },
    { codigo: 'GP', nome: 'Guadalupe', imagem: 'https://flagcdn.com/w320/gp.png' },
    { codigo: 'KY', nome: 'Ilhas Cayman', imagem: 'https://flagcdn.com/w320/ky.png' },
    { codigo: 'FO', nome: 'Ilhas Faroe', imagem: 'https://flagcdn.com/w320/fo.png' },
    { codigo: 'CV', nome: 'Cabo Verde', imagem: 'https://flagcdn.com/w320/cv.png' },
    { codigo: 'VC', nome: 'Ilhas de São Vicente e Granadinas', imagem: 'https://flagcdn.com/w320/vc.png' },
    { codigo: 'SX', nome: 'Ilhas de Saint Martin', imagem: 'https://flagcdn.com/w320/sx.png' },
    { codigo: 'MS', nome: 'Ilhas de Montserrat', imagem: 'https://flagcdn.com/w320/ms.png' },
    { codigo: 'MQ', nome: 'Ilhas de Martinica', imagem: 'https://flagcdn.com/w320/mq.png' },
    { codigo: 'KM', nome: 'Ilhas de Comores', imagem: 'https://flagcdn.com/w320/km.png' },
    { codigo: 'NC', nome: 'Ilhas de Nova Caledônia', imagem: 'https://flagcdn.com/w320/nc.png' },
    { codigo: 'GM', nome: 'Gâmbia', imagem: 'https://flagcdn.com/w320/gm.png' },
    { codigo: 'GE', nome: 'Geórgia', imagem: 'https://flagcdn.com/w320/ge.png' },
    { codigo: 'DE', nome: 'Alemanha', imagem: 'https://flagcdn.com/w320/de.png' },
    { codigo: 'GH', nome: 'Gana', imagem: 'https://flagcdn.com/w320/gh.png' },
    { codigo: 'GR', nome: 'Grécia', imagem: 'https://flagcdn.com/w320/gr.png' },
    { codigo: 'GL', nome: 'Groenlândia', imagem: 'https://flagcdn.com/w320/gl.png' },
    { codigo: 'GD', nome: 'Granada', imagem: 'https://flagcdn.com/w320/gd.png' },
    { codigo: 'GT', nome: 'Guatemala', imagem: 'https://flagcdn.com/w320/gt.png' },
    { codigo: 'GN', nome: 'Guiné', imagem: 'https://flagcdn.com/w320/gn.png' },
    { codigo: 'GW', nome: 'Guiné-Bissau', imagem: 'https://flagcdn.com/w320/gw.png' },
    { codigo: 'AU', nome: 'Austrália', imagem: 'https://flagcdn.com/w320/au.png' },
    { codigo: 'BO', nome: 'Bolívia', imagem: 'https://flagcdn.com/w320/bo.png' },
    { codigo: 'EC', nome: 'Equador', imagem: 'https://flagcdn.com/w320/ec.png' },
    { codigo: 'DO', nome: 'República Dominicana', imagem: 'https://flagcdn.com/w320/do.png' },
    { codigo: 'EG', nome: 'Egito', imagem: 'https://flagcdn.com/w320/eg.png' },
    { codigo: 'TD', nome: 'Chade', imagem: 'https://flagcdn.com/w320/td.png' },
    { codigo: 'CF', nome: 'República Centro-Africana', imagem: 'https://flagcdn.com/w320/cf.png' },
    { codigo: 'CG', nome: 'Congo', imagem: 'https://flagcdn.com/w320/cg.png' },
    { codigo: 'CD', nome: 'República Democrática do Congo', imagem: 'https://flagcdn.com/w320/cd.png' },
    { codigo: 'GQ', nome: 'Guiné Equatorial', imagem: 'https://flagcdn.com/w320/gq.png' },
    { codigo: 'BW', nome: 'Botsuana', imagem: 'https://flagcdn.com/w320/bw.png' },
    { codigo: 'ET', nome: 'Etiópia', imagem: 'https://flagcdn.com/w320/et.png' },
    { codigo: 'ER', nome: 'Eritreia', imagem: 'https://flagcdn.com/w320/er.png' },
    { codigo: 'PS', nome: 'Palestina', imagem: 'https://flagcdn.com/w320/ps.png' },
    { codigo: 'AZ', nome: 'Azerbaijão', imagem: 'https://flagcdn.com/w320/az.png' },
    { codigo: 'AM', nome: 'Armênia', imagem: 'https://flagcdn.com/w320/am.png' },
    { codigo: 'BT', nome: 'Butão', imagem: 'https://flagcdn.com/w320/bt.png' },
    { codigo: 'BD', nome: 'Bangladesh', imagem: 'https://flagcdn.com/w320/bd.png' },
    { codigo: 'EE', nome: 'Estônia', imagem: 'https://flagcdn.com/w320/ee.png' },
    { codigo: 'BY', nome: 'Bielorrússia', imagem: 'https://flagcdn.com/w320/by.png' },
    { codigo: 'AT', nome: 'Áustria', imagem: 'https://flagcdn.com/w320/at.png' },
    { codigo: 'HR', nome: 'Croácia', imagem: 'https://flagcdn.com/w320/hr.png' },
    { codigo: 'BA', nome: 'Bósnia e Herzegovina', imagem: 'https://flagcdn.com/w320/ba.png' },
    { codigo: 'BG', nome: 'Bulgária', imagem: 'https://flagcdn.com/w320/bg.png' },
    { codigo: 'GY', nome: 'Guiana', imagem: 'https://flagcdn.com/w320/gy.png' },
    { codigo: 'HT', nome: 'Haiti', imagem: 'https://flagcdn.com/w320/ht.png' },
    { codigo: 'VA', nome: 'Vaticano', imagem: 'https://flagcdn.com/w320/va.png' },
    { codigo: 'HN', nome: 'Honduras', imagem: 'https://flagcdn.com/w320/hn.png' },
    { codigo: 'HK', nome: 'Hong Kong', imagem: 'https://flagcdn.com/w320/hk.png' },
    { codigo: 'HU', nome: 'Hungria', imagem: 'https://flagcdn.com/w320/hu.png' },
    { codigo: 'IS', nome: 'Islândia', imagem: 'https://flagcdn.com/w320/is.png' },
    { codigo: 'IN', nome: 'Índia', imagem: 'https://flagcdn.com/w320/in.png' },
    { codigo: 'ID', nome: 'Indonésia', imagem: 'https://flagcdn.com/w320/id.png' },
    { codigo: 'IR', nome: 'Irã', imagem: 'https://flagcdn.com/w320/ir.png' },
    { codigo: 'IQ', nome: 'Iraque', imagem: 'https://flagcdn.com/w320/iq.png' },
    { codigo: 'IE', nome: 'Irlanda', imagem: 'https://flagcdn.com/w320/ie.png' },
    { codigo: 'IL', nome: 'Israel', imagem: 'https://flagcdn.com/w320/il.png' },
    { codigo: 'WS', nome: 'Samoa', imagem: 'https://flagcdn.com/w320/ws.png' },
    { codigo: 'IT', nome: 'Itália', imagem: 'https://flagcdn.com/w320/it.png' },
    { codigo: 'JM', nome: 'Jamaica', imagem: 'https://flagcdn.com/w320/jm.png' },
    { codigo: 'JP', nome: 'Japão', imagem: 'https://flagcdn.com/w320/jp.png' },
    { codigo: 'JO', nome: 'Jordânia', imagem: 'https://flagcdn.com/w320/jo.png' },
    { codigo: 'KZ', nome: 'Cazaquistão', imagem: 'https://flagcdn.com/w320/kz.png' },
    { codigo: 'KE', nome: 'Quênia', imagem: 'https://flagcdn.com/w320/ke.png' },
    { codigo: 'KP', nome: 'República Popular Democrática da Coreia', imagem: 'https://flagcdn.com/w320/kp.png' },
    { codigo: 'KR', nome: 'Coreia do Sul', imagem: 'https://flagcdn.com/w320/kr.png' },
    { codigo: 'KW', nome: 'Kuwait', imagem: 'https://flagcdn.com/w320/kw.png' },
    { codigo: 'KG', nome: 'Quirguistão', imagem: 'https://flagcdn.com/w320/kg.png' },
    { codigo: 'LA', nome: 'República Democrática Popular do Laos', imagem: 'https://flagcdn.com/w320/la.png' },
    { codigo: 'LV', nome: 'Letônia', imagem: 'https://flagcdn.com/w320/lv.png' },
    { codigo: 'LB', nome: 'Líbano', imagem: 'https://flagcdn.com/w320/lb.png' },
    { codigo: 'LS', nome: 'Lesoto', imagem: 'https://flagcdn.com/w320/ls.png' },
    { codigo: 'LR', nome: 'Libéria', imagem: 'https://flagcdn.com/w320/lr.png' },
    { codigo: 'LY', nome: 'Líbia', imagem: 'https://flagcdn.com/w320/ly.png' },
    { codigo: 'LI', nome: 'Liechtenstein', imagem: 'https://flagcdn.com/w320/li.png' },
    { codigo: 'LT', nome: 'Lituânia', imagem: 'https://flagcdn.com/w320/lt.png' },
    { codigo: 'LU', nome: 'Luxemburgo', imagem: 'https://flagcdn.com/w320/lu.png' },
    { codigo: 'MO', nome: 'Macau', imagem: 'https://flagcdn.com/w320/mo.png' },
    { codigo: 'MK', nome: 'Macedônia do Norte', imagem: 'https://flagcdn.com/w320/mk.png' },
    { codigo: 'GS', nome: 'Ilhas Geórgia do Sul e Sandwich do Sul', imagem: 'https://flagcdn.com/w320/gs.png' },
    { codigo: 'MG', nome: 'Madagascar', imagem: 'https://flagcdn.com/w320/mg.png' },
    { codigo: 'MW', nome: 'Malawi', imagem: 'https://flagcdn.com/w320/mw.png' },
    { codigo: 'IC', nome: 'Ilhas Canárias', imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Flag_of_the_Canary_Islands.svg/1280px-Flag_of_the_Canary_Islands.svg.png' },
    { codigo: 'MY', nome: 'Malásia', imagem: 'https://flagcdn.com/w320/my.png' },
    { codigo: 'MV', nome: 'Maldivas', imagem: 'https://flagcdn.com/w320/mv.png' },
    { codigo: 'ML', nome: 'Mali', imagem: 'https://flagcdn.com/w320/ml.png' },
    { codigo: 'MT', nome: 'Malta', imagem: 'https://flagcdn.com/w320/mt.png' },
    { codigo: 'MR', nome: 'Mauritânia', imagem: 'https://flagcdn.com/w320/mr.png' },
    { codigo: 'MU', nome: 'Ilhas de Maurício', imagem: 'https://flagcdn.com/w320/mu.png' },
    { codigo: 'YT', nome: 'Ilhas de Mayotte', imagem: 'https://flagcdn.com/w320/yt.png' },
    { codigo: 'MX', nome: 'México', imagem: 'https://flagcdn.com/w320/mx.png' },
    { codigo: 'FM', nome: 'Micronésia', imagem: 'https://flagcdn.com/w320/fm.png' },
    { codigo: 'MD', nome: 'Moldávia', imagem: 'https://flagcdn.com/w320/md.png' },
    { codigo: 'TF', nome: 'Terras Austrais e Antárticas Francesas', imagem: 'https://flagcdn.com/w320/tf.png' },
    { codigo: 'MC', nome: 'Mônaco', imagem: 'https://flagcdn.com/w320/mc.png' },
    { codigo: 'MN', nome: 'Mongólia', imagem: 'https://flagcdn.com/w320/mn.png' },
    { codigo: 'ME', nome: 'Montenegro', imagem: 'https://flagcdn.com/w320/me.png' },
    { codigo: 'MA', nome: 'Marrocos', imagem: 'https://flagcdn.com/w320/ma.png' },
    { codigo: 'MZ', nome: 'Moçambique', imagem: 'https://flagcdn.com/w320/mz.png' },
    { codigo: 'MM', nome: 'Mianmar (Birmânia)', imagem: 'https://flagcdn.com/w320/mm.png' },
    { codigo: 'NA', nome: 'Namíbia', imagem: 'https://flagcdn.com/w320/na.png' },
    { codigo: 'NR', nome: 'Ilhas de Nauru', imagem: 'https://flagcdn.com/w320/nr.png' },
    { codigo: 'NP', nome: 'Nepal', imagem: 'https://flagcdn.com/w320/np.png' },
    { codigo: 'NL', nome: 'Países Baixos', imagem: 'https://flagcdn.com/w320/nl.png' },
    { codigo: 'NZ', nome: 'Nova Zelândia', imagem: 'https://flagcdn.com/w320/nz.png' },
    { codigo: 'NI', nome: 'Nicarágua', imagem: 'https://flagcdn.com/w320/ni.png' },
    { codigo: 'NE', nome: 'Níger', imagem: 'https://flagcdn.com/w320/ne.png' },
    { codigo: 'NG', nome: 'Nigéria', imagem: 'https://flagcdn.com/w320/ng.png' },
    { codigo: 'NO', nome: 'Noruega', imagem: 'https://flagcdn.com/w320/no.png' },
    { codigo: 'OM', nome: 'Omã', imagem: 'https://flagcdn.com/w320/om.png' },
    { codigo: 'PK', nome: 'Paquistão', imagem: 'https://flagcdn.com/w320/pk.png' },
    { codigo: 'PA', nome: 'Panamá', imagem: 'https://flagcdn.com/w320/pa.png' },
    { codigo: 'PG', nome: 'Papua-Nova Guiné', imagem: 'https://flagcdn.com/w320/pg.png' },
    { codigo: 'PY', nome: 'Paraguai', imagem: 'https://flagcdn.com/w320/py.png' },
    { codigo: 'PE', nome: 'Peru', imagem: 'https://flagcdn.com/w320/pe.png' },
    { codigo: 'PH', nome: 'Filipinas', imagem: 'https://flagcdn.com/w320/ph.png' },
    { codigo: 'PL', nome: 'Polônia', imagem: 'https://flagcdn.com/w320/pl.png' },
    { codigo: 'PT', nome: 'Portugal', imagem: 'https://flagcdn.com/w320/pt.png' },
    { codigo: 'PR', nome: 'Porto Rico', imagem: 'https://flagcdn.com/w320/pr.png' },
    { codigo: 'QA', nome: 'Catar', imagem: 'https://flagcdn.com/w320/qa.png' },
    { codigo: 'RE', nome: 'Reunião', imagem: 'https://flagcdn.com/w320/re.png' },
    { codigo: 'RO', nome: 'Romênia', imagem: 'https://flagcdn.com/w320/ro.png' },
    { codigo: 'RU', nome: 'Rússia', imagem: 'https://flagcdn.com/w320/ru.png' },
    { codigo: 'RW', nome: 'Ruanda', imagem: 'https://flagcdn.com/w320/rw.png' },
    { codigo: 'KN', nome: 'São Cristóvão e Nevis', imagem: 'https://flagcdn.com/w320/kn.png' },
    { codigo: 'LC', nome: 'Santa Lúcia', imagem: 'https://flagcdn.com/w320/lc.png' },
    { codigo: 'ST', nome: 'São Tomé e Príncipe', imagem: 'https://flagcdn.com/w320/st.png' },
    { codigo: 'SA', nome: 'Arábia Saudita', imagem: 'https://flagcdn.com/w320/sa.png' },
    { codigo: 'SN', nome: 'Senegal', imagem: 'https://flagcdn.com/w320/sn.png' },
    { codigo: 'RS', nome: 'Sérvia', imagem: 'https://flagcdn.com/w320/rs.png' },
    { codigo: 'SC', nome: 'Seicheles', imagem: 'https://flagcdn.com/w320/sc.png' },
    { codigo: 'SL', nome: 'Serra Leoa', imagem: 'https://flagcdn.com/w320/sl.png' },
    { codigo: 'SG', nome: 'Singapura', imagem: 'https://flagcdn.com/w320/sg.png' },
    { codigo: 'SK', nome: 'Eslováquia', imagem: 'https://flagcdn.com/w320/sk.png' },
    { codigo: 'SI', nome: 'Eslovênia', imagem: 'https://flagcdn.com/w320/si.png' },
    { codigo: 'SB', nome: 'Ilhas Salomão', imagem: 'https://flagcdn.com/w320/sb.png' },
    { codigo: 'SO', nome: 'Somália', imagem: 'https://flagcdn.com/w320/so.png' },
    { codigo: 'ZA', nome: 'África do Sul', imagem: 'https://flagcdn.com/w320/za.png' },
    { codigo: 'SS', nome: 'Sudão do Sul', imagem: 'https://flagcdn.com/w320/ss.png' },
    { codigo: 'ES', nome: 'Espanha', imagem: 'https://flagcdn.com/w320/es.png' },
    { codigo: 'IT', nome: 'San Marino', imagem: 'https://flagcdn.com/w320/sm.png' },
    { codigo: 'LK', nome: 'Sri Lanka', imagem: 'https://flagcdn.com/w320/lk.png' },
    { codigo: 'SD', nome: 'Sudão', imagem: 'https://flagcdn.com/w320/sd.png' },
    { codigo: 'SR', nome: 'Suriname', imagem: 'https://flagcdn.com/w320/sr.png' },
    { codigo: 'SE', nome: 'Suécia', imagem: 'https://flagcdn.com/w320/se.png' },
    { codigo: 'CH', nome: 'Suíça', imagem: 'https://flagcdn.com/w320/ch.png' },
    { codigo: 'SY', nome: 'Síria', imagem: 'https://flagcdn.com/w320/sy.png' },
    { codigo: 'TW', nome: 'Taiwan', imagem: 'https://flagcdn.com/w320/tw.png' },
    { codigo: 'TJ', nome: 'Tajiquistão', imagem: 'https://flagcdn.com/w320/tj.png' },
    { codigo: 'TZ', nome: 'Tanzânia', imagem: 'https://flagcdn.com/w320/tz.png' },
    { codigo: 'TH', nome: 'Tailândia', imagem: 'https://flagcdn.com/w320/th.png' },
    { codigo: 'TL', nome: 'Timor-Leste', imagem: 'https://flagcdn.com/w320/tl.png' },
    { codigo: 'TG', nome: 'Togo', imagem: 'https://flagcdn.com/w320/tg.png' },
    { codigo: 'TT', nome: 'Trinidad e Tobago', imagem: 'https://flagcdn.com/w320/tt.png' },
    { codigo: 'TN', nome: 'Tunísia', imagem: 'https://flagcdn.com/w320/tn.png' },
    { codigo: 'TR', nome: 'Turquia', imagem: 'https://flagcdn.com/w320/tr.png' },
    { codigo: 'TM', nome: 'Turcomenistão', imagem: 'https://flagcdn.com/w320/tm.png' },
    { codigo: 'TC', nome: 'Ilhas Turcas e Caicos', imagem: 'https://flagcdn.com/w320/tc.png' },
    { codigo: 'UG', nome: 'Uganda', imagem: 'https://flagcdn.com/w320/ug.png' },
    { codigo: 'UA', nome: 'Ucrânia', imagem: 'https://flagcdn.com/w320/ua.png' },
    { codigo: 'AE', nome: 'Emirados Árabes Unidos', imagem: 'https://flagcdn.com/w320/ae.png' },
    { codigo: 'GB', nome: 'Reino Unido', imagem: 'https://flagcdn.com/w320/gb.png' },
    { codigo: 'US', nome: 'Estados Unidos', imagem: 'https://flagcdn.com/w320/us.png' },
    { codigo: 'UY', nome: 'Uruguai', imagem: 'https://flagcdn.com/w320/uy.png' },
    { codigo: 'UZ', nome: 'Uzbequistão', imagem: 'https://flagcdn.com/w320/uz.png' },
    { codigo: 'VU', nome: 'Vanuatu', imagem: 'https://flagcdn.com/w320/vu.png' },
    { codigo: 'VE', nome: 'Venezuela', imagem: 'https://flagcdn.com/w320/ve.png' },
    { codigo: 'VN', nome: 'Vietnã', imagem: 'https://flagcdn.com/w320/vn.png' },
    { codigo: 'VG', nome: 'Ilhas Virgens Britânicas', imagem: 'https://flagcdn.com/w320/vg.png' },
    { codigo: 'VI', nome: 'Ilhas Virgens Americanas', imagem: 'https://flagcdn.com/w320/vi.png' },
    { codigo: 'EH', nome: 'Saara Ocidental', imagem: 'https://flagcdn.com/w320/eh.png' },
    { codigo: 'YE', nome: 'Iêmen', imagem: 'https://flagcdn.com/w320/ye.png' },
    { codigo: 'ZM', nome: 'Zâmbia', imagem: 'https://flagcdn.com/w320/zm.png' },
    { codigo: 'ZW', nome: 'Zimbábue', imagem: 'https://flagcdn.com/w320/zw.png' },
    { codigo: 'CY', nome: 'chipre', imagem: 'https://flagcdn.com/w320/cy.png' },
    { codigo: 'BJ', nome: 'Benin', imagem: 'https://flagcdn.com/w320/bj.png' },
    { codigo: 'CI', nome: 'Costa do Marfim', imagem: 'https://flagcdn.com/w320/ci.png' },
    {codigo: 'DJ', nome: 'Djibuti', imagem: 'https://flagcdn.com/w320/dj.png' },
    {codigo: 'AQ', nome: 'Antártida', imagem: 'https://flagcdn.com/w320/aq.png' },
];
const mensagensParabens = {
    'BJ': 'Félicitations! (Félicitations!)', // Benin
    'CI': 'Félicitations! (Félicitations!)', // Costa do Marfim
    'DJ': 'Mabrouk! (Mabrouk!)', // Djibuti
    'KS': 'Urime! (Urime!)', // Kosovo
    'AF': 'تبریک! (Tabrik!)', // Afeganistão
    'SZ': 'Siyabonga! (Siyabonga!)', // Essuatíni
    'AL': 'Urime! (Urime!)', // Albânia
    'DZ': 'مبروك! (Mabrouk!)', // Argélia
    'CY': 'Tebrikler! (Tebrikler!)', // Chipre
    'AD': 'Felicitats! (Felicitats!)', // Andorra
    'AO': 'Parabéns! (Parabéns!)', // Angola
    'AI': 'Congratulations! (Congratuleichons!)', // Anguilla
    'AR': '¡Felicidades! (Felicidades!)', // Argentina
    'BE': 'Gefeliciteerd! (Guefeliciteerd!)', // Bélgica
    'BR': 'Parabéns! (Parabéns!)', // Brasil
    'BN': 'Tahniah! (Tahniah!)', // Brunei Darussalam
    'BF': 'Félicitations! (Félicitations!)', // Burquina Faso
    'BI': 'Ihihirwe! (Ihihirwe!)', // Burundi
    'KH': 'សូមអបអរសាទរ! (Som aborosat!)', // Camboja
    'CM': 'Félicitations! (Félicitations!)', // Camarões
    'CA': 'Congratulations! (Congratuleichons!)', // Canadá
    'CL': '¡Felicidades! (Felicidades!)', // Chile
    'CN': '恭喜! (Gongxi!)', // China
    'CO': '¡Felicidades! (Felicidades!)', // Colômbia
    'CR': '¡Felicidades! (Felicidades!)', // Costa Rica
    'CU': '¡Felicidades! (Felicidades!)', // Cuba
    'CZ': 'Gratulujeme! (Gratulujeme!)', // República Tcheca
    'DK': 'Tillykke! (Tillykke!)', // Dinamarca
    'DM': 'Congratulations! (Congratuleichons!)', // Dominica
    'SV': '¡Felicidades! (Felicidades!)', // El Salvador
    'FK': 'Congratulations! (Congratuleichons!)', // Ilhas Malvinas
    'FJ': 'Vinaka! (Vinaka!)', // Fiji
    'FI': 'Onnittelut! (Onnittelut!)', // Finlândia
    'FR': 'Félicitations! (Félicitations!)', // França
    'GF': 'Félicitations! (Félicitations!)', // Guiana Francesa
    'GA': 'Félicitations! (Félicitations!)', // Gabon
    'AW': 'Gefeliciteerd! (Guefeliciteerd!)', // Aruba
    'AG': 'Congratulations! (Congratuleichons!)', // Antígua e Barbuda
    'BM': 'Congratulations! (Congratuleichons!)', // Bermudas
    'BB': 'Congratulations! (Congratuleichons!)', // Barbados
    'BS': 'Congratulations! (Congratuleichons!)', // Bahamas
    'BZ': 'Congratulations! (Congratuleichons!)', // Belize
    'CW': 'Gefeliciteerd! (Guefeliciteerd!)', // Curaçao
    'GP': 'Félicitations! (Félicitations!)', // Guadalupe
    'KY': 'Congratulations! (Congratuleichons!)', // Ilhas Cayman
    'FO': 'Tillykke! (Tillykke!)', // Ilhas Faroe
    'CV': 'Parabéns! (Parabéns!)', // Cabo Verde
    'VC': 'Congratulations! (Congratuleichons!)', // Ilhas de São Vicente e Granadinas
    'SX': 'Gefeliciteerd! (Guefeliciteerd!)', // Ilhas de Saint Martin
    'MS': 'Congratulations! (Congratuleichons!)', // Ilhas de Montserrat
    'MQ': 'Félicitations! (Félicitations!)', // Ilhas de Martinica
    'KM': 'Mabrouk! (Mabrouk!)', // Ilhas de Comores
    'NC': 'Félicitations! (Félicitations!)', // Ilhas de Nova Caledônia
    'GM': 'Congratulations! (Congratuleichons!)', // Gâmbia
    'GE': 'გილოცავთ! (Gilotsavt!)', // Geórgia
    'DE': 'Herzlichen Glückwunsch! (Hertzlichen Gluckwunsch!)', // Alemanha
    'GH': 'Meda wo akpe! (Meda wo akpe!)', // Gana
    'GR': 'Συγχαρητήρια! (Singharitiria!)', // Grécia
    'GL': 'Tillykke! (Tillykke!)', // Groenlândia
    'GD': 'Congratulations! (Congratuleichons!)', // Granada
    'GT': '¡Felicidades! (Felicidades!)', // Guatemala
    'GN': 'Félicitations! (Félicitations!)', // Guiné
    'GW': 'Félicitations! (Félicitations!)', // Guiné-Bissau
    'GY': 'Congratulations! (Congratuleichons!)', // Guiana
    'HT': 'Felicitations! (Felicitations!)', // Haiti
    'IT': 'Congratulazioni! (Congratulazioni!)', // Vaticano
    'HN': '¡Felicidades! (Felicidades!)', // Honduras
    'HK': '恭喜! (Gongxi!)', // Hong Kong
    'HU': 'Gratulálok! (Gratulálok!)', // Hungria
    'IS': 'Til hamingju! (Til hamingju!)', // Islândia
    'IN': 'बधाई हो! (Badhai ho!)', // Índia
    'ID': 'Selamat! (Selamat!)', // Indonésia
    'IR': 'تبریک! (Tabrik!)', // Irã
    'IQ': 'مبروك! (Mabrouk!)', // Iraque
    'IE': 'Comhghairdeas! (Comhghairdeas!)', // Irlanda
    'IL': 'מזל טוב! (Mazal tov!)', // Israel
    'AU': 'Congratulations! (Congratulations!)', // Austrália
    'BO': '¡Felicidades! (Felicidades!)', // Bolívia
    'EC': '¡Felicidades! (Felicidades!)', // Equador
    'DO': '¡Felicidades! (Felicidades!)', // República Dominicana
    'EG': 'مبروك! (Mabrouk!)', // Egito
    'TD': 'Félicitations! (Félicitations!)', // Chade
    'CF': 'Félicitations! (Félicitations!)', // República Centro-Africana
    'CG': 'Félicitations! (Félicitations!)', // Congo
    'CD': 'Félicitations! (Félicitations!)', // República Democrática do Congo
    'GQ': '¡Felicidades! (Felicidades!)', // Guiné Equatorial
    'BW': 'Congratulations! (Congratulations!)', // Botsuana
    'ET': 'እንኳን ወደ ዓለም አደር እንደምን አደር እንደምን! (Enkwan wedem!)', // Etiópia
    'ER': 'እንኳን ወደ ዓለም አደር እንደምን አደር እንደምን! (Enkwan wedem!)', // Eritreia
    'PS': 'مبروك! (Mabrouk!)', // Palestina
    'AZ': 'Təbrik edirəm! (Təbrik edirəm!)', // Azerbaijão
    'AM': 'Շնորհավորում եմ! (Shnorhavorum yem!)', // Armênia
    'BT': 'བཀྲ་ཤིས་! (Tashi Delek!)', // Butão
    'BD': 'শুভেচ্ছা! (Shubhechha!)', // Bangladesh
    'EE': 'Palju õnne! (Palju õnne!)', // Estônia
    'BY': 'С днём нараджэння! (S dnyom naradzhennya!)', // Bielorrússia
    'AT': 'Herzlichen Glückwunsch! (Herzlichen Glückwunsch!)', // Áustria
    'HR': 'Čestitam! (Čestitam!)', // Croácia
    'BA': 'Čestitam! (Čestitam!)', // Bósnia e Herzegovina
    'BG': 'Честито! (Chestito!)', // Bulgária
    'WS': 'Fa\'amalie atu! (Faamalie atu!)', // Samoa
    'IT': 'Congratulazioni! (Congratulazioni!)', // Itália
    'JM': 'Congratulations! (Congratuleichons!)', // Jamaica
    'JP': 'おめでとうございます! (Omedetou gozaimasu!)', // Japão
    'JO': 'مبروك! (Mabrouk!)', // Jordânia
    'KZ': 'Құттықтаймын! (Quttyqtaymyn!)', // Cazaquistão
    'KE': 'Hongera! (Hongera!)', // Quênia
    'KP': '축하합니다! (Chukhahamnida!)', // República Popular Democrática da Coreia
    'KR': '축하합니다! (Chukhahamnida!)', // Coreia do Sul
    'KW': 'مبروك! (Mabrouk!)', // Kuwait
    'KG': 'Туура! (Tuura!)', // Quirguistão
    'LA': 'ສະບາຍດີ! (Sabai di!)', // República Democrática Popular do Laos
    'LV': 'Apsveicu! (Apsveicu!)', // Letônia
    'LB': 'مبروك! (Mabrouk!)', // Líbano
    'LS': 'Rea leboha! (Rea leboha!)', // Lesoto
    'LR': 'Congratulations! (Congratuleichons!)', // Libéria
    'LY': 'مبروك! (Mabrouk!)', // Líbia
    'LI': 'Herzlichen Glückwunsch! (Hertzlichen Gluckwunsch!)', // Liechtenstein
    'LT': 'Sveikiname! (Sveikiname!)', // Lituânia
    'LU': 'Félicitations! (Félicitations!)', // Luxemburgo
    'MO': '恭喜! (Gongxi!)', // Macau
    'MK': 'Честитки! (Chestitki!)', // Macedônia do Norte
    'MG': 'Arahabaina! (Arahabaina!)', // Madagascar
    'MW': 'Zikomo! (Zikomo!)', // Malawi
    'IC': 'Felicidades! (Felicidades!)', // Ilhas Canárias
    'MY': 'Tahniah! (Tahniah!)', // Malásia
    'MV': 'Mubarak! (Mubarak!)', // Maldivas
    'ML': 'Félicitations! (Félicitations!)', // Mali
    'MT': 'Prosit! (Prosit!)', // Malta
    'MR': 'مبروك! (Mabrouk!)', // Mauritânia
    'MU': 'Félicitations! (Félicitations!)', // Ilhas de Maurício
    'YT': 'Félicitations! (Félicitations!)', // Ilhas de Mayotte
    'MX': '¡Felicidades! (Felicidades!)', // México
    'FM': 'Congratulations! (Congratuleichons!)', // Micronésia
    'MD': 'Felicitări! (Felicitări!)', // Moldávia
    'TF': 'Félicitations! (Félicitations!)', // Terras Austrais e Antárticas Francesas
    'MC': 'Félicitations! (Félicitations!)', // Mônaco
    'MN': 'Тамир! (Tamir!)', // Mongólia
    'ME': 'Čestitam! (Chestitam!)', // Montenegro
    'MA': 'مبروك! (Mabrouk!)', // Marrocos
    'MZ': 'Parabéns! (Parabéns!)', // Moçambique
    'MM': '축하합니다! (Chukhahamnida!)', // Mianmar (Birmânia)
    'NA': 'Congratulations! (Congratuleichons!)', // Namíbia
    'NR': 'Congratulations! (Congratuleichons!)', // Ilhas de Nauru
    'NP': 'बधाई हो! (Badhai ho!)', // Nepal
    'NL': 'Gefeliciteerd! (Guefeliciteerd!)', // Países Baixos
    'NZ': 'Congratulations! (Congratuleichons!)', // Nova Zelândia
    'NI': '¡Felicidades! (Felicidades!)', // Nicarágua
    'NE': 'Félicitations! (Félicitations!)', // Níger
    'NG': 'Congratulations! (Congratuleichons!)', // Nigéria
    'NO': 'Gratulerer! (Gratulerer!)', // Noruega
    'OM': 'مبروك! (Mabrouk!)', // Omã
    'PK': 'مبروك! (Mabrouk!)', // Paquistão
    'PA': '¡Felicidades! (Felicidades!)', // Panamá
    'PG': 'Congratulations! (Congratuleichons!)', // Papua-Nova Guiné
    'PY': '¡Felicidades! (Felicidades!)', // Paraguai
    'PE': '¡Felicidades! (Felicidades!)', // Peru
    'PH': 'Congratulations! (Congratuleichons!)', // Filipinas
    'PL': 'Gratulacje! (Gratulacje!)', // Polônia
    'PT': 'Parabéns! (Parabéns!)', // Portugal
    'PR': '¡Felicidades! (Felicidades!)', // Porto Rico
    'QA': 'مبروك! (Mabrouk!)', // Catar
    'RE': 'Félicitations! (Félicitations!)', // Reunião
    'RO': 'Felicitări! (Felicitări!)', // Romênia
    'RU': 'Поздравляю! (Pozdravlyayu!)', // Rússia
    'RW': 'Ibyiza! (Ibyiza!)', // Ruanda
    'KN': 'Congratulations! (Congratuleichons!)', // São Cristóvão e Nevis
    'LC': 'Congratulations! (Congratuleichons!)', // Santa Lúcia
    'ST': 'Parabéns! (Parabéns!)', // São Tomé e Príncipe
    'SA': 'مبروك! (Mabrouk!)', // Arábia Saudita
    'SN': 'Félicitations! (Félicitations!)', // Senegal
    'RS': 'Čestitam! (Chestitam!)', // Sérvia
    'SC': 'Félicitations! (Félicitations!)', // Seicheles
    'SL': 'Congratulations! (Congratuleichons!)', // Serra Leoa
    'SG': 'Congratulations! (Congratuleichons!)', // Singapura
    'SK': 'Gratulujeme! (Gratulujeme!)', // Eslováquia
    'SI': 'Čestitke! (Chestitke!)', // Eslovênia
    'SB': 'Congratulations! (Congratuleichons!)', // Ilhas Salomão
    'SO': 'Hambalyo! (Hambalyo!)', // Somália
    'ZA': 'Congratulations! (Congratuleichons!)', // África do Sul
    'SS': 'Congratulations! (Congratuleichons!)', // Sudão do Sul
    'ES': '¡Felicidades! (Felicidades!)', // Espanha
    'IT': 'Congratulazioni! (Congratulazioni!)', // San Marino
    'LK': 'සුභපැතුම්! (Subhapathum!)', // Sri Lanka
    'SD': 'مبروك! (Mabrouk!)', // Sudão
    'SR': 'Congratulations! (Congratuleichons!)', // Suriname
    'SE': 'Grattis! (Grattis!)', // Suécia
    'CH': 'Herzlichen Glückwunsch! (Hertzlichen Gluckwunsch!)', // Suíça
    'SY': 'مبروك! (Mabrouk!)', // Síria
    'TW': '恭喜! (Gongxi!)', // Taiwan
    'TJ': 'Табрик! (Tabrik!)', // Tajiquistão
    'TZ': 'Hongera! (Hongera!)', // Tanzânia
    'TH': 'ยินดีด้วย! (Yindi duay!)', // Tailândia
    'TL': 'Parabéns! (Parabéns!)', // Timor-Leste
    'TG': 'Félicitations! (Félicitations!)', // Togo
    'TT': 'Congratulations! (Congratuleichons!)', // Trinidad e Tobago
    'TN': 'مبروك! (Mabrouk!)', // Tunísia
    'TR': 'Tebrikler! (Tebrikler!)', // Turquia
    'TM': 'Tebrikler! (Tebrikler!)', // Turcomenistão
    'TC': 'Congratulations! (Congratuleichons!)', // Ilhas Turcas e Caicos
    'UG': 'Congratulations! (Congratuleichons!)', // Uganda
    'UA': 'Вітаю! (Vitayu!)', // Ucrânia
    'AE': 'مبروك! (Mabrouk!)', // Emirados Árabes Unidos
    'GB': 'Congratulations! (Congratuleichons!)', // Reino Unido
    'US': 'Congratulations! (Congratuleichons!)', // Estados Unidos
    'UY': '¡Felicidades! (Felicidades!)', // Uruguai
    'UZ': 'Tabriklaymiz! (Tabriklaymiz!)', // Uzbequistão
    'VU': 'Congratulations! (Congratuleichons!)', // Vanuatu
    'VE': '¡Felicidades! (Felicidades!)', // Venezuela
    'VN': 'Chúc mừng! (Chúc mừng!)', // Vietnã
    'VG': 'Congratulations! (Congratuleichons!)', // Ilhas Virgens Britânicas
    'VI': 'Congratulations! (Congratuleichons!)', // Ilhas Virgens Americanas
    'EH': 'مبروك! (Mabrouk!)', // Saara Ocidental
    'YE': 'مبروك! (Mabrouk!)', // Iêmen
    'ZM': 'Congratulations! (Congratuleichons!)', // Zâmbia
    'ZW': 'Congratulations! (Congratuleichons!)', // Zimbábue
    'AQ': 'Congratulations! (Congratuleichons!)', // Antártida
};

let timerInterval;
function iniciarTemporizador() {
    tempoInicio = Date.now();
    timerInterval = setInterval(() => {
        tempoTotal = Math.floor((Date.now() - tempoInicio) / 1000);
    }, 1000);
}
function pararTemporizador() {
    clearInterval(timerInterval);
}
function salvarPontuacao(name, difficulty, correctGuesses, time, attempts) {
    const scores = JSON.parse(localStorage.getItem('flagGameScores')) || [];
    const date = new Date().toLocaleDateString('pt-BR');
    scores.push({ name, difficulty, correctGuesses, time, attempts, date });
    localStorage.setItem('flagGameScores', JSON.stringify(scores));
}

function novaRodada() {

    const bandeirasDisponiveis = bandeiras.filter(b => !bandeirasCorretas.includes(b.codigo));
    
    if (bandeirasDisponiveis.length === 0) {
        alert("Todas as bandeiras foram corretamente identificadas!");
        salvarPontuacao(playerName, modoJogo, bandeirasCorretas.length, tempoTotal, tentativas);
        window.location.href = 'ranking.html'; 
        return;
    }

    const random = bandeirasDisponiveis[Math.floor(Math.random() * bandeirasDisponiveis.length)];
    atual = random;
    document.getElementById('flag').src = random.imagem;
    const resultado = document.getElementById('resultado');
    resultado.innerText = '';
    resultado.className = '';
    
    if (modoJogo === 'facil') {
        document.getElementById('pergunta').innerText = `Qual território corresponde à bandeira abaixo? (${atual.nome})`;
    } else {
        document.getElementById('resultado').innerText = ``;
    }
    document.querySelectorAll('.st0').forEach(area => {
        if (!bandeirasCorretas.includes(area.getAttribute('id'))) {
            area.style.fill = '';
            area.style.stroke = '';
        } else {
            area.style.fill = '#0a5f00';
            area.style.stroke = '#0a5f00';
        }
    });

    if (lupaSvg) {
        lupaSvg.querySelectorAll('.st0').forEach(area => {
            if (!bandeirasCorretas.includes(area.getAttribute('id'))) {
                area.style.fill = '';
                area.style.stroke = '';
            } else {
                area.style.fill = '#0a5f00'; 
                lupaSvg.querySelector(`#${area.id}`).style.stroke = '#0a5f00';
            }
        });
    }
}

atualizarErrosRestantes();

document.querySelectorAll('.st0').forEach(area => {
    area.addEventListener('click', () => {
        const escolhido = area.getAttribute('id');
        const resultado = document.getElementById('resultado');
        
        tentativas++;

        if (escolhido === atual.codigo) {
            const mensagemParabens = mensagensParabens[atual.codigo] || 'Congratulations!';
            resultado.innerText = `✅ Correto! ${atual.nome}. ${mensagemParabens}`;
            resultado.className = 'correto'; 
            area.style.fill = '#0a5f00'; // Mantém a cor verde
            area.style.stroke = '#0a5f00';

            if (!bandeirasCorretas.includes(atual.codigo)) {
                bandeirasCorretas.push(atual.codigo);
            }

            if (lupaSvg) {
                const areaLupa = lupaSvg.querySelector(`#${escolhido}`);
                if (areaLupa) {
                    areaLupa.style.fill = '#0a5f00';
                    areaLupa.style.stroke = '#0a5f00';
                }
            }

            if (bandeirasCorretas.length === bandeiras.length) {
                pararTemporizador();
                alert("Parabéns! Você adivinhou todas as bandeiras!");
                salvarPontuacao(playerName, modoJogo, bandeirasCorretas.length, tempoTotal, tentativas);
                window.location.href = 'ranking.html';
                return;
            }

            setTimeout(novaRodada, 2000);
        } else {
            resultado.innerText = `❌ Errado! É ${atual.nome}.`;
            resultado.className = 'errado';
            area.style.fill = 'red';
            area.style.stroke = 'red';
            
            if (lupaSvg) {
                const areaErradaLupa = lupaSvg.querySelector(`#${escolhido}`);
                if (areaErradaLupa) {
                    areaErradaLupa.style.fill = 'red';
                    areaErradaLupa.style.stroke = 'red';
                }
            }

            const areaCorreta = document.querySelector(`#${atual.codigo}`);
            if (areaCorreta) {
                areaCorreta.style.fill = '#0a5f00';
                areaCorreta.style.stroke = '#0a5f00';
            }
            if (lupaSvg) {
                const areaCorretaLupa = lupaSvg.querySelector(`#${atual.codigo}`);
                if (areaCorretaLupa) {
                    areaCorretaLupa.style.fill = '#0a5f00';
                    areaCorretaLupa.style.stroke = '#0a5f00';
                }
            }

            if (modoJogo === 'dificil') {
                    errosRestantes--;
                    atualizarErrosRestantes();
                    if (errosRestantes <= 0) {
                        alert("Você perdeu! Suas 3 chances acabaram.");
                        salvarPontuacao(playerName, modoJogo, bandeirasCorretas.length, tempoTotal, tentativas);
                        window.location.href = 'ranking.html'; 
                        return;
                    }
                }
                setTimeout(novaRodada, 2000);
        }
    });
});

const svg = document.getElementById('mapa');let lupaSvg = null;
let lupaActive = false;
let cabo = null;

const lupa = document.createElement('div');
lupa.classList.add('lupa');
document.body.appendChild(lupa);

cabo = document.createElement('div');
cabo.classList.add('cabo-lupa');
document.body.appendChild(cabo);

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        lupaActive = !lupaActive;
        if (lupaActive) {
            lupa.style.display = 'block';
            cabo.style.display = 'block';
        } else {
            lupa.style.display = 'none';
            cabo.style.display = 'none';
        }
    }
});

svg.addEventListener('mousemove', function(e) {
    if (!lupaActive) return;

    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    lupa.style.display = 'block';
    cabo.style.display = 'block';

    const lupaX = e.pageX - 82;
    const lupaY = e.pageY - 82;
    lupa.style.left = lupaX + 'px';
    lupa.style.top = lupaY + 'px';

    cabo.style.left = (lupaX + 130) + 'px';
    cabo.style.top = (lupaY + 130) + 'px';

    if (!lupaSvg) {
        lupaSvg = svg.cloneNode(true);
        lupaSvg.removeAttribute('id');
        lupaSvg.style.pointerEvents = 'none';
        lupa.appendChild(lupaSvg);

        const cruz = document.createElement('div');
        cruz.className = 'cruz';
        lupa.appendChild(cruz);
    }

    lupaSvg.setAttribute('viewBox', `${svgP.x - 33} ${svgP.y - 33} 66 66`);
});

svg.addEventListener('mouseleave', function() {
    if (lupaActive) {
        lupa.style.display = 'none';
        cabo.style.display = 'none';
    }
});

window.onload = () => {
    iniciarTemporizador();
    novaRodada();
    atualizarErrosRestantes();
};
