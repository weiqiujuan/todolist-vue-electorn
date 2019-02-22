import md5 from 'js-md5'

let app = {
    config: {
        apiUrl: 'http://www.apiying.com/yuqing'
    },
    storage: {
        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get(key) {
            let result = localStorage.getItem(key)
            if (result) {
                return JSON.parse(result)
            } else {
                return ''
            }
        },
        remove(key) {
            localStorage.removeItem(key)
        }
    },
    sign(json) {
        let arr = [];
        for (let i in json) {
            arr.push(i)
        }
        //arr=['uid','a','salt']

        //如果这个参数被省略，那么元素将按照 ASCII 字符顺序进行升序排列（也就是所谓的自然顺序）
        arr = arr.sort()

        let str = '';
        for (let i = 0; i < arr.length; i++) {
            str += arr[i] + json[arr[i]]
        }

        return md5(str)
    }
}

export default app;
/*
    {
                'a':'addKeywords',
                'uid':userinfo.id,
                'salt':userinfo.salt
    }
*/