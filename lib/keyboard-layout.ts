export type KeyboardRow = {
  category: "Main Fidels" | "Extended Fidels" | "Ge'ez Punctuation" | "Ge'ez Numbers";
  fidel: string;
  latin: string;
  family?: string;
};

const toRows = (category: KeyboardRow["category"], rows: Array<[string, string]>, family?: string): KeyboardRow[] =>
  rows.map(([fidel, latin]) => ({ category, fidel, latin, family }));

export const mainFidelRows: KeyboardRow[] = [
  ...toRows("Main Fidels", [["ሀ", "h"], ["ሁ", "hu"], ["ሂ", "hi"], ["ሃ", "ha"], ["ሄ", "he"], ["ህ", "hh"], ["ሆ", "ho"]], "ሀ"),
  ...toRows("Main Fidels", [["ለ", "l"], ["ሉ", "lu"], ["ሊ", "li"], ["ላ", "la"], ["ሌ", "le"], ["ል", "ll"], ["ሎ", "lo"]], "ለ"),
  ...toRows("Main Fidels", [["ሐ", "H"], ["ሑ", "Hu"], ["ሒ", "Hi"], ["ሓ", "Ha"], ["ሔ", "He"], ["ሕ", "HH"], ["ሖ", "Ho"]], "ሐ"),
  ...toRows("Main Fidels", [["መ", "m"], ["ሙ", "mu"], ["ሚ", "mi"], ["ማ", "ma"], ["ሜ", "me"], ["ም", "mm"], ["ሞ", "mo"]], "መ"),
  ...toRows("Main Fidels", [["ሠ", "S"], ["ሡ", "Su"], ["ሢ", "Si"], ["ሣ", "Sa"], ["ሤ", "Se"], ["ሥ", "SS"], ["ሦ", "So"]], "ሠ"),
  ...toRows("Main Fidels", [["ረ", "r"], ["ሩ", "ru"], ["ሪ", "ri"], ["ራ", "ra"], ["ሬ", "re"], ["ር", "rr"], ["ሮ", "ro"]], "ረ"),
  ...toRows("Main Fidels", [["ሰ", "s"], ["ሱ", "su"], ["ሲ", "si"], ["ሳ", "sa"], ["ሴ", "se"], ["ስ", "ss"], ["ሶ", "so"]], "ሰ"),
  ...toRows("Main Fidels", [["ሸ", "sh"], ["ሹ", "shu"], ["ሺ", "shi"], ["ሻ", "sha"], ["ሼ", "she"], ["ሽ", "shh"], ["ሾ", "sho"]], "ሸ"),
  ...toRows("Main Fidels", [["ቀ", "q"], ["ቁ", "qu"], ["ቂ", "qi"], ["ቃ", "qa"], ["ቄ", "qe"], ["ቅ", "qq"], ["ቆ", "qo"]], "ቀ"),
  ...toRows("Main Fidels", [["በ", "b"], ["ቡ", "bu"], ["ቢ", "bi"], ["ባ", "ba"], ["ቤ", "be"], ["ብ", "bb"], ["ቦ", "bo"]], "በ"),
  ...toRows("Main Fidels", [["ተ", "t"], ["ቱ", "tu"], ["ቲ", "ti"], ["ታ", "ta"], ["ቴ", "te"], ["ት", "tt"], ["ቶ", "to"]], "ተ"),
  ...toRows("Main Fidels", [["ቸ", "ch"], ["ቹ", "chu"], ["ቺ", "chi"], ["ቻ", "cha"], ["ቼ", "che"], ["ች", "chh"], ["ቾ", "cho"]], "ቸ"),
  ...toRows("Main Fidels", [["ኀ", "x"], ["ኁ", "xu"], ["ኂ", "xi"], ["ኃ", "xa"], ["ኄ", "xe"], ["ኅ", "xx"], ["ኆ", "xo"]], "ኀ"),
  ...toRows("Main Fidels", [["ነ", "n"], ["ኑ", "nu"], ["ኒ", "ni"], ["ና", "na"], ["ኔ", "ne"], ["ን", "nn"], ["ኖ", "no"]], "ነ"),
  ...toRows("Main Fidels", [["ኘ", "gn"], ["ኙ", "gnu"], ["ኚ", "gni"], ["ኛ", "gna"], ["ኜ", "gne"], ["ኝ", "gnn"], ["ኞ", "gno"]], "ኘ"),
  ...toRows("Main Fidels", [["አ", "a"], ["ኡ", "u"], ["ኢ", "i"], ["ኣ", "aa"], ["ኤ", "e"], ["እ", "ee"], ["ኦ", "o"]], "አ"),
  ...toRows("Main Fidels", [["ከ", "k"], ["ኩ", "ku"], ["ኪ", "ki"], ["ካ", "ka"], ["ኬ", "ke"], ["ክ", "kk"], ["ኮ", "ko"]], "ከ"),
  ...toRows("Main Fidels", [["ኸ", "kh"], ["ኹ", "khu"], ["ኺ", "khi"], ["ኻ", "kha"], ["ኼ", "khe"], ["ኽ", "khh"], ["ኾ", "kho"]], "ኸ"),
  ...toRows("Main Fidels", [["ወ", "w"], ["ዉ", "wu"], ["ዊ", "wi"], ["ዋ", "wa"], ["ዌ", "we"], ["ው", "ww"], ["ዎ", "wo"]], "ወ"),
  ...toRows("Main Fidels", [["ዐ", "A"], ["ዑ", "Au"], ["ዒ", "Ai"], ["ዓ", "Aa"], ["ዔ", "Ae"], ["ዕ", "AE"], ["ዖ", "Ao"]], "ዐ"),
  ...toRows("Main Fidels", [["ዘ", "z"], ["ዙ", "zu"], ["ዚ", "zi"], ["ዛ", "za"], ["ዜ", "ze"], ["ዝ", "zz"], ["ዞ", "zo"]], "ዘ"),
  ...toRows("Main Fidels", [["ዠ", "zh"], ["ዡ", "zhu"], ["ዢ", "zhi"], ["ዣ", "zha"], ["ዤ", "zhe"], ["ዥ", "zhh"], ["ዦ", "zho"]], "ዠ"),
  ...toRows("Main Fidels", [["የ", "y"], ["ዩ", "yu"], ["ዪ", "yi"], ["ያ", "ya"], ["ዬ", "ye"], ["ይ", "yy"], ["ዮ", "yo"]], "የ"),
  ...toRows("Main Fidels", [["ደ", "d"], ["ዱ", "du"], ["ዲ", "di"], ["ዳ", "da"], ["ዴ", "de"], ["ድ", "dd"], ["ዶ", "do"]], "ደ"),
  ...toRows("Main Fidels", [["ጀ", "j"], ["ጁ", "ju"], ["ጂ", "ji"], ["ጃ", "ja"], ["ጄ", "je"], ["ጅ", "jj"], ["ጆ", "jo"]], "ጀ"),
  ...toRows("Main Fidels", [["ገ", "g"], ["ጉ", "gu"], ["ጊ", "gi"], ["ጋ", "ga"], ["ጌ", "ge"], ["ግ", "gg"], ["ጎ", "go"]], "ገ"),
  ...toRows("Main Fidels", [["ጠ", "T"], ["ጡ", "Tu"], ["ጢ", "Ti"], ["ጣ", "Ta"], ["ጤ", "Te"], ["ጥ", "TT"], ["ጦ", "To"]], "ጠ"),
  ...toRows("Main Fidels", [["ጨ", "C"], ["ጩ", "Cu"], ["ጪ", "Ci"], ["ጫ", "Ca"], ["ጬ", "Ce"], ["ጭ", "CC"], ["ጮ", "Co"]], "ጨ"),
  ...toRows("Main Fidels", [["ጰ", "P"], ["ጱ", "Pu"], ["ጲ", "Pi"], ["ጳ", "Pa"], ["ጴ", "Pe"], ["ጵ", "PP"], ["ጶ", "Po"]], "ጰ"),
  ...toRows("Main Fidels", [["ጸ", "ts"], ["ጹ", "tsu"], ["ጺ", "tsi"], ["ጻ", "tsa"], ["ጼ", "tse"], ["ጽ", "tss"], ["ጾ", "tso"]], "ጸ"),
  ...toRows("Main Fidels", [["ፀ", "Ts"], ["ፁ", "Tsu"], ["ፂ", "Tsi"], ["ፃ", "Tsa"], ["ፄ", "Tse"], ["ፅ", "Tss"], ["ፆ", "Tso"]], "ፀ"),
  ...toRows("Main Fidels", [["ፈ", "f"], ["ፉ", "fu"], ["ፊ", "fi"], ["ፋ", "fa"], ["ፌ", "fe"], ["ፍ", "ff"], ["ፎ", "fo"]], "ፈ"),
  ...toRows("Main Fidels", [["ፐ", "p"], ["ፑ", "pu"], ["ፒ", "pi"], ["ፓ", "pa"], ["ፔ", "pe"], ["ፕ", "pp"], ["ፖ", "po"]], "ፐ")
];

export const extendedFidelRows: KeyboardRow[] = [
  ...toRows("Extended Fidels", [["ቈ", "qwa"], ["ቊ", "qwi"], ["ቋ", "qwaa"], ["ቌ", "qwe"]], "ቈ"),
  ...toRows("Extended Fidels", [["ኰ", "kwa"], ["ኲ", "kwi"], ["ኳ", "kwaa"], ["ኴ", "kwe"]], "ኰ"),
  ...toRows("Extended Fidels", [["ጐ", "gwa"], ["ጒ", "gwi"], ["ጓ", "gwaa"], ["ጔ", "gwe"]], "ጐ")
];

export const punctuationRows: KeyboardRow[] = toRows("Ge'ez Punctuation", [
  ["።", "."],
  ["፣", ","],
  ["፤", ";"],
  ["፥", ":"]
]);

export const geezNumberRows: KeyboardRow[] = toRows("Ge'ez Numbers", [
  ["፩", "g1"],
  ["፪", "g2"],
  ["፫", "g3"],
  ["፬", "g4"],
  ["፭", "g5"],
  ["፮", "g6"],
  ["፯", "g7"],
  ["፰", "g8"],
  ["፱", "g9"],
  ["፲", "g10"],
  ["፳", "g20"],
  ["፴", "g30"],
  ["፵", "g40"],
  ["፶", "g50"],
  ["፷", "g60"],
  ["፸", "g70"],
  ["፹", "g80"],
  ["፺", "g90"],
  ["፻", "g100"],
  ["፼", "g10000"]
]);

export const keyboardRows: KeyboardRow[] = [
  ...mainFidelRows,
  ...extendedFidelRows,
  ...punctuationRows,
  ...geezNumberRows
];
