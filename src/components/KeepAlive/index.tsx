import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addCache, deleteCache, updateScrollTop } from "@/store/cacheSlice";

function KeepAlive({
  children,
  cacheKey,
  max = 10,
}: {
  children: React.ReactNode;
  cacheKey: string;
  max?: number;
}) {
  const dispatch = useDispatch();
  const cache = useSelector((state: RootState) => state.cache.cache);

  useEffect(() => {
    if (!cache[cacheKey]) {
      dispatch(
        addCache({
          key: cacheKey,
          pathname: cacheKey,
        })
      );

      /* ② 对象长度判断 LRU */
      const keys = Object.keys(cache);
      if (keys.length > max) {
        const firstKey = keys[0];
        dispatch(deleteCache(firstKey));
      }
    }
  }, [cacheKey, children, cache, dispatch, max]);

  useEffect(() => {
    const container = document.querySelector<HTMLDivElement>(
      `[data-cache-key="${cacheKey}"]`
    );
    if (container) {
      container.scrollTop = cache[cacheKey]?.scrollTop || 0;
    }
  }, [cacheKey, cache]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    dispatch(
      updateScrollTop({
        key: cacheKey,
        scrollTop: e.currentTarget.scrollTop,
      })
    );
  };

  return (
    <div>
      {/* ③ 遍历对象 */}
      {Object.values(cache).map((item) => (
        <div
          key={item.key}
          data-cache-key={item.key}
          style={{
            display: item.key === cacheKey ? "block" : "none",
            height: "100%",
            overflow: "auto",
          }}
          onScroll={handleScroll}
        >
          {React.cloneElement(children as React.ReactElement, {
            key: cacheKey,
          })}
        </div>
      ))}
    </div>
  );
}

export default KeepAlive;
