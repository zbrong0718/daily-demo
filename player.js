(function($){
    'use strict';
    var html='<span class="previous"></span><span class="toggle play"></span></span><span class="next"></span><marquee behavior="" direction="" class="musicti" scrollamount="1,direction=right,behavior=scroll"></marquee>';
    var Player = function(options){return new Player.fn.init(options);};
    $.extend(Player.prototype, {
        init: function(options){
            if(!$.isPlainObject(options)) throw new Error('options must be a object.');
            var $elm;
            if(!$elm || !$elm.lenth) {
                $elm = $('<div class="pannel" data-id="' + Date.now() + '"">');
            }
            $elm.html(html);
            $(options.container || 'body').append($elm);
            $.extend(this, {
                $elm: $elm,
                songIndex: 0,
                ti: $('.musicti', $elm),
                btns: {
                    toggle: $('.toggle', $elm),
                    previous: $('.previous', $elm),
                    next: $('.next', $elm)
                },
                audio: new Audio(),
                playList: options.playList || [],
                autoPlay: options.autoPlay || false
            });
            this.setSong();
            if(this.autoPlay && this.playList.length){
                this.play();
                this.bindEvent();
            }
        },
        play: function(){
            this.pause();
            this.audio.play();
            this.btns.toggle.removeClass('play').addClass('pause');
        },
        pause: function(){
            this.audio.pause();
            this.btns.toggle.removeClass('pause').addClass('play');
        },
        toggle: function(){
            if(this.audio.paused){
                this.play();
            }else{
                this.pause();
            }
        },
        previous: function(){
            this.songIndex--;
            this.setSong();
            this.play();
        },
        next: function(){
            this.songIndex++;
            this.setSong();
            this.play();
        },
        setSong: function(){
            var list = this.playList, len = list.length, song, index = this.songIndex, audio=this.audio;
            index = index < 0 ? (-index + len) % len : index % len;
            this.songIndex=index;
            song=list[index];
            this.ti.text(song.title);
            audio.src=song.src;
        },
        bindEvent: function(){
            var btns = this.btns;
            for(var action in btns) {
                btns[action].bind('click', this[action].bind(this));
            }
        }
    });
    Player.fn = Player.prototype;
    Player.fn.init.prototype = Player.fn;
    $.Player = window._ = Player;
})(jQuery);

(function($) {
'use strict';
var src;
$.ajax({url:'/SpaceManage/Cloud/GetCloundInfo.ashx', type: 'get', dataType: 'JSON', data:{t:+new Date(), op:'GetCloudInfo', folderId:25815, page:1,folderFlag:0},success:function(data){
    var list = $(data.FileList).map(function(){
        return {
            title: this.CustomFileName,
            src: this.FilePath + '/' + this.LinkFileName
        };
    }).get();

    window.player = _({
        playList: list,
        container: '#player',
        autoPlay: true
    });
}});
})(jQuery);


