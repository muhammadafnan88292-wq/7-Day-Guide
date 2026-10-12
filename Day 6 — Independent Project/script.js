'use strict';

// Responsive mobile navigation shared across all three pages.
const menuButton = document.querySelector('.menu-toggle');
const navList = document.querySelector('#nav-list');
function closeMenu() {
  if (!menuButton || !navList) return;
  navList.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}
if (menuButton && navList) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    navList.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navList.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (!menuButton.contains(event.target) && !navList.contains(event.target)) closeMenu();
  });
}

// Dynamic service cards loaded from a separate local JSON file.
// Requires a local web server (e.g. VS Code Live Server), not file://.
const featuredContainer = document.querySelector('#featured-services');
const servicesContainer = document.querySelector('#all-services');
const filters = [...document.querySelectorAll('.filter-btn')];
const iconLabels = { web: 'Web development', ui: 'UI and UX design', ai: 'Artificial intelligence', responsive: 'Responsive design', projects: 'Project development', digital: 'Digital creativity' };

function serviceCard(service) {
  const article = document.createElement('article');
  article.className = 'service-card';
  const icon = document.createElement('div');
  icon.className = 'service-icon';
  icon.textContent = service.icon;
  icon.setAttribute('aria-hidden', 'true');
  const category = document.createElement('p');
  category.className = 'service-category';
  category.textContent = service.category === 'development' ? 'DEVELOPMENT' : 'CREATIVE & AI';
  const heading = document.createElement('h3');
  heading.textContent = service.title;
  const description = document.createElement('p');
  description.textContent = service.description;
  const link = document.createElement('a');
  link.className = 'text-link';
  link.href = 'contact.html';
  link.textContent = 'Learn more →';
  article.append(icon, category, heading, description, link);
  return article;
}
function renderServices(container, items) {
  if (!container) return;
  container.replaceChildren();
  if (!items.length) {
    const message = document.createElement('p');
    message.className = 'empty-state';
    message.textContent = 'No services match this filter.';
    container.append(message);
    return;
  }
  const fragment = document.createDocumentFragment();
  items.forEach(service => fragment.append(serviceCard(service)));
  container.append(fragment);
}
async function loadServices() {
  if (!featuredContainer && !servicesContainer) return;
  try {
    const response = await fetch('services.json');
    if (!response.ok) throw new Error('Service data request failed');
    const services = await response.json();
    if (!Array.isArray(services)) throw new Error('Unexpected service data');
    renderServices(featuredContainer, services.slice(0, 3));
    renderServices(servicesContainer, services);
    filters.forEach(button => {
      button.addEventListener('click', () => {
        const selected = button.dataset.filter;
        filters.forEach(filter => {
          const active = filter === button;
          filter.classList.toggle('active', active);
          filter.setAttribute('aria-pressed', String(active));
        });
        renderServices(servicesContainer, selected === 'all' ? services : services.filter(service => service.category === selected));
      });
    });
  } catch (error) {
    [featuredContainer, servicesContainer].filter(Boolean).forEach(container => {
      const message = document.createElement('p');
      message.className = 'empty-state';
      message.textContent = 'Services could not load. Please open this website using Live Server or refresh the page.';
      container.replaceChildren(message);
    });
    console.error('Could not load services:', error);
  }
}
loadServices();

// Scroll reveal with a reduced-motion fallback.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });
  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

// Accessible client-side form validation; intentionally does not send messages.
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
if (form && status) {
  const fields = [...form.querySelectorAll('input, textarea')];
  fields.forEach(field => field.addEventListener('input', () => field.removeAttribute('aria-invalid')));
  form.addEventListener('submit', event => {
    event.preventDefault();
    status.className = 'form-status';
    status.textContent = '';
    fields.forEach(field => field.removeAttribute('aria-invalid'));
    if (!form.checkValidity()) {
      const invalidField = form.querySelector(':invalid');
      invalidField.setAttribute('aria-invalid', 'true');
      status.classList.add('error');
      status.textContent = `Please check ${invalidField.labels?.[0]?.textContent.trim() || 'the highlighted field'}: ${invalidField.validationMessage}`;
      invalidField.focus();
      return;
    }
    status.classList.add('success');
    status.textContent = 'Your form details are valid. This demo does not send or store messages; use the email link to contact us.';
    form.reset();
  });
}

document.querySelectorAll('.year').forEach(element => { element.textContent = new Date().getFullYear(); });
