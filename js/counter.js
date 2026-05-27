// 访客统计模块
const VisitorCounter = (function() {
    const STORAGE_KEY = 'visitor_counter_data';
    
    function getTodayString() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    }
    
    function loadData() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.error('Failed to load visitor counter data:', e);
        }
        return null;
    }
    
    function saveData(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Failed to save visitor counter data:', e);
        }
    }
    
    function updateCounter() {
        let data = loadData();
        const today = getTodayString();
        
        if (!data) {
            data = {
                totalVisits: 1,
                todayVisits: 1,
                lastDate: today,
                visitorRecords: []
            };
        } else {
            if (data.lastDate !== today) {
                // 新的一天，重置今日访问量
                data.todayVisits = 1;
                data.lastDate = today;
            } else {
                data.todayVisits++;
            }
            data.totalVisits++;
        }
        
        saveData(data);
        return data;
    }
    
    function getStats() {
        const data = loadData();
        if (!data) {
            return {
                totalVisits: 0,
                todayVisits: 0
            };
        }
        
        // 检查是否是新的一天
        const today = getTodayString();
        if (data.lastDate !== today) {
            return {
                totalVisits: data.totalVisits,
                todayVisits: 0
            };
        }
        
        return {
            totalVisits: data.totalVisits,
            todayVisits: data.todayVisits
        };
    }
    
    return {
        update: updateCounter,
        getStats: getStats
    };
})();