<script setup lang="ts">

import { ref } from 'vue';
import type { TareaI } from '~/interface/TareaI';

const route = useRoute()
const currentId = ref(0);
currentId.value = parseInt(route.params.id.toString());
const tarea = ref<TareaI>()
const router = useRouter()
tarea.value = await getTareaById(currentId.value.toString())
console.log("tarea")
console.log(tarea.value)
const { $toast } = useNuxtApp();
const tareaToEdit = {
    id: tarea.value?.id ?? 0,
    titulo: tarea.value?.titulo ?? '',
    descripcion: tarea.value?.descripcion ?? '',
    fechaExpiracion: tarea.value?.fechaExpiracion ?? ''
}


const titulo = ref(null);
const descripcion = ref(null);
const fechaExpiracion = ref(null)
function validarTarea() {
    if (!(tareaToEdit.titulo != null && tareaToEdit.titulo != '' && tareaToEdit.titulo)) {
        $toast.error("Digite el titulo")
        titulo.value.focus();
        return false
    }
    if (!(tareaToEdit.descripcion != null && tareaToEdit.descripcion != '' && tareaToEdit.descripcion)) {
        $toast.error("Digite la descripcion")
        descripcion.value.focus();
        return false
    }
    if (!(tareaToEdit.fechaExpiracion != null && tareaToEdit.fechaExpiracion != '' && tareaToEdit.fechaExpiracion)) {
        $toast.error("Escoja la fecha")
        fechaExpiracion.value.focus();
        return false
    }
    return true;
}


async function getTareaById(id: string) {
    const { data, error, pending } = await useFetchApi<TareaI>("tareas/" + id, {
        method: 'GET',
    })
    console.log("ERROR")
    console.log(error.value)
    if (error.value) {
        if (error.value.statusCode == 401) {
            router.push({ path: "/login" })
        }
    }
    if (data) {
        const currentTarea = {
            id: data.value?.id ?? 0,
            titulo: data.value?.titulo ?? '',
            descripcion: data.value?.descripcion ?? '',
            fechaExpiracion: data.value?.fecha_expiracion ?? ''
        }
        console.log(currentTarea)
        return currentTarea
    } else {
        const currentTareaErr = {
            id: 0,
            titulo: '',
            descripcion: '',
            fechaExpiracion: ''
        }
        return currentTareaErr;
    }
}

async function editarTarea() {
    if (validarTarea()) {
        const tareaEntity = {
            id: tareaToEdit.id,
            titulo: tareaToEdit.titulo,
            descripcion: tareaToEdit.descripcion,
            fecha_expiracion: tareaToEdit.fechaExpiracion
        }
        const { data, error, pending } = await useFetchApi("tareas/" + currentId.value + "/", {
            method: 'PUT',
            body: tareaEntity,
        })
        if (error.value) {
            console.log(error.value.data)
        }
        if (data) {
            console.log(data.value)
            if (data.value.id) {
                $toast.success("Tarea actualizada satisfactoriamente")
                setTimeout(() => { goToHomePage() }, 1000);

            }
        }
    }
    async function goToHomePage() {
        await navigateTo('/')
    }
}

</script>
<template>
    <div class="grid grid-cols-1 h-[100vh] min-w-full place-items-center px-6 py-6 lg:px-8">
        <div class="w-2/3">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
                <h2 class="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Editar Tarea</h2>
            </div>

            <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" @submit.prevent="editarTarea">
                    <div>
                        <label for="titulo" class="block text-sm font-medium leading-6 text-gray-900">Titulo:</label>
                        <div class="mt-2">
                            <input ref="titulo" id="titulo" name="titulo" v-model="tareaToEdit.titulo" type="text"
                                autocomplete="titulo"
                                class="block w-full focus:outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="descripcion"
                                class="block text-sm font-medium leading-6 text-gray-900">Descripcion</label>
                        </div>
                        <div class="mt-2">
                            <textarea ref="descripcion" id="descripcion" name="descripcion" type="text"
                                v-model="tareaToEdit.descripcion"
                                class="block w-full focus:outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </textarea>
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="fechaExpiracion" class="block text-sm font-medium leading-6 text-gray-900">Fecha
                                Expiracion</label>
                        </div>
                        <div class="mt-2">
                            <input ref="fechaExpiracion" id="fechaExpiracion" name="fechaExpiracion" type="date"
                                v-model="tareaToEdit.fechaExpiracion"
                                class="block w-full focus:outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Editar Tarea
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>