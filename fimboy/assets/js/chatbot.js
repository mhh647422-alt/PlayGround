// ===== فيمبوي — المساعد الذكي =====
(function () {
  'use strict';

  var fab = document.getElementById('chatFab');
  var panel = document.getElementById('chatPanel');
  var closeBtn = document.getElementById('chatClose');
  var messages = document.getElementById('chatMessages');
  var chipsBox = document.getElementById('chatChips');
  var form = document.getElementById('chatForm');
  var input = document.getElementById('chatInput');
  var badge = document.getElementById('fabBadge');
  var cta = document.getElementById('openChatCta');
  if (!fab || !panel || !messages) return;

  var welcomed = false;

  // ---- قاعدة معرفة فيمبوي ----
  var KB = [
    {
      k: ['سلام', 'هلا', 'هاي', 'مرحبا', 'اهلا', 'مساء', 'صباح', 'هاي'],
      r: 'أهلًا وسهلًا! 🌟 أنا مساعد فيمبوي الذكي، موجود عشان أساعدك. وش المشروع اللي في بالك؟'
    },
    {
      k: ['سعر', 'اسعار', 'بكم', 'تكلفة', 'تكاليف', 'عرض سعر', 'كم يكلف'],
      r: 'أسعارنا تبدأ من:\n• موقع تعريفي: من 1,500 ريال\n• متجر إلكتروني: من 4,000 ريال\n• تطبيق جوال: من 8,000 ريال\nكل مشروع سعره مفصّل حسب متطلباته — اطلب عرضك المجاني من صفحة «تواصل معنا».'
    },
    {
      k: ['مدة', 'متى', 'وقت', 'استلام', 'تسليم', 'كم يوم', 'كم اسبوع'],
      r: 'مدة التنفيذ المعتادة:\n• موقع تعريفي: 5–10 أيام عمل\n• متجر إلكتروني: 2–4 أسابيع\n• تطبيق جوال: 6–10 أسابيع\nنلتزم بالجدول الزمني من اليوم الأول، وتصلك تقارير تقدم أسبوعية.'
    },
    {
      k: ['خدمات', 'تسوون', 'تقدمون', 'تشتغلون', 'وش عندكم'],
      r: 'نقدم في فيمبوي:\n🖥️ تصميم وتطوير المواقع\n🛒 المتاجر الإلكترونية\n📲 تطبيقات الجوال (iOS وAndroid)\n🎨 الهوية البصرية والشعارات\n📈 تحسين محركات البحث SEO\n💬 دمج المساعد الذكي في موقعك'
    },
    {
      k: ['اعمال', 'أعمال', 'مشاريع', 'نماذج', 'شغلكم', 'سابق'],
      r: 'عندنا أكثر من 120 مشروع منجز! من أبرزها:\n• متجر لُمى للعطور — زيادة المبيعات 140%\n• مجموعة الإعمار المتحدة — موقع فخم مع معرض مشاريع\n• تطبيق فِطام للياقة — +12 ألف تحميل بأول شهر\nشوف صفحة «أعمالنا» للتفاصيل الكاملة 🎯'
    },
    {
      k: ['مساعد', 'بوت', 'ذكي', 'روبوت', 'شات'],
      r: 'أنا مساعد فيمبوي الذكي 🤖 أرد على أسئلتك حول خدماتنا وأسعارنا فورًا على مدار الساعة — ونقدر نبني لك مثلي تمامًا في موقعك! خدمة «دمج المساعد الذكي» من أشهر خدماتنا.'
    },
    {
      k: ['موقع', 'مواقع', 'تصميم', 'صفحة', 'موقعي'],
      r: 'تصميم المواقع عندنا يبدأ من فكرة حصرية لعلامتك — لا قوالب جاهزة!\n✓ تصميم متجاوب مع كل الأجهزة\n✓ سرعة تحميل أقل من ثانيتين\n✓ SEO مدمج من البداية\nتبدأ من 1,500 ريال وتُسلّم خلال 5–10 أيام. نبدأ بمشروعك؟'
    },
    {
      k: ['متجر', 'تجارة', 'منتجات', 'بيع', 'دفع'],
      r: 'المتاجر الإلكترونية عندنا متكاملة:\n🛒 سلة شراء وتجربة شراء من 3 خطوات\n💳 بوابات دفع آمنة (مدى، Apple Pay، فيزا)\n📦 إدارة مخزون وتقارير مبيعات\nتبدأ من 4,000 ريال خلال 2–4 أسابيع.'
    },
    {
      k: ['تطبيق', 'جوال', 'ايفون', 'أيفون', 'اندرويد', 'أندرويد', 'ios', 'android'],
      r: 'نبني تطبيقات iOS وAndroid بتجربة استخدام سلسة وأداء أصلي:\n📱 تصميم UI/UX مخصص\n🔔 إشعارات فورية\n📊 لوحة تحكم للإدارة\nتبدأ من 8,000 ريال خلال 6–10 أسابيع.'
    },
    {
      k: ['تواصل', 'رقم', 'هاتف', 'ايميل', 'بريد', 'واتساب', 'واتس', 'عنوان', 'مقر'],
      r: 'تواصل معنا مباشرة:\n📧 info@fimboy.sa\n📞 +966 50 000 0000\n💬 واتساب: نفس الرقم\n📍 الرياض، السعودية\n🕐 الأحد–الخميس: 9ص–6م\nأو اترك طلبك في صفحة «تواصل معنا» ونرد خلال ساعات العمل.'
    },
    {
      k: ['منكم', 'مين انتم', 'عنكم', 'شركتكم', 'فيمبوي', 'فيم'],
      r: 'فيمبوي وكالة حلول رقمية سعودية 🇸🇦 متخصصون في تصميم وتطوير المواقع والمتاجر والتطبيقات. نفذنا +120 مشروع بنسبة رضا 98%. فلسفتنا: شريك نموّ لا مجرد مورّد 💜'
    },
    {
      k: ['شكر', 'يعطيك', 'ممتاز', 'تمام', 'حلو', 'كفو'],
      r: 'العفو! 🌹 سعدت بخدمتك. لو احتجت أي شيء ثاني — تفضل أي وقت، وفريقنا جاهز يستقبلك في صفحة «تواصل معنا».'
    }
  ];

  var FALLBACK = 'سؤال ممتاز! 😊 فريقنا البشري بيجاوبك بالتفصيل — راسلنا من صفحة «تواصل معنا» أو واتساب على +966 50 000 0000، وقول لي عن طبيعة مشروعك عشان أوجهك للخدمة الأنسب.';

  var CHIPS = ['الأسعار والمشاريع', 'مدة التنفيذ', 'خدماتنا', 'أعمالنا السابقة', 'احجز استشارة مجانية'];

  var CHIP_REPLIES = {
    'الأسعار والمشاريع': 'تفضل أسعارنا المبدئية:\n• موقع تعريفي: من 1,500 ريال\n• متجر إلكتروني: من 4,000 ريال\n• تطبيق جوال: من 8,000 ريال\nالسعر النهائي يعتمد على متطلباتك — اطلب عرض سعر مجاني من صفحة «تواصل معنا» 📋',
    'مدة التنفيذ': 'التسليم حسب نوع المشروع:\n⏱️ موقع تعريفي: 5–10 أيام\n🛒 متجر إلكتروني: 2–4 أسابيع\n📲 تطبيق جوال: 6–10 أسابيع\nونلتزم بالموعد — تقارير تقدم أسبوعية تصلك طوال التنفيذ ✅',
    'خدماتنا': 'خدمات فيمبوي:\n🖥️ تصميم وتطوير المواقع\n🛒 المتاجر الإلكترونية\n📲 تطبيقات الجوال\n🎨 الهوية البصرية\n📈 تحسين محركات البحث\n💬 دمج المساعد الذكي\nأي خدمة تعجبك أرسل لك تفاصيلها؟',
    'أعمالنا السابقة': 'من أحدث أعمالنا:\n🏆 متجر لُمى للعطور — مبيعات +140%\n🏢 مجموعة الإعمار المتحدة — استعلامات ×3\n💪 تطبيق فِطام — +12 ألف تحميل\nتصفح صفحة «أعمالنا» وشوف باقي المشاريع 🎨',
    'احجز استشارة مجانية': 'بكل سرور! 📅 احجز استشارتك المجانية من صفحة «تواصل معنا» — املأ النموذج وراح نتواصل معك خلال ساعات العمل، أو كلمنا واتساب مباشرة على +966 50 000 0000 💬'
  };

  function norm(s) {
    return (s || '').toLowerCase()
      .replace(/[أإآ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/[\u064B-\u0652\u0640]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function matchKB(text) {
    var t = norm(text);
    if (!t) return null;
    for (var i = 0; i < KB.length; i++) {
      for (var j = 0; j < KB[i].k.length; j++) {
        if (t.indexOf(KB[i].k[j]) !== -1) return KB[i].r;
      }
    }
    return null;
  }

  function addMsg(text, who) {
    var el = document.createElement('div');
    el.className = 'msg ' + who;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function showChips() {
    if (!chipsBox) return;
    chipsBox.innerHTML = '';
    CHIPS.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = c;
      b.addEventListener('click', function () {
        chipsBox.innerHTML = '';
        addMsg(c, 'user');
        reply(c);
      });
      chipsBox.appendChild(b);
    });
  }

  function reply(userText) {
    var typingEl = addMsg('...', 'bot typing');
    typingEl.innerHTML = '<span></span><span></span><span></span>';
    messages.scrollTop = messages.scrollHeight;
    var answer = CHIP_REPLIES[userText] || matchKB(userText) || FALLBACK;
    var delay = 600 + Math.random() * 500;
    setTimeout(function () {
      typingEl.remove();
      addMsg(answer, 'bot');
      showChips();
    }, delay);
  }

  function welcome() {
    if (welcomed) return;
    welcomed = true;
    setTimeout(function () {
      addMsg('أهلًا بك في فيمبوي! 👋 أنا مساعدك الذكي، أرد على أسئلتك فورًا عن خدماتنا وأسعارنا ومدة التنفيذ. كيف أقدر أساعدك اليوم؟', 'bot');
      showChips();
    }, 350);
  }

  function openChat() {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    fab.setAttribute('aria-expanded', 'true');
    if (badge) badge.style.display = 'none';
    welcome();
    if (input) input.focus();
  }

  function closeChat() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    fab.setAttribute('aria-expanded', 'false');
  }

  fab.addEventListener('click', function () {
    if (panel.classList.contains('open')) closeChat();
    else openChat();
  });
  fab.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openChat(); }
  });
  if (closeBtn) closeBtn.addEventListener('click', closeChat);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeChat();
  });
  if (cta) cta.addEventListener('click', function (e) { e.preventDefault(); openChat(); });

  if (form && input) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      addMsg(v, 'user');
      input.value = '';
      reply(v);
    });
  }
})();
