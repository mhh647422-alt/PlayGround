/* ============ رفيق — المساعد الذكي (assistant.js) ============
   طبقة أولى: ردود ذكية مبنية على محتوى الموقع (تعمل فورًا بدون أي إعداد).
   طبقة ثانية (اختيارية): ذكاء اصطناعي حقيقي عبر /api/chat
   — تُفعّل تلقائيًا فقط إذا أضفت OPENAI_API_KEY في إعدادات Vercel.
=============================================================== */
(function () {
  'use strict';

  var AI_ENDPOINT = '/api/chat';

  // قاعدة معرفة المساعد — عدّلها بحرية لتخص خدمتك
  var KB = [
    {
      k: ['خدمات', 'خدمة', 'تسوون', 'تقدمون', 'وش تقدمون', 'اعمالكم', 'مجالات'],
      a: 'في <b>رفيق</b> نقدم باقة متكاملة 🎯:<br>🎨 تصميم الهوية البصرية<br>🖥️ تطوير المواقع<br>🛒 المتاجر الإلكترونية<br>📱 تطبيقات الجوال<br>📈 تحسين محركات البحث SEO<br>📣 إدارة السوشال ميديا<br><br>أي خدمة منهم تود تفاصيلها؟'
    },
    {
      k: ['سعر', 'اسعار', 'كم', 'تكلفة', 'ميزانية', 'بكم', 'عرض سعر'],
      a: 'الأسعار تعتمد على نطاق مشروعك: عدد الصفحات، الميزات، ومدى الإلحاح ⏱️<br><br>كمثال: المواقع التعريفية تبدأ عادة من مبالغ مناسبة للشركات الناشئة، والمتاجر الإلكترونية حسب المتطلبات.<br><br>الأفضل: املا <a href="contact.html" style="color:#22D3EE">نموذج طلب المشروع</a> وبيوصلك عرض مفصّل خلال <b>24 ساعة</b> — بدون أي التزام ✨'
    },
    {
      k: ['مدة', 'متى', 'وقت', 'كم يوم', 'كم اسبوع', 'تاخذ', 'تستغرق', 'جدول'],
      a: 'المدة حسب نوع المشروع 📅:<br>• موقع تعريفي: <b>2-4 أسابيع</b><br>• متجر إلكتروني: <b>3-6 أسابيع</b><br>• تطبيق جوال: <b>6-10 أسابيع</b><br>• هوية بصرية: <b>1-2 أسبوع</b><br><br>ونلتزم بالجدول الزمني اللي نتفق عليه من البداية ✅'
    },
    {
      k: ['تواصل', 'رقم', 'اتصال', 'جوال', 'واتس', 'ايميل', 'بريد', 'موقعكم', 'مكان', 'عنوان'],
      a: 'يسعدنا تواصلك! 📞<br><br>📧 البريد: info@rafeeq.sa<br>📱 جوال/واتساب: +966 55 000 0000<br>📍 الرياض، السعودية<br>⏰ الأحد - الخميس: 9ص إلى 6م<br><br>أو مباشرة من صفحة <a href="contact.html" style="color:#22D3EE">تواصل معنا</a>'
    },
    {
      k: ['من انتم', 'من نحن', 'شركة', 'عنكم', 'تعريف', 'قصتكم', 'خبرة'],
      a: '<b>رفيق</b> وكالة رقمية متكاملة 🚀 — أكثر من <b>120 مشروع</b> منجز، <b>45+ عميل</b>، و<b>8 سنوات</b> خبرة.<br><br>نؤمن أن نجاحك هو مقياس نجاحنا: نرافقك من الفكرة حتى الإطلاق وما بعده. تعرف علينا أكثر من <a href="about.html" style="color:#22D3EE">صفحة من نحن</a> 💜'
    },
    {
      k: ['اعمال', 'أعمال', 'بورتفوليو', 'نماذج', 'مشاريع', 'شغلكم', 'سابق'],
      a: 'عندنا معرض أعمال نفخر فيه 🏆: متاجر إلكترونية، مواقع شركات، هويات بصرية وتطبيقات جوال.<br><br>شوفها بنفسك في صفحة <a href="portfolio.html" style="color:#22D3EE">أعمالنا</a> — وبعدها قل لي: أي نمط يعجبك لمشروعك؟'
    },
    {
      k: ['مساعدة', 'مساعده', 'ساعدني', 'ابدا', 'ابغي', 'أبغى', 'اريد', 'ابي', 'طلب', 'مشروع', 'عندي فكرة'],
      a: 'ممتاز! بشرح لك أسهل طريقة 🚀:<br><br>1️⃣ افتح صفحة <a href="contact.html" style="color:#22D3EE">تواصل معنا</a><br>2️⃣ املا نموذج طلب المشروع (دقيقتين)<br>3️⃣ نراجع طلبك ونتصل بك خلال 24 ساعة بعرض واضح<br><br>ولا تقدر تسألني عن أي خدمة الآن وأنا أشرحها لك 😊'
    },
    {
      k: ['متجر', 'تجارة', 'منتجات', 'بيع'],
      a: 'المتاجر الإلكترونية من تخصصاتنا المفضلة 🛒<br><br>نشمل: تصميم المتجر، بوابات الدفع، إدارة المخزون، ربط الشحن، وتقارير المبيعات — كل شي جاهز للانطلاق.<br><br>تبغى أحسب لك تقدير مبدئي؟ خبرني عن عدد منتجاتك تقريبًا 🛍️'
    },
    {
      k: ['موقع', 'موقعي', 'صفحات', 'ويب'],
      a: 'نبني مواقع سريعة وآمنة ومتجاوبة مع الجوال 💻📱 ومحسّنة لمحركات البحث من اليوم الأول.<br><br>مواقعنا تشمل: لوحة تحكم سهلة، حماية SSL، وسرعة تحميل ممتازة.<br><br>وش نوع الموقع اللي في بالك؟ تعريفي، متجر، منصة؟'
    },
    {
      k: ['شكرا', 'شكراً', 'يعطيك العافية', 'تمام', 'زين', 'احسنت'],
      a: 'العفو! سعيد بخدمتك 😊💜<br><br>إذا احتجت أي شي ثاني أنا موجود — ولو حاب تبدأ رسميًا، نموذج <a href="contact.html" style="color:#22D3EE">تواصل معنا</a> هو أسرع طريق 🚀'
    },
    {
      k: ['سلام', 'مرحبا', 'هلا', 'السلام'],
      a: 'أهلاً وسهلاً! 🌟 أنا <b>رفيق الذكي</b>، مساعدك هنا في وكالة رفيق.<br><br>كيف أقدر أساعدك اليوم؟'
    }
  ];

  var FALLBACK = 'سؤال ممتاز! 🤔<br><br>هالشي يحتاج مني دقة أكثر — تقدر:<br>• تواصل معنا مباشرة: 📧 info@rafeeq.sa | 📱 +966 55 000 0000<br>• أو املا نموذج <a href="contact.html" style="color:#22D3EE">طلب المشروع</a> ويرد عليك فريقنا خلال 24 ساعة<br><br>وأسئلتي الجاهزة تحت 👇 تختصر لك الطريق!';

  var CHIPS = ['وش خدماتكم؟', 'كم الأسعار؟', 'كم مدة التنفيذ؟', 'شوفوا أعمالكم', 'أبي أبدأ مشروع'];

  // عناصر الواجهة
  var toggle = document.getElementById('chatToggle');
  var panel = document.getElementById('chatPanel');
  var closeBtn = document.getElementById('chatClose');
  var body = document.getElementById('chatBody');
  var chipsWrap = document.getElementById('chatChips');
  var form = document.getElementById('chatForm');
  var input = document.getElementById('chatText');
  if (!toggle || !panel) return;

  var aiAvailable = null; // نكتشف تلقائيًا عند أول رسالة

  function openPanel() {
    panel.hidden = false;
    requestAnimationFrame(function () { panel.classList.add('open'); });
    toggle.setAttribute('aria-expanded', 'true');
    setTimeout(function () { input && input.focus(); }, 250);
    if (!body.dataset.greeted) {
      body.dataset.greeted = '1';
      botSay('أهلاً بك في <b>رفيق</b>! 👋💜<br><br>أنا <b>رفيق الذكي</b> — تكلمني بأي شيء عن خدماتنا، الأسعار، مدة التنفيذ، أو أي سؤال يخطر ببالك.<br><br>كيف أقدر أخدمك؟');
      renderChips(CHIPS);
    }
  }
  function closePanel() {
    panel.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    setTimeout(function () { panel.hidden = true; }, 280);
  }
  toggle.addEventListener('click', function () {
    if (panel.classList.contains('open')) closePanel(); else openPanel();
  });
  closeBtn && closeBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(); });

  function addMsg(text, who) {
    var div = document.createElement('div');
    div.className = 'msg ' + who;
    div.innerHTML = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  function botSay(text) {
    var t = addMsg('<span class="typing"><i></i><i></i><i></i></span>', 'bot');
    setTimeout(function () {
      t.innerHTML = text;
      body.scrollTop = body.scrollHeight;
    }, 420 + Math.random() * 420);
  }

  function renderChips(list) {
    chipsWrap.innerHTML = '';
    (list || []).forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = c;
      b.addEventListener('click', function () {
        input.value = c;
        form.dispatchEvent(new Event('submit'));
      });
      chipsWrap.appendChild(b);
    });
  }

  function normalize(s) {
    return (s || '').toLowerCase()
      .replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
      .replace(/[ًٌٍَُِّْ]/g, '').replace(/\s+/g, ' ').trim();
  }

  function kbAnswer(msg) {
    var n = normalize(msg);
    for (var i = 0; i < KB.length; i++) {
      for (var j = 0; j < KB[i].k.length; j++) {
        if (n.indexOf(normalize(KB[i].k[j])) !== -1) return KB[i].a;
      }
    }
    return null;
  }

  async function askAI(message) {
    if (aiAvailable === false) return null;
    try {
      var res = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
      });
      if (!res.ok) { aiAvailable = false; return null; }
      var data = await res.json();
      if (data && data.reply) { aiAvailable = true; return data.reply; }
      aiAvailable = false;
      return null;
    } catch (e) {
      aiAvailable = false;
      return null;
    }
  }

  form && form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var text = (input.value || '').trim();
    if (!text) return;
    input.value = '';
    addMsg(text, 'user');
    renderChips([]);

    var ai = await askAI(text);
    if (ai) {
      botSay(ai);
      renderChips(CHIPS);
      return;
    }
    var local = kbAnswer(text);
    botSay(local || FALLBACK);
    renderChips(CHIPS);
  });

  // نافذة ترحيب صغيرة بعد 6 ثوانٍ (مرة واحدة لكل جلسة)
  setTimeout(function () {
    if (!panel.classList.contains('open') && !sessionStorage.getItem('rafeeqChatNudged')) {
      sessionStorage.setItem('rafeeqChatNudged', '1');
      toggle.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }],
        { duration: 700, iterations: 2 }
      );
    }
  }, 6000);
})();
