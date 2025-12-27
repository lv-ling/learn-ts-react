import { useCallback, useEffect, useRef, useState } from 'react';

// 节流函数，避免频繁触发
function throttle<T extends (...args: unknown[]) => void>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;

    return ((...args: Parameters<T>) => {
        const currentTime = Date.now();

        if (currentTime - lastExecTime > delay) {
            func(...args);
            lastExecTime = currentTime;
        } else {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    }) as T;
}

/** 向上找到 antd 的 main 区域 */
function getMainRect() {
    const el = document.querySelector('.ant-layout-content');
    if (!el) {
        console.warn('未找到 .ant-layout-content，将用视口高度兜底');
        return { top: 0, height: window.innerHeight };
    }
    return el.getBoundingClientRect(); // 含 padding
}

/** 测量一个元素的总占用高度（content + padding + border + margin） */
function getTotalHeight(el: HTMLElement): number {
    const rect = el.getBoundingClientRect(); // content + padding + border
    const style = getComputedStyle(el);
    const marginTop = Number.parseFloat(style.marginTop) || 0;
    const marginBottom = Number.parseFloat(style.marginBottom) || 0;
    return rect.height + marginTop + marginBottom;
}

/** 测量 Table 非滚动区总高（表头+分页+滚动条+title/footer 以及它们自身的 margin/padding） */
function getTableNonScrollHeight(tableContainer: HTMLElement): number {
    const table = tableContainer.querySelector<HTMLElement>('.ant-table-container');
    if (!table) return 0;

    let total = 0;

    // 一次性获取所有需要的元素，避免多次查询 DOM
    const elements = [
        table.querySelector<HTMLElement>('.ant-table-header'), // 表头
        table.querySelector<HTMLElement>('.ant-table-body > .ant-table-scrollbar'), // 横向滚动条
        tableContainer.querySelector<HTMLElement>('.ant-table-pagination') || // 分页器（在 table 内）
        tableContainer.querySelector<HTMLElement>('.ant-pagination'), // 分页器（在 container 内）
        table.querySelector<HTMLElement>('.ant-table-title'), // 自定义标题
        table.querySelector<HTMLElement>('.ant-table-footer'), // 自定义页脚
    ];

    // 计算所有有效元素的高度
    for (const element of elements) {
        if (element) {
            total += getTotalHeight(element);
        }
    }

    return total;
}

interface UseAntTableRemainHeightOptions {
    gap?: number;
    minHeight?: number;
    throttleDelay?: number;
}


export function useTableHeightCalc({
    gap = 0,
    minHeight = 200,
    throttleDelay = 500
}: UseAntTableRemainHeightOptions = {}) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [remainHeight, setRemainHeight] = useState(minHeight);

    const measure = useCallback(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper?.parentElement) return;

        try {
            // 1. main 区域总高
            const mainRect = getMainRect();
            const mainHeight = mainRect.height;

            // 2. 表格容器自身的 margin 和 padding
            const wrapperStyle = getComputedStyle(wrapper);
            const wrapperMarginTop = Number.parseFloat(wrapperStyle.marginTop) || 0;
            const wrapperMarginBottom = Number.parseFloat(wrapperStyle.marginBottom) || 0;
            const wrapperPaddingTop = Number.parseFloat(wrapperStyle.paddingTop) || 0;
            const wrapperPaddingBottom = Number.parseFloat(wrapperStyle.paddingBottom) || 0;
            const wrapperOffset = wrapperMarginTop + wrapperMarginBottom + wrapperPaddingTop + wrapperPaddingBottom;

            // 3. 兄弟元素总高度（包括 margin）
            const parent = wrapper.parentElement;
            const prevSiblings = Array.from(parent.children).filter(
                (el) => el !== wrapper && el instanceof HTMLElement
            ) as HTMLElement[];

            const siblingsHeight = prevSiblings.reduce((sum, el) => {
                const rect = el.getBoundingClientRect();
                const style = getComputedStyle(el);
                const marginTop = Number.parseFloat(style.marginTop) || 0;
                const marginBottom = Number.parseFloat(style.marginBottom) || 0;
                return sum + rect.height + marginTop + marginBottom;
            }, 0);

            // 4. 表格非滚动区域高度
            const nonScrollHeight = getTableNonScrollHeight(wrapper);

            // 5. 计算剩余高度
            const calculatedHeight = mainHeight - siblingsHeight - wrapperOffset - nonScrollHeight - gap;
            const newHeight = Math.max(calculatedHeight, minHeight);

            setRemainHeight(newHeight);
        } catch (error) {
            console.warn('计算表格高度时出错:', error);
            setRemainHeight(minHeight);
        }
    }, [gap, minHeight]);

    useEffect(() => {
        // 创建节流版本的 measure 函数
        const throttledMeasure = throttle(measure, throttleDelay);

        // 初始计算
        throttledMeasure();

        // ResizeObserver 监听父元素尺寸变化
        const ro = new ResizeObserver(throttledMeasure);
        const parent = wrapperRef.current?.parentElement;
        if (parent) {
            ro.observe(parent);
        }

        // 窗口 resize 事件（节流处理）
        window.addEventListener('resize', throttledMeasure);

        return () => {
            ro.disconnect();
            window.removeEventListener('resize', throttledMeasure);
        };
    }, [measure, throttleDelay]);

    return { wrapperRef, remainHeight };
}