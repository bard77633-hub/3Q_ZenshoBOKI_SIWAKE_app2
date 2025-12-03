
/**
 * Zensho Bookkeeping Grade 3 Practice App
 * Logic Controller - V5 (With Explanation Mode)
 */

// --- Genre Configuration ---
// Defines the hierarchy for the menu
const GENRE_STRUCTURE = [
  {
    id: 'cash_savings',
    title: '💰 現金・預金',
    subs: [
      { id: 'cash', title: '現金' },
      { id: 'checking', title: '当座預金・当座借越' },
      { id: 'petty_cash', title: '小口現金' },
      { id: 'over_short', title: '現金過不足' }
    ]
  },
  {
    id: 'merchandise',
    title: '📦 商品売買',
    subs: [
      { id: 'purchase_sales', title: '仕入・売上 (掛・返品)' },
      { id: 'credit_gift', title: 'クレジット・商品券' },
      { id: 'advance', title: '前受金・前払金' },
      { id: 'shipping', title: '諸掛り (発送費など)' }
    ]
  },
  {
    id: 'notes',
    title: '💴 手形・貸借',
    subs: [
      { id: 'promissory', title: '約束手形' },
      { id: 'loan', title: '貸付金・借入金' }
    ]
  },
  {
    id: 'assets_expenses',
    title: '🏢 固定資産・経費',
    subs: [
      { id: 'fixed_assets', title: '固定資産・未払金' },
      { id: 'expenses_taxes', title: '経費・税金' }
    ]
  },
  {
    id: 'closing',
    title: '📊 決算整理',
    subs: [
      { id: 'bad_debts', title: '貸倒引当金' },
      { id: 'depreciation', title: '減価償却' },
      { id: 'accruals', title: '見越・繰延・消耗品' }
    ]
  }
];

// --- Data: Questions (Categorized) ---
// Expanded to ensure ~3-5 questions per sub-category for variety
// Added 'explanationSteps' for interactive mode to select items
const QUESTIONS = [
  // --- Cash & Savings ---
  // Sub: Cash
  {
    id: '101', major: 'cash_savings', sub: 'cash',
    text: "現金 2,500,000円 を元入れして営業を開始した。",
    correctEntries: { debit: [{ accountName: "現金", amount: 2500000 }], credit: [{ accountName: "資本金", amount: 2500000 }] },
    choices: ["現金", "資本金", "借入金", "当座預金", "備品"],
    explanation: "【開業】元手は「資本金」として処理します。",
    explanationSteps: [
      {
        highlight: "現金 2,500,000円",
        entries: [{ side: 'debit', account: '現金', amount: 2500000 }],
        comment: "お店の「現金」（資産）が増加しました。資産の増加は借方（左）です。"
      },
      {
        highlight: "元入れして営業を開始",
        entries: [{ side: 'credit', account: '資本金', amount: 2500000 }],
        comment: "事業の元手は「資本金」（純資産）の増加として、貸方（右）に記入します。"
      }
    ]
  },
  {
    id: '102', major: 'cash_savings', sub: 'cash',
    text: "店主が私用で現金 30,000円 を引き出した。",
    correctEntries: { debit: [{ accountName: "引出金", amount: 30000 }], credit: [{ accountName: "現金", amount: 30000 }] },
    choices: ["引出金", "現金", "資本金", "給料", "雑費"],
    explanation: "【引出金】店主の私用は資本金の減少または「引出金」勘定で処理します。",
    explanationSteps: [
      {
        highlight: "現金 30,000円 を引き出した",
        entries: [{ side: 'credit', account: '現金', amount: 30000 }],
        comment: "お店から「現金」（資産）が出ていきました。資産の減少は貸方（右）です。"
      },
      {
        highlight: "店主が私用で",
        entries: [{ side: 'debit', account: '引出金', amount: 30000 }],
        comment: "店主の個人的な使用は「引出金」（資本の控除項目）として借方（左）に記入します。"
      }
    ]
  },
  {
    id: '103', major: 'cash_savings', sub: 'cash',
    text: "郵便局で切手 1,000円 を現金で購入した。",
    correctEntries: { debit: [{ accountName: "通信費", amount: 1000 }], credit: [{ accountName: "現金", amount: 1000 }] },
    choices: ["通信費", "現金", "消耗品費", "租税公課", "雑費"],
    explanation: "切手は「通信費」で処理します。"
  },
  // Sub: Checking
  {
    id: '111', major: 'cash_savings', sub: 'checking',
    text: "銀行と当座取引契約を結び、現金 1,000,000円 を預け入れた。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 1000000 }], credit: [{ accountName: "現金", amount: 1000000 }] },
    choices: ["当座預金", "現金", "普通預金", "借入金", "資本金"],
    explanation: "当座預金口座への預け入れの仕訳です。",
    explanationSteps: [
      {
        highlight: "現金 1,000,000円 を預け入れた",
        entries: [{ side: 'credit', account: '現金', amount: 1000000 }],
        comment: "手元の「現金」（資産）が減少したので、貸方（右）に記入します。"
      },
      {
        highlight: "当座取引契約を結び",
        entries: [{ side: 'debit', account: '当座預金', amount: 1000000 }],
        comment: "代わりに「当座預金」（資産）が増加したので、借方（左）に記入します。"
      }
    ]
  },
  {
    id: '112', major: 'cash_savings', sub: 'checking',
    text: "買掛金 150,000円 を支払うため、小切手を振り出した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 150000 }], credit: [{ accountName: "当座預金", amount: 150000 }] },
    choices: ["買掛金", "当座預金", "現金", "支払手形", "未払金"],
    explanation: "小切手の振出は「当座預金」の減少です。",
    explanationSteps: [
      {
        highlight: "買掛金 150,000円 を支払う",
        entries: [{ side: 'debit', account: '買掛金', amount: 150000 }],
        comment: "負債である「買掛金」が支払によって減少するため、借方（左）に記入します。"
      },
      {
        highlight: "小切手を振り出した",
        entries: [{ side: 'credit', account: '当座預金', amount: 150000 }],
        comment: "小切手の振出は「当座預金」（資産）の減少となるため、貸方（右）に記入します。"
      }
    ]
  },
  {
    id: '113', major: 'cash_savings', sub: 'checking',
    text: "買掛金 200,000円 の支払いに対し、当座預金残高が 150,000円 しかなかったが、借越契約があるため小切手を振り出した。（一勘定法）",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 200000 }], credit: [{ accountName: "当座", amount: 200000 }] },
    choices: ["当座", "当座預金", "当座借越", "買掛金", "現金"],
    explanation: "【一勘定法】当座預金と当座借越をまとめて「当座」勘定で処理します。"
  },
  // Sub: Petty Cash
  {
    id: '121', major: 'cash_savings', sub: 'petty_cash',
    text: "小口現金係に、小切手 50,000円 を振り出して手渡した。",
    correctEntries: { debit: [{ accountName: "小口現金", amount: 50000 }], credit: [{ accountName: "当座預金", amount: 50000 }] },
    choices: ["小口現金", "当座預金", "現金", "雑費", "通信費"],
    explanation: "定額資金前渡法（インプレスト・システム）による資金の補給です。"
  },
  {
    id: '122', major: 'cash_savings', sub: 'petty_cash',
    text: "小口現金係から、通信費 5,000円 と 消耗品費 3,000円 の支払報告を受けた。",
    correctEntries: { debit: [{ accountName: "通信費", amount: 5000 }, { accountName: "消耗品費", amount: 3000 }], credit: [{ accountName: "小口現金", amount: 8000 }] },
    choices: ["通信費", "消耗品費", "小口現金", "雑費", "未払金"],
    explanation: "報告を受けた時点で、費用の計上と小口現金の減少を記録します。"
  },
  // Sub: Over/Short
  {
    id: '131', major: 'cash_savings', sub: 'over_short',
    text: "現金の実際有高を調べたところ 58,000円 であり、帳簿残高 60,000円 と一致しなかった。",
    correctEntries: { debit: [{ accountName: "現金過不足", amount: 2000 }], credit: [{ accountName: "現金", amount: 2000 }] },
    choices: ["現金過不足", "現金", "雑損", "雑益", "引出金"],
    explanation: "実際有高が少ないため、帳簿の現金を減らして一致させます。相手科目は「現金過不足」です。"
  },
  {
    id: '132', major: 'cash_savings', sub: 'over_short',
    text: "現金過不足 1,000円（貸方残高）の原因が、受取利息の記入漏れと判明した。",
    correctEntries: { debit: [{ accountName: "現金過不足", amount: 1000 }], credit: [{ accountName: "受取利息", amount: 1000 }] },
    choices: ["現金過不足", "受取利息", "現金", "雑益", "雑損"],
    explanation: "貸方残高（現金過剰）の原因が判明したので、現金過不足を取り消して正しい科目に振り替えます。"
  },

  // --- Merchandise ---
  // Sub: Purchase/Sales
  {
    id: '201', major: 'merchandise', sub: 'purchase_sales',
    text: "商品 300,000円 を仕入れ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 300000 }], credit: [{ accountName: "買掛金", amount: 300000 }] },
    choices: ["仕入", "買掛金", "売掛金", "現金", "商品"],
    explanation: "三文法では「仕入」勘定を使用します。",
    explanationSteps: [
      {
        highlight: "商品 300,000円 を仕入れ",
        entries: [{ side: 'debit', account: '仕入', amount: 300000 }],
        comment: "商品を仕入れたため、「仕入」（費用）が発生しました。借方（左）に記入します。"
      },
      {
        highlight: "代金は掛けとした",
        entries: [{ side: 'credit', account: '買掛金', amount: 300000 }],
        comment: "後で支払う義務である「買掛金」（負債）が増加したので、貸方（右）に記入します。"
      }
    ]
  },
  {
    id: '202', major: 'merchandise', sub: 'purchase_sales',
    text: "商品 450,000円 を売り上げ、代金は掛けとした。",
    correctEntries: { debit: [{ accountName: "売掛金", amount: 450000 }], credit: [{ accountName: "売上", amount: 450000 }] },
    choices: ["売掛金", "売上", "仕入", "現金", "商品"],
    explanation: "三文法では「売上」勘定を使用します。",
    explanationSteps: [
      {
        highlight: "商品 450,000円 を売り上げ",
        entries: [{ side: 'credit', account: '売上', amount: 450000 }],
        comment: "商品を売り上げたため、「売上」（収益）が発生しました。収益の発生は貸方（右）です。"
      },
      {
        highlight: "代金は掛けとした",
        entries: [{ side: 'debit', account: '売掛金', amount: 450000 }],
        comment: "代金を受け取る権利である「売掛金」（資産）が増加したので、借方（左）に記入します。"
      }
    ]
  },
  {
    id: '203', major: 'merchandise', sub: 'purchase_sales',
    text: "掛けで仕入れた商品 10,000円 を品違いのため返品した。",
    correctEntries: { debit: [{ accountName: "買掛金", amount: 10000 }], credit: [{ accountName: "仕入", amount: 10000 }] },
    choices: ["買掛金", "仕入", "売掛金", "売上", "現金"],
    explanation: "返品（仕入戻し）は、仕入時の逆仕訳を行います。"
  },
  {
    id: '204', major: 'merchandise', sub: 'purchase_sales',
    text: "商品 500,000円 を仕入れ、代金のうち 200,000円 は現金で支払い、残額は掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 500000 }], credit: [{ accountName: "現金", amount: 200000 }, { accountName: "買掛金", amount: 300000 }] },
    choices: ["仕入", "現金", "買掛金", "支払手形", "当座預金"],
    explanation: "代金の一部支払いの複合仕訳です。",
    explanationSteps: [
      {
        highlight: "商品 500,000円 を仕入れ",
        entries: [{ side: 'debit', account: '仕入', amount: 500000 }],
        comment: "総額分の「仕入」（費用）を借方に計上します。"
      },
      {
        highlight: "200,000円 は現金で支払い",
        entries: [{ side: 'credit', account: '現金', amount: 200000 }],
        comment: "支払った分の「現金」（資産）を貸方で減らします。"
      },
      {
        highlight: "残額は掛けとした",
        entries: [{ side: 'credit', account: '買掛金', amount: 300000 }],
        comment: "残りの30万円は「買掛金」（負債）として貸方に記入します。"
      }
    ]
  },
  {
    id: '205', major: 'merchandise', sub: 'purchase_sales',
    text: "商品 800,000円 を売り上げ、代金のうち 300,000円 は約束手形を受け取り、残額は掛けとした。",
    correctEntries: { debit: [{ accountName: "受取手形", amount: 300000 }, { accountName: "売掛金", amount: 500000 }], credit: [{ accountName: "売上", amount: 800000 }] },
    choices: ["売上", "受取手形", "売掛金", "現金", "支払手形"],
    explanation: "手形と掛けの複合仕訳です。"
  },
  {
    id: '206', major: 'merchandise', sub: 'purchase_sales',
    text: "掛けで売り上げた商品 50,000円 が品違いのため返品され、同額の売掛金と相殺した。",
    correctEntries: { debit: [{ accountName: "売上", amount: 50000 }], credit: [{ accountName: "売掛金", amount: 50000 }] },
    choices: ["売上", "売掛金", "仕入", "買掛金", "現金"],
    explanation: "売上戻り（返品）は、売上時の逆仕訳を行います。"
  },

  // Sub: Credit/Gift
  {
    id: '211', major: 'merchandise', sub: 'credit_gift',
    text: "商品 60,000円 を売り上げ、代金は信販会社発行の商品券で受け取った。",
    correctEntries: { debit: [{ accountName: "受取商品券", amount: 60000 }], credit: [{ accountName: "売上", amount: 60000 }] },
    choices: ["受取商品券", "売上", "他店商品券", "現金", "売掛金"],
    explanation: "信販会社系の商品券は「受取商品券」などで処理します（「他店商品券」とする場合もありますが、検定では区別することを確認）。ここでは一般的な「受取商品券」とします。"
  },
  {
    id: '212', major: 'merchandise', sub: 'credit_gift',
    text: "商品 30,000円 を売り上げ、代金はクレジット払い（掛）とされた。",
    correctEntries: { debit: [{ accountName: "クレジット売掛金", amount: 30000 }], credit: [{ accountName: "売上", amount: 30000 }] },
    choices: ["クレジット売掛金", "売上", "売掛金", "現金", "支払手数料"],
    explanation: "クレジット払いは通常の売掛金と区別して「クレジット売掛金」とします。"
  },
  // Sub: Advance
  {
    id: '221', major: 'merchandise', sub: 'advance',
    text: "商品 100,000円 の注文を受け、手付金として現金 20,000円 を受け取った。",
    correctEntries: { debit: [{ accountName: "現金", amount: 20000 }], credit: [{ accountName: "前受金", amount: 20000 }] },
    choices: ["現金", "前受金", "前払金", "売上", "売掛金"],
    explanation: "商品の引き渡し前の入金は「前受金」（負債）です。"
  },
  {
    id: '222', major: 'merchandise', sub: 'advance',
    text: "商品 50,000円 を注文し、手付金 10,000円 を現金で支払った。",
    correctEntries: { debit: [{ accountName: "前払金", amount: 10000 }], credit: [{ accountName: "現金", amount: 10000 }] },
    choices: ["前払金", "現金", "前受金", "仕入", "買掛金"],
    explanation: "商品の受け取り前の支払いは「前払金」（資産）です。"
  },
  {
    id: '223', major: 'merchandise', sub: 'advance',
    text: "注文していた商品 200,000円 を受け取った。代金は内金 50,000円 を差し引き、残額を掛けとした。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 200000 }], credit: [{ accountName: "前払金", amount: 50000 }, { accountName: "買掛金", amount: 150000 }] },
    choices: ["仕入", "前払金", "買掛金", "現金", "前受金"],
    explanation: "商品到着時に「前払金」を取り崩し、残額を支払います。"
  },

  // Sub: Shipping
  {
    id: '231', major: 'merchandise', sub: 'shipping',
    text: "商品 100,000円 を仕入れ、代金は掛けとした。なお、引取運賃 2,000円 を現金で支払った。",
    correctEntries: { 
      debit: [{ accountName: "仕入", amount: 102000 }], 
      credit: [{ accountName: "買掛金", amount: 100000 }, { accountName: "現金", amount: 2000 }] 
    },
    choices: ["仕入", "現金", "発送費", "買掛金", "支払手数料"],
    explanation: "【付随費用（仕入）】仕入諸掛り（引取運賃など）は、仕入原価（仕入勘定）に含めます。\n仕入原価：商品 100,000 ＋ 運賃 2,000 ＝ 102,000円"
  },
  {
    id: '232', major: 'merchandise', sub: 'shipping',
    text: "商品 200,000円 を売り上げ、代金は掛けとした。なお、発送費 1,500円（当社負担）を現金で支払った。",
    correctEntries: { 
      debit: [{ accountName: "売掛金", amount: 200000 }, { accountName: "発送費", amount: 1500 }], 
      credit: [{ accountName: "売上", amount: 200000 }, { accountName: "現金", amount: 1500 }] 
    },
    choices: ["売掛金", "発送費", "売上", "現金", "仕入"],
    explanation: "【付随費用（売上）】商品代金は「売上」、当社負担の諸掛りは「発送費」（費用）で処理します。"
  },

  // --- Notes ---
  // Sub: Promissory
  {
    id: '301', major: 'notes', sub: 'promissory',
    text: "商品 200,000円 を仕入れ、代金は約束手形を振り出して支払った。",
    correctEntries: { debit: [{ accountName: "仕入", amount: 200000 }], credit: [{ accountName: "支払手形", amount: 200000 }] },
    choices: ["仕入", "支払手形", "受取手形", "買掛金", "現金"],
    explanation: "手形の振出は「支払手形」（負債）の増加です。"
  },
  {
    id: '302', major: 'notes', sub: 'promissory',
    text: "商品 350,000円 を売り渡し、代金は同店振り出しの約束手形で受け取った。",
    correctEntries: { debit: [{ accountName: "受取手形", amount: 350000 }], credit: [{ accountName: "売上", amount: 350000 }] },
    choices: ["受取手形", "売上", "支払手形", "売掛金", "現金"],
    explanation: "手形の受取は「受取手形」（資産）の増加です。"
  },
  // Sub: Loan
  {
    id: '311', major: 'notes', sub: 'loan',
    text: "銀行から 1,000,000円 を借り入れ、利息を差し引かれた残額が当座預金に振り込まれた（利息 1万円）。",
    correctEntries: { debit: [{ accountName: "当座預金", amount: 990000 }, { accountName: "支払利息", amount: 10000 }], credit: [{ accountName: "借入金", amount: 1000000 }] },
    choices: ["当座預金", "支払利息", "借入金", "現金", "手形借入金"],
    explanation: "借入額全額を貸方に、利息は「支払利息」、手取額を借方に記入します。"
  },
  {
    id: '312', major: 'notes', sub: 'loan',
    text: "取引先に現金 100,000円 を貸し付け、借用証書を受け取った。",
    correctEntries: { debit: [{ accountName: "貸付金", amount: 100000 }], credit: [{ accountName: "現金", amount: 100000 }] },
    choices: ["貸付金", "現金", "借入金", "受取手形", "手形貸付金"],
    explanation: "現金を貸し付けた場合は「貸付金」（資産）です。"
  },

  // --- Assets & Expenses ---
  // Sub: Fixed Assets
  {
    id: '401', major: 'assets_expenses', sub: 'fixed_assets',
    text: "営業用のパソコン 150,000円 を購入し、代金は翌月末払いとした。",
    correctEntries: { debit: [{ accountName: "備品", amount: 150000 }], credit: [{ accountName: "未払金", amount: 150000 }] },
    choices: ["備品", "未払金", "買掛金", "消耗品費", "現金"],
    explanation: "商品以外の物品購入の未払いは「未払金」です。"
  },
  {
    id: '402', major: 'assets_expenses', sub: 'fixed_assets',
    text: "店舗用の土地を 5,000,000円 で購入し、代金は小切手を振り出して支払った。",
    correctEntries: { debit: [{ accountName: "土地", amount: 5000000 }], credit: [{ accountName: "当座預金", amount: 5000000 }] },
    choices: ["土地", "当座預金", "建物", "現金", "未払金"],
    explanation: "土地は固定資産です。小切手振出は当座預金の減少です。"
  },
  // Sub: Expenses/Taxes
  {
    id: '411', major: 'assets_expenses', sub: 'expenses_taxes',
    text: "固定資産税 50,000円 を現金で納付した。",
    correctEntries: { debit: [{ accountName: "租税公課", amount: 50000 }], credit: [{ accountName: "現金", amount: 50000 }] },
    choices: ["租税公課", "現金", "雑費", "消耗品費", "未払金"],
    explanation: "固定資産税や印紙税などは「租税公課」（費用）で処理します。"
  },
  {
    id: '412', major: 'assets_expenses', sub: 'expenses_taxes',
    text: "従業員の給料 200,000円 を支払い、所得税の源泉徴収分 5,000円 を差し引いた残額を現金で手渡した。",
    correctEntries: { debit: [{ accountName: "給料", amount: 200000 }], credit: [{ accountName: "預り金", amount: 5000 }, { accountName: "現金", amount: 195000 }] },
    choices: ["給料", "預り金", "現金", "立替金", "法定福利費"],
    explanation: "給料から天引きした税金などは、会社が一時的に預かるため「預り金」（負債）とします。"
  },
  {
    id: '413', major: 'assets_expenses', sub: 'expenses_taxes',
    text: "事業主が個人の生命保険料 20,000円 を店の現金で支払った。",
    correctEntries: { debit: [{ accountName: "引出金", amount: 20000 }], credit: [{ accountName: "現金", amount: 20000 }] },
    choices: ["引出金", "現金", "保険料", "資本金", "雑費"],
    explanation: "事業主個人の支出は「引出金」（または資本金の減少）で処理します。経費にはなりません。"
  },

  // --- Closing ---
  // Sub: Bad Debts
  {
    id: '501', major: 'closing', sub: 'bad_debts',
    text: "決算：売掛金残高 500,000円 に対し 2% の貸倒れを見積もる。残高は 4,000円 である（差額補充法）。",
    correctEntries: { debit: [{ accountName: "貸倒引当金繰入", amount: 6000 }], credit: [{ accountName: "貸倒引当金", amount: 6000 }] },
    choices: ["貸倒引当金繰入", "貸倒引当金", "貸倒損失", "売掛金", "現金"],
    explanation: "目標額 10,000 - 残高 4,000 = 6,000円 を繰り入れます。"
  },
  // Sub: Depreciation
  {
    id: '511', major: 'closing', sub: 'depreciation',
    text: "建物（取得原価 3,000,000円）の減価償却を行う。耐用年数30年、残存価額ゼロ、定額法、直接法。",
    correctEntries: { debit: [{ accountName: "減価償却費", amount: 100000 }], credit: [{ accountName: "建物", amount: 100000 }] },
    choices: ["減価償却費", "建物", "減価償却累計額", "備品", "損益"],
    explanation: "3,000,000 ÷ 30 = 100,000。直接法なので貸方は資産科目（建物）を減らします。"
  },
  // Sub: Accruals
  {
    id: '521', major: 'closing', sub: 'accruals',
    text: "消耗品の期末棚卸高は 2,000円 であった（購入時に全額費用処理している）。",
    correctEntries: { debit: [{ accountName: "消耗品", amount: 2000 }], credit: [{ accountName: "消耗品費", amount: 2000 }] },
    choices: ["消耗品", "消耗品費", "備品", "現金", "未払金"],
    explanation: "未使用分を資産（消耗品）に計上し、費用を取り消します。"
  },
  {
    id: '522', major: 'closing', sub: 'accruals',
    text: "家賃の未払分 50,000円 を計上する。",
    correctEntries: { debit: [{ accountName: "支払家賃", amount: 50000 }], credit: [{ accountName: "未払家賃", amount: 50000 }] },
    choices: ["支払家賃", "未払家賃", "前払家賃", "現金", "未払金"],
    explanation: "当期の費用だが未払いのものは、費用を計上し、「未払〇〇」（負債）とします。"
  }
];

// --- Utilities ---
function generateId() {
  return 'id-' + Math.random().toString(36).substr(2, 9);
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// --- State ---
const state = {
  currentSessionQueue: [], 
  currentIndex: 0,
  debitLines: [],
  creditLines: [],
  editingId: null, 
  tempAmount: "0",
  selectedChoice: null,
  sessionStats: { correct: 0, total: 0 },
  currentMode: null, 
  currentGenreId: null
};

// Explanation Mode State
const explanationState = {
  active: false,
  question: null,
  steps: [],
  currentStepIndex: -1,
  intervalId: null,
  isPlaying: false
};

// User Stats Persistence Structure
let userStats = {
  correct: 0,
  total: 0,
  history: [],
  categoryScores: {}
};

// --- Core Logic ---

function initApp() {
  console.log("App Initializing V5...");
  loadStats();
  renderHomeStats();
  renderHomeMenu();
  
  // Home Global Buttons
  document.getElementById('btn-comprehensive').addEventListener('click', () => startSession('comprehensive'));
  
  document.getElementById('clear-data-btn').addEventListener('click', () => {
    if(confirm('学習データをすべてリセットしますか？')) {
      userStats = { correct: 0, total: 0, history: [], categoryScores: {} };
      saveStats();
      renderHomeStats();
      renderHomeMenu();
    }
  });

  // Game Screen Listeners
  document.getElementById('back-home-btn').addEventListener('click', showHomeScreen);
  document.getElementById('check-btn').addEventListener('click', checkAnswer);
  document.getElementById('next-btn').addEventListener('click', nextQuestion);
  document.getElementById('reset-q-btn').addEventListener('click', resetCurrentQuestion);
  document.getElementById('home-return-btn').addEventListener('click', showHomeScreen);
  
  document.getElementById('add-debit-btn').addEventListener('click', () => addLine('debit'));
  document.getElementById('add-credit-btn').addEventListener('click', () => addLine('credit'));

  // Explanation Mode Listeners
  document.getElementById('open-expl-mode-btn').addEventListener('click', startExplanationMode);
  document.getElementById('close-expl-btn').addEventListener('click', closeExplanationMode);
  document.getElementById('expl-prev-btn').addEventListener('click', () => changeExplStep(-1));
  document.getElementById('expl-next-btn').addEventListener('click', () => changeExplStep(1));
  document.getElementById('expl-play-btn').addEventListener('click', toggleExplPlay);

  // Keypad
  setupKeypad();
  document.getElementById('keypad-close').addEventListener('click', closeKeypad);
  document.getElementById('key-enter').addEventListener('click', confirmAmount);
  document.getElementById('key-clear').addEventListener('click', () => updateKeypadDisplay("0"));
  document.getElementById('key-backspace').addEventListener('click', () => {
    const current = state.tempAmount;
    updateKeypadDisplay(current.length > 1 ? current.slice(0, -1) : "0");
  });
}

// --- Menu Rendering ---

function renderHomeMenu() {
  const container = document.getElementById('dynamic-menu-area');
  if (!container) return;
  container.innerHTML = '';

  GENRE_STRUCTURE.forEach(major => {
    // 1. Major Category Wrapper
    const groupDiv = document.createElement('div');
    groupDiv.className = "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden";

    // 2. Header (Major Category)
    const header = document.createElement('div');
    header.className = "bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center";
    
    const title = document.createElement('h3');
    title.className = "font-bold text-slate-700 text-sm md:text-base";
    title.textContent = major.title;

    // Major Mix Button
    const mixBtn = document.createElement('button');
    mixBtn.className = "text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-bold hover:bg-blue-200 transition-colors";
    mixBtn.innerHTML = "まとめ (5問)";
    mixBtn.onclick = () => startSession('major', major.id, major.title);

    header.appendChild(title);
    header.appendChild(mixBtn);
    groupDiv.appendChild(header);

    // 3. Sub Categories Grid
    const subContainer = document.createElement('div');
    subContainer.className = "divide-y divide-slate-100";

    major.subs.forEach(sub => {
      const subRow = document.createElement('button');
      subRow.className = "w-full text-left p-4 hover:bg-slate-50 active:bg-slate-100 transition-colors flex justify-between items-center";
      subRow.onclick = () => startSession('sub', sub.id, sub.title);

      const subName = document.createElement('span');
      subName.className = "text-sm text-slate-600 font-medium";
      subName.textContent = sub.title;

      // Score Badge
      const stats = userStats.categoryScores[sub.id];
      const badge = document.createElement('span');
      if (stats) {
        // Calculate color based on accuracy
        const rate = stats.total > 0 ? stats.correct / stats.total : 0;
        let colorClass = "bg-slate-100 text-slate-400";
        if (rate >= 0.8) colorClass = "bg-green-100 text-green-700 border border-green-200";
        else if (rate >= 0.4) colorClass = "bg-yellow-50 text-yellow-600 border border-yellow-100";
        else colorClass = "bg-red-50 text-red-500 border border-red-100";

        badge.className = `text-xs px-2 py-1 rounded ${colorClass} font-mono`;
        badge.textContent = `${stats.correct}/${stats.total}`;
      } else {
        badge.className = "text-xs text-slate-300 font-light";
        badge.textContent = "-";
      }

      subRow.appendChild(subName);
      subRow.appendChild(badge);
      subContainer.appendChild(subRow);
    });

    groupDiv.appendChild(subContainer);
    container.appendChild(groupDiv);
  });
}

// --- Session Logic ---

function startSession(mode, id = null, title = null) {
  let queue = [];
  let limit = 5;
  let sessionTitle = "";

  if (mode === 'comprehensive') {
    queue = shuffleArray([...QUESTIONS]);
    limit = 10;
    sessionTitle = "総合演習";
  } 
  else if (mode === 'major') {
    // Filter by Major Category
    const pool = QUESTIONS.filter(q => q.major === id);
    queue = shuffleArray(pool);
    limit = 5;
    sessionTitle = title + " (まとめ)";
  } 
  else if (mode === 'sub') {
    // Filter by Sub Category
    const pool = QUESTIONS.filter(q => q.sub === id);
    if (pool.length < 5) {
      // If shortage, double up questions to allow practice
      const extra = shuffleArray([...pool]);
      queue = [...pool, ...extra];
    } else {
      queue = shuffleArray(pool);
    }
    limit = 5;
    sessionTitle = title;
  }

  // Safety slice
  queue = queue.slice(0, limit);

  if (queue.length === 0) {
    alert("問題が見つかりませんでした。");
    return;
  }

  // Initialize Session State
  state.currentSessionQueue = queue;
  state.currentIndex = 0;
  state.sessionStats = { correct: 0, total: queue.length };
  state.currentMode = mode;
  state.currentGenreId = id; // Store the genre ID to record stats later

  // UI Update
  document.getElementById('session-title').textContent = sessionTitle;
  document.getElementById('home-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  window.scrollTo(0,0);
  
  loadQuestion();
}

function showHomeScreen() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('home-screen').classList.remove('hidden');
  document.getElementById('result-modal').classList.add('hidden');
  document.getElementById('session-end-modal').classList.add('hidden');
  document.getElementById('explanation-screen').classList.add('hidden');
  
  // Refresh stats
  renderHomeStats();
  renderHomeMenu(); // Updates badges
  window.scrollTo(0, 0);
}

// --- Question Rendering (Same as before but ensures proper flow) ---

function loadQuestion() {
  const q = state.currentSessionQueue[state.currentIndex];
  
  document.getElementById('progress-text').textContent = `${state.currentIndex + 1} / ${state.currentSessionQueue.length}`;
  document.getElementById('question-id').textContent = (state.currentIndex + 1); // Simple index based ID for user friendliness
  document.getElementById('question-text').textContent = q.text;

  state.debitLines = [{ id: generateId(), accountName: null, amount: 0 }];
  state.creditLines = [{ id: generateId(), accountName: null, amount: 0 }];
  state.selectedChoice = null;

  renderChoices(q.choices);
  renderLines();
  
  const main = document.querySelector('#game-screen main');
  if(main) main.scrollTop = 0;
}

function renderChoices(choices) {
  const container = document.getElementById('choices-container');
  if (!container) return;
  container.innerHTML = '';

  choices.forEach(choice => {
    const chip = document.createElement('div');
    chip.className = "bg-white border-2 border-slate-200 text-slate-700 px-3 py-2 rounded-lg cursor-pointer transition-all active:scale-95 select-none text-sm font-bold shadow-sm touch-manipulation";
    chip.draggable = true;
    chip.textContent = choice;
    
    chip.addEventListener('click', () => handleChoiceClick(choice, chip));
    chip.addEventListener('dragstart', (e) => {
      handleChoiceClick(null, null);
      e.dataTransfer.setData('text/plain', choice);
      chip.classList.add('opacity-50');
    });
    chip.addEventListener('dragend', () => chip.classList.remove('opacity-50'));

    container.appendChild(chip);
  });
}

function handleChoiceClick(choiceName, element) {
  const allChips = document.querySelectorAll('#choices-container div');
  if (state.selectedChoice === choiceName) {
    state.selectedChoice = null;
    allChips.forEach(c => c.classList.remove('selected-choice', 'border-blue-500', 'bg-blue-50', 'text-blue-700'));
    return;
  }
  state.selectedChoice = choiceName;
  allChips.forEach(c => c.classList.remove('selected-choice', 'border-blue-500', 'bg-blue-50', 'text-blue-700'));
  if (choiceName && element) {
    element.classList.add('selected-choice', 'border-blue-500', 'bg-blue-50', 'text-blue-700');
  }
}

function renderLines() {
  renderSide('debit');
  renderSide('credit');
}

function renderSide(side) {
  const containerId = side === 'debit' ? 'debit-area' : 'credit-area';
  const container = document.getElementById(containerId);
  const lines = side === 'debit' ? state.debitLines : state.creditLines;
  
  if (!container) return;
  container.innerHTML = '';

  lines.forEach(line => {
    const row = document.createElement('div');
    row.className = `flex flex-col md:flex-row gap-1 p-2 rounded border mb-2 relative group ${side === 'debit' ? 'bg-blue-50/30 border-blue-100' : 'bg-red-50/30 border-red-100'}`;

    const dropZone = document.createElement('div');
    dropZone.className = `h-10 border-2 border-dashed ${line.accountName ? 'border-transparent bg-white shadow-sm' : 'border-slate-300 bg-white/50'} rounded flex items-center justify-center cursor-pointer transition-colors relative w-full`;
    dropZone.addEventListener('click', () => handleZoneClick(line.id, side));

    if (line.accountName) {
      const text = document.createElement('span');
      text.className = "font-bold text-slate-800 text-sm";
      text.textContent = line.accountName;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = "✕";
      removeBtn.className = "absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 font-bold p-2 z-10";
      removeBtn.onclick = (e) => {
        e.stopPropagation();
        line.accountName = null;
        renderLines();
      };
      dropZone.appendChild(text);
      dropZone.appendChild(removeBtn);
    } else {
      const placeholder = state.selectedChoice ? "ここをタップ" : "空欄";
      dropZone.innerHTML = `<span class="text-slate-300 text-xs pointer-events-none">${placeholder}</span>`;
      if(state.selectedChoice) dropZone.classList.add('animate-pulse', 'border-blue-300');
    }

    dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('bg-blue-100', 'border-blue-400'); };
    dropZone.ondragleave = () => { dropZone.classList.remove('bg-blue-100', 'border-blue-400'); };
    dropZone.ondrop = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('text/plain');
      if (data) {
        line.accountName = data;
        renderLines();
      }
    };

    const amountBox = document.createElement('div');
    amountBox.className = "h-10 bg-white border border-slate-300 rounded flex items-center justify-end px-3 cursor-pointer hover:border-blue-400 active:bg-slate-50 w-full";
    amountBox.innerHTML = `<span class="font-mono text-lg ${line.amount ? 'text-slate-800 font-bold' : 'text-slate-300'}">${line.amount > 0 ? line.amount.toLocaleString() : '金額'}</span>`;
    amountBox.onclick = () => openKeypad(line.id, side);

    const delBtn = document.createElement('button');
    delBtn.className = "absolute -top-2 -right-2 bg-red-100 text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-sm opacity-0 group-hover:opacity-100 transition-opacity";
    delBtn.textContent = "−";
    if (lines.length > 1) {
       delBtn.onclick = (e) => { e.stopPropagation(); removeLine(line.id, side); };
       row.appendChild(delBtn);
    }

    row.appendChild(dropZone);
    row.appendChild(amountBox);
    container.appendChild(row);
  });
}

function handleZoneClick(lineId, side) {
  if (state.selectedChoice) {
    const list = side === 'debit' ? state.debitLines : state.creditLines;
    const line = list.find(l => l.id === lineId);
    if (line) {
      line.accountName = state.selectedChoice;
      state.selectedChoice = null;
      document.querySelectorAll('.selected-choice').forEach(c => c.classList.remove('selected-choice', 'border-blue-500', 'bg-blue-50', 'text-blue-700'));
      renderLines();
    }
  }
}

function addLine(side) {
  const newLine = { id: generateId(), accountName: null, amount: 0 };
  if (side === 'debit') state.debitLines.push(newLine);
  else state.creditLines.push(newLine);
  renderLines();
}

function removeLine(id, side) {
  if (side === 'debit') state.debitLines = state.debitLines.filter(l => l.id !== id);
  else state.creditLines = state.creditLines.filter(l => l.id !== id);
  renderLines();
}

function resetCurrentQuestion() {
  loadQuestion();
}

// --- Keypad Logic with Highlights ---
function setupKeypad() {
  const container = document.querySelector('#keypad-content .grid-cols-3');
  if (!container) return;
  container.innerHTML = '';
  const keys = ['7','8','9','4','5','6','1','2','3','0','00','000'];
  keys.forEach(k => {
    const btn = document.createElement('button');
    btn.textContent = k;
    btn.className = "bg-white text-slate-700 font-semibold text-2xl py-3 active:bg-slate-200 transition-colors touch-manipulation";
    btn.onclick = () => {
      let val = state.tempAmount;
      if (val === '0') val = k; else val += k;
      updateKeypadDisplay(val);
    };
    container.appendChild(btn);
  });
}

function openKeypad(id, side) {
  state.editingId = { id, side };
  const list = side === 'debit' ? state.debitLines : state.creditLines;
  const line = list.find(l => l.id === id);
  if (line) {
    state.tempAmount = line.amount === 0 ? "0" : line.amount.toString();
    updateKeypadDisplay(state.tempAmount);
    
    // Show new separated modal parts
    const backdrop = document.getElementById('keypad-backdrop');
    const wrapper = document.getElementById('keypad-wrapper');
    const content = document.getElementById('keypad-content');
    
    backdrop.classList.remove('hidden');
    wrapper.classList.remove('hidden');
    
    // Animate in
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        content.classList.remove('translate-y-full');
    }, 10);

    // Highlight Question
    document.getElementById('question-container').classList.add('question-highlight');
  }
}

function closeKeypad() {
  const backdrop = document.getElementById('keypad-backdrop');
  const wrapper = document.getElementById('keypad-wrapper');
  const content = document.getElementById('keypad-content');

  // Animate out
  backdrop.classList.add('opacity-0');
  content.classList.add('translate-y-full');
  
  // Remove Highlight
  document.getElementById('question-container').classList.remove('question-highlight');

  setTimeout(() => { 
      backdrop.classList.add('hidden'); 
      wrapper.classList.add('hidden');
      state.editingId = null; 
  }, 200);
}

function updateKeypadDisplay(val) {
  if (val.length > 1 && val.startsWith('0')) val = val.substring(1);
  if (val.length > 10) return;
  state.tempAmount = val;
  const disp = document.getElementById('keypad-display');
  if (disp) disp.textContent = parseInt(val || '0').toLocaleString();
}
function confirmAmount() {
  if (!state.editingId) return;
  const { id, side } = state.editingId;
  const list = side === 'debit' ? state.debitLines : state.creditLines;
  const line = list.find(l => l.id === id);
  if (line) { line.amount = parseInt(state.tempAmount) || 0; renderLines(); }
  closeKeypad();
}

function checkAnswer() {
  const q = state.currentSessionQueue[state.currentIndex];
  const userDebit = state.debitLines.filter(l => l.accountName && l.amount > 0);
  const userCredit = state.creditLines.filter(l => l.accountName && l.amount > 0);

  if (userDebit.length === 0 && userCredit.length === 0) {
    alert("仕訳を入力してください。");
    return;
  }

  const sorter = (a, b) => (a.n || '').localeCompare(b.n || '');
  const mapper = l => ({ n: l.accountName, a: l.amount });
  const d1 = userDebit.map(mapper).sort(sorter);
  const c1 = userCredit.map(mapper).sort(sorter);
  const d2 = q.correctEntries.debit.map(mapper).sort(sorter);
  const c2 = q.correctEntries.credit.map(mapper).sort(sorter);

  const isCorrect = JSON.stringify(d1) === JSON.stringify(d2) && JSON.stringify(c1) === JSON.stringify(c2);

  if (isCorrect) {
    userStats.correct++;
    state.sessionStats.correct++;
  }
  userStats.total++;
  
  // Track detailed stats
  userStats.history.push({ qId: q.id, res: isCorrect, date: Date.now() });
  
  saveStats(); // Saves the updated global totals
  showResult(isCorrect, q);
}

function showResult(isCorrect, q) {
  const modal = document.getElementById('result-modal');
  const header = document.getElementById('result-header');
  const display = document.getElementById('correct-answer-display');
  const expl = document.getElementById('explanation-text');
  const nextBtn = document.getElementById('next-btn');

  if (isCorrect) {
    header.textContent = "正解！ 🙆‍♂️";
    header.className = "p-5 text-center text-white font-bold text-2xl bg-green-500 shrink-0";
  } else {
    header.textContent = "不正解... 🙅‍♀️";
    header.className = "p-5 text-center text-white font-bold text-2xl bg-red-500 shrink-0";
  }

  let html = `<div class="grid grid-cols-2 border border-slate-300 rounded overflow-hidden text-slate-800 text-xs md:text-sm">
    <div class="bg-slate-100 p-2 text-center font-bold border-r border-b border-slate-300">借方</div>
    <div class="bg-slate-100 p-2 text-center font-bold border-b border-slate-300">貸方</div>
    <div class="p-2 border-r border-slate-300 bg-white">`;
  q.correctEntries.debit.forEach(d => {
    html += `<div class="flex justify-between mb-1"><span class="font-bold text-blue-700">${d.accountName}</span><span>${d.amount.toLocaleString()}</span></div>`;
  });
  html += `</div><div class="p-2 bg-white">`;
  q.correctEntries.credit.forEach(c => {
    html += `<div class="flex justify-between mb-1"><span class="font-bold text-red-700">${c.accountName}</span><span>${c.amount.toLocaleString()}</span></div>`;
  });
  html += `</div></div>`;

  display.innerHTML = html;
  expl.textContent = q.explanation;
  
  // Disable button for 1 second to prevent accidental clicks
  nextBtn.disabled = true;
  nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
  const originalText = "次の問題へ";
  nextBtn.textContent = "確認中...";

  modal.classList.remove('hidden');

  setTimeout(() => {
    nextBtn.disabled = false;
    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    nextBtn.textContent = originalText;
  }, 1000);
}

function nextQuestion() {
  document.getElementById('result-modal').classList.add('hidden');
  if (state.currentIndex + 1 < state.currentSessionQueue.length) {
    state.currentIndex++;
    loadQuestion();
  } else {
    finishSession();
  }
}

function finishSession() {
  // Update Category specific stats (Last Score)
  if (state.currentGenreId && state.currentMode !== 'comprehensive') {
    userStats.categoryScores[state.currentGenreId] = {
      correct: state.sessionStats.correct,
      total: state.sessionStats.total
    };
    saveStats();
  }

  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('session-end-modal').classList.remove('hidden');
  document.getElementById('session-score').textContent = state.sessionStats.correct;
  document.getElementById('session-total').textContent = state.sessionStats.total;
}

// --- Explanation Mode Logic ---

function startExplanationMode() {
  const q = state.currentSessionQueue[state.currentIndex];
  explanationState.question = q;
  explanationState.active = true;
  
  // Hide Result Modal, Show Explanation Screen
  document.getElementById('result-modal').classList.add('hidden');
  document.getElementById('explanation-screen').classList.remove('hidden');
  document.getElementById('expl-q-id').textContent = state.currentIndex + 1;

  // Prepare steps (Fallback if not defined)
  if (q.explanationSteps && q.explanationSteps.length > 0) {
    explanationState.steps = [...q.explanationSteps];
  } else {
    // Generate a single "Result" step fallback
    const debitEntries = q.correctEntries.debit.map(e => ({ side: 'debit', account: e.accountName, amount: e.amount }));
    const creditEntries = q.correctEntries.credit.map(e => ({ side: 'credit', account: e.accountName, amount: e.amount }));
    explanationState.steps = [
      {
        highlight: q.text,
        entries: [...debitEntries, ...creditEntries],
        comment: q.explanation || "全体の流れを確認しましょう。"
      }
    ];
  }

  // Initial State: "Start" step (index -1)
  explanationState.currentStepIndex = -1;
  explanationState.isPlaying = false;
  
  updateExplControls();
  renderExplStep(-1); // Render initial "clean" state
}

function closeExplanationMode() {
  if (explanationState.intervalId) clearInterval(explanationState.intervalId);
  explanationState.active = false;
  document.getElementById('explanation-screen').classList.add('hidden');
  document.getElementById('result-modal').classList.remove('hidden');
}

function toggleExplPlay() {
  if (explanationState.isPlaying) {
    // Pause
    explanationState.isPlaying = false;
    if (explanationState.intervalId) clearInterval(explanationState.intervalId);
    updateExplControls();
  } else {
    // Play
    // If at end, restart
    if (explanationState.currentStepIndex >= explanationState.steps.length - 1) {
      explanationState.currentStepIndex = -1;
      renderExplStep(-1);
    }
    
    explanationState.isPlaying = true;
    updateExplControls();

    // Loop
    explanationState.intervalId = setInterval(() => {
       if (explanationState.currentStepIndex < explanationState.steps.length - 1) {
         changeExplStep(1);
       } else {
         // Stop at end
         explanationState.isPlaying = false;
         clearInterval(explanationState.intervalId);
         updateExplControls();
       }
    }, 2500); // 2.5 seconds per step
  }
}

function changeExplStep(delta) {
  const newIndex = explanationState.currentStepIndex + delta;
  if (newIndex >= -1 && newIndex < explanationState.steps.length) {
    explanationState.currentStepIndex = newIndex;
    renderExplStep(newIndex);
  }
}

function renderExplStep(index) {
  const q = explanationState.question;
  const steps = explanationState.steps;
  
  // 1. Render Question Text with Highlight
  const textContainer = document.getElementById('expl-question-text');
  if (index === -1) {
    // No highlight
    textContainer.innerHTML = q.text;
  } else {
    const step = steps[index];
    if (step.highlight && q.text.includes(step.highlight)) {
      // Simple string replacement for highlighting
      // Note: Replaces only the first occurrence which is usually sufficient for short questions
      const highlighted = q.text.replace(
        step.highlight, 
        `<span class="bg-yellow-300 rounded px-1 box-decoration-clone">${step.highlight}</span>`
      );
      textContainer.innerHTML = highlighted;
    } else {
       textContainer.innerHTML = q.text; // Fallback
    }
  }

  // 2. Render Journal Entries (Accumulative)
  const debitContainer = document.getElementById('expl-debit-area');
  const creditContainer = document.getElementById('expl-credit-area');
  debitContainer.innerHTML = '';
  creditContainer.innerHTML = '';

  // Collect all entries up to current step
  const currentEntries = [];
  if (index > -1) {
    for (let i = 0; i <= index; i++) {
      if (steps[i].entries) {
        currentEntries.push(...steps[i].entries);
      }
    }
  }

  // Render Function Helper
  const renderEntry = (entry) => {
    const el = document.createElement('div');
    el.className = "flex justify-between items-center bg-white border border-slate-200 p-2 rounded shadow-sm animate-fade-in";
    el.innerHTML = `
      <span class="font-bold text-slate-700 text-sm">${entry.account}</span>
      <span class="font-mono text-slate-600">${entry.amount.toLocaleString()}</span>
    `;
    return el;
  };

  currentEntries.filter(e => e.side === 'debit').forEach(e => debitContainer.appendChild(renderEntry(e)));
  currentEntries.filter(e => e.side === 'credit').forEach(e => creditContainer.appendChild(renderEntry(e)));

  // 3. Render Commentary
  const commentContainer = document.getElementById('expl-commentary');
  if (index === -1) {
    commentContainer.textContent = "それでは、仕訳のプロセスを順番に確認しましょう。再生ボタンを押すか、矢印で進めてください。";
  } else {
    commentContainer.textContent = steps[index].comment || "";
  }

  // 4. Update Progress Dots
  const dotsContainer = document.getElementById('expl-progress-dots');
  dotsContainer.innerHTML = '';
  // Start dot (Initial state)
  const startDot = document.createElement('div');
  startDot.className = `w-2 h-2 rounded-full transition-colors ${index === -1 ? 'bg-blue-600' : 'bg-slate-300'}`;
  dotsContainer.appendChild(startDot);
  
  steps.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-blue-600' : (i < index ? 'bg-blue-300' : 'bg-slate-200')}`;
    dotsContainer.appendChild(dot);
  });

  updateExplControls();
}

function updateExplControls() {
  const prevBtn = document.getElementById('expl-prev-btn');
  const nextBtn = document.getElementById('expl-next-btn');
  const playText = document.getElementById('expl-play-text');
  const playIcon = document.getElementById('expl-play-icon');
  
  prevBtn.disabled = explanationState.currentStepIndex <= -1;
  nextBtn.disabled = explanationState.currentStepIndex >= explanationState.steps.length - 1;
  
  if (explanationState.isPlaying) {
    playText.textContent = "一時停止";
    playIcon.textContent = "⏸";
  } else {
    if (explanationState.currentStepIndex >= explanationState.steps.length - 1) {
       playText.textContent = "もう一度";
       playIcon.textContent = "↻";
    } else {
       playText.textContent = "再生";
       playIcon.textContent = "▶";
    }
  }
}


// --- Persistence ---
const STORAGE_KEY = 'zensho_bookkeeping_v4';

function loadStats() {
  const s = localStorage.getItem(STORAGE_KEY);
  if (s) {
    try { 
      const data = JSON.parse(s); 
      // Merge for robustness
      userStats = { ...userStats, ...data };
      if(!userStats.categoryScores) userStats.categoryScores = {};
    } catch(e) {}
  }
}
function saveStats() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userStats));
}
function renderHomeStats() {
  document.getElementById('home-stat-correct').textContent = userStats.correct;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}