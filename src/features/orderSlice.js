import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchorders, addorder, deleteorder, editorder, fetchorderById } from
    "../services/orderservice"
export const getOrders = createAsyncThunk(
    "article/getOrders",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await fetchorders();
            return res.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createOrder = createAsyncThunk(
    "article/createOrder",
    async (order, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await addorder(order);
            return res.data
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const delOrder = createAsyncThunk(
    "article/delOrder",
    async (id,thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try{
    await deleteorder(id);
    return id ;
    }
    catch (error) {
    return rejectWithValue(error.message);
    }
    });

    export const updateOrder = createAsyncThunk(
        "article/updateOrder",
        async (order, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
        const res= await editorder(order);
        return res.data
        }
        catch (error) {
        return rejectWithValue(error.message);
        } }
        );

        export const findOrderByID = createAsyncThunk(
            "article/findOrderByID",
            async (id,thunkAPI) => {
            const { rejectWithValue } = thunkAPI;
            try{
            const res = await fetchorderById(id);
            return res.data;
            }
            catch (error) {
            return rejectWithValue(error.message);
            }
            });

            export const orderSlice = createSlice({
                name: 'order',
                initialState:{
                orders:[],
                order:{},
                isLoading: false,
                success:null,
                error:null,
                },
                reducers: {
                    removeSelectedOrder: (state) => {
                    state.success=null
                    state.error=null
                    
                    }
                    },

                    extraReducers: (builder) => {
                        //get orders
                        builder
                        .addCase(getOrders.pending, (state, action) => {
                        state.isLoading=true;
                        state.error=null;
                        })
                        .addCase(getOrders.fulfilled, (state, action) => {
                        state.isLoading=false;
                        state.error = null;
                        state.orders=action.payload;
                        })
                        .addCase(getOrders.rejected, (state, action) => {
                        state.isLoading=false;
                        state.error=action.payload;
                        console.log("impossible de se connecter au serveur")
                        })

                        //insertion order
.addCase(createOrder.pending, (state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;
})
.addCase(createOrder.fulfilled, (state, action) => {
state.orders.push(action.payload);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})
.addCase(createOrder.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
state.success=null;
})

//Modification order
.addCase(updateOrder.pending, (state, action) => {
    state.isLoading=true;
    state.error=null;
    state.success=null;
    })
    .addCase(updateOrder.fulfilled, (state, action) => {
    state.orders = state.orders.map((item) =>
    item._id === action.payload._id ? action.payload : item
    );
    state.isLoading=false;
    state.error=null;
    state.success=action.payload;
    })

    //Delete order
.addCase(delOrder.pending, (state, action) => {
    state.isLoading=true;
    state.error=null;
    })
    .addCase(delOrder.fulfilled, (state, action) => {
    state.isLoading=false;
    state.error=null;
    state.orders=state.orders.filter((item)=> item._id!==action.payload)
    })
    .addCase(delOrder.rejected, (state, action) => { 
        console.log(action.payload)
    state.isLoading=false;
    state.error=action.payload;
    })

    //Fectch order
.addCase(findOrderByID.pending, (state, action) => {
    state.isLoading = true
    state.error=null;
    })
    .addCase(findOrderByID.fulfilled,(state, action) => {
        state.isLoading = false
        state.error = null
        state.order=action.payload;
        })
        } }
        )

        export const { removeSelectedOrder } = orderSlice.actions
        
        export default orderSlice.reducer;