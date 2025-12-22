import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CacheItem {
    key: string;
    pathname: string;
    scrollTop?: number; // 保存滚动位置
}

interface CacheState {
    cache: Record<string, CacheItem>;
}

const initialState: CacheState = {
    cache: {},
};

const cacheSlice = createSlice({
    name: "cache",
    initialState,
    reducers: {
        addCache(state, action: PayloadAction<CacheItem>) {
            state.cache[action.payload.key] = action.payload; // 使用对象的键值对
        },
        deleteCache(state, action: PayloadAction<string>) {
            delete state.cache[action.payload]; // 删除对象的键
        },
        updateScrollTop(
            state,
            action: PayloadAction<{ key: string; scrollTop: number }>
        ) {
            const item = state.cache[action.payload.key];
            if (item) {
                item.scrollTop = action.payload.scrollTop;
            }
        },
    },
});

export const { addCache, deleteCache, updateScrollTop } = cacheSlice.actions;
export default cacheSlice.reducer;