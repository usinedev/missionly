
// Ex link : "/create"
const apiLink = "http://localhost:4000/api"

// Exemple appel API : 
//  const login = await Api.login({email : "toto2@gmail.com",
    // password : "toto2" })
    // console.log(login);
    

    // const missions = await Api.getMissionById(1)
    // console.log(missions);

function callApi(link, action, body) {
    const token = localStorage.getItem("accessToken")
    const refresh_token = localStorage.getItem("refreshToken")
    if (link == `${apiLink}/auth/refresh`) {
        token = refresh_token
    }
    console.log(link);
    console.log(token);
            
    const data = fetch(`${link}`
    ,{ method: action,
      headers : {'Content-Type': 'application/json', 'Authorization': token||"" },
        body: body ? JSON.stringify(body) : null
    }
    )
      .then(function(response){
        return response.json();
      })
      return data;
  }

export class Api {
    static async login(body){
        // body = { email : xxx@xxx.xxx, password : xxxxxx}
        const finalLink = `${apiLink}/auth/login`
        const info = await callApi(finalLink, 'POST', body)
        localStorage.setItem("accessToken", info.accessToken)
        localStorage.setItem("refreshToken", info.refreshToken)
        return info
    }
    static async register(body){
        // body = { email : xxx@xxx.xxx, password : xxxxxx}
        const finalLink = `${apiLink}/auth/register`
        const info = await callApi(finalLink, 'POST', body)
        return info
    }
    static async logout(body){
        // body = { email : xxx@xxx.xxx, password : xxxxxx}
        const finalLink = `${apiLink}/auth/logout`
        const info = await callApi(finalLink, 'POST', body)
        return info
    }
    static async refresh(body){
        // body = { email : xxx@xxx.xxx, password : xxxxxx}
        const finalLink = `${apiLink}/auth/refresh`
        const info = await callApi(finalLink, 'POST', body, refresh_token)
        return info
    }
    static async getUserMissions(id){
        const finalLink = `${apiLink}/mission/user/${id}`
        const info = await callApi(finalLink, 'GET')
        return info
    }
    static async getMissionById(id){
        const finalLink = `${apiLink}/mission/${id}`
        const info = await callApi(finalLink, 'GET')
        return info
    }
    static async getMissionByTags(tags){
        // tags = ["dev", "back", ...]
        let tagsQuery = `?`
        tags.map((tag, index)=>{
            if (index == 0) {
                tagsQuery += `tag[]=${tag}`
            } else { 
                tagsQuery += `&tag[]=${tag}`
            }
        })
        
        const finalLink = `${apiLink}/mission/tags/${tagsQuery}`
        console.log(finalLink);
        const info = await callApi(finalLink, 'GET')
        return info
    }
    static async getMissionByName(name){
        const finalLink = `${apiLink}/mission/${name}`
        const info = await callApi(finalLink, 'GET')
        return info
    }
    static async createMission(body){
        // body = {userName : "xxx", email : "xxx@xxx.xxx", password : "xxx", ...}
        const finalLink = `${apiLink}/mission/create`
        const info = await callApi(finalLink, 'POST', body)
        return info
    }
    static async updateMission(id, body){
        // body : {userName : "xxx"}
        const finalLink = `${apiLink}/mission/${id}/update`
        const info = await callApi(finalLink, 'POST', body)
        return info
    }
   static async getUsers() {
        const finalLink = `${apiLink}/user/`
        const info = await callApi(finalLink, 'GET')
        return info
   }
   static async getUserById(id) {
        const finalLink = `${apiLink}/user/${id}`
        const info = await callApi(finalLink, 'GET')
        return info
   }
   static async getUserByName(name) {
        const finalLink = `${apiLink}/user/${name}`
        const info = await callApi(finalLink, 'GET')
        return info
   }
   static async updateUser(id, body) {
            // body : {userName : "xxx"}
        const finalLink = `${apiLink}/user/${id}/update`
        const info = await callApi(finalLink, 'POST', body)
        return info
   }
   static async getUserReviews(id) {
        const finalLink = `${apiLink}/review/user/${id}`
        const info = await callApi(finalLink, 'GET')
        return info
   }
   static async createReview(body) {
        const finalLink = `${apiLink}/review/create`
        const info = await callApi(finalLink, 'POST', body)
        return info
   }
   static async updateReview(id, body) {
        const finalLink = `${apiLink}/review/${id}/update`
        const info = await callApi(finalLink, 'POST', body)
        return info
   }
}

