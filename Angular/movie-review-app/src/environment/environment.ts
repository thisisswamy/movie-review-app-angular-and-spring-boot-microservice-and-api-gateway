export const  apiDetails={
    JWT_TOKEN :'',
    review_ms_service_apis:{
        writeReview: '/api/v1/reviews/write',
        getAllReviews:'/api/v1/reviews/all',
        deleteAllReviews :'/api/v1/reviews/delete',
        deleteReviewByKey:'/api/v1/reviews/delete/{key}',
        getReviewsByUserName:'/api/v1/reviews/user',
        updateReview:'/api/v1/reviews/update',
        writeReviewWithPoster:"/api/v1/reviews/write/poster",
        writeReviewWithPosterURL:"/api/v1/reviews/write/poster-url"

    },
    user_ms_service_api:{
        registerUser:'/api/v1/user/register',
        getUserProfile:'/api/v1/user/{userName}',
        getAllUsers:'/api/v1/user/all',
        getJwtToken:'/api/v1/user/auth/login',
        validateUser: '/api/v1/user/UserDetails/token',
        forgotPassword:'/api/v1/user/password/forgot-password',
        resetPassword:'/api/v1/user/password/reset',
        validateByJWT:'/api/v1/user/validateUser'
    },

    reviewMSHost:()=> 'http://localhost:8081',
    userMSHost:()=> 'http://localhost:8080',

    getApigatWay:()=> 'http://localhost:8989',
}
