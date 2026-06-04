// Main JavaScript file for OAOA.dev

const initMobileMenu = () => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Find the container holding the desktop navigation
    const desktopLinksContainer = nav.querySelector('.hidden.md\\:flex');
    if (!desktopLinksContainer) return;
    const rightContainer = desktopLinksContainer.parentElement;

    // Extract the relative prefix (e.g. "../" if we are in a subdirectory)
    let relativePrefix = '';
    const brandLink = nav.querySelector('a.font-black');
    if (brandLink) {
        const href = brandLink.getAttribute('href');
        if (href && href.startsWith('../')) {
            relativePrefix = '../';
        }
    }

    // Extract brand info
    const brandLogo = nav.querySelector('.font-black');
    let brandLogoHTML = '';
    if (brandLogo) {
        if (brandLogo.tagName === 'DIV') {
            brandLogoHTML = `<a href="${relativePrefix}index.html" class="${brandLogo.className}">${brandLogo.textContent}</a>`;
        } else {
            brandLogoHTML = brandLogo.outerHTML;
        }
    } else {
        brandLogoHTML = `<a href="${relativePrefix}index.html" class="font-black text-2xl tracking-tighter uppercase italic">OAOA.dev</a>`;
    }

    // Create mobile menu toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'mobile-menu-toggle';
    toggleBtn.className = 'block md:hidden border border-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-white hover:bg-black hover:text-white transition-colors';
    toggleBtn.textContent = 'Menu';
    
    // Append the toggle button to the navigation bar
    if (rightContainer) {
        rightContainer.appendChild(toggleBtn);
    }

    // Extract desktop links
    const links = desktopLinksContainer.querySelectorAll('a');
    let linksHTML = `<a href="${relativePrefix}index.html" class="hover:text-gray-500 transition-colors font-black text-2xl uppercase tracking-tighter">Home</a>`;
    links.forEach(link => {
        linksHTML += `<a href="${link.getAttribute('href')}" class="hover:text-gray-500 transition-colors font-black text-2xl uppercase tracking-tighter">${link.textContent}</a>`;
    });

    // Extract CTA button
    const ctaBtn = nav.querySelector('.btn-outline');
    const contactHref = ctaBtn ? ctaBtn.getAttribute('href') : `${relativePrefix}index.html#contact`;
    const contactText = ctaBtn ? ctaBtn.textContent : 'Get in Touch';

    // Create mobile menu overlay container
    const menuOverlay = document.createElement('div');
    menuOverlay.id = 'mobile-menu';
    menuOverlay.className = 'hidden fixed inset-0 z-50 bg-white flex flex-col p-6 md:hidden';
    menuOverlay.innerHTML = `
        <div class="flex justify-between items-center mb-16">
            ${brandLogoHTML}
            <button id="mobile-menu-close" class="border border-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-white hover:bg-black hover:text-white transition-colors">
                Close
            </button>
        </div>
        <div class="flex flex-col gap-8">
            ${linksHTML}
        </div>
        <div class="mt-auto pt-10 border-t border-gray-150">
            <a href="${contactHref}" id="mobile-menu-cta" class="btn-black block text-center py-4 text-xs font-bold uppercase tracking-[0.2em]">
                ${contactText}
            </a>
        </div>
    `;

    document.body.appendChild(menuOverlay);

    // Menu toggle actions
    const openMenu = () => {
        menuOverlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // Prevent background scrolling
    };

    const closeMenu = () => {
        menuOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    };

    toggleBtn.addEventListener('click', openMenu);
    
    const closeBtn = menuOverlay.querySelector('#mobile-menu-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    // Close menu if a link is clicked
    const menuLinks = menuOverlay.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}
