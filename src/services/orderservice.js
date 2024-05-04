import Api from "../axios/Api";

const ORDER_API="/orders"

export const fetchorders=async()=> {
    return await Api.get(ORDER_API);
    }
    export const fetchorderById=async(orderId)=> {
        return await Api.get(ORDER_API + '/' + orderId);
        }
    export const deleteorder=async(orderId) =>{
        return await Api.delete(ORDER_API + '/' + orderId);
        }
    export const addorder=async(order)=> {
        return await Api.post(ORDER_API, order);
        }
    export const editorder=(order) =>{
        return Api.put(ORDER_API + '/' + order._id, order);
        }
    