export default {
    formateData(time){
        if(!time) return '';
        let data = new Date(time);
        return data.getFullYear() + "-" + (data.getMonth()+1) + "-" + data.getDate() + "  " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    },
    //分页
    pagination(data,callback){
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.firstRow,
            pageSize: data.listRows,
            total: data.total,
            showTotal: () => {
                return  `共${data.total}条`
            },
            showQuickJumper: true
        }
    },
}
