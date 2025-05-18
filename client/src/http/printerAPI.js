import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createPrint_Technology = async (print_technology) => {
    const { data } = await $authHost.post('api/print_technology', {
        print_technology // Отправляем как есть (snake_case)
    });
    return data;
};

export const fetchPrint_Technologys = async () => {
    const {data} = await $host.get('api/print_technology');
    return data;
};

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createPrinter = async (formData) => {
    const {data} = await $authHost.post('api/printer', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data
}

export const fetchPrinters = async (print_technologyId, brandId, page, limit = 5) => {
    // Подменяем ключ print_technologyId → printTechnologyId в параметрах
    const {data} = await $host.get('api/printer', {
        params: {
            printTechnologyId: print_technologyId,  // Сервер получит printTechnologyId
            brandId,
            page,
            limit
        }
    });
    return data;
};

export const fetchOnePrinter = async (id) => {
    const {data} = await $host.get('api/printer/' + id)
    return data
}

export const deletePrinter = async (id) => {
    try {
        const {data} = await $authHost.delete(`api/printer/${id}`)
        return data
    } catch (e) {
        console.error('Delete printer error:', e.response?.data)
        throw e
    }
}
