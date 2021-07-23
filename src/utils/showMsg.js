export const successMsg = (msg) => {
    document.querySelector('.notification.is-success > div.notification-body').innerText = msg;
    document.querySelector('.notification.is-success').classList.remove('is-hidden');
    document.querySelector('.notification.is-success').style.display = 'block'; 
};

export const errorMsg = (msg) => {
    document.querySelector('.notification.is-danger > div.notification-body').innerText = msg;
    document.querySelector('.notification.is-danger').classList.remove('is-hidden');
    document.querySelector('.notification.is-danger').style.display = 'block'; 
}