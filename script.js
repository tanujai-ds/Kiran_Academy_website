const notice = document.getElementById('notice');
const closeNotice = document.getElementById('closeNotice');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const form = document.getElementById('enquire');
const status = document.getElementById('status');
const yearEl = document.getElementById('yr');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

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
    if (select && course) {
      select.value = course;
    }
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
    const message = (formData.get('message') || '').toString().trim();

    const required = [name, mobile, email, course];
    if (required.some((value) => !value)) {
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
      `Hi Kiran Academy,\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nCourse: ${course}\nMessage: ${message || 'No additional message'}\n\nPlease contact me for a free demo class.`
    );

    window.open(`https://wa.me/918888809416?text=${text}`, '_blank');
    status.textContent = 'Your enquiry is ready to send on WhatsApp.';
    status.className = 'status ok';
    form.reset();
  });
}
