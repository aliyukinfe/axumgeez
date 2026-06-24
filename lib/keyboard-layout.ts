export type LayoutCell = {
  fidel: string;
  latin: string;
};

export type LayoutFamily = {
  name: string;
  cells: LayoutCell[];
};

export const layoutFamilies: LayoutFamily[] = [
  { name: "ሀ", cells: [["ሀ", "h"], ["ሁ", "hu"], ["ሂ", "hi"], ["ሃ", "ha"], ["ሄ", "he"], ["ህ", "hh"], ["ሆ", "ho"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ለ", cells: [["ለ", "l"], ["ሉ", "lu"], ["ሊ", "li"], ["ላ", "la"], ["ሌ", "le"], ["ል", "ll"], ["ሎ", "lo"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ሐ", cells: [["ሐ", "H"], ["ሑ", "Hu"], ["ሒ", "Hi"], ["ሓ", "Ha"], ["ሔ", "He"], ["ሕ", "HH"], ["ሖ", "Ho"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "መ", cells: [["መ", "m"], ["ሙ", "mu"], ["ሚ", "mi"], ["ማ", "ma"], ["ሜ", "me"], ["ም", "mm"], ["ሞ", "mo"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ሠ", cells: [["ሠ", "S"], ["ሡ", "Su"], ["ሢ", "Si"], ["ሣ", "Sa"], ["ሤ", "Se"], ["ሥ", "SS"], ["ሦ", "So"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ረ", cells: [["ረ", "r"], ["ሩ", "ru"], ["ሪ", "ri"], ["ራ", "ra"], ["ሬ", "re"], ["ር", "rr"], ["ሮ", "ro"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ሰ", cells: [["ሰ", "s"], ["ሱ", "su"], ["ሲ", "si"], ["ሳ", "sa"], ["ሴ", "se"], ["ስ", "ss"], ["ሶ", "so"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ሸ", cells: [["ሸ", "sh"], ["ሹ", "shu"], ["ሺ", "shi"], ["ሻ", "sha"], ["ሼ", "she"], ["ሽ", "shh"], ["ሾ", "sho"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ቀ", cells: [["ቀ", "q"], ["ቁ", "qu"], ["ቂ", "qi"], ["ቃ", "qa"], ["ቄ", "qe"], ["ቅ", "qq"], ["ቆ", "qo"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "በ", cells: [["በ", "b"], ["ቡ", "bu"], ["ቢ", "bi"], ["ባ", "ba"], ["ቤ", "be"], ["ብ", "bb"], ["ቦ", "bo"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ተ", cells: [["ተ", "t"], ["ቱ", "tu"], ["ቲ", "ti"], ["ታ", "ta"], ["ቴ", "te"], ["ት", "tt"], ["ቶ", "to"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ቸ", cells: [["ቸ", "ch"], ["ቹ", "chu"], ["ቺ", "chi"], ["ቻ", "cha"], ["ቼ", "che"], ["ች", "chh"], ["ቾ", "cho"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ኀ", cells: [["ኀ", "x"], ["ኁ", "xu"], ["ኂ", "xi"], ["ኃ", "xa"], ["ኄ", "xe"], ["ኅ", "xx"], ["ኆ", "xo"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ነ", cells: [["ነ", "n"], ["ኑ", "nu"], ["ኒ", "ni"], ["ና", "na"], ["ኔ", "ne"], ["ን", "nn"], ["ኖ", "no"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ኘ", cells: [["ኘ", "ny"], ["ኙ", "nyu"], ["ኚ", "nyi"], ["ኛ", "nya"], ["ኜ", "nye"], ["ኝ", "nyy / gn"], ["ኞ", "nyo"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "አ", cells: [["አ", "a"], ["ኡ", "u"], ["ኢ", "i"], ["ኣ", "aa"], ["ኤ", "e"], ["እ", "ee"], ["ኦ", "o"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ከ", cells: [["ከ", "k"], ["ኩ", "ku"], ["ኪ", "ki"], ["ካ", "ka"], ["ኬ", "ke"], ["ክ", "kk"], ["ኮ", "ko"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ኸ", cells: [["ኸ", "kh"], ["ኹ", "khu"], ["ኺ", "khi"], ["ኻ", "kha"], ["ኼ", "khe"], ["ኽ", "khh"], ["ኾ", "kho"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ወ", cells: [["ወ", "w"], ["ዉ", "wu"], ["ዊ", "wi"], ["ዋ", "wa"], ["ዌ", "we"], ["ው", "ww"], ["ዎ", "wo"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ዐ", cells: [["ዐ", "A"], ["ዑ", "Au"], ["ዒ", "Ai"], ["ዓ", "Aa"], ["ዔ", "Ae"], ["ዕ", "AE"], ["ዖ", "Ao"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ዘ", cells: [["ዘ", "z"], ["ዙ", "zu"], ["ዚ", "zi"], ["ዛ", "za"], ["ዜ", "ze"], ["ዝ", "zz"], ["ዞ", "zo"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ዠ", cells: [["ዠ", "zh"], ["ዡ", "zhu"], ["ዢ", "zhi"], ["ዣ", "zha"], ["ዤ", "zhe"], ["ዥ", "zhh"], ["ዦ", "zho"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "የ", cells: [["የ", "y"], ["ዩ", "yu"], ["ዪ", "yi"], ["ያ", "ya"], ["ዬ", "ye"], ["ይ", "yy"], ["ዮ", "yo"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ደ", cells: [["ደ", "d"], ["ዱ", "du"], ["ዲ", "di"], ["ዳ", "da"], ["ዴ", "de"], ["ድ", "dd"], ["ዶ", "do"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ጀ", cells: [["ጀ", "j"], ["ጁ", "ju"], ["ጂ", "ji"], ["ጃ", "ja"], ["ጄ", "je"], ["ጅ", "jj"], ["ጆ", "jo"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ገ", cells: [["ገ", "g"], ["ጉ", "gu"], ["ጊ", "gi"], ["ጋ", "ga"], ["ጌ", "ge"], ["ግ", "gg"], ["ጎ", "go"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ጠ", cells: [["ጠ", "T"], ["ጡ", "Tu"], ["ጢ", "Ti"], ["ጣ", "Ta"], ["ጤ", "Te"], ["ጥ", "TT"], ["ጦ", "To"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ጨ", cells: [["ጨ", "C"], ["ጩ", "Cu"], ["ጪ", "Ci"], ["ጫ", "Ca"], ["ጬ", "Ce"], ["ጭ", "CC"], ["ጮ", "Co"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ጰ", cells: [["ጰ", "P"], ["ጱ", "Pu"], ["ጲ", "Pi"], ["ጳ", "Pa"], ["ጴ", "Pe"], ["ጵ", "PP"], ["ጶ", "Po"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ጸ", cells: [["ጸ", "ts"], ["ጹ", "tsu"], ["ጺ", "tsi"], ["ጻ", "tsa"], ["ጼ", "tse"], ["ጽ", "tss"], ["ጾ", "tso"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ፀ", cells: [["ፀ", "Ts"], ["ፁ", "Tsu"], ["ፂ", "Tsi"], ["ፃ", "Tsa"], ["ፄ", "Tse"], ["ፅ", "Tss"], ["ፆ", "Tso"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ፈ", cells: [["ፈ", "f"], ["ፉ", "fu"], ["ፊ", "fi"], ["ፋ", "fa"], ["ፌ", "fe"], ["ፍ", "ff"], ["ፎ", "fo"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ፐ", cells: [["ፐ", "p"], ["ፑ", "pu"], ["ፒ", "pi"], ["ፓ", "pa"], ["ፔ", "pe"], ["ፕ", "pp"], ["ፖ", "po"]].map(([fidel, latin]) => ({ fidel, latin })) }
];

export const labializedFamilies: LayoutFamily[] = [
  { name: "ቈ", cells: [["ቈ", "qwa"], ["ቊ", "qwi"], ["ቋ", "qwaa"], ["ቌ", "qwe"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ኰ", cells: [["ኰ", "kwa"], ["ኲ", "kwi"], ["ኳ", "kwaa"], ["ኴ", "kwe"]].map(([fidel, latin]) => ({ fidel, latin })) },
  { name: "ጐ", cells: [["ጐ", "gwa"], ["ጒ", "gwi"], ["ጓ", "gwaa"], ["ጔ", "gwe"]].map(([fidel, latin]) => ({ fidel, latin })) }
];

export const numberRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
