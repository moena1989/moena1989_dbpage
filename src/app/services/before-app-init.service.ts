import {EventEmitter, Injectable} from '@angular/core';
import {DbMainService} from './routes/db-main.service';
import {DBPublicService} from './routes/d-b-public.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {InventoryConfigItemComponent} from '../inventory-config-item/inventory-config-item.component';
import {take} from 'rxjs/operators';
import {DbSelectorService} from '../db-selector.service';
import {CATEGORIES, PRODUCT_TYPES} from '../../db/dbConfig';


@Injectable({
  providedIn: 'root'
})
export class BeforeAppInitService {
  // todo: move resources to resourcesServicer to clean this class;
  static inventory: InventoryConfigItemComponent = undefined;
  public states = {public: {name: 'Pública'}, private: {name: 'Privada'}};
  public caja = [];
  public LANGS = [
    // {code: 'ab', name: 'Abkhaz', nativeName: 'аҧсуа'},
    // {code: 'aa', name: 'Afar', nativeName: 'Afaraf'},
    // {code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans'},
    // {code: 'ak', name: 'Akan', nativeName: 'Akan'},
    // {code: 'sq', name: 'Albanian', nativeName: 'Shqip'},
    // {code: 'am', name: 'Amharic', nativeName: 'አማርኛ'},
    // {code: 'ar', name: 'Arabic', nativeName: 'العربية'},
    // {code: 'an', name: 'Aragonese', nativeName: 'Aragonés'},
    // {code: 'hy', name: 'Armenian', nativeName: 'Հայերեն'},
    // {code: 'as', name: 'Assamese', nativeName: 'অসমীয়া'},
    // {code: 'av', name: 'Avaric', nativeName: 'авар мацӀ, магӀарул мацӀ'},
    // {code: 'ae', name: 'Avestan', nativeName: 'avesta'},
    // {code: 'ay', name: 'Aymara', nativeName: 'aymar aru'},
    // {code: 'az', name: 'Azerbaijani', nativeName: 'azərbaycan dili'},
    // {code: 'bm', name: 'Bambara', nativeName: 'bamanankan'},
    // {code: 'ba', name: 'Bashkir', nativeName: 'башҡорт теле'},
    // {code: 'eu', name: 'Basque', nativeName: 'euskara, euskera'},
    // {code: 'be', name: 'Belarusian', nativeName: 'Беларуская'},
    // {code: 'bn', name: 'Bengali', nativeName: 'বাংলা'},
    // {code: 'bh', name: 'Bihari', nativeName: 'भोजपुरी'},
    // {code: 'bi', name: 'Bislama', nativeName: 'Bislama'},
    // {code: 'bs', name: 'Bosnian', nativeName: 'bosanski jezik'},
    // {code: 'br', name: 'Breton', nativeName: 'brezhoneg'},
    // {code: 'bg', name: 'Bulgarian', nativeName: 'български език'},
    // {code: 'my', name: 'Burmese', nativeName: 'ဗမာစာ'},
    {code: 'ca', name: 'Catalán', nativeName: 'Català'},
    // {code: 'ch', name: 'Chamorro', nativeName: 'Chamoru'},
    // {code: 'ce', name: 'Chechen', nativeName: 'нохчийн мотт'},
    // {code: 'ny', name: 'Chichewa; Chewa; Nyanja', nativeName: 'chiCheŵa, chinyanja'},
    {code: 'zh', name: 'Mandarín', nativeName: '中文 (Zhōngwén), 汉语, 漢語'},
    // {code: 'cv', name: 'Chuvash', nativeName: 'чӑваш чӗлхи'},
    // {code: 'kw', name: 'Cornish', nativeName: 'Kernewek'},
    // {code: 'co', name: 'Corsican', nativeName: 'corsu, lingua corsa'},
    // {code: 'cr', name: 'Cree', nativeName: 'ᓀᐦᐃᔭᐍᐏᐣ'},
    // {code: 'hr', name: 'Croatian', nativeName: 'hrvatski'},
    {code: 'cs', name: 'Checo', nativeName: 'česky, čeština'},
    // {code: 'da', name: 'Danish', nativeName: 'dansk'},
    // {code: 'dv', name: 'Divehi; Dhivehi; Maldivian;', nativeName: 'ދިވެހި'},
    // {code: 'nl', name: 'Dutch', nativeName: 'Nederlands, Vlaams'},
    {code: 'en', name: 'Inglés', nativeName: 'English'},
    {code: 'eo', name: 'Esperanto', nativeName: 'Esperanto'},
    // {code: 'et', name: 'Estonian', nativeName: 'eesti, eesti keel'},
    // {code: 'ee', name: 'Ewe', nativeName: 'Eʋegbe'},
    // {code: 'fo', name: 'Faroese', nativeName: 'føroyskt'},
    // {code: 'fj', name: 'Fijian', nativeName: 'vosa Vakaviti'},
    // {code: 'fi', name: 'Finnish', nativeName: 'suomi, suomen kieli'},
    {code: 'fr', name: 'Francés', nativeName: 'français, langue française'},
    // {code: 'ff', name: 'Fula; Fulah; Pulaar; Pular', nativeName: 'Fulfulde, Pulaar, Pular'},
    // {code: 'gl', name: 'Galician', nativeName: 'Galego'},
    // {code: 'ka', name: 'Georgian', nativeName: 'ქართული'},
    {code: 'de', name: 'Alemán', nativeName: 'Deutsch'},
    // {code: 'el', name: 'Greek, Modern', nativeName: 'Ελληνικά'},
    // {code: 'gn', name: 'Guaraní', nativeName: 'Avañeẽ'},
    // {code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી'},
    // {code: 'ht', name: 'Haitian; Haitian Creole', nativeName: 'Kreyòl ayisyen'},
    // {code: 'ha', name: 'Hausa', nativeName: 'Hausa, هَوُسَ'},
    // {code: 'he', name: 'Hebrew (modern)', nativeName: 'עברית'},
    // {code: 'hz', name: 'Herero', nativeName: 'Otjiherero'},
    // {code: 'hi', name: 'Hindi', nativeName: 'हिन्दी, हिंदी'},
    // {code: 'ho', name: 'Hiri Motu', nativeName: 'Hiri Motu'},
    // {code: 'hu', name: 'Hungarian', nativeName: 'Magyar'},
    // {code: 'ia', name: 'Interlingua', nativeName: 'Interlingua'},
    // {code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia'},
    // {code: 'ie', name: 'Interlingue', nativeName: 'Originally called Occidental; then Interlingue after WWII'},
    // {code: 'ga', name: 'Irish', nativeName: 'Gaeilge'},
    // {code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo'},
    // {code: 'ik', name: 'Inupiaq', nativeName: 'Iñupiaq, Iñupiatun'},
    // {code: 'io', name: 'Ido', nativeName: 'Ido'},
    // {code: 'is', name: 'Icelandic', nativeName: 'Íslenska'},
    {code: 'it', name: 'Italiano', nativeName: 'Italiano'},
    // {code: 'iu', name: 'Inuktitut', nativeName: 'ᐃᓄᒃᑎᑐᑦ'},
    {code: 'ja', name: 'Japonés', nativeName: '日本語'},
    // {code: 'jv', name: 'Javanese', nativeName: 'basa Jawa'},
    // {code: 'kl', name: 'Kalaallisut, Greenlandic', nativeName: 'kalaallisut, kalaallit oqaasii'},
    // {code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ'},
    // {code: 'kr', name: 'Kanuri', nativeName: 'Kanuri'},
    // {code: 'ks', name: 'Kashmiri', nativeName: 'कश्मीरी, كشميري‎'},
    // {code: 'kk', name: 'Kazakh', nativeName: 'Қазақ тілі'},
    // {code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ'},
    // {code: 'ki', name: 'Kikuyu, Gikuyu', nativeName: 'Gĩkũyũ'},
    // {code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda'},
    // {code: 'ky', name: 'Kirghiz, Kyrgyz', nativeName: 'кыргыз тили'},
    // {code: 'kv', name: 'Komi', nativeName: 'коми кыв'},
    // {code: 'kg', name: 'Kongo', nativeName: 'KiKongo'},
    // {code: 'ko', name: 'Korean', nativeName: '한국어 (韓國語), 조선말 (朝鮮語)'},
    // {code: 'ku', name: 'Kurdish', nativeName: 'Kurdî, كوردی‎'},
    // {code: 'kj', name: 'Kwanyama, Kuanyama', nativeName: 'Kuanyama'},
    // {code: 'la', name: 'Latin', nativeName: 'latine, lingua latina'},
    // {code: 'lb', name: 'Luxembourgish, Letzeburgesch', nativeName: 'Lëtzebuergesch'},
    // {code: 'lg', name: 'Luganda', nativeName: 'Luganda'},
    // {code: 'li', name: 'Limburgish, Limburgan, Limburger', nativeName: 'Limburgs'},
    // {code: 'ln', name: 'Lingala', nativeName: 'Lingála'},
    // {code: 'lo', name: 'Lao', nativeName: 'ພາສາລາວ'},
    // {code: 'lt', name: 'Lithuanian', nativeName: 'lietuvių kalba'},
    // {code: 'lu', name: 'Luba-Katanga', nativeName: ''},
    // {code: 'lv', name: 'Latvian', nativeName: 'latviešu valoda'},
    // {code: 'gv', name: 'Manx', nativeName: 'Gaelg, Gailck'},
    // {code: 'mk', name: 'Macedonian', nativeName: 'македонски јазик'},
    // {code: 'mg', name: 'Malagasy', nativeName: 'Malagasy fiteny'},
    // {code: 'ms', name: 'Malay', nativeName: 'bahasa Melayu, بهاس ملايو‎'},
    // {code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം'},
    // {code: 'mt', name: 'Maltese', nativeName: 'Malti'},
    // {code: 'mi', name: 'Māori', nativeName: 'te reo Māori'},
    // {code: 'mr', name: 'Marathi (Marāṭhī)', nativeName: 'मराठी'},
    // {code: 'mh', name: 'Marshallese', nativeName: 'Kajin M̧ajeļ'},
    // {code: 'mn', name: 'Mongolian', nativeName: 'монгол'},
    // {code: 'na', name: 'Nauru', nativeName: 'Ekakairũ Naoero'},
    // {code: 'nv', name: 'Navajo, Navaho', nativeName: 'Diné bizaad, Dinékʼehǰí'},
    // {code: 'nb', name: 'Norwegian Bokmål', nativeName: 'Norsk bokmål'},
    // {code: 'nd', name: 'North Ndebele', nativeName: 'isiNdebele'},
    // {code: 'ne', name: 'Nepali', nativeName: 'नेपाली'},
    // {code: 'ng', name: 'Ndonga', nativeName: 'Owambo'},
    // {code: 'nn', name: 'Norwegian Nynorsk', nativeName: 'Norsk nynorsk'},
    // {code: 'no', name: 'Norwegian', nativeName: 'Norsk'},
    // {code: 'ii', name: 'Nuosu', nativeName: 'ꆈꌠ꒿ Nuosuhxop'},
    // {code: 'nr', name: 'South Ndebele', nativeName: 'isiNdebele'},
    // {code: 'oc', name: 'Occitan', nativeName: 'Occitan'},
    // {code: 'oj', name: 'Ojibwe, Ojibwa', nativeName: 'ᐊᓂᔑᓈᐯᒧᐎᓐ'},
    // {
    //   code: 'cu',
    //   name: 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic',
    //   nativeName: 'ѩзыкъ словѣньскъ'
    // },
    // {code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo'},
    // {code: 'or', name: 'Oriya', nativeName: 'ଓଡ଼ିଆ'},
    // {code: 'os', name: 'Ossetian, Ossetic', nativeName: 'ирон æвзаг'},
    // {code: 'pa', name: 'Panjabi, Punjabi', nativeName: 'ਪੰਜਾਬੀ, پنجابی‎'},
    // {code: 'pi', name: 'Pāli', nativeName: 'पाऴि'},
    // {code: 'fa', name: 'Persian', nativeName: 'فارسی'},
    // {code: 'pl', name: 'Polish', nativeName: 'polski'},
    // {code: 'ps', name: 'Pashto, Pushto', nativeName: 'پښتو'},
    {code: 'pt', name: 'Portugués', nativeName: 'Português'},
    // {code: 'qu', name: 'Quechua', nativeName: 'Runa Simi, Kichwa'},
    // {code: 'rm', name: 'Romansh', nativeName: 'rumantsch grischun'},
    // {code: 'rn', name: 'Kirundi', nativeName: 'kiRundi'},
    // {code: 'ro', name: 'Romanian, Moldavian, Moldovan', nativeName: 'română'},
    {code: 'ru', name: 'Ruso', nativeName: 'русский язык'},
    // {code: 'sa', name: 'Sanskrit (Saṁskṛta)', nativeName: 'संस्कृतम्'},
    // {code: 'sc', name: 'Sardinian', nativeName: 'sardu'},
    // {code: 'sd', name: 'Sindhi', nativeName: 'सिन्धी, سنڌي، سندھی‎'},
    // {code: 'se', name: 'Northern Sami', nativeName: 'Davvisámegiella'},
    // {code: 'sm', name: 'Samoan', nativeName: 'gagana faa Samoa'},
    // {code: 'sg', name: 'Sango', nativeName: 'yângâ tî sängö'},
    // {code: 'sr', name: 'Serbian', nativeName: 'српски језик'},
    // {code: 'gd', name: 'Scottish Gaelic; Gaelic', nativeName: 'Gàidhlig'},
    // {code: 'sn', name: 'Shona', nativeName: 'chiShona'},
    // {code: 'si', name: 'Sinhala, Sinhalese', nativeName: 'සිංහල'},
    // {code: 'sk', name: 'Slovak', nativeName: 'slovenčina'},
    // {code: 'sl', name: 'Slovene', nativeName: 'slovenščina'},
    // {code: 'so', name: 'Somali', nativeName: 'Soomaaliga, af Soomaali'},
    // {code: 'st', name: 'Southern Sotho', nativeName: 'Sesotho'},
    {code: 'es', name: 'Español', nativeName: 'Español'},
    // {code: 'su', name: 'Sundanese', nativeName: 'Basa Sunda'},
    // {code: 'sw', name: 'Swahili', nativeName: 'Kiswahili'},
    // {code: 'ss', name: 'Swati', nativeName: 'SiSwati'},
    // {code: 'sv', name: 'Swedish', nativeName: 'svenska'},
    // {code: 'ta', name: 'Tamil', nativeName: 'தமிழ்'},
    // {code: 'te', name: 'Telugu', nativeName: 'తెలుగు'},
    // {code: 'tg', name: 'Tajik', nativeName: 'тоҷикӣ, toğikī, تاجیکی‎'},
    // {code: 'th', name: 'Thai', nativeName: 'ไทย'},
    // {code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ'},
    // {code: 'bo', name: 'Tibetan Standard, Tibetan, Central', nativeName: 'བོད་ཡིག'},
    // {code: 'tk', name: 'Turkmen', nativeName: 'Türkmen, Түркмен'},
    // {code: 'tl', name: 'Tagalog', nativeName: 'Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔'},
    // {code: 'tn', name: 'Tswana', nativeName: 'Setswana'},
    // {code: 'to', name: 'Tonga (Tonga Islands)', nativeName: 'faka Tonga'},
    {code: 'tr', name: 'Turco', nativeName: 'Türkçe'},
    // {code: 'ts', name: 'Tsonga', nativeName: 'Xitsonga'},
    // {code: 'tt', name: 'Tatar', nativeName: 'татарча, tatarça, تاتارچا‎'},
    // {code: 'tw', name: 'Twi', nativeName: 'Twi'},
    // {code: 'ty', name: 'Tahitian', nativeName: 'Reo Tahiti'},
    // {code: 'ug', name: 'Uighur, Uyghur', nativeName: 'Uyƣurqə, ئۇيغۇرچە‎'},
    {code: 'uk', name: 'Ukrainiano', nativeName: 'українська'},
    // {code: 'ur', name: 'Urdu', nativeName: 'اردو'},
    // {code: 'uz', name: 'Uzbek', nativeName: 'zbek, Ўзбек, أۇزبېك‎'},
    // {code: 've', name: 'Venda', nativeName: 'Tshivenḓa'},
    // {code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt'},
    // {code: 'vo', name: 'Volapük', nativeName: 'Volapük'},
    // {code: 'wa', name: 'Walloon', nativeName: 'Walon'},
    // {code: 'cy', name: 'Welsh', nativeName: 'Cymraeg'},
    // {code: 'wo', name: 'Wolof', nativeName: 'Wollof'},
    // {code: 'fy', name: 'Western Frisian', nativeName: 'Frysk'},
    // {code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa'},
    // {code: 'yi', name: 'Yiddish', nativeName: 'ייִדיש'},
    // {code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá'},
    // {code: 'za', name: 'Zhuang, Chuang', nativeName: 'Saɯ cueŋƅ, Saw cuengh'}
  ];
  public CURRENCIES = [
    // {'cc': 'AED', symbol: '\u062f.\u0625;', name: 'UAE dirham'},
    // {'cc': 'AFN', symbol: 'Afs', name: 'Afghan afghani'},
    // {'cc': 'ALL', symbol: 'L', name: 'Albanian lek'},
    // {'cc': 'AMD', symbol: 'AMD', name: 'Armenian dram'},
    // {'cc': 'ANG', symbol: 'NA\u0192', name: 'Netherlands Antillean gulden'},
    // {'cc': 'AOA', symbol: 'Kz', name: 'Angolan kwanza'},
    // {'cc': 'ARS', symbol: '$', name: 'Argentine peso'},
    // {'cc': 'AUD', symbol: '$', name: 'Australian dollar'},
    // {'cc': 'AWG', symbol: '\u0192', name: 'Aruban florin'},
    // {'cc': 'AZN', symbol: 'AZN', name: 'Azerbaijani manat'},
    // {'cc': 'BAM', symbol: 'KM', name: 'Bosnia and Herzegovina konvertibilna marka'},
    // {'cc': 'BBD', symbol: 'Bds$', name: 'Barbadian dollar'},
    // {'cc': 'BDT', symbol: '\u09f3', name: 'Bangladeshi taka'},
    // {'cc': 'BGN', symbol: 'BGN', name: 'Bulgarian lev'},
    // {'cc': 'BHD', symbol: '.\u062f.\u0628', name: 'Bahraini dinar'},
    // {'cc': 'BIF', symbol: 'FBu', name: 'Burundi franc'},
    // {'cc': 'BMD', symbol: 'BD$', name: 'Bermudian dollar'},
    // {'cc': 'BND', symbol: 'B$', name: 'Brunei dollar'},
    // {'cc': 'BOB', symbol: 'Bs.', name: 'Bolivian boliviano'},
    // {'cc': 'BRL', symbol: 'R$', name: 'Brazilian real'},
    // {'cc': 'BSD', symbol: 'B$', name: 'Bahamian dollar'},
    // {'cc': 'BTN', symbol: 'Nu.', name: 'Bhutanese ngultrum'},
    // {'cc': 'BWP', symbol: 'P', name: 'Botswana pula'},
    // {'cc': 'BYR', symbol: 'Br', name: 'Belarusian ruble'},
    // {'cc': 'BZD', symbol: 'BZ$', name: 'Belize dollar'},
    // {'cc': 'CAD', symbol: '$', name: 'Canadian dollar'},
    // {'cc': 'CDF', symbol: 'F', name: 'Congolese franc'},
    // {'cc': 'CHF', symbol: 'Fr.', name: 'Swiss franc'},
    // {'cc': 'CLP', symbol: '$', name: 'Chilean peso'},
    // {'cc': 'CNY', symbol: '\u00a5', name: 'Chinese/Yuan renminbi'},
    {'cc': 'COP', symbol: 'Col$', name: 'Peso Colombiano'},
    // {'cc': 'CRC', symbol: '\u20a1', name: 'Costa Rican colon'},
    // {'cc': 'CUC', symbol: '$', name: 'Cuban peso'},
    // {'cc': 'CVE', symbol: 'Esc', name: 'Cape Verdean escudo'},
    // {'cc': 'CZK', symbol: 'K\u010d', name: 'Czech koruna'},
    // {'cc': 'DJF', symbol: 'Fdj', name: 'Djiboutian franc'},
    // {'cc': 'DKK', symbol: 'Kr', name: 'Danish krone'},
    // {'cc': 'DOP', symbol: 'RD$', name: 'Dominican peso'},
    // {'cc': 'DZD', symbol: '\u062f.\u062c', name: 'Algerian dinar'},
    // {'cc': 'EEK', symbol: 'KR', name: 'Estonian kroon'},
    // {'cc': 'EGP', symbol: '\u00a3', name: 'Egyptian pound'},
    // {'cc': 'ERN', symbol: 'Nfa', name: 'Eritrean nakfa'},
    // {'cc': 'ETB', symbol: 'Br', name: 'Ethiopian birr'},
    {'cc': 'EUR', symbol: '\u20ac', name: 'Euro'},
    // {'cc': 'FJD', symbol: 'FJ$', name: 'Fijian dollar'},
    // {'cc': 'FKP', symbol: '\u00a3', name: 'Falkland Islands pound'},
    // {'cc': 'GBP', symbol: '\u00a3', name: 'British pound'},
    // {'cc': 'GEL', symbol: 'GEL', name: 'Georgian lari'},
    // {'cc': 'GHS', symbol: 'GH\u20b5', name: 'Ghanaian cedi'},
    // {'cc': 'GIP', symbol: '\u00a3', name: 'Gibraltar pound'},
    // {'cc': 'GMD', symbol: 'D', name: 'Gambian dalasi'},
    // {'cc': 'GNF', symbol: 'FG', name: 'Guinean franc'},
    // {'cc': 'GQE', symbol: 'CFA', name: 'Central African CFA franc'},
    // {'cc': 'GTQ', symbol: 'Q', name: 'Guatemalan quetzal'},
    // {'cc': 'GYD', symbol: 'GY$', name: 'Guyanese dollar'},
    // {'cc': 'HKD', symbol: 'HK$', name: 'Hong Kong dollar'},
    // {'cc': 'HNL', symbol: 'L', name: 'Honduran lempira'},
    // {'cc': 'HRK', symbol: 'kn', name: 'Croatian kuna'},
    // {'cc': 'HTG', symbol: 'G', name: 'Haitian gourde'},
    // {'cc': 'HUF', symbol: 'Ft', name: 'Hungarian forint'},
    // {'cc': 'IDR', symbol: 'Rp', name: 'Indonesian rupiah'},
    // {'cc': 'ILS', symbol: '\u20aa', name: 'Israeli new sheqel'},
    // {'cc': 'INR', symbol: '\u20B9', name: 'Indian rupee'},
    // {'cc': 'IQD', symbol: '\u062f.\u0639', name: 'Iraqi dinar'},
    // {'cc': 'IRR', symbol: 'IRR', name: 'Iranian rial'},
    // {'cc': 'ISK', symbol: 'kr', name: 'Icelandic kr\u00f3na'},
    // {'cc': 'JMD', symbol: 'J$', name: 'Jamaican dollar'},
    // {'cc': 'JOD', symbol: 'JOD', name: 'Jordanian dinar'},
    // {'cc': 'JPY', symbol: '\u00a5', name: 'Japanese yen'},
    // {'cc': 'KES', symbol: 'KSh', name: 'Kenyan shilling'},
    // {'cc': 'KGS', symbol: '\u0441\u043e\u043c', name: 'Kyrgyzstani som'},
    // {'cc': 'KHR', symbol: '\u17db', name: 'Cambodian riel'},
    // {'cc': 'KMF', symbol: 'KMF', name: 'Comorian franc'},
    // {'cc': 'KPW', symbol: 'W', name: 'North Korean won'},
    // {'cc': 'KRW', symbol: 'W', name: 'South Korean won'},
    // {'cc': 'KWD', symbol: 'KWD', name: 'Kuwaiti dinar'},
    // {'cc': 'KYD', symbol: 'KY$', name: 'Cayman Islands dollar'},
    // {'cc': 'KZT', symbol: 'T', name: 'Kazakhstani tenge'},
    // {'cc': 'LAK', symbol: 'KN', name: 'Lao kip'},
    // {'cc': 'LBP', symbol: '\u00a3', name: 'Lebanese lira'},
    // {'cc': 'LKR', symbol: 'Rs', name: 'Sri Lankan rupee'},
    // {'cc': 'LRD', symbol: 'L$', name: 'Liberian dollar'},
    // {'cc': 'LSL', symbol: 'M', name: 'Lesotho loti'},
    // {'cc': 'LTL', symbol: 'Lt', name: 'Lithuanian litas'},
    // {'cc': 'LVL', symbol: 'Ls', name: 'Latvian lats'},
    // {'cc': 'LYD', symbol: 'LD', name: 'Libyan dinar'},
    // {'cc': 'MAD', symbol: 'MAD', name: 'Moroccan dirham'},
    // {'cc': 'MDL', symbol: 'MDL', name: 'Moldovan leu'},
    // {'cc': 'MGA', symbol: 'FMG', name: 'Malagasy ariary'},
    // {'cc': 'MKD', symbol: 'MKD', name: 'Macedonian denar'},
    // {'cc': 'MMK', symbol: 'K', name: 'Myanma kyat'},
    // {'cc': 'MNT', symbol: '\u20ae', name: 'Mongolian tugrik'},
    // {'cc': 'MOP', symbol: 'P', name: 'Macanese pataca'},
    // {'cc': 'MRO', symbol: 'UM', name: 'Mauritanian ouguiya'},
    // {'cc': 'MUR', symbol: 'Rs', name: 'Mauritian rupee'},
    // {'cc': 'MVR', symbol: 'Rf', name: 'Maldivian rufiyaa'},
    // {'cc': 'MWK', symbol: 'MK', name: 'Malawian kwacha'},
    // {'cc': 'MXN', symbol: '$', name: 'Mexican peso'},
    // {'cc': 'MYR', symbol: 'RM', name: 'Malaysian ringgit'},
    // {'cc': 'MZM', symbol: 'MTn', name: 'Mozambican metical'},
    // {'cc': 'NAD', symbol: 'N$', name: 'Namibian dollar'},
    // {'cc': 'NGN', symbol: '\u20a6', name: 'Nigerian naira'},
    // {'cc': 'NIO', symbol: 'C$', name: 'Nicaraguan c\u00f3rdoba'},
    // {'cc': 'NOK', symbol: 'kr', name: 'Norwegian krone'},
    // {'cc': 'NPR', symbol: 'NRs', name: 'Nepalese rupee'},
    // {'cc': 'NZD', symbol: 'NZ$', name: 'New Zealand dollar'},
    // {'cc': 'OMR', symbol: 'OMR', name: 'Omani rial'},
    // {'cc': 'PAB', symbol: 'B./', name: 'Panamanian balboa'},
    // {'cc': 'PEN', symbol: 'S/.', name: 'Peruvian nuevo sol'},
    // {'cc': 'PGK', symbol: 'K', name: 'Papua New Guinean kina'},
    // {'cc': 'PHP', symbol: '\u20b1', name: 'Philippine peso'},
    // {'cc': 'PKR', symbol: 'Rs.', name: 'Pakistani rupee'},
    // {'cc': 'PLN', symbol: 'z\u0142', name: 'Polish zloty'},
    // {'cc': 'PYG', symbol: '\u20b2', name: 'Paraguayan guarani'},
    // {'cc': 'QAR', symbol: 'QR', name: 'Qatari riyal'},
    // {'cc': 'RON', symbol: 'L', name: 'Romanian leu'},
    // {'cc': 'RSD', symbol: 'din.', name: 'Serbian dinar'},
    // {'cc': 'RUB', symbol: 'R', name: 'Russian ruble'},
    // {'cc': 'SAR', symbol: 'SR', name: 'Saudi riyal'},
    // {'cc': 'SBD', symbol: 'SI$', name: 'Solomon Islands dollar'},
    // {'cc': 'SCR', symbol: 'SR', name: 'Seychellois rupee'},
    // {'cc': 'SDG', symbol: 'SDG', name: 'Sudanese pound'},
    // {'cc': 'SEK', symbol: 'kr', name: 'Swedish krona'},
    // {'cc': 'SGD', symbol: 'S$', name: 'Singapore dollar'},
    // {'cc': 'SHP', symbol: '\u00a3', name: 'Saint Helena pound'},
    // {'cc': 'SLL', symbol: 'Le', name: 'Sierra Leonean leone'},
    // {'cc': 'SOS', symbol: 'Sh.', name: 'Somali shilling'},
    // {'cc': 'SRD', symbol: '$', name: 'Surinamese dollar'},
    // {'cc': 'SYP', symbol: 'LS', name: 'Syrian pound'},
    // {'cc': 'SZL', symbol: 'E', name: 'Swazi lilangeni'},
    // {'cc': 'THB', symbol: '\u0e3f', name: 'Thai baht'},
    // {'cc': 'TJS', symbol: 'TJS', name: 'Tajikistani somoni'},
    // {'cc': 'TMT', symbol: 'm', name: 'Turkmen manat'},
    // {'cc': 'TND', symbol: 'DT', name: 'Tunisian dinar'},
    // {'cc': 'TRY', symbol: 'TRY', name: 'Turkish new lira'},
    // {'cc': 'TTD', symbol: 'TT$', name: 'Trinidad and Tobago dollar'},
    // {'cc': 'TWD', symbol: 'NT$', name: 'New Taiwan dollar'},
    // {'cc': 'TZS', symbol: 'TZS', name: 'Tanzanian shilling'},
    // {'cc': 'UAH', symbol: 'UAH', name: 'Ukrainian hryvnia'},
    // {'cc': 'UGX', symbol: 'USh', name: 'Ugandan shilling'},
    {'cc': 'USD', symbol: 'US$', name: 'Dólar estadounidense'},
    // {'cc': 'UYU', symbol: '$U', name: 'Uruguayan peso'},
    // {'cc': 'UZS', symbol: 'UZS', name: 'Uzbekistani som'},
    // {'cc': 'VEB', symbol: 'Bs', name: 'Venezuelan bolivar'},
    // {'cc': 'VND', symbol: '\u20ab', name: 'Vietnamese dong'},
    // {'cc': 'VUV', symbol: 'VT', name: 'Vanuatu vatu'},
    // {'cc': 'WST', symbol: 'WS$', name: 'Samoan tala'},
    // {'cc': 'XAF', symbol: 'CFA', name: 'Central African CFA franc'},
    // {'cc': 'XCD', symbol: 'EC$', name: 'East Caribbean dollar'},
    // {'cc': 'XDR', symbol: 'SDR', name: 'Special Drawing Rights'},
    // {'cc': 'XOF', symbol: 'CFA', name: 'West African CFA franc'},
    // {'cc': 'XPF', symbol: 'F', name: 'CFP franc'},
    // {'cc': 'YER', symbol: 'YER', name: 'Yemeni rial'},
    // {'cc': 'ZAR', symbol: 'R', name: 'South African rand'},
    // {'cc': 'ZMK', symbol: 'ZK', name: 'Zambian kwacha'},
    // {'cc': 'ZWR', symbol: 'Z$', name: 'Zimbabwean dollar'}
  ];
  public defaultSelectedLang: any = {};
  public getCasesEmitter = new EventEmitter();
  productSelected: any = {};
  whenChange = new EventEmitter();
  private supportedCodeLangs: any[];

  // todo: how to add a service to this ***** fucking provider?...
  constructor(
    private dbMain: DbMainService,
    private dbPublic: DBPublicService,
    private dbs: DbSelectorService,
    private _firebaseAuth: AngularFireAuth) {
  }

  private _multiLangStructure = {};

  get multiLangStructure(): {} {
    return this._multiLangStructure;
  }

  set multiLangStructure(value: {}) {
    this._multiLangStructure = value;
  }

  private _topBar: any = {faIcon: 'fa-puzzle-piece', typeProduct: 'Relojes', pageTittle: 'Piezas'};

  get topBar(): any {
    return this._topBar;
  }

  set topBar(value: any) {
    this._topBar = value;
  }

  private _collections: any;

  get collections(): any {
    return this._collections;
  }

  set collections(value: any) {
    this._collections = value;
  }

  // about Watches
  private _models = [];
  get models(): any[] {
    return this._models;
  }

  /*CLASE ENCARGADA DE TENER TODAS LAS VARIABLES IMPORTANTES SIEMPRE ACTUALIZADAS */
  private _bunckles = [];

  get bunckles(): any[] {
    return this._bunckles;
  }

  private _crowns = [];

  get crowns(): any[] {
    return this._crowns;
  }

  private _movements = [];

  get movements(): any[] {
    return this._movements;
  }

  private _caseBacks = [];

  get caseBacks(): any[] {
    return this._caseBacks;
  }

  private _cases: any[];

  get cases(): any[] {
    return this._cases;
  }

  private _crystals = [];

  get crystals(): any[] {
    return this._crystals;
  }

  private _straps = [];

  get straps(): any[] {
    return this._straps;
  }

  private _supportedLangs = [];

  get supportedLangs(): any[] {
    return this._supportedLangs;
  }

  private _supportedCurrs: any[];

  get supportedCurrs(): any[] {
    return this._supportedCurrs;
  }

  private _userData: any = {};

  get userData(): any {
    return this._userData;
  }

  set userData(value: any) {
    this._userData = value;
  }

  beforeInit() {
    this._supportedLangs = [
      {code: 'es', name: 'Español', nativeName: 'Español'},
      {code: 'en', name: 'Inglés', nativeName: 'English'}
    ];
    this.defaultSelectedLang = {code: 'es', name: 'Español', nativeName: 'Español'};
    // this.productSelected = SUPPORTED_LINES_PRODUCTS[0];
    // PROMESAS QUE SE RESOLVERAN ANTES DE INICIAR LA APLICACIÓN
    return new Promise((resolve) => {
      //   Promise.all([
      //     // this.initAutoAuth()
      //     // this.getLanguages(),
      //     // this.getCurrencies()
      //   ]).then(value => {
      //     // console.log('se traen todos los datos necesarios para iniciar.');
      //     // console.log('Ready');
      //     // todo: meter la lógica de carga de pestañas aquí :)
      resolve();
    });
    // });
  }

  initAutoAuth() {
    console.log('Loading auto auth...');
    // this.globalData.currentSelectedTab
    return new Promise(resolve => {
      console.log('initializing autoAuth');
      // todo: remplzar por this.dbs...
      this._firebaseAuth.authState.subscribe(
        (user) => {
          if (user) {
            console.log(user.uid);
            // console.log('auth suscription: actived');
            // todo: ¿Cómo hago para que mainDb vea a current?
            this.dbs.getUserData(user.uid).pipe(take(1)).subscribe(datosUsuario => {
              console.log(datosUsuario);
              if (datosUsuario) {
                console.log('user logged');
              } else {
                console.log('user not logged');
              }
              this.userData = datosUsuario[0];
              this.dbMain.currentUser = datosUsuario[0];
              // console.log('aquí está el error :D')
              resolve();
            });
          } else {
            resolve();
            this.userData = undefined;
            console.log('el usuario', undefined);
          }
        }
      );
    });
  }

  getSupportedLangStructure() {
    const l = {};
    // this.supportedCodeLangs.forEach(value => {
    //   l[value] = {};
    // });
    // return l;
    return {es: {}};
  }

  private getModelos() {
    return new Promise(resolve => {
      this.dbMain.getItems(PRODUCT_TYPES.WATCH, CATEGORIES.STRUCTURE, 'models').subscribe(value => {
        this._models = value;
        resolve();
      });
    });
  }

  // private getLanguages() {
  //   return new Promise(resolve => {
  //     this.dbMain.getItems('settings', 'dashboard', 'supportedLanguagesData').subscribe(langs => {
  //       this._supportedLangs = langs;
  //       if (this._supportedLangs[0]) {
  //         let esLang = {};
  //         for (let i = 0; i < this._supportedLangs.length; i++) {
  //           if (this._supportedLangs[i].code === DEFAULT_CODE_LANG) {
  //             esLang = this._supportedLangs[i];
  //             this._supportedLangs.splice(i, 1);
  //             break;
  //           }
  //         }
  //         this.supportedCodeLangs = [];
  //         this._supportedLangs.unshift(esLang);
  //         this._supportedLangs.forEach(value1 => {
  //           this.LANGS = this.LANGS.filter(function (obj) {
  //             return obj.code !== value1.code;
  //           });
  //           this._multiLangStructure[value1.code] = {};
  //           this.supportedCodeLangs.push(value1.code);
  //         });
  //       }
  //       // console.log('codelags:', this.supportedCodeLangs);
  //       this.defaultSelectedLang = this._supportedLangs.filter(value1 => value1.code === DEFAULT_CODE_LANG)[0];
  //       resolve();
  //     });
  //   });
  // }
  // private getCurrencies() {
  //   return new Promise(resolve => {
  //     this.dbPublic.getSupportedCurrencies().subscribe(value => {
  //       this._supportedCurrs = value;
  //
  //       if (this._supportedCurrs[0]) {
  //         let defCur = {};
  //         for (let i = 0; i < this._supportedCurrs.length; i++) {
  //           if (this._supportedCurrs[i].symbol === DEFAULT_SYMBOL_CURRENCY) {
  //             defCur = this._supportedCurrs[i];
  //             this._supportedCurrs.splice(i, 1);
  //             break;
  //           }
  //         }
  //         this._supportedCurrs.unshift(defCur);
  //         this._supportedCurrs.forEach(value1 => {
  //           this.CURRENCIES = this.CURRENCIES.filter(function (obj) {
  //             return obj.symbol !== value1.symbol;
  //           });
  //         });
  //       }
  //
  //
  //       resolve();
  //     });
  //   });
  // }

  private getBunckles() {
    return new Promise(resolve => {
      this.dbMain.getItems(PRODUCT_TYPES.WATCH, CATEGORIES.STRUCTURE, 'bunckles').subscribe(value => {
        this._bunckles = value;
        resolve();
      });
    });
  }

  private getCrowns() {
    return new Promise(resolve => {
      this.dbMain.getItems(PRODUCT_TYPES.WATCH, CATEGORIES.STRUCTURE, 'crowns').subscribe(value => {
        this._crowns = value;
        resolve();

      });
    });
  }

  private getMovements() {
    return new Promise(resolve => {
      this.dbMain.getItems(PRODUCT_TYPES.WATCH, CATEGORIES.STRUCTURE, 'movements').subscribe(value => {
        this._movements = value;
        resolve();
      });
    });
  }

  private getCaseBacks() {
    return new Promise(resolve => {
      this.dbMain.getItems(PRODUCT_TYPES.WATCH, CATEGORIES.STRUCTURE, 'casebacks').subscribe(value => {
        this._caseBacks = value;
        resolve();
      });
    });
  }

  private getCases() {
    return new Promise(resolve => {
      this.dbMain.getItems(PRODUCT_TYPES.WATCH, CATEGORIES.STRUCTURE, 'cases').subscribe(value => {
        this._cases = value;
        this.getCasesEmitter.emit(value);
        resolve();
      });
    });
  }

  private getCrystals() {
    return new Promise(resolve => {
      this.dbMain.getItems(PRODUCT_TYPES.WATCH, CATEGORIES.STRUCTURE, 'crystals').subscribe(value => {
        this._crystals = value;
        resolve();
      });
    });
  }

  private getStraps() {
    return new Promise(resolve => {
      return this.dbMain.getItems(PRODUCT_TYPES.WATCH, CATEGORIES.STRUCTURE, 'straps').subscribe(value => {
        this._straps = value;
        resolve();
      });
    });
  }

  private getCollections() {
    return new Promise(resolve => {
      this.dbMain.getItems(PRODUCT_TYPES.WATCH, CATEGORIES.STRUCTURE, 'collections').subscribe(value => {
        this._collections = value;
        resolve();
      });
    });
  }
}
