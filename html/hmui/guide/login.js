const pwd = 'hanacard1!';

let inp = document.querySelector('input');
let btn = document.querySelector('.submit');

btn.addEventListener('click', () => {
  if ( inp.value === pwd ) {
    location.href = '/html/hmui/guide/globalPageList.html';
  } else {
    alert('비밀번호를 정확하게 입력해 주세요.');
  }
});