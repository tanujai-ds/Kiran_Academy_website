const notice = document.getElementById('notice');
const closeNotice = document.getElementById('closeNotice');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const form = document.getElementById('enquire');
const status = document.getElementById('status');
const yearEl = document.getElementById('yr');

if (yearEl) yearEl.textContent = new Date().getFullYear();

if (closeNotice && notice) {
  closeNotice.addEventListener('click', () => notice.classList.add('hide'));
}

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('[data-course]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const course = btn.getAttribute('data-course');
    const select = document.getElementById('courseSelect');
    if (select && course) select.value = course;
    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const mobile = (formData.get('mobile') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const course = (formData.get('course') || '').toString().trim();
    const branch = (formData.get('branch') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if ([name, mobile, email, course].some((value) => !value)) {
      status.textContent = 'Please fill in all required fields.';
      status.className = 'status err';
      return;
    }
    if (!/^[0-9]{10}$/.test(mobile)) {
      status.textContent = 'Please enter a valid 10-digit mobile number.';
      status.className = 'status err';
      return;
    }

    const text = encodeURIComponent(
      `Hi Kiran Academy,\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nCourse: ${course}\nBranch: ${branch || 'Any'}\nMessage: ${message || 'No additional message'}\n\nPlease contact me for a free demo class.`
    );
    window.open(`https://wa.me/918888809416?text=${text}`, '_blank');
    status.textContent = 'Your enquiry is ready to send on WhatsApp.';
    status.className = 'status ok';
    burstConfetti();
    form.reset();
  });
}

const PLANET_COPY = {
  Mercury: 'Mercury pace — Software Testing: start fast, get interview-ready in about 4 months.',
  Venus: 'Venus track — Web Development: design, build and host real sites.',
  Earth: 'Earth orbit — Python Full Stack: the most requested path for career switchers.',
  Mars: 'Mars energy — Java Full Stack: enterprise apps and Spring Boot roles.',
  Jupiter: 'Jupiter scale — Data Science: turn numbers into decisions companies pay for.'
};

const planetTip = document.getElementById('planetTip');
document.querySelectorAll('[data-jump]').forEach((card) => {
  card.addEventListener('click', () => {
    const course = card.getAttribute('data-jump');
    const select = document.getElementById('courseSelect');
    if (select && course) select.value = course;
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('.planet').forEach((planet) => {
  planet.addEventListener('click', () => {
    const name = planet.getAttribute('data-planet');
    if (planetTip && name) planetTip.textContent = PLANET_COPY[name] || name;
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  });
});

const CODE_SNIPPET = `def place_student(skills):\n    projects = build_portfolio(skills)\n    mocks = interview_lab()\n    return get_offer(projects, mocks)\n\nprint(place_student("python"))  # "Hired"`;
const typedEl = document.getElementById('typedCode');
let typeIndex = 0;
function typeCode() {
  if (!typedEl) return;
  if (typeIndex <= CODE_SNIPPET.length) {
    typedEl.textContent = CODE_SNIPPET.slice(0, typeIndex);
    typeIndex += 1;
    setTimeout(typeCode, 38);
  } else {
    setTimeout(() => {
      typeIndex = 0;
      typeCode();
    }, 2200);
  }
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) typeCode();
else if (typedEl) typedEl.textContent = CODE_SNIPPET;

const PLACEMENTS = [
  { name: 'Priya Sharma', course: 'Python Full Stack', company: 'Infosys', pkg: '4.8 LPA', img: 47 },
  { name: 'Rohit Patil', course: 'Java Full Stack', company: 'TCS', pkg: '4.5 LPA', img: 12 },
  { name: 'Sneha Kulkarni', course: 'Software Testing', company: 'Cognizant', pkg: '3.8 LPA', img: 32 },
  { name: 'Amit Deshmukh', course: 'Data Science with Python', company: 'Capgemini', pkg: '6.2 LPA', img: 15 },
  { name: 'Neha Joshi', course: 'Web Development', company: 'Persistent', pkg: '4.2 LPA', img: 45 },
  { name: 'Sagar More', course: 'Python Full Stack', company: 'Wipro', pkg: '4.0 LPA', img: 33 },
  { name: 'Anjali Rao', course: 'Java Full Stack', company: 'Accenture', pkg: '5.5 LPA', img: 20 },
  { name: 'Vikas Jadhav', course: 'Software Testing', company: 'Tech Mahindra', pkg: '3.6 LPA', img: 52 },
  { name: 'Meera Iyer', course: 'Data Science with Python', company: 'LTIMindtree', pkg: '7.0 LPA', img: 27 },
  { name: 'Kunal Singh', course: 'Web Development', company: 'HCLTech', pkg: '4.1 LPA', img: 68 },
  { name: 'Pooja Naik', course: 'Python Full Stack', company: 'TCS', pkg: '5.0 LPA', img: 49 },
  { name: 'Rahul Bhosale', course: 'Java Full Stack', company: 'Infosys', pkg: '4.7 LPA', img: 11 }
];

const placeGrid = document.getElementById('placeGrid');
function renderPlacements(filter) {
  if (!placeGrid) return;
  const rows = filter === 'all' ? PLACEMENTS : PLACEMENTS.filter((row) => row.course === filter);
  placeGrid.innerHTML = rows.map((row) => `
    <article class="place-card">
      <img src="https://i.pravatar.cc/112?img=${row.img}" alt="${row.name}" width="56" height="56" loading="lazy" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=111827&color=22D3EE&bold=true'">
      <div>
        <strong>${row.name}</strong>
        <small>${row.course}</small>
        <small>${row.company}</small>
      </div>
      <span class="pkg">${row.pkg}</span>
    </article>
  `).join('');
}
renderPlacements('all');

document.querySelectorAll('#placementFilters .chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#placementFilters .chip').forEach((el) => el.classList.remove('is-on'));
    chip.classList.add('is-on');
    renderPlacements(chip.getAttribute('data-filter') || 'all');
  });
});

const STORIES = [
  { quote: 'I switched from a B.Com background. Daily practice plus two Django projects made my Infosys interview feel familiar, not scary.', name: 'Priya Sharma', role: 'Python Developer · Infosys', img: 47 },
  { quote: 'Mock interviews caught my weak Spring answers early. By campus drive week I could explain my e-commerce API end to end.', name: 'Rohit Patil', role: 'Java Developer · TCS', img: 12 },
  { quote: 'The Selenium + SQL combo was exactly what Cognizant asked. Placement desk sent me three drives in two weeks.', name: 'Sneha Kulkarni', role: 'QA Engineer · Cognizant', img: 32 },
  { quote: 'I wanted dashboards, not just theory. The sales-forecast project is still the first thing I show recruiters.', name: 'Amit Deshmukh', role: 'Data Analyst · Capgemini', img: 15 },
  { quote: 'We shipped a real booking site, hosted it, and I walked into Persistent with a live URL. That changed the conversation.', name: 'Neha Joshi', role: 'Web Developer · Persistent', img: 45 },
  { quote: 'Weekend batch + recorded recaps let me keep my job while I upskilled. Offer landed in the fifth month.', name: 'Anjali Rao', role: 'Associate Engineer · Accenture', img: 20 }
];

const storyTrack = document.getElementById('storyTrack');
const storyDots = document.getElementById('storyDots');
let storyPage = 0;
function pageSize() {
  return window.matchMedia('(max-width: 980px)').matches ? 1 : 3;
}
function renderStories() {
  if (!storyTrack) return;
  const size = pageSize();
  const start = storyPage * size;
  const slice = STORIES.slice(start, start + size);
  storyTrack.innerHTML = slice.map((item) => `
    <figure class="quote">
      <blockquote>${item.quote}</blockquote>
      <figcaption>
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=2563eb&color=fff&bold=true" alt="" width="42" height="42">
        <span>${item.name}<small>${item.role}</small></span>
      </figcaption>
    </figure>
  `).join('');
  const pages = Math.ceil(STORIES.length / size);
  if (storyDots) {
    storyDots.innerHTML = Array.from({ length: pages }, (_, i) =>
      `<button type="button" class="${i === storyPage ? 'is-on' : ''}" aria-label="Story page ${i + 1}"></button>`
    ).join('');
    storyDots.querySelectorAll('button').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        storyPage = i;
        renderStories();
      });
    });
  }
}
renderStories();
document.getElementById('storyPrev')?.addEventListener('click', () => {
  const pages = Math.ceil(STORIES.length / pageSize());
  storyPage = (storyPage - 1 + pages) % pages;
  renderStories();
});
document.getElementById('storyNext')?.addEventListener('click', () => {
  const pages = Math.ceil(STORIES.length / pageSize());
  storyPage = (storyPage + 1) % pages;
  renderStories();
});
window.addEventListener('resize', () => {
  storyPage = 0;
  renderStories();
});

function animateCount(el) {
  const target = Number(el.getAttribute('data-count') || 0);
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 3;
    el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    entry.target.querySelectorAll('[data-count]').forEach((el) => {
      if (!el.dataset.done) {
        el.dataset.done = '1';
        animateCount(el);
      }
    });
    if (entry.target.matches('[data-count]') && !entry.target.dataset.done) {
      entry.target.dataset.done = '1';
      animateCount(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal, [data-count]').forEach((el) => io.observe(el));

const canvas = document.getElementById('confetti');
const ctx = canvas?.getContext('2d');
let bits = [];
function sizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

function burstConfetti() {
  if (!ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#22D3EE', '#8B5CF6', '#06B6D4', '#67E8F9', '#C4B5FD', '#F8FAFC'];
  for (let i = 0; i < 140; i += 1) {
    bits.push({
      x: Math.random() * canvas.width,
      y: -20,
      r: 4 + Math.random() * 5,
      c: colors[i % colors.length],
      vx: -2 + Math.random() * 4,
      vy: 2 + Math.random() * 5,
      a: Math.random() * Math.PI
    });
  }
}

function drawConfetti() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bits.forEach((b) => {
    b.x += b.vx;
    b.y += b.vy;
    b.a += 0.08;
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.a);
    ctx.fillStyle = b.c;
    ctx.fillRect(-b.r, -b.r / 2, b.r * 2, b.r);
    ctx.restore();
  });
  bits = bits.filter((b) => b.y < canvas.height + 20);
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

document.getElementById('celebrateBtn')?.addEventListener('click', burstConfetti);
