/* 백 데이터 가져오기.... */
document.addEventListener('DOMContentLoaded', async () => {
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
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