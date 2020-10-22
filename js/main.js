let app = new Vue({
    el: "#player",
    data: {
        query: "",
        musicList:[],
        musicUrl: "",
        musicCover: "",
        commentList:[],
        /*动画播放状态*/
        isPlaying: false,
        mvUrl:"",
        isShow: false,
        /*音乐播放*/
        playing: true,
        quota: "",
    },
    methods: {
        /*搜索歌曲*/
        searchMusic:function(){
            axios.get("https://autumnfish.cn/search?keywords="+this.query).then(
                (res) => {
                    this.musicList = res.data.result.songs;
                },(err) => {
                    console.log(err);
                }
            );
        },

        /*播放歌曲*/
        playMusic:function(musicId){
            // console.log(musicId);
            /*获取歌曲列表*/
            axios.get("https://autumnfish.cn/song/url?id="+musicId).then(
                (res) => {
                    this.musicUrl = res.data.data[0].url
                },(err) => {
                    console.log(err);
                }
            );
            /*获取封面*/
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId).then(
                (res) => {
                    // console.log(res.data.songs[0].al.picUrl);
                    this.musicCover = res.data.songs[0].al.picUrl;
                },
                (err) => {
                    console.log(err);
                }
            );
            /*获取评论*/
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId).then(
                (res) => {
                    this.commentList = res.data.hotComments;
                },
                (err) => {
                    console.log(err);
                }
            );

            // 接口地址：http://api.tianapi.com/txapi/dictum/index
            // 请求示例：http://api.tianapi.com/txapi/dictum/index?key=APIKEY&num=10
            // 支持协议：HTTP/HTTPS
            // 请求方式：GET/POST
            // 返回格式：UTF8 JSON
            /*随机获取名言警句*/

            axios.get("https://api.xygeng.cn/one").then(
                (res)=>{
                    // console.log(res);
                    this.quota = res.data.data.content;
                },
                (err) =>{
                    console.log(err);
                }
            )
        },

        /*开始封面的动画*/
        play: function () {
            this.isPlaying = true
        },
        /*停止封面转动动画*/
        pause: function () {
            this.isPlaying = false
        },

        /*播放mv*/
        playMv: function (mvId) {
            axios.get("https://autumnfish.cn/mv/url?id="+mvId).then(
                (res) => {
                    this.mvUrl = res.data.data.url
                    this.isShow = true;
                    this.playing = false

                },(err) => {
                    console.log(err);
                }
            );
        },

        hide(){
            this.isShow = false;
            this.mvUrl = '';
            this.playing = true
        }

    }
});