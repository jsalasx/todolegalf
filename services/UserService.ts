import axios from 'axios';
import type { ApiResponseI } from '~/interface/ApiResponseI';
import type { UserI } from '~/interface/UserI';
const apiUrl = "http://localhost:8000"
const UserService = {
    async getUserByToken(token:string): Promise<boolean> {
        return await axios.get<ApiResponseI<UserI>>(apiUrl + "/users/",
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        ).then((response) => {
            if (!response.data.error) {
                return true;
            } else {
                return false;
            }
        }).catch(error => {
            return false;
        })
    }
}
export default UserService;