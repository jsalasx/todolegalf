import axios from 'axios';
import type { TareaI } from '~/interface/TareaI';
const apiUrl = "http://localhost:8000";


const TareaService = {
    async getAllTareas(): Promise<TareaI[]> {
        console.log("ENTRO ALL TAREAS")
        //console.log(accessToken)
        return await axios.get<TareaI[]>(apiUrl + "/tareas/",
        ).then((response) => {
            return response.data
        }).catch(error => {
            return []
        })
    }
}
export default TareaService;