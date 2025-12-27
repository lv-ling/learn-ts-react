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
            state.cache[action.payload.key] = action.payload;
        },
        deleteCache(state, action: PayloadAction<string>) {
            delete state.cache[action.payload];
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
        clearAllCache(state) {
            state.cache = {};
        },
        clearCacheByPattern(state, action: PayloadAction<string>) {
            // 支持通配符清理，如清除所有以 /basic 开头的缓存
            const pattern = action.payload;
            Object.keys(state.cache).forEach(key => {
                if (key.includes(pattern)) {
                    delete state.cache[key];
                }
            });
        },
    },
});

export const { addCache, deleteCache, updateScrollTop, clearAllCache, clearCacheByPattern } = cacheSlice.actions;
export default cacheSlice.reducer;