# qwerty's Delivery

## CEO Part
checkRoute : 주문 + 배달확인<br>
menuRoute : 사장님 메뉴등록<br>
storeRoute : 사장님 회원정보관리(+회원탈퇴), 가게정보조회<br>
<br>
사장님 계정 가입 email, password, confirm, storeName, storeImage<br>
사장님 음식 추가 menuName, menuImage, price<br>
<br>
ejs
<br>

## customer Part
userRoute :
ordersRoute :
cartRoute :
userReviewsRoute :
<br>
고객 계정 가입 <br>
고객 주문


No. / 기능명/ API URL / Method / request / response 

/// userRoute.js

1.
회원 가입 API
API URL: '/user/signup'
Method: post
Request: {"email":"", "verifyNumberInput":"", "password":"", "passwordConfirm":""}
Response: {"message":'회원 가입에 성공하였습니다.}

2. 
email 인증키 발송 API
API URL: '/user/signup/email'
Method: post
Request: {"email":""} 
Response: {"message':"전송 성공"}

3.
고객 로그인 API
API URL: '/login'
Method: post
Request: {"email":"", "password":""}
Response: {"message':"log-in 되었습니다."}

4. 
고객 로그아웃 API
API URL: '/logout'
Method: post
Request: (request 없음)
Response: {"message":"log-out 되었습니다."}

5.
음식점 조회 APi
API URL: "/user/stores"
Method: get
Request: (request 없음)
Response: {"storeId":"",'storeImage':"", 'storeName':"", 'totalRating':""}

6.
고객 메뉴 조회 API
API URL: '/user/:storeId/getMenuAll'
Method: get
Request: (request 없음)
Response: {'menuId':"", 'menuName':"", 'menuImage':"", 'price':""}

7. 
사용자 정보 조회 API
API URL: '/users/:userId'
Method: get
Request: (request 없음)
Response: {'userId':"", 'email':"", 'point':"", 'createdAt':"", 'updatedAt':""}

8. 
사용자 정보 수정 APi
API URL: '/users/:userId'
Method: put
Request: { "password":"", "newPassword":"", "newPasswordConfirm":"" }
Response: {"message':"사용자 정보 수정에 성공하였습니다."}

9.
회원탈퇴 API
API URL: '/users/:userId'
Method: delete
Request: { "email":"", "password":"" }
Response: {"message':"사용자 정보 삭제에 성공하였습니다."}

// userReviewRoute.js
1.
리뷰 작성 APi
API URL: '/user/store/:storeId/review'
Method: post
Request: {"rating":"","content":""}
Response: {"message":"리뷰 작성에 성공하였습니다."}
=> 고객님 로그인 후 사용가능

2.
리뷰 목록 조회 API
API URL: '/user/store/:storeId/review'
Method: post
Request: (request 없음)
Response: {'reviewId':'', 'storeId':'', 'userId':'', 'rating':'', 'content':'', 'createdAt', 'updatedAt':''}

3. 
리뷰 수정 API
API URL: '/user/store/:storeId/review/:reviewId'
Method: put
Request: {"reating":"","content":""}
Response: {"data":'리뷰 수정에 성공하였습니다.}

4. 
리뷰 삭제 API
API URL: '/user/store/:storeId/review/:reviewId'
Method: delete
Request: (request 없음)
Response: {"data":'리뷰 삭제에 성공하였습니다.}



// ordersRoute.js
1.
고객 주문메뉴 생성 API
API URL: '/user/store/:storeId/order/menu/:menuId'
Method: POST
Request: {"quantity"}
Response: {"message":'성공'} // 실패시 {"message":'실패'}
=> 고객님 로그인 후 사용가능

2
고객 주문 생성 API
API URL : '/user/store/:storeId/order'
Method: POST
Request: {"address"}
Response: {"message":'주문 완료!'}
=> 고객님 로그인 후, 고객 주문메뉴 생성 이후 사용가능

3.
고객이 배달을 받았는지 여부 API
API URL: '/user/order/:orderId/delivery'
Method: POST
Request 없음
Response: { message: '배달 완료 처리되었습니다!'}
=> 고객님 로그인 후, 고객 주문메뉴 생성 이후 사용가능

4. 
고객 주문조회 API
API URL: '/user/order/:orderId'
Method: GET
Request 없음
Response: { data: order} 
=> 고객님 로그인 후, 고객 주문메뉴 생성 이후 사용가능

//여기부터는 사장님 파트입니다.

5. 
사장님 주문 조회 API
API URL: '/ceo/:storeId/order'
Method: GET
Request 없음
Response: { data: order} 
=> 사장님 로그인 후, 고객이 주문 생성했을때 조회 가능. (해당 storeId의 주문 목록조회)

6.
사장님 주문 상세 조회
API URL: '/ceo/:storeId/order/:orderId'
Method: GET
Request 없음
Response: { data: orderMenus} 
=> 사장님 로그인 후, 고객이 주문 생성했을때 조회 가능. (해당 orderId의 주문 상세조회)

7.
사장님 주문 취소 API 
API URL: '/ceo/:storeId/order/:orderId'
Method: DELETE
Request 없음
Response: { data: '사장님 주문 취소 완료'} 
=> 사장님 로그인 후, 고객이 주문 생성했을때 삭제 가능. (해당 orderId에 대한 삭제제)









