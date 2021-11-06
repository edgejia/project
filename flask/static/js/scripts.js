/*!
* Start Bootstrap - Creative v7.0.5 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});


const login_btn = document.getElementById('log_btn');
const register_btn = document.getElementById('reg_btn');
const reg_field = document.getElementById('reg_field');
const log_field = document.getElementById('log_field');
const jumpTOlogin_btn = document.getElementById('jumpTOlogin');
const jumpTOregister_btn = document.getElementById('jumpTOregister')
login_btn.addEventListener('click',function(e){
    reg_field.style.display = 'none';
    log_field.style.display = 'flex';
    login_btn.style.backgroundColor = '#f4623a';
    register_btn.style.backgroundColor = '#807f7e';
})

register_btn.addEventListener('click',function(e){
    reg_field.style.display = 'flex';
    log_field.style.display = 'none';
    login_btn.style.backgroundColor = '#807f7e';
    register_btn.style.backgroundColor = '#f4623a';
})

jumpTOregister_btn.addEventListener('click',function(e){
    reg_field.style.display = 'flex';
    log_field.style.display = 'none';
    login_btn.style.backgroundColor = '#807f7e';
    register_btn.style.backgroundColor = '#f4623a';
})

jumpTOlogin_btn.addEventListener('click',function(e){
    reg_field.style.display = 'none';
    log_field.style.display = 'flex';
    login_btn.style.backgroundColor = '#f4623a';
    register_btn.style.backgroundColor = '#807f7e';
})
