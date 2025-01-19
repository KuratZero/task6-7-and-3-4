document.addEventListener("DOMContentLoaded", function () {
    const appHeaderBtn = document.getElementById("app-header-button");

    appHeaderBtn.addEventListener("click", () => {
        menu.classList.toggle('active');
        appHeaderBtn.classList.toggle('active');
    });


    const menu = document.getElementById('menu_list');
    const headers = menu.querySelectorAll('.nav_menu-button');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = content.style.display === 'block';

            menu.querySelectorAll('.drop_list').forEach(dropList => {
                dropList.style.display = 'none';
            });

            menu.querySelectorAll('.nav_menu-button').forEach(hdr => {
                hdr.classList.remove('active');
                const icon = hdr.querySelector('.icon');
                if (icon) icon.classList.remove('rotate');
            });

            if (!isOpen) {
                content.style.display = 'block';

                const firstContent = content.querySelector('.item-label');
                if (firstContent) firstContent.click();

                header.classList.add('active');
                const icon = header.querySelector('.icon');
                if (icon) icon.classList.add('rotate');
            }
        });
    });

    const submenu = document.querySelectorAll('.item-label');
    const submenuContents = document.querySelectorAll('.drop_list-right_section');

    submenu.forEach(subBtn => {
        subBtn.addEventListener('click', () => {
            const id = subBtn.dataset.id;
            let targetSubmenu;

            if (window.innerWidth <= 1350) {
                targetSubmenu = document.getElementById(`mobile-sublist-${id}`);
            } else {
                targetSubmenu = document.getElementById(`sublist-${id}`);
            }

            submenuContents.forEach(subContent => {
                subContent.style.display = 'none';
                subContent.parentElement.classList.remove('active');
            })

            targetSubmenu.style.display = 'block';
            subBtn.parentElement.classList.add('active');
        })
    });

    window.addEventListener('resize', () => {
        let targetSubmenuId;

        submenuContents.forEach(submenu => {
            if (submenu.style.display === 'block') {
                targetSubmenuId = submenu.id;
            }
            submenu.style.display = 'none';
        });

        if (targetSubmenuId.startsWith('mobile-') && window.innerWidth > 1350) {
            document.getElementById(targetSubmenuId.substring(7)).style.display = 'block';
        } else if (targetSubmenuId.startsWith('sublist-') && window.innerWidth <= 1350) {
            document.getElementById('mobile-' + targetSubmenuId).style.display = 'block';
        } else {
            document.getElementById(targetSubmenuId).style.display = 'block';
        }
    });
});
