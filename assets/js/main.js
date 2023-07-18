/* 백 데이터 가져오기.... */
document.addEventListener('DOMContentLoaded', async () => {
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    try {
      const storesDatas = await fetch('http://localhost:3000/api/ceo/stores/:storeId', option).then(d => d.json());
      const usersDatas = await fetch('http://localhost:3000/api/users/:userId', option).then(d => d.json());
    //   const cmtsDatas = await fetch('http://localhost:3000/api/posts/:postId/cmts', option).then(d => d.json());
  
      console.log(storesDatas);
      console.log(usersDatas);
    //   console.log(cmtsDatas);
  
    } catch (e) {
      console.error(e);
    }
  });