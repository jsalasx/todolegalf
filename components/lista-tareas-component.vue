<script setup lang="ts">
const { $toast } = useNuxtApp();
import { reactive } from 'vue';
import Modal from '~/components/Modal.vue'
const tareas = ref([]);
const isModalVisible = ref(false);
const currentId = ref(0);
tareas.value = await getAllTareas();

async function getAllTareas() {
    const { data, error, pending } = await useFetchApi("tareas/", {
        method: 'GET',
    })
    //console.log(tareas)
    if (error.value) {
        if (error.value.statusCode == 401) {
            navigateTo('/login')
        }
    }
    if (data) {
        return data.value
    } else {
        return [];
    }
}

function goToNuevaTarea() {
    navigateTo('/tareas/nueva-tarea')
}

function confirmarEliminarTarea(id) {
    currentId.value = id;
    showModal()

}

async function eliminarTarea() {
    const id = currentId.value
    const { data, error, pending } = await useFetchApi("tareas/" + id + "", {
        method: 'DELETE',
    })
    if (data) {
        $toast.success("Tarea eliminada");
        hideModal()
        currentId.value = 0
        tareas.value = await getAllTareas()
    } else {
        $toast.error(respError);
    }
}


function showModal() {
    isModalVisible.value = true;
}
function hideModal() {
    isModalVisible.value = false;
}
function goToEditarTarea (id) {
    navigateTo('/tareas/editar-tarea/' + id)
}


</script>


<template>
    <div>
        <Modal v-model:isVisible="isModalVisible">
            <h1>Esta seguro que desea eliminar el Registro con ID: {{ currentId }} </h1>
            <div class="grid grid-cols-2 mt-5">
                <button @click="eliminarTarea" class="bg-green-400 text-gray-50 rounded-xl px-3 mx-3">Si</button>
                <button @click="hideModal" class="bg-red-400 text-gray-50 rounded-xl px-3">No</button>
            </div>
        </Modal>
    </div>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Tareas</h1>
                <p class="mt-2 text-sm text-gray-700">Lista de Tareas</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button" @click="goToNuevaTarea()"
                    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Añadir Tarea</button>
            </div>
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    ID</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Titulo</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Descripcion</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Fecha Limite</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="tarea in tareas" :key="tarea.id">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                    {{ tarea.id }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ tarea.titulo }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ tarea.descripcion }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ tarea.fecha_expiracion
                                    }}</td>
                                <td
                                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <button @click="goToEditarTarea(tarea.id)" class="p-1 text-gray-50 bg-indigo-400 rounded-lg">Editar<span
                                            class="sr-only">, {{ tarea.id }}</span></button>
                                    <button @click="confirmarEliminarTarea(tarea.id)"
                                        class="mx-3 p-1 text-gray-50 bg-red-400 rounded-lg">Eliminar<span
                                            class="sr-only">, {{ tarea.id }}</span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
