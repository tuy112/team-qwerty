function filter() {
    let search = document.getElementById('menuSearch').value.toLowerCase();
    let menu = document.getElementByClassName('menu');

    for ( let i = 0; i < menu.length; i++ ) {
        menuName = menu[i].getElementById('menuName');
        price = menu[i].getElementById('price');

        if ( menuName[0].innerHTML.tolowerCase().indexOf(search) != -1 ||
            price[0].innerHTML.tolowerCase().indexOf(search) != -1
        ) {
            menu[i].style.display = 'flex'
        } else {
            menu[i].style.display = 'none'
        }
    }
}