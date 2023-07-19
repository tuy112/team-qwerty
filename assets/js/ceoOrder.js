/* 백 데이터 가져오기.... */
document.addEventListener('DOMContentLoaded', async () => {
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    };
  
    try {
      const storesData = await fetch('http://localhost:3000/api/storeInfoList', option).then(d => d.json());
      const menusData = await fetch('http://localhost:3000/api/ceo/getMenuAll', option).then(d => d.json());
  
      console.log(storesData);
      console.log(menusData);
  
    } catch (e) {
      console.error(e);
    }
  });

  // 음식 주문
  fetch('http://localhost:3000/api/ceo/getMenuAll', {
    method: 'post',
    body: JSON.stringify({
        menuName: menuName,
        menuImage: menuImage,
        price: price
    })
  })
  .then(res => {
    if (res.status === 200) {
        alert("음식 추가완료");
    } else if (res.status === 403) {
        return res.json();
    }
  })
  .then(res => {
    console.log("에러 메시지 ->", res.message);
  })