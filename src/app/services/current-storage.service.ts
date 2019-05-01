import {Injectable} from '@angular/core';
import {ClockModel} from '../models/clockModel';
import {DbMainService} from './routes/db-main.service';
import {DBPublicService} from './routes/d-b-public.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentStorageService {
  /*CLASE ENCARGADA DE TENER TODAS LAS VARIABLES IMPORTANTES SIEMPRE ACTUALIZADAS */
  // about Watches
  partes: any = {};
  public modelos = [];
  public hebillas = [];
  public coronas = [];
  public caja = [];
  public maquinarias = [];
  public tapas = [];
  //
  public opcsEstadosTendencias = {publica: {nombre: 'Pública'}, privada: {nombre: 'Privada'}};
  relojDisponible: ClockModel;
  public cristales = [];
  public pulsos = [];
  public idiomas: any[] = [];
  public idiomaApp: any = {'codigo': 'es', 'nombre': 'Español', 'nombreNativo': 'Español'};
  public cajas: any[];
  public IDIOMAS = [
    // {'codigo': 'ab', 'nombre': 'Abkhaz', 'nombreNativo': 'аҧсуа'},
    // {'codigo': 'aa', 'nombre': 'Afar', 'nombreNativo': 'Afaraf'},
    // {'codigo': 'af', 'nombre': 'Afrikaans', 'nombreNativo': 'Afrikaans'},
    // {'codigo': 'ak', 'nombre': 'Akan', 'nombreNativo': 'Akan'},
    // {'codigo': 'sq', 'nombre': 'Albanian', 'nombreNativo': 'Shqip'},
    // {'codigo': 'am', 'nombre': 'Amharic', 'nombreNativo': 'አማርኛ'},
    // {'codigo': 'ar', 'nombre': 'Arabic', 'nombreNativo': 'العربية'},
    // {'codigo': 'an', 'nombre': 'Aragonese', 'nombreNativo': 'Aragonés'},
    // {'codigo': 'hy', 'nombre': 'Armenian', 'nombreNativo': 'Հայերեն'},
    // {'codigo': 'as', 'nombre': 'Assamese', 'nombreNativo': 'অসমীয়া'},
    // {'codigo': 'av', 'nombre': 'Avaric', 'nombreNativo': 'авар мацӀ, магӀарул мацӀ'},
    // {'codigo': 'ae', 'nombre': 'Avestan', 'nombreNativo': 'avesta'},
    // {'codigo': 'ay', 'nombre': 'Aymara', 'nombreNativo': 'aymar aru'},
    // {'codigo': 'az', 'nombre': 'Azerbaijani', 'nombreNativo': 'azərbaycan dili'},
    // {'codigo': 'bm', 'nombre': 'Bambara', 'nombreNativo': 'bamanankan'},
    // {'codigo': 'ba', 'nombre': 'Bashkir', 'nombreNativo': 'башҡорт теле'},
    // {'codigo': 'eu', 'nombre': 'Basque', 'nombreNativo': 'euskara, euskera'},
    // {'codigo': 'be', 'nombre': 'Belarusian', 'nombreNativo': 'Беларуская'},
    // {'codigo': 'bn', 'nombre': 'Bengali', 'nombreNativo': 'বাংলা'},
    // {'codigo': 'bh', 'nombre': 'Bihari', 'nombreNativo': 'भोजपुरी'},
    // {'codigo': 'bi', 'nombre': 'Bislama', 'nombreNativo': 'Bislama'},
    // {'codigo': 'bs', 'nombre': 'Bosnian', 'nombreNativo': 'bosanski jezik'},
    // {'codigo': 'br', 'nombre': 'Breton', 'nombreNativo': 'brezhoneg'},
    // {'codigo': 'bg', 'nombre': 'Bulgarian', 'nombreNativo': 'български език'},
    // {'codigo': 'my', 'nombre': 'Burmese', 'nombreNativo': 'ဗမာစာ'},
    {'codigo': 'ca', 'nombre': 'Catalán', 'nombreNativo': 'Català'},
    // {'codigo': 'ch', 'nombre': 'Chamorro', 'nombreNativo': 'Chamoru'},
    // {'codigo': 'ce', 'nombre': 'Chechen', 'nombreNativo': 'нохчийн мотт'},
    // {'codigo': 'ny', 'nombre': 'Chichewa; Chewa; Nyanja', 'nombreNativo': 'chiCheŵa, chinyanja'},
    // {'codigo': 'zh', 'nombre': 'Chinese', 'nombreNativo': '中文 (Zhōngwén), 汉语, 漢語'},
    // {'codigo': 'cv', 'nombre': 'Chuvash', 'nombreNativo': 'чӑваш чӗлхи'},
    // {'codigo': 'kw', 'nombre': 'Cornish', 'nombreNativo': 'Kernewek'},
    // {'codigo': 'co', 'nombre': 'Corsican', 'nombreNativo': 'corsu, lingua corsa'},
    // {'codigo': 'cr', 'nombre': 'Cree', 'nombreNativo': 'ᓀᐦᐃᔭᐍᐏᐣ'},
    // {'codigo': 'hr', 'nombre': 'Croatian', 'nombreNativo': 'hrvatski'},
    // {'codigo': 'cs', 'nombre': 'Czech', 'nombreNativo': 'česky, čeština'},
    // {'codigo': 'da', 'nombre': 'Danish', 'nombreNativo': 'dansk'},
    // {'codigo': 'dv', 'nombre': 'Divehi; Dhivehi; Maldivian;', 'nombreNativo': 'ދިވެހި'},
    // {'codigo': 'nl', 'nombre': 'Dutch', 'nombreNativo': 'Nederlands, Vlaams'},
    {'codigo': 'en', 'nombre': 'Inglés', 'nombreNativo': 'English'},
    // {'codigo': 'eo', 'nombre': 'Esperanto', 'nombreNativo': 'Esperanto'},
    // {'codigo': 'et', 'nombre': 'Estonian', 'nombreNativo': 'eesti, eesti keel'},
    // {'codigo': 'ee', 'nombre': 'Ewe', 'nombreNativo': 'Eʋegbe'},
    // {'codigo': 'fo', 'nombre': 'Faroese', 'nombreNativo': 'føroyskt'},
    // {'codigo': 'fj', 'nombre': 'Fijian', 'nombreNativo': 'vosa Vakaviti'},
    // {'codigo': 'fi', 'nombre': 'Finnish', 'nombreNativo': 'suomi, suomen kieli'},
    {'codigo': 'fr', 'nombre': 'Francés', 'nombreNativo': 'français, langue française'},
    // {'codigo': 'ff', 'nombre': 'Fula; Fulah; Pulaar; Pular', 'nombreNativo': 'Fulfulde, Pulaar, Pular'},
    // {'codigo': 'gl', 'nombre': 'Galician', 'nombreNativo': 'Galego'},
    // {'codigo': 'ka', 'nombre': 'Georgian', 'nombreNativo': 'ქართული'},
    {'codigo': 'de', 'nombre': 'Alemán', 'nombreNativo': 'Deutsch'},
    // {'codigo': 'el', 'nombre': 'Greek, Modern', 'nombreNativo': 'Ελληνικά'},
    // {'codigo': 'gn', 'nombre': 'Guaraní', 'nombreNativo': 'Avañeẽ'},
    // {'codigo': 'gu', 'nombre': 'Gujarati', 'nombreNativo': 'ગુજરાતી'},
    // {'codigo': 'ht', 'nombre': 'Haitian; Haitian Creole', 'nombreNativo': 'Kreyòl ayisyen'},
    // {'codigo': 'ha', 'nombre': 'Hausa', 'nombreNativo': 'Hausa, هَوُسَ'},
    // {'codigo': 'he', 'nombre': 'Hebrew (modern)', 'nombreNativo': 'עברית'},
    // {'codigo': 'hz', 'nombre': 'Herero', 'nombreNativo': 'Otjiherero'},
    // {'codigo': 'hi', 'nombre': 'Hindi', 'nombreNativo': 'हिन्दी, हिंदी'},
    // {'codigo': 'ho', 'nombre': 'Hiri Motu', 'nombreNativo': 'Hiri Motu'},
    // {'codigo': 'hu', 'nombre': 'Hungarian', 'nombreNativo': 'Magyar'},
    // {'codigo': 'ia', 'nombre': 'Interlingua', 'nombreNativo': 'Interlingua'},
    // {'codigo': 'id', 'nombre': 'Indonesian', 'nombreNativo': 'Bahasa Indonesia'},
    // {'codigo': 'ie', 'nombre': 'Interlingue', 'nombreNativo': 'Originally called Occidental; then Interlingue after WWII'},
    // {'codigo': 'ga', 'nombre': 'Irish', 'nombreNativo': 'Gaeilge'},
    // {'codigo': 'ig', 'nombre': 'Igbo', 'nombreNativo': 'Asụsụ Igbo'},
    // {'codigo': 'ik', 'nombre': 'Inupiaq', 'nombreNativo': 'Iñupiaq, Iñupiatun'},
    // {'codigo': 'io', 'nombre': 'Ido', 'nombreNativo': 'Ido'},
    // {'codigo': 'is', 'nombre': 'Icelandic', 'nombreNativo': 'Íslenska'},
    // {'codigo': 'it', 'nombre': 'Italian', 'nombreNativo': 'Italiano'},
    // {'codigo': 'iu', 'nombre': 'Inuktitut', 'nombreNativo': 'ᐃᓄᒃᑎᑐᑦ'},
    {'codigo': 'ja', 'nombre': 'Japonés', 'nombreNativo': '日本語'},
    // {'codigo': 'jv', 'nombre': 'Javanese', 'nombreNativo': 'basa Jawa'},
    // {'codigo': 'kl', 'nombre': 'Kalaallisut, Greenlandic', 'nombreNativo': 'kalaallisut, kalaallit oqaasii'},
    // {'codigo': 'kn', 'nombre': 'Kannada', 'nombreNativo': 'ಕನ್ನಡ'},
    // {'codigo': 'kr', 'nombre': 'Kanuri', 'nombreNativo': 'Kanuri'},
    // {'codigo': 'ks', 'nombre': 'Kashmiri', 'nombreNativo': 'कश्मीरी, كشميري‎'},
    // {'codigo': 'kk', 'nombre': 'Kazakh', 'nombreNativo': 'Қазақ тілі'},
    // {'codigo': 'km', 'nombre': 'Khmer', 'nombreNativo': 'ភាសាខ្មែរ'},
    // {'codigo': 'ki', 'nombre': 'Kikuyu, Gikuyu', 'nombreNativo': 'Gĩkũyũ'},
    // {'codigo': 'rw', 'nombre': 'Kinyarwanda', 'nombreNativo': 'Ikinyarwanda'},
    // {'codigo': 'ky', 'nombre': 'Kirghiz, Kyrgyz', 'nombreNativo': 'кыргыз тили'},
    // {'codigo': 'kv', 'nombre': 'Komi', 'nombreNativo': 'коми кыв'},
    // {'codigo': 'kg', 'nombre': 'Kongo', 'nombreNativo': 'KiKongo'},
    // {'codigo': 'ko', 'nombre': 'Korean', 'nombreNativo': '한국어 (韓國語), 조선말 (朝鮮語)'},
    // {'codigo': 'ku', 'nombre': 'Kurdish', 'nombreNativo': 'Kurdî, كوردی‎'},
    // {'codigo': 'kj', 'nombre': 'Kwanyama, Kuanyama', 'nombreNativo': 'Kuanyama'},
    // {'codigo': 'la', 'nombre': 'Latin', 'nombreNativo': 'latine, lingua latina'},
    // {'codigo': 'lb', 'nombre': 'Luxembourgish, Letzeburgesch', 'nombreNativo': 'Lëtzebuergesch'},
    // {'codigo': 'lg', 'nombre': 'Luganda', 'nombreNativo': 'Luganda'},
    // {'codigo': 'li', 'nombre': 'Limburgish, Limburgan, Limburger', 'nombreNativo': 'Limburgs'},
    // {'codigo': 'ln', 'nombre': 'Lingala', 'nombreNativo': 'Lingála'},
    // {'codigo': 'lo', 'nombre': 'Lao', 'nombreNativo': 'ພາສາລາວ'},
    // {'codigo': 'lt', 'nombre': 'Lithuanian', 'nombreNativo': 'lietuvių kalba'},
    // {'codigo': 'lu', 'nombre': 'Luba-Katanga', 'nombreNativo': ''},
    // {'codigo': 'lv', 'nombre': 'Latvian', 'nombreNativo': 'latviešu valoda'},
    // {'codigo': 'gv', 'nombre': 'Manx', 'nombreNativo': 'Gaelg, Gailck'},
    // {'codigo': 'mk', 'nombre': 'Macedonian', 'nombreNativo': 'македонски јазик'},
    // {'codigo': 'mg', 'nombre': 'Malagasy', 'nombreNativo': 'Malagasy fiteny'},
    // {'codigo': 'ms', 'nombre': 'Malay', 'nombreNativo': 'bahasa Melayu, بهاس ملايو‎'},
    // {'codigo': 'ml', 'nombre': 'Malayalam', 'nombreNativo': 'മലയാളം'},
    // {'codigo': 'mt', 'nombre': 'Maltese', 'nombreNativo': 'Malti'},
    // {'codigo': 'mi', 'nombre': 'Māori', 'nombreNativo': 'te reo Māori'},
    // {'codigo': 'mr', 'nombre': 'Marathi (Marāṭhī)', 'nombreNativo': 'मराठी'},
    // {'codigo': 'mh', 'nombre': 'Marshallese', 'nombreNativo': 'Kajin M̧ajeļ'},
    // {'codigo': 'mn', 'nombre': 'Mongolian', 'nombreNativo': 'монгол'},
    // {'codigo': 'na', 'nombre': 'Nauru', 'nombreNativo': 'Ekakairũ Naoero'},
    // {'codigo': 'nv', 'nombre': 'Navajo, Navaho', 'nombreNativo': 'Diné bizaad, Dinékʼehǰí'},
    // {'codigo': 'nb', 'nombre': 'Norwegian Bokmål', 'nombreNativo': 'Norsk bokmål'},
    // {'codigo': 'nd', 'nombre': 'North Ndebele', 'nombreNativo': 'isiNdebele'},
    // {'codigo': 'ne', 'nombre': 'Nepali', 'nombreNativo': 'नेपाली'},
    // {'codigo': 'ng', 'nombre': 'Ndonga', 'nombreNativo': 'Owambo'},
    // {'codigo': 'nn', 'nombre': 'Norwegian Nynorsk', 'nombreNativo': 'Norsk nynorsk'},
    // {'codigo': 'no', 'nombre': 'Norwegian', 'nombreNativo': 'Norsk'},
    // {'codigo': 'ii', 'nombre': 'Nuosu', 'nombreNativo': 'ꆈꌠ꒿ Nuosuhxop'},
    // {'codigo': 'nr', 'nombre': 'South Ndebele', 'nombreNativo': 'isiNdebele'},
    // {'codigo': 'oc', 'nombre': 'Occitan', 'nombreNativo': 'Occitan'},
    // {'codigo': 'oj', 'nombre': 'Ojibwe, Ojibwa', 'nombreNativo': 'ᐊᓂᔑᓈᐯᒧᐎᓐ'},
    // {
    //   'codigo': 'cu',
    //   'nombre': 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic',
    //   'nombreNativo': 'ѩзыкъ словѣньскъ'
    // },
    // {'codigo': 'om', 'nombre': 'Oromo', 'nombreNativo': 'Afaan Oromoo'},
    // {'codigo': 'or', 'nombre': 'Oriya', 'nombreNativo': 'ଓଡ଼ିଆ'},
    // {'codigo': 'os', 'nombre': 'Ossetian, Ossetic', 'nombreNativo': 'ирон æвзаг'},
    // {'codigo': 'pa', 'nombre': 'Panjabi, Punjabi', 'nombreNativo': 'ਪੰਜਾਬੀ, پنجابی‎'},
    // {'codigo': 'pi', 'nombre': 'Pāli', 'nombreNativo': 'पाऴि'},
    // {'codigo': 'fa', 'nombre': 'Persian', 'nombreNativo': 'فارسی'},
    // {'codigo': 'pl', 'nombre': 'Polish', 'nombreNativo': 'polski'},
    // {'codigo': 'ps', 'nombre': 'Pashto, Pushto', 'nombreNativo': 'پښتو'},
    // {'codigo': 'pt', 'nombre': 'Portuguese', 'nombreNativo': 'Português'},
    // {'codigo': 'qu', 'nombre': 'Quechua', 'nombreNativo': 'Runa Simi, Kichwa'},
    // {'codigo': 'rm', 'nombre': 'Romansh', 'nombreNativo': 'rumantsch grischun'},
    // {'codigo': 'rn', 'nombre': 'Kirundi', 'nombreNativo': 'kiRundi'},
    // {'codigo': 'ro', 'nombre': 'Romanian, Moldavian, Moldovan', 'nombreNativo': 'română'},
    // {'codigo': 'ru', 'nombre': 'Russian', 'nombreNativo': 'русский язык'},
    // {'codigo': 'sa', 'nombre': 'Sanskrit (Saṁskṛta)', 'nombreNativo': 'संस्कृतम्'},
    // {'codigo': 'sc', 'nombre': 'Sardinian', 'nombreNativo': 'sardu'},
    // {'codigo': 'sd', 'nombre': 'Sindhi', 'nombreNativo': 'सिन्धी, سنڌي، سندھی‎'},
    // {'codigo': 'se', 'nombre': 'Northern Sami', 'nombreNativo': 'Davvisámegiella'},
    // {'codigo': 'sm', 'nombre': 'Samoan', 'nombreNativo': 'gagana faa Samoa'},
    // {'codigo': 'sg', 'nombre': 'Sango', 'nombreNativo': 'yângâ tî sängö'},
    // {'codigo': 'sr', 'nombre': 'Serbian', 'nombreNativo': 'српски језик'},
    // {'codigo': 'gd', 'nombre': 'Scottish Gaelic; Gaelic', 'nombreNativo': 'Gàidhlig'},
    // {'codigo': 'sn', 'nombre': 'Shona', 'nombreNativo': 'chiShona'},
    // {'codigo': 'si', 'nombre': 'Sinhala, Sinhalese', 'nombreNativo': 'සිංහල'},
    // {'codigo': 'sk', 'nombre': 'Slovak', 'nombreNativo': 'slovenčina'},
    // {'codigo': 'sl', 'nombre': 'Slovene', 'nombreNativo': 'slovenščina'},
    // {'codigo': 'so', 'nombre': 'Somali', 'nombreNativo': 'Soomaaliga, af Soomaali'},
    // {'codigo': 'st', 'nombre': 'Southern Sotho', 'nombreNativo': 'Sesotho'},
    {'codigo': 'es', 'nombre': 'Español', 'nombreNativo': 'Español'},
    // {'codigo': 'su', 'nombre': 'Sundanese', 'nombreNativo': 'Basa Sunda'},
    // {'codigo': 'sw', 'nombre': 'Swahili', 'nombreNativo': 'Kiswahili'},
    // {'codigo': 'ss', 'nombre': 'Swati', 'nombreNativo': 'SiSwati'},
    // {'codigo': 'sv', 'nombre': 'Swedish', 'nombreNativo': 'svenska'},
    // {'codigo': 'ta', 'nombre': 'Tamil', 'nombreNativo': 'தமிழ்'},
    // {'codigo': 'te', 'nombre': 'Telugu', 'nombreNativo': 'తెలుగు'},
    // {'codigo': 'tg', 'nombre': 'Tajik', 'nombreNativo': 'тоҷикӣ, toğikī, تاجیکی‎'},
    // {'codigo': 'th', 'nombre': 'Thai', 'nombreNativo': 'ไทย'},
    // {'codigo': 'ti', 'nombre': 'Tigrinya', 'nombreNativo': 'ትግርኛ'},
    // {'codigo': 'bo', 'nombre': 'Tibetan Standard, Tibetan, Central', 'nombreNativo': 'བོད་ཡིག'},
    // {'codigo': 'tk', 'nombre': 'Turkmen', 'nombreNativo': 'Türkmen, Түркмен'},
    // {'codigo': 'tl', 'nombre': 'Tagalog', 'nombreNativo': 'Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔'},
    // {'codigo': 'tn', 'nombre': 'Tswana', 'nombreNativo': 'Setswana'},
    // {'codigo': 'to', 'nombre': 'Tonga (Tonga Islands)', 'nombreNativo': 'faka Tonga'},
    // {'codigo': 'tr', 'nombre': 'Turkish', 'nombreNativo': 'Türkçe'},
    // {'codigo': 'ts', 'nombre': 'Tsonga', 'nombreNativo': 'Xitsonga'},
    // {'codigo': 'tt', 'nombre': 'Tatar', 'nombreNativo': 'татарча, tatarça, تاتارچا‎'},
    // {'codigo': 'tw', 'nombre': 'Twi', 'nombreNativo': 'Twi'},
    // {'codigo': 'ty', 'nombre': 'Tahitian', 'nombreNativo': 'Reo Tahiti'},
    // {'codigo': 'ug', 'nombre': 'Uighur, Uyghur', 'nombreNativo': 'Uyƣurqə, ئۇيغۇرچە‎'},
    // {'codigo': 'uk', 'nombre': 'Ukrainian', 'nombreNativo': 'українська'},
    // {'codigo': 'ur', 'nombre': 'Urdu', 'nombreNativo': 'اردو'},
    // {'codigo': 'uz', 'nombre': 'Uzbek', 'nombreNativo': 'zbek, Ўзбек, أۇزبېك‎'},
    // {'codigo': 've', 'nombre': 'Venda', 'nombreNativo': 'Tshivenḓa'},
    // {'codigo': 'vi', 'nombre': 'Vietnamese', 'nombreNativo': 'Tiếng Việt'},
    // {'codigo': 'vo', 'nombre': 'Volapük', 'nombreNativo': 'Volapük'},
    // {'codigo': 'wa', 'nombre': 'Walloon', 'nombreNativo': 'Walon'},
    // {'codigo': 'cy', 'nombre': 'Welsh', 'nombreNativo': 'Cymraeg'},
    // {'codigo': 'wo', 'nombre': 'Wolof', 'nombreNativo': 'Wollof'},
    // {'codigo': 'fy', 'nombre': 'Western Frisian', 'nombreNativo': 'Frysk'},
    // {'codigo': 'xh', 'nombre': 'Xhosa', 'nombreNativo': 'isiXhosa'},
    // {'codigo': 'yi', 'nombre': 'Yiddish', 'nombreNativo': 'ייִדיש'},
    // {'codigo': 'yo', 'nombre': 'Yoruba', 'nombreNativo': 'Yorùbá'},
    // {'codigo': 'za', 'nombre': 'Zhuang, Chuang', 'nombreNativo': 'Saɯ cueŋƅ, Saw cuengh'}
  ];
  public DIVISAS = [
    // {'cc': 'AED', 'simbolo': '\u062f.\u0625;', 'nombre': 'UAE dirham'},
    // {'cc': 'AFN', 'simbolo': 'Afs', 'nombre': 'Afghan afghani'},
    // {'cc': 'ALL', 'simbolo': 'L', 'nombre': 'Albanian lek'},
    // {'cc': 'AMD', 'simbolo': 'AMD', 'nombre': 'Armenian dram'},
    // {'cc': 'ANG', 'simbolo': 'NA\u0192', 'nombre': 'Netherlands Antillean gulden'},
    // {'cc': 'AOA', 'simbolo': 'Kz', 'nombre': 'Angolan kwanza'},
    // {'cc': 'ARS', 'simbolo': '$', 'nombre': 'Argentine peso'},
    // {'cc': 'AUD', 'simbolo': '$', 'nombre': 'Australian dollar'},
    // {'cc': 'AWG', 'simbolo': '\u0192', 'nombre': 'Aruban florin'},
    // {'cc': 'AZN', 'simbolo': 'AZN', 'nombre': 'Azerbaijani manat'},
    // {'cc': 'BAM', 'simbolo': 'KM', 'nombre': 'Bosnia and Herzegovina konvertibilna marka'},
    // {'cc': 'BBD', 'simbolo': 'Bds$', 'nombre': 'Barbadian dollar'},
    // {'cc': 'BDT', 'simbolo': '\u09f3', 'nombre': 'Bangladeshi taka'},
    // {'cc': 'BGN', 'simbolo': 'BGN', 'nombre': 'Bulgarian lev'},
    // {'cc': 'BHD', 'simbolo': '.\u062f.\u0628', 'nombre': 'Bahraini dinar'},
    // {'cc': 'BIF', 'simbolo': 'FBu', 'nombre': 'Burundi franc'},
    // {'cc': 'BMD', 'simbolo': 'BD$', 'nombre': 'Bermudian dollar'},
    // {'cc': 'BND', 'simbolo': 'B$', 'nombre': 'Brunei dollar'},
    // {'cc': 'BOB', 'simbolo': 'Bs.', 'nombre': 'Bolivian boliviano'},
    // {'cc': 'BRL', 'simbolo': 'R$', 'nombre': 'Brazilian real'},
    // {'cc': 'BSD', 'simbolo': 'B$', 'nombre': 'Bahamian dollar'},
    // {'cc': 'BTN', 'simbolo': 'Nu.', 'nombre': 'Bhutanese ngultrum'},
    // {'cc': 'BWP', 'simbolo': 'P', 'nombre': 'Botswana pula'},
    // {'cc': 'BYR', 'simbolo': 'Br', 'nombre': 'Belarusian ruble'},
    // {'cc': 'BZD', 'simbolo': 'BZ$', 'nombre': 'Belize dollar'},
    // {'cc': 'CAD', 'simbolo': '$', 'nombre': 'Canadian dollar'},
    // {'cc': 'CDF', 'simbolo': 'F', 'nombre': 'Congolese franc'},
    // {'cc': 'CHF', 'simbolo': 'Fr.', 'nombre': 'Swiss franc'},
    // {'cc': 'CLP', 'simbolo': '$', 'nombre': 'Chilean peso'},
    // {'cc': 'CNY', 'simbolo': '\u00a5', 'nombre': 'Chinese/Yuan renminbi'},
    {'cc': 'COP', 'simbolo': 'Col$', 'nombre': 'Peso Colombiano'},
    // {'cc': 'CRC', 'simbolo': '\u20a1', 'nombre': 'Costa Rican colon'},
    // {'cc': 'CUC', 'simbolo': '$', 'nombre': 'Cuban peso'},
    // {'cc': 'CVE', 'simbolo': 'Esc', 'nombre': 'Cape Verdean escudo'},
    // {'cc': 'CZK', 'simbolo': 'K\u010d', 'nombre': 'Czech koruna'},
    // {'cc': 'DJF', 'simbolo': 'Fdj', 'nombre': 'Djiboutian franc'},
    // {'cc': 'DKK', 'simbolo': 'Kr', 'nombre': 'Danish krone'},
    // {'cc': 'DOP', 'simbolo': 'RD$', 'nombre': 'Dominican peso'},
    // {'cc': 'DZD', 'simbolo': '\u062f.\u062c', 'nombre': 'Algerian dinar'},
    // {'cc': 'EEK', 'simbolo': 'KR', 'nombre': 'Estonian kroon'},
    // {'cc': 'EGP', 'simbolo': '\u00a3', 'nombre': 'Egyptian pound'},
    // {'cc': 'ERN', 'simbolo': 'Nfa', 'nombre': 'Eritrean nakfa'},
    // {'cc': 'ETB', 'simbolo': 'Br', 'nombre': 'Ethiopian birr'},
    {'cc': 'EUR', 'simbolo': '\u20ac', 'nombre': 'Euro'},
    // {'cc': 'FJD', 'simbolo': 'FJ$', 'nombre': 'Fijian dollar'},
    // {'cc': 'FKP', 'simbolo': '\u00a3', 'nombre': 'Falkland Islands pound'},
    // {'cc': 'GBP', 'simbolo': '\u00a3', 'nombre': 'British pound'},
    // {'cc': 'GEL', 'simbolo': 'GEL', 'nombre': 'Georgian lari'},
    // {'cc': 'GHS', 'simbolo': 'GH\u20b5', 'nombre': 'Ghanaian cedi'},
    // {'cc': 'GIP', 'simbolo': '\u00a3', 'nombre': 'Gibraltar pound'},
    // {'cc': 'GMD', 'simbolo': 'D', 'nombre': 'Gambian dalasi'},
    // {'cc': 'GNF', 'simbolo': 'FG', 'nombre': 'Guinean franc'},
    // {'cc': 'GQE', 'simbolo': 'CFA', 'nombre': 'Central African CFA franc'},
    // {'cc': 'GTQ', 'simbolo': 'Q', 'nombre': 'Guatemalan quetzal'},
    // {'cc': 'GYD', 'simbolo': 'GY$', 'nombre': 'Guyanese dollar'},
    // {'cc': 'HKD', 'simbolo': 'HK$', 'nombre': 'Hong Kong dollar'},
    // {'cc': 'HNL', 'simbolo': 'L', 'nombre': 'Honduran lempira'},
    // {'cc': 'HRK', 'simbolo': 'kn', 'nombre': 'Croatian kuna'},
    // {'cc': 'HTG', 'simbolo': 'G', 'nombre': 'Haitian gourde'},
    // {'cc': 'HUF', 'simbolo': 'Ft', 'nombre': 'Hungarian forint'},
    // {'cc': 'IDR', 'simbolo': 'Rp', 'nombre': 'Indonesian rupiah'},
    // {'cc': 'ILS', 'simbolo': '\u20aa', 'nombre': 'Israeli new sheqel'},
    // {'cc': 'INR', 'simbolo': '\u20B9', 'nombre': 'Indian rupee'},
    // {'cc': 'IQD', 'simbolo': '\u062f.\u0639', 'nombre': 'Iraqi dinar'},
    // {'cc': 'IRR', 'simbolo': 'IRR', 'nombre': 'Iranian rial'},
    // {'cc': 'ISK', 'simbolo': 'kr', 'nombre': 'Icelandic kr\u00f3na'},
    // {'cc': 'JMD', 'simbolo': 'J$', 'nombre': 'Jamaican dollar'},
    // {'cc': 'JOD', 'simbolo': 'JOD', 'nombre': 'Jordanian dinar'},
    // {'cc': 'JPY', 'simbolo': '\u00a5', 'nombre': 'Japanese yen'},
    // {'cc': 'KES', 'simbolo': 'KSh', 'nombre': 'Kenyan shilling'},
    // {'cc': 'KGS', 'simbolo': '\u0441\u043e\u043c', 'nombre': 'Kyrgyzstani som'},
    // {'cc': 'KHR', 'simbolo': '\u17db', 'nombre': 'Cambodian riel'},
    // {'cc': 'KMF', 'simbolo': 'KMF', 'nombre': 'Comorian franc'},
    // {'cc': 'KPW', 'simbolo': 'W', 'nombre': 'North Korean won'},
    // {'cc': 'KRW', 'simbolo': 'W', 'nombre': 'South Korean won'},
    // {'cc': 'KWD', 'simbolo': 'KWD', 'nombre': 'Kuwaiti dinar'},
    // {'cc': 'KYD', 'simbolo': 'KY$', 'nombre': 'Cayman Islands dollar'},
    // {'cc': 'KZT', 'simbolo': 'T', 'nombre': 'Kazakhstani tenge'},
    // {'cc': 'LAK', 'simbolo': 'KN', 'nombre': 'Lao kip'},
    // {'cc': 'LBP', 'simbolo': '\u00a3', 'nombre': 'Lebanese lira'},
    // {'cc': 'LKR', 'simbolo': 'Rs', 'nombre': 'Sri Lankan rupee'},
    // {'cc': 'LRD', 'simbolo': 'L$', 'nombre': 'Liberian dollar'},
    // {'cc': 'LSL', 'simbolo': 'M', 'nombre': 'Lesotho loti'},
    // {'cc': 'LTL', 'simbolo': 'Lt', 'nombre': 'Lithuanian litas'},
    // {'cc': 'LVL', 'simbolo': 'Ls', 'nombre': 'Latvian lats'},
    // {'cc': 'LYD', 'simbolo': 'LD', 'nombre': 'Libyan dinar'},
    // {'cc': 'MAD', 'simbolo': 'MAD', 'nombre': 'Moroccan dirham'},
    // {'cc': 'MDL', 'simbolo': 'MDL', 'nombre': 'Moldovan leu'},
    // {'cc': 'MGA', 'simbolo': 'FMG', 'nombre': 'Malagasy ariary'},
    // {'cc': 'MKD', 'simbolo': 'MKD', 'nombre': 'Macedonian denar'},
    // {'cc': 'MMK', 'simbolo': 'K', 'nombre': 'Myanma kyat'},
    // {'cc': 'MNT', 'simbolo': '\u20ae', 'nombre': 'Mongolian tugrik'},
    // {'cc': 'MOP', 'simbolo': 'P', 'nombre': 'Macanese pataca'},
    // {'cc': 'MRO', 'simbolo': 'UM', 'nombre': 'Mauritanian ouguiya'},
    // {'cc': 'MUR', 'simbolo': 'Rs', 'nombre': 'Mauritian rupee'},
    // {'cc': 'MVR', 'simbolo': 'Rf', 'nombre': 'Maldivian rufiyaa'},
    // {'cc': 'MWK', 'simbolo': 'MK', 'nombre': 'Malawian kwacha'},
    // {'cc': 'MXN', 'simbolo': '$', 'nombre': 'Mexican peso'},
    // {'cc': 'MYR', 'simbolo': 'RM', 'nombre': 'Malaysian ringgit'},
    // {'cc': 'MZM', 'simbolo': 'MTn', 'nombre': 'Mozambican metical'},
    // {'cc': 'NAD', 'simbolo': 'N$', 'nombre': 'Namibian dollar'},
    // {'cc': 'NGN', 'simbolo': '\u20a6', 'nombre': 'Nigerian naira'},
    // {'cc': 'NIO', 'simbolo': 'C$', 'nombre': 'Nicaraguan c\u00f3rdoba'},
    // {'cc': 'NOK', 'simbolo': 'kr', 'nombre': 'Norwegian krone'},
    // {'cc': 'NPR', 'simbolo': 'NRs', 'nombre': 'Nepalese rupee'},
    // {'cc': 'NZD', 'simbolo': 'NZ$', 'nombre': 'New Zealand dollar'},
    // {'cc': 'OMR', 'simbolo': 'OMR', 'nombre': 'Omani rial'},
    // {'cc': 'PAB', 'simbolo': 'B./', 'nombre': 'Panamanian balboa'},
    // {'cc': 'PEN', 'simbolo': 'S/.', 'nombre': 'Peruvian nuevo sol'},
    // {'cc': 'PGK', 'simbolo': 'K', 'nombre': 'Papua New Guinean kina'},
    // {'cc': 'PHP', 'simbolo': '\u20b1', 'nombre': 'Philippine peso'},
    // {'cc': 'PKR', 'simbolo': 'Rs.', 'nombre': 'Pakistani rupee'},
    // {'cc': 'PLN', 'simbolo': 'z\u0142', 'nombre': 'Polish zloty'},
    // {'cc': 'PYG', 'simbolo': '\u20b2', 'nombre': 'Paraguayan guarani'},
    // {'cc': 'QAR', 'simbolo': 'QR', 'nombre': 'Qatari riyal'},
    // {'cc': 'RON', 'simbolo': 'L', 'nombre': 'Romanian leu'},
    // {'cc': 'RSD', 'simbolo': 'din.', 'nombre': 'Serbian dinar'},
    // {'cc': 'RUB', 'simbolo': 'R', 'nombre': 'Russian ruble'},
    // {'cc': 'SAR', 'simbolo': 'SR', 'nombre': 'Saudi riyal'},
    // {'cc': 'SBD', 'simbolo': 'SI$', 'nombre': 'Solomon Islands dollar'},
    // {'cc': 'SCR', 'simbolo': 'SR', 'nombre': 'Seychellois rupee'},
    // {'cc': 'SDG', 'simbolo': 'SDG', 'nombre': 'Sudanese pound'},
    // {'cc': 'SEK', 'simbolo': 'kr', 'nombre': 'Swedish krona'},
    // {'cc': 'SGD', 'simbolo': 'S$', 'nombre': 'Singapore dollar'},
    // {'cc': 'SHP', 'simbolo': '\u00a3', 'nombre': 'Saint Helena pound'},
    // {'cc': 'SLL', 'simbolo': 'Le', 'nombre': 'Sierra Leonean leone'},
    // {'cc': 'SOS', 'simbolo': 'Sh.', 'nombre': 'Somali shilling'},
    // {'cc': 'SRD', 'simbolo': '$', 'nombre': 'Surinamese dollar'},
    // {'cc': 'SYP', 'simbolo': 'LS', 'nombre': 'Syrian pound'},
    // {'cc': 'SZL', 'simbolo': 'E', 'nombre': 'Swazi lilangeni'},
    // {'cc': 'THB', 'simbolo': '\u0e3f', 'nombre': 'Thai baht'},
    // {'cc': 'TJS', 'simbolo': 'TJS', 'nombre': 'Tajikistani somoni'},
    // {'cc': 'TMT', 'simbolo': 'm', 'nombre': 'Turkmen manat'},
    // {'cc': 'TND', 'simbolo': 'DT', 'nombre': 'Tunisian dinar'},
    // {'cc': 'TRY', 'simbolo': 'TRY', 'nombre': 'Turkish new lira'},
    // {'cc': 'TTD', 'simbolo': 'TT$', 'nombre': 'Trinidad and Tobago dollar'},
    // {'cc': 'TWD', 'simbolo': 'NT$', 'nombre': 'New Taiwan dollar'},
    // {'cc': 'TZS', 'simbolo': 'TZS', 'nombre': 'Tanzanian shilling'},
    // {'cc': 'UAH', 'simbolo': 'UAH', 'nombre': 'Ukrainian hryvnia'},
    // {'cc': 'UGX', 'simbolo': 'USh', 'nombre': 'Ugandan shilling'},
    {'cc': 'USD', 'simbolo': 'US$', 'nombre': 'Dólar estadounidense'},
    // {'cc': 'UYU', 'simbolo': '$U', 'nombre': 'Uruguayan peso'},
    // {'cc': 'UZS', 'simbolo': 'UZS', 'nombre': 'Uzbekistani som'},
    // {'cc': 'VEB', 'simbolo': 'Bs', 'nombre': 'Venezuelan bolivar'},
    // {'cc': 'VND', 'simbolo': '\u20ab', 'nombre': 'Vietnamese dong'},
    // {'cc': 'VUV', 'simbolo': 'VT', 'nombre': 'Vanuatu vatu'},
    // {'cc': 'WST', 'simbolo': 'WS$', 'nombre': 'Samoan tala'},
    // {'cc': 'XAF', 'simbolo': 'CFA', 'nombre': 'Central African CFA franc'},
    // {'cc': 'XCD', 'simbolo': 'EC$', 'nombre': 'East Caribbean dollar'},
    // {'cc': 'XDR', 'simbolo': 'SDR', 'nombre': 'Special Drawing Rights'},
    // {'cc': 'XOF', 'simbolo': 'CFA', 'nombre': 'West African CFA franc'},
    // {'cc': 'XPF', 'simbolo': 'F', 'nombre': 'CFP franc'},
    // {'cc': 'YER', 'simbolo': 'YER', 'nombre': 'Yemeni rial'},
    // {'cc': 'ZAR', 'simbolo': 'R', 'nombre': 'South African rand'},
    // {'cc': 'ZMK', 'simbolo': 'ZK', 'nombre': 'Zambian kwacha'},
    // {'cc': 'ZWR', 'simbolo': 'Z$', 'nombre': 'Zimbabwean dollar'}
  ];
  public estructuradorIdiomas = {};
  idiomaDefault: any = {codigo: 'es', nombre: 'Español', nombreNativo: 'Españo'};
  datosUsuario: any = {};

  constructor(private dbMain: DbMainService, private dbPublic: DBPublicService) {
  }

  iniciar() {
    console.log('SE TRAEN LOS DATOS INICIALES');
    this.getModelos();
    this.getCoronas();
    this.getCristales();
    this.getHebillas();
    this.getPulsos();
    this.getTapas();
    this.getCajas();
    this.getMaquinarias();
    this.getIdiomas();
  }

  getModelos() {
    this.dbMain.getItems('modelos').subscribe(value => {
      this.modelos = value;
      console.log('modelo', this.modelos);
    });
  }

  getIdiomas() {


    this.dbPublic.getIdiomas().subscribe(value => {
      this.idiomas = value;
      this.idiomaDefault = this.idiomas.filter(value1 => value1.codigo === 'es')[0];

      this.idiomas.forEach(value1 => {
        this.estructuradorIdiomas[value1.codigo] = {};
      });
    });
  }

  getHebillas() {
    this.dbMain.getItems('hebillas').subscribe(value => {
      this.hebillas = value;
    });
  }

  getCoronas() {
    this.dbMain.getItems('coronas').subscribe(value => {
      this.coronas = value;
    });
  }

  getMaquinarias() {
    this.dbMain.getItems('maquinarias').subscribe(value => {
      this.maquinarias = value;
    });
  }

  getTapas() {
    this.dbMain.getItems('tapas').subscribe(value => {
      this.tapas = value;
    });
  }

  getCajas() {
    this.dbMain.getItems('cajas').subscribe(value => {
      this.cajas = value;
    });
  }

  getCristales() {
    this.dbMain.getItems('cristales').subscribe(value => {
      this.cristales = value;
    });
  }

  getPulsos() {
    this.dbMain.getItems('pulsos').subscribe(value => {
      this.pulsos = value;
    });
  }
}
