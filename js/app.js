console.log('App JS')
const visibility = document.querySelector('.visibility');
visibility.onclick = function(e) {
    let input = e.currentTarget.parentElement.children[0];
    if (input.type == 'password') {
        input.type = 'text';
        e.currentTarget.textContent = 'visibility';
    } else {
        input.type = 'password';
        e.currentTarget.textContent = 'visibility_off';
    }
}