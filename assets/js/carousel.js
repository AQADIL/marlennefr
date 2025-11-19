document.addEventListener('DOMContentLoaded', () => {
    const wheelGallery = document.querySelector('.wheel-gallery');
    if (!wheelGallery) return;

    const handles = wheelGallery.querySelectorAll('.wheel-handle');
    const photoImg = document.querySelector('.wheel-photo-img');
    const caption = document.querySelector('.wheel-photo-caption');

    const wheelStates = [
        {
            src: 'pics/1.jpg',
            caption: 'Trying to look serious and responsible. Probably just opened VS Code and stared at it for 20 minutes.'
        },
        {
            src: 'pics/2.jpg',
            caption: 'Chaos mode unlocked: 27 tabs, 3 side projects, 0 finished tasks. But vibes are immaculate.'
        },
        {
            src: 'pics/3.jpg',
            caption: 'Study grind: coffee, lecture notes and the same YouTube tutorial on repeat until it finally clicks.'
        },
        {
            src: 'pics/4.jpg',
            caption: 'AFK life. No code, just friends, random walks and pretending not to think about deadlines.'
        }
    ];

    let activeIndex = 0;

    function setWheelState(index) {
        const total = wheelStates.length;
        activeIndex = ((index % total) + total) % total;
        const state = wheelStates[activeIndex];

        if (photoImg) {
            photoImg.src = state.src;
            photoImg.alt = 'Marlen mood photo';
        }

        if (caption) {
            caption.textContent = state.caption;
        }

        wheelGallery.style.setProperty('--wheel-angle', (activeIndex * 90) + 'deg');

        handles.forEach((handle, i) => {
            if (i === activeIndex) {
                handle.classList.add('is-active');
            } else {
                handle.classList.remove('is-active');
            }
        });
    }

    handles.forEach(handle => {
        handle.addEventListener('click', () => {
            const index = parseInt(handle.getAttribute('data-index') || '0', 10);
            setWheelState(index);
        });
    });

    wheelGallery.addEventListener('wheel', event => {
        event.preventDefault();
        if (event.deltaY > 0 || event.deltaX > 0) {
            setWheelState(activeIndex + 1);
        } else {
            setWheelState(activeIndex - 1);
        }
    }, { passive: false });

    wheelGallery.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault();
            setWheelState(activeIndex + 1);
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault();
            setWheelState(activeIndex - 1);
        }
    });

    wheelGallery.setAttribute('tabindex', '0');
    setWheelState(0);
});
